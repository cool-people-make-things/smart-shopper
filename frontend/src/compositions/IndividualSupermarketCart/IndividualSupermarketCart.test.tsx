import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { axe } from "vitest-axe";

import { renderWithRouter } from "@/lib/test/renderWithRouter";

import { IndividualSupermarketCart } from "./IndividualSupermarketCart";

describe("Given the user is looking at the cart page", () => {
  describe("When the individual supermarket cart component is rendered", () => {
    it("Then it has no accessibility violations", async () => {
      const { container } = renderWithRouter(
        <IndividualSupermarketCart shopCode="nw" />,
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
  describe("When the cart has no grocery items", () => {
    it("Then it displays the empty list and supermarket spend of $0.00", () => {
      renderWithRouter(<IndividualSupermarketCart shopCode="nw" />);

      expect(screen.getByText(/new world/i)).toBeInTheDocument();
      expect(screen.getByTestId("supermarket-spend")).toHaveTextContent(
        "$0.00",
      );

      expect(screen.queryByText(/quantity/i)).not.toBeInTheDocument();
      expect(screen.queryByRole("img")).not.toBeInTheDocument();
    });
  });
});
