import { type CartContextType } from "@/context/CartContext";

type CartActionType =
  | "increase"
  | "decrease"
  | "delete"
  | "input"
  | "clearCart";

type ProductUtilArgs = {
  supermarket: ShopCode;
  id: string;
  quantity: number;
  updateCartItemQuantity: CartContextType["updateCartItemQuantity"];
  removeCartItem: CartContextType["removeCartItem"];
};

type ClearCartUtilArgs = {
  clearCart: CartContextType["clearCart"];
};

type CartActionArgs = {
  action: CartActionType;
  utilArgs: ProductUtilArgs | ClearCartUtilArgs;
  value?: number;
  onRequireConfirm?: () => void;
};

/**
 * handleCartAction - Handles cart updates based on the specified action
 *
 * The function supports four different actions
 *  - increase: Increases quantity by 1
 *  - decrease: Decreases quantity by 1
 *  - delete: Removes the item from the cart
 *  - input: Updates the quantity based on user input
 *  - clearCart: Clears the entire cart
 *
 * @param {CartActionArgs} args - The arguments for the cart action
 * @param {CartActionType} args.action - The type of action to perform
 * @param {UtilArgs} args.utilArgs - Utility functions and cart item info
 * @param {number} [args.value=1] - The quantity for the "input" action
 * @param {Function} [args.onRequireConfirm] - Optional callback if delete confirmation is required
 */
export function handleProductAction({
  action,
  utilArgs,
  value,
  onRequireConfirm,
}: CartActionArgs) {
  const { supermarket, id, quantity, updateCartItemQuantity, removeCartItem } =
    utilArgs as ProductUtilArgs;
  switch (action) {
    case "increase": {
      updateCartItemQuantity(supermarket, id, quantity + 1);
      break;
    }
    case "decrease": {
      if (quantity > 1) {
        updateCartItemQuantity(supermarket, id, quantity - 1);
      } else {
        onRequireConfirm?.();
      }
      break;
    }
    case "input": {
      if (value === undefined || isNaN(value) || value <= 0) {
        return;
      }
      const newQuantity = Math.max(1, Number(value) || 1);
      updateCartItemQuantity(supermarket, id, newQuantity);
      break;
    }
    case "delete": {
      removeCartItem(supermarket, id);
      break;
    }
  }
}

// Moved into a switch, if we include more cart actions
export function handleCartAction({ action, utilArgs }: CartActionArgs) {
  const { clearCart } = utilArgs as ClearCartUtilArgs;
  switch (action) {
    case "clearCart": {
      clearCart();
      break;
    }
  }
}
