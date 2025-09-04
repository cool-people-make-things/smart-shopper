import { screen } from "@testing-library/react";
import { vi } from "vitest";
import { axe } from "vitest-axe";

import {
  mockEmptyMarketResult,
  mockErrorMarketResult,
  mockLoadingMarketResult,
  mockMarketResult,
} from "@/lib/test/fixtures/marketResult";
import { renderWithRouterAndProviders } from "@/lib/test/test-utils";

import { ProductColumnWithErrorBoundary } from "./ProductColumn";

vi.mock("@/components/Card", () => ({
  Card: () => <div data-testid="mock-card-component">Mocked Card</div>,
}));

vi.mock("@/elements/LoadingIndicator", () => ({
  LoadingIndicator: () => (
    <div data-testid="mock-loading-indicator">Mocked LoadingIndicator</div>
  ),
}));

vi.mock("@/components/Fallback", () => ({
  Fallback: () => (
    <div data-testid="mock-fallback-component">Fallback Component</div>
  ),
}));

describe("Given a user is looking at an individual supermarkets product column", () => {
  describe("When the product grid is displayed in the supermarket column", () => {
    it("Then the heading of the column is the supermarket name", () => {
      renderWithRouterAndProviders(
        <ProductColumnWithErrorBoundary {...mockMarketResult} />,
      );

      const heading = screen.getByRole("heading", { level: 2 });
      expect(heading).toBeInTheDocument();
      expect(heading).toHaveTextContent(/new world/i);
    });

    it("Then all the product cards for that supermarket are displayed", () => {
      renderWithRouterAndProviders(
        <ProductColumnWithErrorBoundary {...mockMarketResult} />,
      );

      const supermarketProducts = screen.getAllByTestId("mock-card-component");
      expect(supermarketProducts).toHaveLength(11);
    });

    it("Then it displays the product cards in a 2 column grid", () => {
      renderWithRouterAndProviders(
        <ProductColumnWithErrorBoundary {...mockMarketResult} />,
      );

      const productGridDiv = screen.getByTestId("product-grid");
      expect(productGridDiv).toHaveClass("grid grid-cols-2");
    });

    it("Then it has no accessibility violations", async () => {
      const { container } = renderWithRouterAndProviders(
        <ProductColumnWithErrorBoundary {...mockMarketResult} />,
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe("When the product result request is succesful but there are no product results to display", () => {
    it("Then the user sees a 'no products' message", () => {
      renderWithRouterAndProviders(
        <ProductColumnWithErrorBoundary {...mockEmptyMarketResult} />,
      );
      expect(
        screen.getByText(/No product results to display/i),
      ).toBeInTheDocument();
    });
  });

  describe("When the product column is loading", () => {
    it("Then the loading indicator is displayed", () => {
      const mockLoadingResult = { ...mockLoadingMarketResult };
      renderWithRouterAndProviders(
        <ProductColumnWithErrorBoundary {...mockLoadingResult} />,
      );
      expect(screen.getByTestId("mock-loading-indicator")).toBeInTheDocument();
    });
  });

  describe("When the product result request failed", () => {
    it("Then the user sees the fallback UI", () => {
      renderWithRouterAndProviders(
        <ProductColumnWithErrorBoundary {...mockErrorMarketResult} />,
      );
      expect(screen.getByText(/Fallback component/i)).toBeInTheDocument();
    });
  });
});
