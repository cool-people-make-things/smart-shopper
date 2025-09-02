import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { axe } from "vitest-axe";

import { NotFound } from "./NotFound";

describe("Given a user has gone to an unknown page", () => {
  describe("When the NotFound page is rendered", () => {
    it("Then it displays the 404 message", () => {
      render(<NotFound />);
      expect(screen.getByText("404: Not Found")).toBeInTheDocument();
    });

    it("has no accessibility violations", async () => {
      const { container } = render(<NotFound />);
      const results = await axe(container, {
        rules: {
          "color-contrast": { enabled: false },
        },
      });
      expect(results).toHaveNoViolations();
    });
  });
});
