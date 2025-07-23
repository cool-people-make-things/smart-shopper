import { Product } from "./Product.types";

export type Cart = {
  nw: CartItem[];
  pns: CartItem[];
  wls: CartItem[];
};

export type CartItem = {
  id: string;
  product: Product;
  quantity: number;
};
