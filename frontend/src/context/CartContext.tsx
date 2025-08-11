import { createContext, type ReactNode, useContext, useState } from "react";

import { initialCart } from "./utils/initialCart";

type CartContextType = {
  cart: Cart;
  clearCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState(initialCart);

  const clearCart = () => {
    setCart({ nw: [], pns: [], wls: [] });
  };

  return (
    <CartContext.Provider value={{ cart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart needs to be used inside the provider");
  return context;
};
