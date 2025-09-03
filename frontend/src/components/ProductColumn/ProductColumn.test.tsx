import { screen } from "@testing-library/react";
import { vi } from "vitest";
import { axe } from "vitest-axe";

import {
  mockEmptyMarketResult,
  mockLoadingMarketResult,
  mockMarketResult,
} from "@/lib/test/fixtures/marketResult";
import { renderWithRouterAndProviders } from "@/lib/test/test-utils";

import { ProductColumn } from "./ProductColumn";

vi.mock("@/components/Card", () => ({
  Card: () => <div data-testid="card-component">Mocked Card</div>,
}));

vi.mock("@/elements/LoadingIndicator", () => ({
  LoadingIndicator: () => (
    <div data-testid="loading-indicator">Mocked LoadingIndicator</div>
  ),
}));

describe("Given a user is looking at an individual supermarkets product column ", () => {
  describe("When the product grid is displayed in the supermarket column", () => {
    it("Then the heading of the column is the supermarket name", () => {
      renderWithRouterAndProviders(<ProductColumn {...mockMarketResult} />);

      const heading = screen.getByRole("heading", { level: 2 });
      expect(heading).toBeInTheDocument();
      expect(heading).toHaveTextContent(/new world/i);
    });
    it("Then all the product cards for that supermarket are displayed", () => {
      renderWithRouterAndProviders(<ProductColumn {...mockMarketResult} />);

      const supermarketProducts = screen.getAllByTestId("card-component");
      expect(supermarketProducts).toHaveLength(11);
    });
    it("Then it displays the product cards in a 2 column grid", () => {
      renderWithRouterAndProviders(<ProductColumn {...mockMarketResult} />);

      const productGridDiv = screen.getByTestId("product-grid");
      expect(productGridDiv).toHaveClass("grid grid-cols-2");
    });
    it("Then it has no accessibility violations", async () => {
      const { container } = renderWithRouterAndProviders(
        <ProductColumn {...mockMarketResult} />,
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
  describe("When there are no product results to display", () => {
    it("Then a user sees a no products message", () => {
      renderWithRouterAndProviders(
        <ProductColumn {...mockEmptyMarketResult} />,
      );
      expect(
        screen.getByText(/No product results to display/i),
      ).toBeInTheDocument();
    });
  });

  describe("When the product column is loading", () => {
    it("Then the loading indicator is displayed", () => {
      const mockLoadingResult = { ...mockLoadingMarketResult };
      renderWithRouterAndProviders(<ProductColumn {...mockLoadingResult} />);
      expect(screen.getByTestId("loading-indicator")).toBeInTheDocument();
    });
  });
});
