import { createContext, useContext, useState, type ReactNode } from "react";
import type { Cart } from "@/types/Cart.types";

type CartContextType = {
  cart: Cart;
  clearCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState({ nw: [], pns: [], wls: [] });

  const clearCart = () => {
    setCart({ nw: [], pns: [], wls: [] });
  };

  return <CartContext.Provider value={{ cart, clearCart }}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart needs to be used inside the provider");
  return context;
};
