import { screen } from "@testing-library/react";
import { vi } from "vitest";
import { axe } from "vitest-axe";

import { renderWithRouter } from "@/lib/test/renderWithRouter";

import { ProductColumn } from "./ProductColumn";

import nwData from "../../../../backend/app/assets/data/nw_actual.json";

const mockData = { data: nwData, store: "New World" };

vi.mock("../Card", () => ({
  Card: () => <div data-testid="card-component">Mocked Card</div>,
}));

describe("Given a user is looking at an individual supermarkets product column ", () => {
  describe("When the grid of products in displayed on the browse page", () => {
    it("Then the heading displays the correct supermarket", () => {
      renderWithRouter(<ProductColumn {...mockData} />);

      const heading = screen.getByRole("heading", { level: 2 });
      expect(heading).toBeInTheDocument();
      expect(heading).toHaveTextContent(/new world/i);
    });
    it("Then the correct number of product cards are displayed", () => {
      renderWithRouter(<ProductColumn {...mockData} />);

      const supermarketProducts = screen.getAllByTestId("card-component");
      expect(supermarketProducts).toHaveLength(4);
    });
    it("Then it displays the items in a 2 column grid", () => {
      renderWithRouter(<ProductColumn {...mockData} />);

      const productGridDiv = screen.getByTestId("product-grid");
      expect(productGridDiv).toHaveClass("grid grid-cols-2");
    });
    it("Then it has no accessibility violations", async () => {
      const { container } = renderWithRouter(<ProductColumn {...mockData} />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
