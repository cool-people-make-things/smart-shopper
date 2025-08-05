import { screen } from "@testing-library/react";
import { axe } from "vitest-axe";

import { renderWithRouter } from "@/lib/test/renderWithRouter";

import { CardDetails } from "./CardDetails";

describe("Given the user is looking at an individual products's details", () => {
  describe("When the product is displayed on the home page", () => {
    it("Then the store, product name and price is displayed", () => {
      renderWithRouter(
        <CardDetails
          productTitle="Pams Butter"
          price="3.50"
          store="Woolworths"
        />,
      );

      expect(screen.getByText(/pams butter/i)).toBeInTheDocument();
      expect(screen.getByText(/woolworths/i)).toBeInTheDocument();
      expect(screen.getByText(/3.50/i)).toBeInTheDocument();
    });
  });
  describe("When the product is displayed on the browse page", () => {
    it("The product name and price is displayed", () => {
      renderWithRouter(
        <CardDetails
          productTitle="Pams Butter"
          price="3.50"
          store="Woolworths"
        />,
        { route: "/browse", path: "/browse" },
      );

      expect(screen.queryByText(/woolworths/i)).not.toBeInTheDocument();
      expect(screen.getByText(/pams butter/i)).toBeInTheDocument();
      expect(screen.getByText(/3.50/i)).toBeInTheDocument();
    });
  });
  describe("When the product details are displayed", () => {
    it("Then it has no accessibility violations", async () => {
      const { container } = renderWithRouter(
        <CardDetails
          productTitle="Pams Butter"
          price="3.50"
          store="Woolworths"
        />,
      );

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
