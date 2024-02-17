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
