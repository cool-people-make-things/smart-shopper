import { describe, expect, it } from "vitest";
import { axe } from "vitest-axe";

import { renderWithRouter } from "@/lib/test/renderWithRouter";

import { CartProduct } from "./CartProduct";

const mockProduct = {
  quantity: 2,
  product: {
    id: "5263014",
    title: "Pams Buttery Spread 500g",
    image:
      "https://a.fsimg.co.nz/product/retail/fan/image/400x400/5263014.png?w=384",
    productPageUrl: "/shop/product/5263014_ea_000nw?name=pams-buttery-spread",
    price: {
      value: "4.29",
      per: "ea",
      unitPrice: "0.86",
      unit: "100g",
    },
    promo: {
      tag: "",
      value: "3.39",
      per: "ea",
      unitPrice: "0.68",
      unit: "100g",
    },
  },
} as CartItem;

describe("Given the user is looking at the cart page", () => {
  describe("When the cart product component is rendered", () => {
    it("Then it has no accessibility violations", async () => {
      const { container } = renderWithRouter(
        <CartProduct item={mockProduct} />,
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
