type Cart = Record<string, CartItem>;

type CartItem = {
  quantity: number;
  product: Product;
};

type CartItemWithMultibuy = CartItem & {
  product: CartItem["product"] & { promo: MultibuyPromo };
};

type CombinedCart = {
  nw: Cart;
  pns: Cart;
  wls: Cart;
};

type CartTotals = {
  nw: string;
  pns: string;
  wls: string;
  total: string;
};
