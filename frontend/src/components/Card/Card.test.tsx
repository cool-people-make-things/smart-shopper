import { screen } from "@testing-library/react";
import { vi } from "vitest";
import { axe } from "vitest-axe";

import { renderWithRouter } from "@/lib/test/renderWithRouter";

import { Card } from "./Card";

vi.mock("../CardDetails", () => ({
  CardDetails: () => <div data-testid="card-details">Mocked CardDetails</div>,
}));

describe("Given a user is on the home page", () => {
  describe("When the Card component is rendered", () => {
    it("Then the user see's the correct image", () => {
      renderWithRouter(
        <Card
          imgSrc="https://a.fsimg.co.nz/product/retail/fan/image/400x400/5023660.png?w=384"
          productTitle="Pams Butter"
          price="8.45"
          store="New World"
        />,
      );

      const image = screen.getByAltText(/pams butter/i);

      expect(image).toHaveAttribute(
        "src",
        "https://a.fsimg.co.nz/product/retail/fan/image/400x400/5023660.png?w=384",
      );
      expect(screen.getByAltText(/pams butter/i)).toBeInTheDocument();
    });

    it("Then it renders the carddetails component", () => {
      renderWithRouter(
        <Card
          imgSrc="https://a.fsimg.co.nz/product/retail/fan/image/400x400/5023660.png?w=384"
          productTitle="Pams Butter"
          price="8.45"
          store="New World"
        />,
      );

      expect(screen.getByTestId("card-details")).toBeInTheDocument();
    });

    it("Then it has no accessibility violations", async () => {
      const { container } = renderWithRouter(
        <Card
          imgSrc="https://a.fsimg.co.nz/product/retail/fan/image/400x400/5023660.png?w=384"
          productTitle="Pams Butter"
          price="8.45"
          store="New World"
        />,
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
