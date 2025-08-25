type CombinedCart = {
  nw: Cart;
  pns: Cart;
  wls: Cart;
};

type Cart = Record<string, CartItem>;

type CartItem = {
  product: Product;
  quantity: number;
};
