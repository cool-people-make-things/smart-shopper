import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import { axe } from "vitest-axe";

import { LoadingIndicator } from "./LoadingIndicator";

describe("Given a user is waiting for content to load", () => {
  let carts: HTMLElement[];

  beforeEach(() => {
    render(<LoadingIndicator />);
    carts = screen.getAllByTestId("loading-cart");
  });
  describe("When the loading indicator is displayed", () => {
    it("Then the user sees four shopping cart icons", () => {
      expect(carts).toHaveLength(4);
    });

    it("Then each shopping cart has the correct size, color, and animation applied", () => {
      carts.forEach((cart, i) => {
        expect(cart).toHaveClass("w-8", "h-8", "text-primary");
        expect(cart).toHaveStyle({
          animationName: `bumpCart${i}`,
          animationFillMode: "forwards",
          animationTimingFunction: "linear",
        });
      });
    });

    it("Then it has no accessibility violations", async () => {
      const { container } = render(<LoadingIndicator />);
      const results = await axe(container, {
        rules: {
          "color-contrast": { enabled: false },
        },
      });
      expect(results).toHaveNoViolations();
    });
  });
});
