import { screen } from "@testing-library/react";
import { vi } from "vitest";
import { axe } from "vitest-axe";

import { nwProduct } from "@/lib/test/fixtures/products";
import { renderWithRouterAndProviders } from "@/lib/test/test-utils";

import { Card } from "./Card";

vi.mock("../CardDetails", () => ({
  CardDetails: () => <div data-testid="card-details">Mocked CardDetails</div>,
}));

describe("Given a user is on the home page", () => {
  describe("When the Card component is rendered", () => {
    it("Then the user sees the correct image", () => {
      renderWithRouterAndProviders(<Card product={nwProduct} />);

      const image = screen.getByAltText(
        /Chia Sisters Gut Lemon & Golden Kiwifruit Sparkling Drink 250ml/i,
      );

      expect(image).toHaveAttribute(
        "src",
        "https://a.fsimg.co.nz/product/retail/fan/image/400x400/5331318.png?w=384",
      );
      expect(
        screen.getByAltText(
          /Chia Sisters Gut Lemon & Golden Kiwifruit Sparkling Drink 250ml/i,
        ),
      ).toBeInTheDocument();
    });

    it("Then it renders the carddetails component", () => {
      renderWithRouterAndProviders(<Card product={nwProduct} />);

      expect(screen.getByTestId("card-details")).toBeInTheDocument();
    });

    it("Then it has no accessibility violations", async () => {
      const { container } = renderWithRouterAndProviders(
        <Card product={nwProduct} />,
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
