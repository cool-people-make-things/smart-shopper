import { screen } from "@testing-library/react";
import { axe } from "vitest-axe";

import { renderWithRouter } from "@/lib/test/renderWithRouter";

import { Browse } from "./Browse";

describe("Given a user has gone to the browse page", () => {
  describe("When the browse page is rendered", () => {
    it("Then it displays 3 supermarket product grids", () => {
      renderWithRouter(<Browse />);
      const productGrids = screen.getAllByTestId("product-grid");
      expect(productGrids).toHaveLength(3);
    });

    it.todo(
      "Then it displays the correct supermarkets products in its given product grid",
    );

    it.todo(
      "Then it displays a message when there are no results acros the three sites",
    );

    it.todo(
      "Then it displays a message when individual supermarket has an error",
    );

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
