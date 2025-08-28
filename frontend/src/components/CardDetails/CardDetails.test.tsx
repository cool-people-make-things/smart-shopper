import { screen } from "@testing-library/react";
import { axe } from "vitest-axe";

import { renderWithRouterAndProviders } from "@/lib/test/test-utils";

import { CardDetails } from "./CardDetails";

const mockProps = {
  productTitle: "Pams Butter",
  price: "3.50",
  promo: null,
  shopCode: "wls" as ShopCode,
};

describe("Given the user is looking at an individual products's details", () => {
  describe("When the product is displayed on the home page", () => {
    it("Then the store, product name and price is displayed", () => {
      renderWithRouterAndProviders(<CardDetails {...mockProps} />);

      expect(screen.getByText(/pams butter/i)).toBeInTheDocument();
      expect(screen.getByText(/woolworths/i)).toBeInTheDocument();
      expect(screen.getByText("$3.50")).toBeInTheDocument();
    });
  });

  describe("When the product is displayed on the browse page", () => {
    it("Then product name and price is displayed", () => {
      renderWithRouterAndProviders(<CardDetails {...mockProps} />, {
        route: "/browse",
      });

      expect(screen.queryByText(/woolworths/i)).not.toBeInTheDocument();
      expect(screen.getByText(/pams butter/i)).toBeInTheDocument();
      expect(screen.getByText("$3.50")).toBeInTheDocument();
    });
  });

  describe("When the button is rendered", () => {
    it("Then the text add to cart is displayed", async () => {
      renderWithRouterAndProviders(<CardDetails {...mockProps} />);

      const button = screen.getByRole("button");
      expect(button).toHaveTextContent(/add to cart/i);
    });

    it.todo("Then it adds item to cart");
  });

  describe("When the product details are displayed", () => {
    it("Then it has no accessibility violations", async () => {
      const { container } = renderWithRouterAndProviders(
        <CardDetails {...mockProps} />,
      );

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
