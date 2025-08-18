import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

import { devInitialCart } from "./utils/devInitialCart";
import { getLocalData, setLocalData } from "./utils/localStorage";

const EMPTY_CART = { nw: {}, pns: {}, wls: {} };
const initialCart =
  process.env.NODE_ENV === "development" ? devInitialCart : EMPTY_CART;

type CartContextType = {
  cart: Cart;
  addCartItem: (supermarket: ShopCode, item: Product) => void;
  clearCart: () => void;
  removeCartItem: (supermarket: ShopCode, itemId: string) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<Cart>(getLocalData("cart") || initialCart);

  useEffect(() => {
    // Any time the cart changes, update local storage
    setLocalData("cart", cart);
  }, [cart]);

  const clearCart = () => {
    setCart(EMPTY_CART);
  };

  const addCartItem = (supermarket: ShopCode, item: Product) => {
    setCart((currentCart) => {
      return {
        ...currentCart,
        [supermarket]: {
          ...currentCart[supermarket],
          [item.id]: {
            product: item,
            quantity: 1,
          },
        },
      };
    });
  };

  const removeCartItem = (supermarket: ShopCode, itemId: string) => {
    setCart((currentCart) => {
      const supermarketCopy = { ...currentCart[supermarket] };
      delete supermarketCopy[itemId];
      return { ...currentCart, [supermarket]: { ...supermarketCopy } };
    });
  };

  return (
    <CartContext.Provider
      value={{ cart, addCartItem, clearCart, removeCartItem }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart needs to be used inside the provider");
  return context;
};
