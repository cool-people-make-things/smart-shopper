import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { axe } from "vitest-axe";

import { Card } from "./Card";

describe("Given a user is on the home page", () => {
  describe("When the Card component is rendered", () => {
    it.skip("Then the user is seeing the correct product", () => {
      render(
        <Card
          imgSrc="https://a.fsimg.co.nz/product/retail/fan/image/400x400/5023660.png?w=384"
          productTitle="Pams Butter"
          price="8.45"
          store="New World"
        />,
      );
      expect(screen.getByText(/pams/i)).toBeInTheDocument();
    });
    it.skip("has no accessibility violations", async () => {
      const { container } = render(
        <Card
          imgSrc="https://a.fsimg.co.nz/product/retail/fan/image/400x400/5023660.png?w=384"
          productTitle="Pams Butter"
          price="8.45"
          store="New World"
        />,
      );
      const results = await axe(container);
      expect(results.violations).toHaveLength(0);
    });
  });
});
