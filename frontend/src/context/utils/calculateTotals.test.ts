import {
  emptyCart_costs,
  fullCart_costs,
  fullCart_multibuy_costs,
  fullCart_simple_costs,
  fullCart_specials_costs,
} from "@/lib/test/fixtures/calculatedCosts";
import {
  cartWithSingleItem,
  fullCart,
  fullCart_multibuy,
  fullCart_simple,
  fullCart_specials,
  partialCart,
} from "@/lib/test/fixtures/cart";

import { calculateTotals } from "./calculateTotals";

describe("Given the user has an empty cart", () => {
  describe("When calculating total prices", () => {
    it("Then all totals should be 0", () => {
      const result = calculateTotals({}, {}, {});
      expect(result).toEqual(emptyCart_costs);
    });
  });
});

describe("Given the user has a cart with items", () => {
  describe("When calculating the price of a single product", () => {
    const { nw, pns, wls } = cartWithSingleItem;
    const result = calculateTotals(nw, pns, wls);

    it("Then the total for that supermarket should be correct", () => {
      expect(result.nw).toEqual("5.59");
    });

    it("Then all other supermarkets should be 0.00", () => {
      expect(result.pns).toEqual("0.00");
      expect(result.wls).toEqual("0.00");
    });

    it("Then the total for the cart should be only the price of that item", () => {
      expect(result.total).toEqual("5.59");
    });
  });

  describe("When the price of products is returned", () => {
    const { nw, pns, wls } = partialCart;
    const result = calculateTotals(nw, pns, wls);

    it("Then all totals should have two decimal places", () => {
      expect(result.nw).toMatch(/^\d+\.\d{2}$/);
      expect(result.pns).toMatch(/^\d+\.\d{2}$/);
      expect(result.wls).toMatch(/^\d+\.\d{2}$/);
      expect(result.total).toMatch(/^\d+\.\d{2}$/);
    });
  });

  describe("When the price of simple products are calculated", () => {
    it("Then the total should be calculated from the item prices", () => {
      const { nw, pns, wls } = fullCart_simple;
      const result = calculateTotals(nw, pns, wls);

      expect(result).toEqual(fullCart_simple_costs);
    });
  });

  describe("When the price of special products are calculated", () => {
    it("Then the total should be calculated from the promo prices", () => {
      const { nw, pns, wls } = fullCart_specials;
      const result = calculateTotals(nw, pns, wls);

      expect(result).toEqual(fullCart_specials_costs);
    });
  });

  describe("When the price of a cart with multibuy products is calculated", () => {
    it("Then the total should take account of multibuy discounts", () => {
      const { nw, pns, wls } = fullCart_multibuy;
      const result = calculateTotals(nw, pns, wls);

      expect(result).toEqual(fullCart_multibuy_costs);
    });
  });

  describe("When the price of a cart with all product types is calculated", () => {
    it("Then the total should be calculated correctly", () => {
      const { nw, pns, wls } = fullCart;
      const result = calculateTotals(nw, pns, wls);

      expect(result).toEqual(fullCart_costs);
    });
  });
});
