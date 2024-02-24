import { Button } from "@/components/ui/button";
import { FormDescription, FormField, FormItem } from "@/components/ui/form";
import { useFieldArray, useFormContext } from "react-hook-form";
import ProductItemInput from "./ProductItemInput";

const ProductSection = () => {
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "productItems",
  });
  return (
    <div className="space-y-2">
      <div>
        <h2 className="text-2xl font-bold">Product List</h2>
        <FormDescription>
          Create your product and give each item a name and a price
        </FormDescription>
      </div>
      <FormField
        control={control}
        name="productItems"
        render={() => (
          <FormItem className="flex flex-col gap-2">
            {fields.map((_, index) => (
              <ProductItemInput
                index={index}
                removeProductItem={() => remove(index)}
              />
            ))}
          </FormItem>
        )}
      />
      <Button type="button" onClick={() => append({ name: "", price: "" })}>
        Add Product
      </Button>
    </div>
  );
};
export default ProductSection;
