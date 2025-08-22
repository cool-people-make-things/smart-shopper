import { act, renderHook } from "@testing-library/react";
import { expect, vi } from "vitest";

import {
  cartWithSingleItem,
  emptyCart,
  fullCart,
  partialCart,
  partialCart_itemRemoved,
  partialCart_quantityUpdated,
} from "@/lib/test/fixtures/cart";
import {
  nwProduct,
  nwProduct_promoTag,
  pnsProduct,
  pnsProduct_promoTag,
  wlsProduct,
} from "@/lib/test/fixtures/products";

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
      const { result } = renderComponentWithCart();
      act(() => {
        result.current.addCartItem("wls", wlsProduct);
      });

      const itemInCart = result.current.wlsCart["132815"];

      expect(itemInCart).toBeDefined();
      expect(itemInCart.product.title).toBe(
        "v vitalise energy drink 250ml Can 4pack",
      );
    });

    it("Then the quantity of the new item is set to 1", () => {
      const { result } = renderComponentWithCart();
      act(() => {
        result.current.addCartItem("pns", pnsProduct);
      });

      const itemInCart = result.current.pnsCart["5236771"];

      expect(itemInCart).toBeDefined();
      expect(itemInCart.quantity).toBe(1);
    });

    it("Then there is only that item in the cart", () => {
      const { result } = renderComponentWithCart();
      act(() => {
        result.current.addCartItem("nw", nwProduct);
      });

      expect(result.current).toHaveCart(cartWithSingleItem);
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

      expect(result.current).toHaveCart(emptyCart);
    });
  });

  describe("When the user adds a new item to their cart", () => {
    it("Then the item is added to the correct supermarket", () => {
      const { result } = renderComponentWithCart(partialCart);
      act(() => {
        result.current.addCartItem("wls", wlsProduct);
      });

      const itemInCart = result.current.wlsCart["132815"];

      expect(itemInCart).toBeDefined();
      expect(itemInCart.product).toEqual(wlsProduct);
    });

    it("Then the quantity of the new item is set to 1", () => {
      const { result } = renderComponentWithCart(partialCart);
      act(() => {
        result.current.addCartItem("pns", pnsProduct_promoTag);
      });

      const itemInCart = result.current.pnsCart["5011024"];

      expect(itemInCart).toBeDefined();
      expect(itemInCart.product).toEqual(pnsProduct_promoTag);
      expect(itemInCart.quantity).toBe(1);
    });
  });

  describe("When the user adds an item that already exists in their cart", () => {
    it("Then the quantity of the existing item is increased by 1", () => {
      const { result } = renderComponentWithCart(partialCart);

      const existingItem = result.current.nwCart["5039976"];
      expect(existingItem.quantity).toBe(5);

      act(() => {
        result.current.addCartItem("nw", nwProduct_promoTag);
      });

      const updatedItem = result.current.nwCart["5039976"];
      expect(updatedItem.quantity).toBe(6);
    });
  });

  describe("When the user deletes an item from their cart", () => {
    it("Then the item is removed from the correct supermarket", () => {
      const { result } = renderComponentWithCart(partialCart);
      expect(result.current.nwCart["5039976"]).toBeDefined();

      act(() => {
        result.current.removeCartItem("nw", "5039976");
      });

      expect(result.current.nwCart["5039976"]).toBeUndefined();
      expect(result.current.nwCart).toEqual({});
    });

    it("Then only that item is removed from the cart", () => {
      const { result } = renderComponentWithCart(partialCart);
      act(() => {
        result.current.removeCartItem("pns", "5236771");
      });

      expect(result.current).toHaveCart(partialCart_itemRemoved);
    });
  });

  describe("When the user updates the item quantity", () => {
    it("Then the item quantity is updated in the cart", () => {
      const { result } = renderComponentWithCart(partialCart);
      act(() => {
        result.current.updateCartItemQuantity("pns", "5236771", 10);
      });

      const updatedItem = result.current.pnsCart["5236771"];
      expect(updatedItem.quantity).toBe(10);
    });

    it("Then only that item quantity is updated", () => {
      const { result } = renderComponentWithCart(partialCart);
      act(() => {
        result.current.updateCartItemQuantity("pns", "5109655", 300);
      });

      expect(result.current.pnsCart["5109655"].quantity).toBe(300);

      expect(result.current).toHaveCart(partialCart_quantityUpdated);
    });
  });

  describe("When the user sets the item quantity to 0", () => {
    it("Then the item is removed", () => {
      const { result } = renderComponentWithCart(partialCart);
      act(() => {
        result.current.updateCartItemQuantity("nw", "5039976", 0);
      });

      const removedItem = result.current.nwCart["5039976"];
      expect(removedItem).toBeUndefined();
      expect(result.current.nwCart).toEqual({});
    });

    it("Then only that item is removed from the cart", () => {
      const { result } = renderComponentWithCart(partialCart);
      act(() => {
        result.current.updateCartItemQuantity("pns", "5236771", 0);
      });

      expect(result.current).toHaveCart(partialCart_itemRemoved);
    });
  });
});

describe("Given a user attempts to interact with a faulty item", () => {
  describe("When the user adds an empty item to the cart", () => {
    it("Then no item is added", () => {
      const { result } = renderComponentWithCart();
      act(() => {
        result.current.addCartItem("nw", {} as Product);
      });

      expect(result.current).toHaveCart(emptyCart);
    });

    it("Then the cart itself remains unchanged", () => {
      const { result } = renderComponentWithCart(fullCart);
      const startingCart = result.current.wlsCart;

      act(() => {
        result.current.addCartItem("wls", {} as Product);
      });

      expect(result.current.wlsCart).toBe(startingCart);
    });

    it.todo("Then error info is shown to the user");
  });

  describe("When the user removes a non-existent item from the cart", () => {
    it("Then no item is removed", () => {
      const { result } = renderComponentWithCart(fullCart);
      act(() => {
        result.current.removeCartItem("pns", "9999999");
      });

      expect(result.current).toHaveCart(fullCart);
    });

    it("Then the cart itself remains unchanged", () => {
      const { result } = renderComponentWithCart(fullCart);
      const startingCart = result.current.nwCart;

      act(() => {
        result.current.removeCartItem("nw", "9999999");
      });

      expect(result.current.nwCart).toBe(startingCart);
    });

    it.todo("Then error info is shown to the user");
  });

  describe("When the user updates a non-existent item's quantity", () => {
    it("Then the cart items are not updated", () => {
      const { result } = renderComponentWithCart(fullCart);
      act(() => {
        result.current.updateCartItemQuantity("wls", "9999999", 5);
      });

      expect(result.current).toHaveCart(fullCart);
    });

    it("Then the cart itself remains unchanged", () => {
      const { result } = renderComponentWithCart(fullCart);
      const startingCart = result.current.pnsCart;

      act(() => {
        result.current.updateCartItemQuantity("pns", "9999999", 5);
      });

      expect(result.current.pnsCart).toBe(startingCart);
    });

    it.todo("Then error info is shown to the user");
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
      expect(result.current).toHaveCart(emptyCart);
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
      expect(result.current).toHaveCart(fullCart);
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
        result.current.addCartItem("nw", nwProduct);
      });

      expect(setLocalData).toHaveBeenCalledTimes(2);
      expect(setLocalData).toHaveBeenCalledWith("cart", cartWithSingleItem);
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
