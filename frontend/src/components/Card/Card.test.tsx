import { screen } from "@testing-library/react";
import { vi } from "vitest";
import { axe } from "vitest-axe";

import { renderWithRouterAndProviders } from "@/lib/test/test-utils";

import { Card } from "./Card";

vi.mock("../CardDetails", () => ({
  CardDetails: () => <div data-testid="card-details">Mocked CardDetails</div>,
}));

const mockProduct = {
  imgSrc:
    "https://a.fsimg.co.nz/product/retail/fan/image/400x400/5023660.png?w=384",
  productTitle: "Pams Butter",
  price: "8.45",
  promo: null,
  shopCode: "nw" as ShopCode,
};

describe("Given a user is on the home page", () => {
  describe("When the Card component is rendered", () => {
    it("Then the user see's the correct image", () => {
      renderWithRouterAndProviders(<Card {...mockProduct} />);

      const image = screen.getByAltText(/pams butter/i);

      expect(image).toHaveAttribute(
        "src",
        "https://a.fsimg.co.nz/product/retail/fan/image/400x400/5023660.png?w=384",
      );
      expect(screen.getByAltText(/pams butter/i)).toBeInTheDocument();
    });

    it("Then it renders the carddetails component", () => {
      renderWithRouterAndProviders(<Card {...mockProduct} />);

      expect(screen.getByTestId("card-details")).toBeInTheDocument();
    });

    it("Then it has no accessibility violations", async () => {
      const { container } = renderWithRouterAndProviders(
        <Card {...mockProduct} />,
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
