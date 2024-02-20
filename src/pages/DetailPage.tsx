import { useGetStore } from "@/api/StoreApi";
import ProductItem from "@/components/ProductItem";
import StoreInfo from "@/components/StoreInfo";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { useParams } from "react-router-dom";
import { ProductItem as ProductItemType } from "@/types";
import OrderSummary from "@/components/OrderSummary";
import { Card, CardFooter } from "@/components/ui/card";

import { useState } from "react";
import CheckoutButton from "@/components/CheckoutButton";

export type CartItem = {
  _id: string;
  name: string;
  price: number;
  quantity: number;
};

const DetailPage = () => {
  const { storeId } = useParams();
  const { store, isLoading } = useGetStore(storeId);
  const isCheckoutLoading = true;

  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const storedCartItems = sessionStorage.getItem(`cartItems-${storeId}`);
    return storedCartItems ? JSON.parse(storedCartItems) : [];
  });

  const addToCart = (productItem: ProductItemType) => {
    setCartItems((prevCartItems) => {
      const existingCartItem = prevCartItems.find(
        (cartItem) => cartItem._id === productItem._id
      );
      let updatedCartItems;
      if (existingCartItem) {
        updatedCartItems = prevCartItems.map((cartItem) =>
          cartItem._id === productItem._id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        updatedCartItems = [
          ...prevCartItems,
          {
            _id: productItem._id,
            name: productItem.name,
            price: productItem.price,
            quantity: 1,
          },
        ];
      }
      sessionStorage.setItem(
        `cartItems-${storeId}`,
        JSON.stringify(updatedCartItems)
      );
      return updatedCartItems;
    });
  };

  const removeFromCart = (cartItem: CartItem) => {
    setCartItems((prevCartItems) => {
      const updatedCartItems = prevCartItems.filter(
        (item) => cartItem._id !== item._id
      );
      sessionStorage.setItem(
        `cartItems-${storeId}`,
        JSON.stringify(updatedCartItems)
      );
      return updatedCartItems;
    });
  };

  const onCheckout = async () => {
    if (!store) {
      return;
    }

    const checkoutData = {
      cartItems: cartItems.map((cartItem) => ({
        productItemId: cartItem._id,
        name: cartItem.name,
        quantity: cartItem.quantity.toString(),
      })),
      storeId: store._id,
      //   deliveryInformation:
    };

    console.log(checkoutData);
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
        <div>
          <Card>
            <OrderSummary
              store={store}
              cartItems={cartItems}
              removeFromCart={removeFromCart}
            />
            <CardFooter>
              <CheckoutButton
                disabled={cartItems.length === 0}
                onCheckout={onCheckout}
                isLoading={isCheckoutLoading}
              />
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
