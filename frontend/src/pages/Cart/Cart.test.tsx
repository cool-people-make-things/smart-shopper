import { screen } from "@testing-library/react";
import { type Mock, vi } from "vitest";
import { axe } from "vitest-axe";

import { useCart } from "@/context/CartContext";
import { renderWithRouterAndProviders } from "@/lib/test/test-utils";

import { Cart } from "./Cart";

vi.mock("@/context/CartContext", async () => {
  const actual = await vi.importActual("@/context/CartContext");

  return {
    ...actual,
    useCart: vi.fn(() => ({
      cartCosts: { total: 0 },
    })),
  };
});

describe("Given the user is looking at the cart page", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  describe("When the cart page is rendered", () => {
    it("Then it displays the back link", () => {
      renderWithRouterAndProviders(<Cart />);
    });
    it("Then it has no accessibility violations", async () => {
      const { container } = renderWithRouterAndProviders(<Cart />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
    it("Then it displays the correct heading", () => {
      renderWithRouterAndProviders(<Cart />);

      const totalSpendHeading = screen.getByRole("heading", { level: 3 });
      expect(totalSpendHeading).toHaveTextContent("Total Spend");
    });
  });

  describe("When the total spend is displayed", () => {
    it("Then it displays the total spend", () => {
      (useCart as Mock).mockReturnValue({
        cartCosts: { total: "1005560.56" },
      });
      renderWithRouterAndProviders(<Cart />);

      expect(screen.getByText(/new world/i)).toBeInTheDocument();
      expect(screen.getByText(/woolworths/i)).toBeInTheDocument();
      expect(screen.getByText(/pak'nsave/i)).toBeInTheDocument();

      const totalCost = screen.getByTestId("total-spend");
      expect(totalCost).toHaveTextContent("$1005560.56");
    });
    it("Then it displays total spend of $0.00 when there are no items", () => {
      (useCart as Mock).mockReturnValue({
        cartCosts: { total: "0.00" },
      });
      renderWithRouterAndProviders(<Cart />);

      expect(screen.getByText(/new world/i)).toBeInTheDocument();
      expect(screen.getByText(/woolworths/i)).toBeInTheDocument();
      expect(screen.getByText(/pak'nsave/i)).toBeInTheDocument();

      expect(screen.queryByText(/quantity/i)).not.toBeInTheDocument();

      const totalCost = screen.getByTestId("total-spend");
      expect(totalCost).toHaveTextContent("$0.00");
    });
  });
});
