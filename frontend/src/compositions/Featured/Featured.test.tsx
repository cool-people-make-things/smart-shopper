import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { axe } from "vitest-axe";

import { Featured } from "./Featured";

describe("Given a user has gone to the home page", () => {
  describe("When the Featured component is rendered", () => {
    it("Then it displays the correct title", () => {
      render(<Featured />);
      expect(screen.getByText(/featured items/i)).toBeInTheDocument();
    });
    it.skip("has no accessibility violations", async () => {
      const { container } = render(<Featured />);
      const results = await axe(container);
      expect(results.violations).toHaveLength(0);
    });
  });
});
