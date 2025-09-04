import type { CartContextType } from "@/context/CartContext";

export const mockedCartContextValue: CartContextType = {
  nwCart: {},
  pnsCart: {},
  wlsCart: {},
  cart: {
    nw: {},
    pns: {},
    wls: {},
  },
  cartCosts: {
    nw: "0.00",
    pns: "0.00",
    wls: "0.00",
    total: "0.00",
  },
  clearCart: () => {},
  addCartItem: () => {},
  removeCartItem: () => {},
  updateCartItemQuantity: () => {},
};
