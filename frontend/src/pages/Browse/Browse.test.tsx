import { screen } from "@testing-library/react";
import { vi } from "vitest";
import { axe } from "vitest-axe";

import { renderWithRouterAndProviders } from "@/lib/test/test-utils";

import { Browse } from "./Browse";

vi.mock("@/components/ProductColumn", () => ({
  ProductColumn: () => (
    <div data-testid="supermarket-container">Mocked ProductColumn</div>
  ),
}));

describe("Given a user is on to the browse page", () => {
  describe("When the browse page is rendered", () => {
    it("Then it displays 3 supermarket product grids", async () => {
      renderWithRouterAndProviders(<Browse />);
      const supermarketContainer = screen.getAllByTestId(
        "supermarket-container",
      );
      expect(supermarketContainer).toHaveLength(3);
    });

    it("Then it has no accessibility violations", async () => {
      const { container } = renderWithRouterAndProviders(<Browse />);
      const results = await axe(container, {
        rules: {
          "color-contrast": { enabled: false },
        },
      });
      expect(results).toHaveNoViolations();
    });
  });
});
