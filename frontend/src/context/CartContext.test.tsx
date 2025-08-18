import { act, renderHook } from "@testing-library/react";
import { expect, vi } from "vitest";

import { fullProductDetails, preexistingCart } from "@/lib/test/fixtures/cart";

import { useCart } from "./CartContext";
import { setLocalData } from "./utils/localStorage";
import { renderComponentWithCart } from "./utils/renderComponentWithCart";

vi.mock("./utils/localStorage", () => ({
  getLocalData: vi.fn(),
  setLocalData: vi.fn(),
}));

// ----- USER INTERACTIONS -----

describe("Given a user has an empty cart", () => {
  describe("When they add an item from a specific supermarket", () => {
    it("Then the cart contains that item under the supermarket they selected", () => {
      const testProduct = {
        ...fullProductDetails,
        id: "test_product_1",
        title: "Shampoo",
      };

      const { result } = renderComponentWithCart();
      act(() => {
        result.current.addCartItem("wls", testProduct);
      });

      const itemInCart = result.current.cart.wls.test_product_1;

      expect(itemInCart).toBeDefined();
      expect(itemInCart.product.title).toBe("Shampoo");
    });

    it("Then the quantity of the new item is set to 1", () => {
      const testProduct = {
        ...fullProductDetails,
        id: "test_product_2",
        title: "Cake",
      };

      const { result } = renderComponentWithCart();
      act(() => {
        result.current.addCartItem("pns", testProduct);
      });

      const itemInCart = result.current.cart.pns.test_product_2;

      expect(itemInCart).toBeDefined();
      expect(itemInCart.quantity).toBe(1);
    });

    it("Then there is only that item in the cart", () => {
      const testProduct = {
        ...fullProductDetails,
        id: "test_product_3",
        title: "Flour",
      };

      const { result } = renderComponentWithCart();
      act(() => {
        result.current.addCartItem("nw", testProduct);
      });

      expect(result.current.cart).toEqual({
        nw: {
          test_product_3: {
            product: testProduct,
            quantity: 1,
          },
        },
        pns: {},
        wls: {},
      });
    });
  });
});

describe("Given a user already has items in their cart", () => {
  describe("When they clear their cart", () => {
    it("Then all supermarkets show no items", () => {
      const { result } = renderComponentWithCart(preexistingCart);
      act(() => {
        result.current.clearCart();
      });

      expect(result.current.cart).toEqual({
        nw: {},
        pns: {},
        wls: {},
      });
    });
  });

  describe("When they add a new item to their cart", () => {
    it("Then the item is added to the correct supermarket", () => {
      const { result } = renderComponentWithCart(preexistingCart);
      const testProduct = {
        ...fullProductDetails,
        id: "new_item_1",
        title: "Broccoli",
      };

      act(() => {
        result.current.addCartItem("nw", testProduct);
      });

      const itemInCart = result.current.cart.nw.new_item_1;

      expect(itemInCart).toBeDefined();
      expect(itemInCart.product).toEqual(testProduct);
    });

    it("Then the quantity of the new item is set to 1", () => {
      const { result } = renderComponentWithCart(preexistingCart);
      const testProduct = {
        ...fullProductDetails,
        id: "new_item_2",
        title: "Carrot",
      };

      act(() => {
        result.current.addCartItem("pns", testProduct);
      });

      const itemInCart = result.current.cart.pns.new_item_2;

      expect(itemInCart).toBeDefined();
      expect(itemInCart.product).toEqual(testProduct);
      expect(itemInCart.quantity).toBe(1);
    });
  });

  describe("When they add an item that already exists in their cart", () => {
    it("Then the quantity of the item is increased", () => {
      const { result } = renderComponentWithCart(preexistingCart);

      const existingItem = result.current.cart.nw.nw1;
      expect(existingItem.quantity).toBe(5);

      act(() => {
        result.current.addCartItem("nw", existingItem.product);
      });

      const updatedItem = result.current.cart.nw.nw1;
      expect(updatedItem.quantity).toBe(6);
    });
  });

  describe("When they delete an item from their cart", () => {
    it("Then the item is removed from the correct supermarket", () => {
      const { result } = renderComponentWithCart(preexistingCart);
      expect(result.current.cart.nw.nw1).toBeDefined();

      act(() => {
        result.current.removeCartItem("nw", "nw1");
      });

      expect(result.current.cart.nw.nw1).toBeUndefined();
      expect(result.current.cart.nw).toEqual({});
    });

    it("Then only that item is removed from the cart", () => {
      const { result } = renderComponentWithCart(preexistingCart);
      act(() => {
        result.current.removeCartItem("pns", "pns1");
      });

      expect(result.current.cart).toEqual({
        nw: {
          nw1: {
            product: {
              ...fullProductDetails,
              id: "nw1",
            },
            quantity: 5,
          },
        },
        pns: {
          pns2: {
            product: {
              ...fullProductDetails,
              id: "pns2",
            },
            quantity: 1,
          },
        },
        wls: {},
      });
    });
  });

  describe("When they update the item quantity", () => {
    it("Then the item quantity is updated in the cart", () => {
      const { result } = renderComponentWithCart(preexistingCart);
      act(() => {
        result.current.updateCartItemQuantity("pns", "pns2", 10);
      });

      const updatedItem = result.current.cart.pns.pns2;
      expect(updatedItem.quantity).toBe(10);
    });

    it("Then only that item quantity is updated", () => {
      const { result } = renderComponentWithCart(preexistingCart);
      act(() => {
        result.current.updateCartItemQuantity("pns", "pns1", 3);
      });

      expect(result.current.cart.pns.pns1.quantity).toBe(3);

      expect(result.current.cart).toEqual({
        nw: {
          nw1: {
            product: {
              ...fullProductDetails,
              id: "nw1",
            },
            quantity: 5,
          },
        },
        pns: {
          pns1: {
            product: {
              ...fullProductDetails,
              id: "pns1",
            },
            quantity: 3,
          },
          pns2: {
            product: {
              ...fullProductDetails,
              id: "pns2",
            },
            quantity: 1,
          },
        },
        wls: {},
      });
    });

    it("Then the item is removed if the quantity is set to 0", () => {
      const { result } = renderComponentWithCart(preexistingCart);
      act(() => {
        result.current.updateCartItemQuantity("nw", "nw1", 0);
      });

      const removedItem = result.current.cart.nw.nw1;
      expect(removedItem).toBeUndefined();
      expect(result.current.cart.nw).toEqual({});
    });
  });
});

// ----- BEHIND THE SCENES -----

describe("Given a user has not been to the site before", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("When they visit the site for the first time", () => {
    it("Then an empty cart is loaded up", () => {
      const { result } = renderComponentWithCart(null);
      expect(result.current.cart).toEqual({ nw: {}, pns: {}, wls: {} });
    });

    it("Then an empty cart is saved for next time", () => {
      renderComponentWithCart(null);
      expect(setLocalData).toHaveBeenCalledWith("cart", {
        nw: {},
        pns: {},
        wls: {},
      });
    });
  });
});

describe("Given a user has previously been to the site", () => {
  describe("When they load up the site", () => {
    it("Then their cart is restored to its previous state", () => {
      const { result } = renderComponentWithCart(preexistingCart);
      expect(result.current.cart).toEqual(preexistingCart);
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
      expect(setLocalData).toHaveBeenCalledWith("cart", {
        nw: {},
        pns: {},
        wls: {},
      });

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
