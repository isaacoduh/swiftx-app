import { useGetStore } from "@/api/StoreApi";
import ProductItem from "@/components/ProductItem";
import StoreInfo from "@/components/StoreInfo";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { useParams } from "react-router-dom";
import { ProductItem as ProductItemType } from "@/types";

const DetailPage = () => {
  const { storeId } = useParams();
  const { store, isLoading } = useGetStore(storeId);

  const addToCart = (productItem: ProductItemType) => {
    console.log(productItem._id);
    console.log(productItem.price);
  };

  if (isLoading || !store) {
    return <span>Loading ...</span>;
  }

  return (
    <div className="flex flex-col gap-10">
      <AspectRatio ratio={16 / 5}>
        <img
          src={store.imageUrl}
          className="rounded-md object-cover h-full w-full"
        />
      </AspectRatio>
      <div className="grid md:grid-cols-[4fr_2fr] gap-5 md:px-32">
        <div className="flex flex-col gap-4">
          <StoreInfo store={store} />
          <span className="text-2xl font-bold tracking-tight">
            Product List
          </span>
          {store.productItems.map((productItem) => (
            <ProductItem
              productItem={productItem}
              addToCart={() => addToCart(productItem)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
