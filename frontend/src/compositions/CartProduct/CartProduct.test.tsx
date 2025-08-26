import { describe, expect, it } from "vitest";
import { axe } from "vitest-axe";

import { nwProduct } from "@/lib/test/fixtures/products";
import { renderWithRouter } from "@/lib/test/renderWithRouter";

import { CartProduct } from "./CartProduct";

const mockProduct = {
  quantity: 17,
  product: nwProduct,
};

describe("Given the user is looking at the cart page", () => {
  describe("When the user is looking at an individual product", () => {
    it("Then it has no accessibility violations", async () => {
      const { container } = renderWithRouter(
        <CartProduct cartProductItem={mockProduct} />,
      );
      const results = await axe(container, {
        rules: {
          "color-contrast": { enabled: false },
        },
      });
      expect(results).toHaveNoViolations();
    });
  });
  describe("When the cart has grocery items", () => {
    it.todo("Then it displays the product details and actions");
  });
});
