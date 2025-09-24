import { screen } from "@testing-library/react";
import { vi } from "vitest";
import { axe } from "vitest-axe";

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
    it("Then it has no accessibility violations", async () => {
      const { container } = renderWithRouterAndProviders(<Cart />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
    it("Then it displays the back link", () => {
      renderWithRouterAndProviders(<Cart />);

      const backLink = screen.getByRole("button", { name: /back/i });
      expect(backLink).toBeInTheDocument();
    });
    it("Then it displays both the clipboard buttons", () => {
      renderWithRouterAndProviders(<Cart />);

      const clipboardButtons = screen.getAllByRole("button", {
        name: /clipboard/i,
      });
      expect(clipboardButtons[0]).toBeInTheDocument();
      expect(clipboardButtons[1]).toBeInTheDocument();
    });
    it("Then it displays both the empty cart buttons", () => {
      renderWithRouterAndProviders(<Cart />);

      const emptyCartButtons = screen.getAllByRole("button", {
        name: /empty cart/i,
      });
      expect(emptyCartButtons[0]).toBeInTheDocument();
      expect(emptyCartButtons[1]).toBeInTheDocument();
    });
  });
});
