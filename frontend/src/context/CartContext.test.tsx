import { act, renderHook } from "@testing-library/react";
import { expect, vi } from "vitest";

import {
  cartWithSingleItem,
  emptyCart,
  fullCart,
  fullProductDetails,
  partialCart,
  partialCart_itemRemoved,
  partialCart_quantityUpdated,
} from "@/lib/test/fixtures/cart";

import { useCart } from "./CartContext";
import { setLocalData } from "./utils/localStorage";
import { renderComponentWithCart } from "./utils/renderComponentWithCart";

vi.mock("./utils/localStorage", () => ({
  getLocalData: vi.fn(),
  setLocalData: vi.fn(),
}));

// ----- USER INTERACTIONS -----

describe("Given a user has an empty cart", () => {
  describe("When the user adds an item from a specific supermarket", () => {
    it("Then the cart contains that item under the correct supermarket", () => {
      const testProduct = {
        ...fullProductDetails,
        id: "3330159",
        title: "Shampoo",
      };

      const { result } = renderComponentWithCart();
      act(() => {
        result.current.addCartItem("wls", testProduct);
      });

      const itemInCart = result.current.cart.wls["3330159"];

      expect(itemInCart).toBeDefined();
      expect(itemInCart.product.title).toBe("Shampoo");
    });

    it("Then the quantity of the new item is set to 1", () => {
      const testProduct = {
        ...fullProductDetails,
        id: "2220732",
      };

      const { result } = renderComponentWithCart();
      act(() => {
        result.current.addCartItem("pns", testProduct);
      });

      const itemInCart = result.current.cart.pns["2220732"];

      expect(itemInCart).toBeDefined();
      expect(itemInCart.quantity).toBe(1);
    });

    it("Then there is only that item in the cart", () => {
      const testProduct = {
        ...fullProductDetails,
        id: "1110000",
      };

      const { result } = renderComponentWithCart();
      act(() => {
        result.current.addCartItem("nw", testProduct);
      });

      expect(result.current.cart).toEqual(cartWithSingleItem);
    });
  });
});

describe("Given a user already has items in their cart", () => {
  describe("When the user clears their cart", () => {
    it("Then all supermarkets have no items", () => {
      const { result } = renderComponentWithCart(fullCart);
      act(() => {
        result.current.clearCart();
      });

      expect(result.current.cart.nw).toEqual({});
      expect(result.current.cart.pns).toEqual({});
      expect(result.current.cart.wls).toEqual({});
    });
  });

  describe("When the user adds a new item to their cart", () => {
    it("Then the item is added to the correct supermarket", () => {
      const { result } = renderComponentWithCart(partialCart);
      const testProduct = {
        ...fullProductDetails,
        id: "1110548",
        title: "Broccoli",
      };

      act(() => {
        result.current.addCartItem("nw", testProduct);
      });

      const itemInCart = result.current.cart.nw["1110548"];

      expect(itemInCart).toBeDefined();
      expect(itemInCart.product).toEqual(testProduct);
    });

    it("Then the quantity of the new item is set to 1", () => {
      const { result } = renderComponentWithCart(partialCart);
      const testProduct = {
        ...fullProductDetails,
        id: "2220489",
        title: "Carrot",
      };

      act(() => {
        result.current.addCartItem("pns", testProduct);
      });

      const itemInCart = result.current.cart.pns["2220489"];

      expect(itemInCart).toBeDefined();
      expect(itemInCart.product).toEqual(testProduct);
      expect(itemInCart.quantity).toBe(1);
    });
  });

  describe("When the user adds an item that already exists in their cart", () => {
    it("Then the quantity of the existing item is increased by 1", () => {
      const { result } = renderComponentWithCart(partialCart);

      const existingItem = result.current.cart.nw["1110001"];
      expect(existingItem.quantity).toBe(5);

      act(() => {
        result.current.addCartItem("nw", existingItem.product);
      });

      const updatedItem = result.current.cart.nw["1110001"];
      expect(updatedItem.quantity).toBe(6);
    });
  });

  describe("When the user deletes an item from their cart", () => {
    it("Then the item is removed from the correct supermarket", () => {
      const { result } = renderComponentWithCart(partialCart);
      expect(result.current.cart.nw["1110001"]).toBeDefined();

      act(() => {
        result.current.removeCartItem("nw", "1110001");
      });

      expect(result.current.cart.nw["1110001"]).toBeUndefined();
      expect(result.current.cart.nw).toEqual({});
    });

    it("Then only that item is removed from the cart", () => {
      const { result } = renderComponentWithCart(partialCart);
      act(() => {
        result.current.removeCartItem("pns", "2220001");
      });

      expect(result.current.cart).toEqual(partialCart_itemRemoved);
    });
  });

  describe("When the user updates the item quantity", () => {
    it("Then the item quantity is updated in the cart", () => {
      const { result } = renderComponentWithCart(partialCart);
      act(() => {
        result.current.updateCartItemQuantity("pns", "2220002", 10);
      });

      const updatedItem = result.current.cart.pns["2220002"];
      expect(updatedItem.quantity).toBe(10);
    });

    it("Then only that item quantity is updated", () => {
      const { result } = renderComponentWithCart(partialCart);
      act(() => {
        result.current.updateCartItemQuantity("pns", "2220001", 300);
      });

      expect(result.current.cart.pns["2220001"].quantity).toBe(300);

      expect(result.current.cart).toEqual(partialCart_quantityUpdated);
    });
  });

  describe("When the user sets the item quantity to 0", () => {
    it("Then the item is removed", () => {
      const { result } = renderComponentWithCart(partialCart);
      act(() => {
        result.current.updateCartItemQuantity("nw", "1110001", 0);
      });

      const removedItem = result.current.cart.nw["1110001"];
      expect(removedItem).toBeUndefined();
      expect(result.current.cart.nw).toEqual({});
    });

    it("Then only that item is removed from the cart", () => {
      const { result } = renderComponentWithCart(partialCart);
      act(() => {
        result.current.updateCartItemQuantity("pns", "2220001", 0);
      });

      expect(result.current.cart).toEqual(partialCart_itemRemoved);
    });
  });
});

// ----- BEHIND THE SCENES -----

describe("Given a user has not been to the site before", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("When the user visits the site for the first time", () => {
    it("Then an empty cart is loaded up", () => {
      const { result } = renderComponentWithCart(null);
      expect(result.current.cart).toEqual(emptyCart);
    });

    it("Then an empty cart is saved for next time", () => {
      renderComponentWithCart(null);
      expect(setLocalData).toHaveBeenCalledWith("cart", emptyCart);
    });
  });
});

describe("Given a user has previously been to the site", () => {
  describe("When the user loads up the site", () => {
    it("Then their cart is restored to its previous state", () => {
      const { result } = renderComponentWithCart(fullCart);
      expect(result.current.cart).toEqual(fullCart);
    });
  });
});

describe("Given a user changes their cart", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("When the cart is updated", () => {
    it("Then the changes are saved for the next visit", () => {
      const { result } = renderComponentWithCart();
      expect(setLocalData).toHaveBeenCalledTimes(1);
      expect(setLocalData).toHaveBeenCalledWith("cart", emptyCart);

      act(() => {
        result.current.addCartItem("nw", fullProductDetails);
      });

      expect(setLocalData).toHaveBeenCalledTimes(2);
      expect(setLocalData).toHaveBeenCalledWith("cart", {
        nw: {
          [fullProductDetails.id]: {
            product: fullProductDetails,
            quantity: 1,
          },
        },
        pns: {},
        wls: {},
      });
    });
  });
});

// ----- DEVELOPMENT -----

describe("Given a developer uses the cart outside of the provider", () => {
  describe("When useCart is called without wrapping in CartProvider", () => {
    it("Then an error is thrown", () => {
      expect(() => renderHook(() => useCart())).toThrowError(
        "useCart needs to be used inside the provider",
      );
    });
  });
});
