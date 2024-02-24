import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import DetailsSection from "./DetailsSection";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Store } from "@/types";
import { useEffect } from "react";
import LoadingButton from "@/components/LoadingButton";
import ImageSection from "./ImageSection";
import ProductSection from "./ProductSection";

const formSchema = z
  .object({
    storeName: z.string({ required_error: "store name is required" }),
    city: z.string({ required_error: "city is required" }),
    country: z.string({
      required_error: "country is required",
    }),
    deliveryPrice: z.coerce.number({
      required_error: "delivery price is required",
      invalid_type_error: "must be a valid number",
    }),
    productItems: z.array(
      z.object({
        name: z.string().min(1, "name is required"),
        price: z.coerce.number().min(1, "price is required"),
      })
    ),
    imageUrl: z.string().optional(),
    imageFile: z.instanceof(File, { message: "image is required" }).optional(),
  })
  .refine((data) => data.imageUrl || data.imageFile, {
    message: "Either image URL or image File must be provided",
    path: ["imageFile"],
  });

type StoreFormData = z.infer<typeof formSchema>;

type Props = {
  store?: Store;
  onSave: (storeFormData: FormData) => void;
  isLoading: boolean;
};

const ManageStoreForm = ({ onSave, isLoading, store }: Props) => {
  const form = useForm<StoreFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productItems: [{ name: "", price: 0 }],
    },
  });

  useEffect(() => {
    if (!store) {
      return;
    }

    const deliveryPriceFormatted = parseInt(
      (store.deliveryPrice / 100).toFixed(2)
    );

    const productItemsFormatted = store.productItems.map((item) => ({
      ...item,
      price: parseInt((item.price / 100).toFixed(2)),
    }));

    const updatedStore = {
      ...store,
      deliveryPrice: deliveryPriceFormatted,
      productItem: productItemsFormatted,
    };
    form.reset(updatedStore);
  }, [form, store]);

  const onSubmit = (formDataJson: StoreFormData) => {
    const formData = new FormData();
    formData.append("storeName", formDataJson.storeName);
    formData.append("city", formDataJson.city);
    formData.append("country", formDataJson.country);

    formData.append(
      "deliveryPrice",
      (formDataJson.deliveryPrice * 100).toString()
    );
    formDataJson.productItems.forEach((productItem, index) => {
      formData.append(`productItems[${index}][name]`, productItem.name);
      formData.append(
        `productItems[${index}][price]`,
        (productItem.price * 100).toString()
      );
    });
    if (formDataJson.imageFile) {
      formData.append(`imageFile`, formDataJson.imageFile);
    }
    onSave(formData);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 bg-gray-50 p-10 rounded-lg"
      >
        <DetailsSection />
        <Separator />
        <ProductSection />
        <Separator />
        <ImageSection />
        {isLoading ? <LoadingButton /> : <Button type="submit">Submit</Button>}
      </form>
    </Form>
  );
};

export default ManageStoreForm;
