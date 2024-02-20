import { ProductItem } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

type Props = { productItem: ProductItem; addToCart: () => void };

const ProductItem = ({ productItem, addToCart }: Props) => {
  return (
    <Card className="cursor-pointer" onClick={addToCart}>
      <CardHeader>
        <CardTitle>{productItem.name}</CardTitle>
      </CardHeader>
      <CardContent className="font-bold">
        £{(productItem.price / 100).toFixed(2)}
      </CardContent>
    </Card>
  );
};

export default ProductItem;
