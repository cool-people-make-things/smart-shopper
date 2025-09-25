import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { axe } from "vitest-axe";

import {
  pnsProduct,
  pnsProductMultibuy,
  pnsProductPromoWithLimit,
} from "@/lib/test/fixtures/products";
import { renderWithRouterAndProviders } from "@/lib/test/test-utils";

import { CartProduct } from "./CartProduct";

const mockProduct = {
  quantity: 17,
  product: pnsProduct,
};

const mockProductWithLimit = {
  quantity: 3,
  product: pnsProductPromoWithLimit,
};

const mockProductMultibuy = {
  quantity: 12,
  product: pnsProductMultibuy,
};

describe("Given the user is looking at the cart page", () => {
  describe("When the user is looking at an individual product", () => {
    it("Then it has no accessibility violations", async () => {
      const { container } = renderWithRouterAndProviders(
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
    it("Then it displays the product image", () => {
      renderWithRouterAndProviders(
        <CartProduct cartProductItem={mockProduct} />,
      );
      expect(
        screen.getByAltText(
          /Flying Goose Original Sriracha Hot Chilli Sauce 455ml/i,
        ),
      ).toBeInTheDocument();
    });

    it("Then it displays the product title", () => {
      renderWithRouterAndProviders(
        <CartProduct cartProductItem={mockProduct} />,
      );
      expect(
        screen.getByText(
          /Flying Goose Original Sriracha Hot Chilli Sauce 455ml/i,
        ),
      ).toBeInTheDocument();
    });

    it("Then it displays the product price", () => {
      renderWithRouterAndProviders(
        <CartProduct cartProductItem={mockProduct} />,
      );
      expect(screen.getByText("$8.49")).toBeInTheDocument();
    });

    it("Then it displays multibuy information", () => {
      renderWithRouterAndProviders(
        <CartProduct cartProductItem={mockProductMultibuy} />,
      );
      expect(screen.getByText(/for/i)).toBeInTheDocument();
      expect(screen.getByText(/4/i)).toBeInTheDocument();
    });

    it("Then it displays limit information", () => {
      renderWithRouterAndProviders(
        <CartProduct cartProductItem={mockProductWithLimit} />,
      );
      expect(screen.getByText(/limit/i)).toBeInTheDocument();
    });

    it("Then it displays the cart product actions", () => {
      renderWithRouterAndProviders(
        <CartProduct cartProductItem={mockProduct} />,
      );
      expect(screen.getByTestId("cart-product-actions")).toBeInTheDocument();
    });
  });
});
