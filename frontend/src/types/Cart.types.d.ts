type Cart = {
  nw: Record<string, CartItem>;
  pns: Record<string, CartItem>;
  wls: Record<string, CartItem>;
};

type CartItem = {
  product: Product;
  quantity: number;
};
