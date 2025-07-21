import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { axe } from "vitest-axe";

import { Cart } from "./Cart";

describe("Given the user is looking at the cart page", () => {
  describe("When the cart page is rendered", () => {
    it("Then it displays the back link", () => {
      render(<Cart />);
    });
    it("Then it has no accessibility violations", async () => {
      const { container } = render(<Cart />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
  describe("When the cart has grocery items", () => {
    it("Then it displays the grocery lists and total spend", () => {
      render(<Cart />);

      expect(screen.getByText(/shopping list new world/i)).toBeInTheDocument();
      expect(screen.getByText(/shopping list woolworths/i)).toBeInTheDocument();
      expect(screen.getByText(/shopping list pak'n'save/i)).toBeInTheDocument();

      expect(screen.getByText(/total spend/i)).toBeInTheDocument();
      expect(screen.getByText(/\$168\.90/)).toBeInTheDocument();
    });
  });
});
