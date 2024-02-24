export type ProductItem = { _id: string; name: string; price: number };
export type Store = {
  _id: string;
  storeName: string;
  city: string;
  country: string;
  deliveryPrice: number;
  productItems: ProductItem[];
  imageUrl: string;
  lastUpdated: string;
};
export type StoreSearchResponse = {
  data: Store[];
  pagination: { total: number; page: number; pages: number };
};
export type OrderStatus =
  | "placed"
  | "paid"
  | "inProgress"
  | "outForDelivery"
  | "delivered";

export type Order = {
  _id: string;
  store: Store;
  // user:User;
  cartItems: {
    menuItemId: string;
    name: string;
    quantity: string;
  }[];
  deliveryInformation: {
    name: string;
    addressLine1: string;
    city: string;
    email: string;
  };
  totalAmount: number;
  status: OrderStatus;
  createdAt: string;
  restaurantId: string;
};

export type User = {
  _id: string;
  email: string;
  name: string;
  addressLine1: string;
  city: string;
  country: string;
};
