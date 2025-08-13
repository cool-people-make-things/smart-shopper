import { screen } from "@testing-library/react";
import { vi } from "vitest";
import { axe } from "vitest-axe";

import { renderWithRouter } from "@/lib/test/renderWithRouter";

import { Browse } from "./Browse";

vi.mock("@/components/ProductColumn", () => ({
  ProductColumn: () => (
    <div data-testid="supermarket-container">Mocked ProductColumn</div>
  ),
}));

describe("Given a user is on to the browse page", () => {
  describe("When the browse page is rendered", () => {
    it("Then it displays 3 supermarket product grids", async () => {
      renderWithRouter(<Browse />);
      const supermarketContainer = screen.getAllByTestId(
        "supermarket-container",
      );
      expect(supermarketContainer).toHaveLength(3);
    });

    it("Then it has no accessibility violations", async () => {
      const { container } = renderWithRouter(<Browse />);
      const results = await axe(container, {
        rules: {
          "color-contrast": { enabled: false },
        },
      });
      expect(results).toHaveNoViolations();
    });
  });
});
