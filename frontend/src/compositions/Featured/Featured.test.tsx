import { screen } from "@testing-library/react";
import { axe } from "vitest-axe";

import { renderWithRouter } from "@/lib/test/renderWithRouter";

import { Featured } from "./Featured";

describe("Given a user has gone to the home page", () => {
  describe("When the Featured component is rendered", () => {
    it("Then it displays the correct title", () => {
      renderWithRouter(<Featured />);

      const subheading = screen.getByRole("heading", { level: 2 });

      expect(subheading).toBeInTheDocument();
      expect(subheading).toHaveTextContent(/featured items/i);
    });

    it("Then it renders three product cards", () => {
      renderWithRouter(<Featured />);

      expect(screen.getAllByTestId("product-card")).toHaveLength(3);
    });

    it("has no accessibility violations", async () => {
      const { container } = renderWithRouter(<Featured />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
