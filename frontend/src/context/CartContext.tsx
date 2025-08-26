import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { calculateTotals } from "./utils/calculateTotals";
import { getStartingState } from "./utils/cartData";
import { setLocalData } from "./utils/localStorage";

type CartContextType = {
  nwCart: Cart;
  pnsCart: Cart;
  wlsCart: Cart;
  cartCosts: CartTotals;
  clearCart: () => void;
  addCartItem: (supermarket: ShopCode, item: Product) => void;
  removeCartItem: (supermarket: ShopCode, itemId: string) => void;
  updateCartItemQuantity: (
    supermarket: ShopCode,
    itemId: string,
    quantity: number,
  ) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [nwCart, setNwCart] = useState<Cart>(getStartingState("nw"));
  const [pnsCart, setPnsCart] = useState<Cart>(getStartingState("pns"));
  const [wlsCart, setWlsCart] = useState<Cart>(getStartingState("wls"));
  const setState = {
    nw: setNwCart,
    pns: setPnsCart,
    wls: setWlsCart,
  };

  const cartCosts = useMemo(
    () => calculateTotals(nwCart, pnsCart, wlsCart),
    [nwCart, pnsCart, wlsCart],
  );

  const cart = useMemo(
    () => ({ nw: nwCart, pns: pnsCart, wls: wlsCart }),
    [nwCart, pnsCart, wlsCart],
  );

  useEffect(() => {
    // Any time the cart changes, update local storage
    setLocalData("cart", cart);
  }, [cart]);

  const clearCart = () => {
    setState.nw({});
    setState.pns({});
    setState.wls({});
  };

  const addCartItem = (supermarket: ShopCode, item: Product) => {
    if (!item.id || !item.title || !item.price.value) return;

    const existingItem = cart[supermarket][item.id];
    if (existingItem) {
      updateCartItemQuantity(supermarket, item.id, existingItem.quantity + 1);
      return;
    }

    setState[supermarket]((currentCart) => {
      return {
        ...currentCart,
        [item.id]: {
          product: item,
          quantity: 1,
        },
      };
    });
  };

  const removeCartItem = (supermarket: ShopCode, itemId: string) => {
    if (!cart[supermarket][itemId]) return;

    setState[supermarket]((currentCart) => {
      const supermarketCopy = { ...currentCart };
      delete supermarketCopy[itemId];
      return { ...supermarketCopy };
    });
  };

  const updateCartItemQuantity = (
    supermarket: ShopCode,
    itemId: string,
    quantity: number,
  ) => {
    if (!cart[supermarket][itemId]) return;

    if (quantity === 0) {
      removeCartItem(supermarket, itemId);
      return;
    }

    setState[supermarket]((currentCart) => {
      const supermarketCopy = { ...currentCart };
      const newItemInstance = { ...supermarketCopy[itemId] };
      newItemInstance.quantity = quantity;
      return {
        ...supermarketCopy,
        [itemId]: newItemInstance,
      };
    });
  };

  return (
    <CartContext.Provider
      value={{
        nwCart,
        pnsCart,
        wlsCart,
        cartCosts,
        clearCart,
        addCartItem,
        removeCartItem,
        updateCartItemQuantity,
      }}
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
