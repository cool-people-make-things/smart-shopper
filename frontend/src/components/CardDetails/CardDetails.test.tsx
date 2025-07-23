import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { axe } from "vitest-axe";
import { MemoryRouter } from "react-router";

import { CardDetails } from "./CardDetails";

describe("Given a user is looking at an individual product's details", () => {
  describe("When the product is displayed on the home page", () => {
    it("Then the store, product name and price is displayed", () => {
      render(
        <MemoryRouter initialEntries={["/"]}>
          <CardDetails productTitle="Pams Butter" price="3.50" store="Woolworths" />
        </MemoryRouter>,
      );
      expect(screen.getByText(/pams butter/i)).toBeInTheDocument();
    });

    describe("When the product is displayed on the browse page", () => {
      it("The the product name and price is displayed", () => {
        render(
          <MemoryRouter initialEntries={["/browse"]}>
            <CardDetails productTitle="Pams Butter" price="3.50" store="Woolworths" />
          </MemoryRouter>,
        );
        expect(screen.queryByText(/woolworths/i)).not.toBeInTheDocument();
      });
    });

    describe("When the product details are displayed", () => {
      it("Then it has no accessibility violations", async () => {
        const { container } = render(
          <MemoryRouter initialEntries={["/"]}>
            <CardDetails productTitle="Pams Butter" price="3.50" store="Woolworths" />,
          </MemoryRouter>,
        );
        const results = await axe(container);
        expect(results).toHaveNoViolations();
      });
    });
  });
});
