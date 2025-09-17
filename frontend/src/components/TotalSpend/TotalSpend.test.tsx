import { screen } from "@testing-library/react";
import { axe } from "vitest-axe";

import { renderWithRouterAndProviders } from "@/lib/test/test-utils";

import { TotalSpend } from "./TotalSpend";

describe("Given the user is looking at the total spend of all their cart items", () => {
  describe("When the total spend amount is displayed", () => {
    it("Then it has no accessibility violations", async () => {
      const { container } = renderWithRouterAndProviders(
        <TotalSpend total="0.00" />,
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it("Then it displays the correct heading", () => {
      renderWithRouterAndProviders(<TotalSpend total="0.00" />);

      const totalSpendHeading = screen.getByTestId("total-spend");
      expect(totalSpendHeading).toHaveTextContent(/total spend/i);
    });
  });

  describe("When the total spend is displayed", () => {
    it("Then it displays the accurate total spend amount for all items in the users cart", () => {
      renderWithRouterAndProviders(<TotalSpend total="1005560.56" />);

      const totalCost = screen.getByTestId("total-spend");
      expect(totalCost).toHaveTextContent(/1005560.56/);
    });
    it("Then it displays total spend of $0.00 when there are no items", () => {
      renderWithRouterAndProviders(<TotalSpend total="0.00" />);

      const totalCost = screen.getByTestId("total-spend");
      expect(totalCost).toHaveTextContent(/0.00/);
    });
  });
});
