import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { axe } from "vitest-axe";

import { renderWithRouterAndProviders } from "@/lib/test/test-utils";

import { Cart } from "./Cart";

describe("Given the user is looking at the cart page", () => {
  describe("When the cart page is rendered", () => {
    it("Then it displays the back link", () => {
      renderWithRouterAndProviders(<Cart />);
    });
    it("Then it has no accessibility violations", async () => {
      const { container } = renderWithRouterAndProviders(<Cart />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
  describe("When the cart has no grocery items", () => {
    it("Then it displays the empty lists and total spend of $0.00", () => {
      renderWithRouterAndProviders(<Cart />);

      expect(screen.getByText(/new world/i)).toBeInTheDocument();
      expect(screen.getByText(/woolworths/i)).toBeInTheDocument();
      expect(screen.getByText(/pak'nsave/i)).toBeInTheDocument();

      expect(screen.getByTestId("total-spend")).toHaveTextContent("$0.00");
    });
  });
});
