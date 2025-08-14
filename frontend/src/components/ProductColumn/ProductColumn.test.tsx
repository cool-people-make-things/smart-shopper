import { screen } from "@testing-library/react";
import { vi } from "vitest";
import { axe } from "vitest-axe";

import nwData from "@/lib/test/fixtures/nw_actual.json";
import { renderWithRouter } from "@/lib/test/renderWithRouter";

import { ProductColumn } from "./ProductColumn";

const mockData = { data: nwData as Product[], store: "New World" };

vi.mock("../Card", () => ({
  Card: () => <div data-testid="card-component">Mocked Card</div>,
}));

describe("Given a user is looking at an individual supermarkets product column ", () => {
  describe("When the product grid is displayed in the supermarket column", () => {
    it("Then the heading of the column is the supermarket name", () => {
      renderWithRouter(<ProductColumn {...mockData} />);

      const heading = screen.getByRole("heading", { level: 2 });
      expect(heading).toBeInTheDocument();
      expect(heading).toHaveTextContent(/new world/i);
    });
    it("Then all the product cards for that supermarket are displayed", () => {
      renderWithRouter(<ProductColumn {...mockData} />);

      const supermarketProducts = screen.getAllByTestId("card-component");
      expect(supermarketProducts).toHaveLength(11);
    });
    it("Then it displays the product cards in a 2 column grid", () => {
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
  describe("When there are no product results to display", () => {
    it("Then a user sees a no products message", () => {
      renderWithRouter(<ProductColumn data={[]} store="New World" />);
      expect(screen.getByText(/No products/i)).toBeInTheDocument();
    });
  });
});
