import { screen } from "@testing-library/react";
import { vi } from "vitest";
import { axe } from "vitest-axe";

import { renderWithRouterAndProviders } from "@/lib/test/renderWithRouterAndProviders";

import { Featured } from "./Featured";

vi.mock("@/components/Card", () => ({
  Card: () => <div data-testid="product-card">Mocked Card</div>,
}));

describe("Given a user has gone to the home page", () => {
  describe("When the Featured component is rendered", () => {
    it("Then it displays the title", () => {
      renderWithRouterAndProviders(<Featured />);

      const subheading = screen.getByRole("heading", { level: 2 });

      expect(subheading).toBeInTheDocument();
      expect(subheading).toHaveTextContent(/featured items/i);
    });

    it("Then it renders three product cards", () => {
      renderWithRouterAndProviders(<Featured />);
      expect(screen.getAllByTestId("product-card")).toHaveLength(3);
    });

    it("Then it has no accessibility violations", async () => {
      const { container } = renderWithRouterAndProviders(<Featured />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
