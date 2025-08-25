import { describe, expect, it } from "vitest";
import { axe } from "vitest-axe";

import mockProduct from "@/lib/test/fixtures/cart_item.json";
import { renderWithRouter } from "@/lib/test/renderWithRouter";

import { CartProduct } from "./CartProduct";

describe("Given the user is looking at the cart page", () => {
  describe("When the user is looking at an individual product", () => {
    it("Then it has no accessibility violations", async () => {
      const { container } = renderWithRouter(
        <CartProduct cartProductItem={mockProduct as CartItem} />,
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
