import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

import { initialCart } from "./utils/initialCart"; // On remove, uncomment initialCart below
import { getLocalData, setLocalData } from "./utils/localStorage";

type CartContextType = {
  cart: Cart;
  clearCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

// TODO: uncomment when removing fake cart data
// const initialCart = { nw: [], pns: [], wls: [] };

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState(getLocalData("cart") || initialCart);

  useEffect(() => {
    setLocalData("cart", cart);
  }, [cart]);

  const clearCart = () => {
    setCart(initialCart);
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
