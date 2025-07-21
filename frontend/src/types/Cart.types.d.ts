import { Product } from "./Product.types";

type Cart = {
  nw: CartItem[];
  pns: CartItem[];
  wls: CartItem[];
};

type CartItem = {
  id: string;
  product: Product;
  quantity: number;
};
