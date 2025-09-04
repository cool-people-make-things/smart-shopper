import { render, screen } from "@testing-library/react";
import { axe } from "vitest-axe";

import { Fallback } from "@/components/Fallback";

const error = new Error("Network request failed");

describe("Given an error occurs", () => {
  describe("When rendered", () => {
    it("Then the user sees a warning with the error message", () => {
      render(<Fallback error={error} />);
      expect(screen.getByRole("alert")).toBeInTheDocument();
      expect(screen.getByText("Network request failed")).toBeInTheDocument();
    });

    it("Then it has no accessibility violations", async () => {
      const { container } = render(<Fallback error={error} />);
      const results = await axe(container, {
        rules: {
          "color-contrast": { enabled: false },
        },
      });
      expect(results).toHaveNoViolations();
    });
  });

  describe("When a custom message is provided", () => {
    it("Then the user sees the custom friendly message", () => {
      render(<Fallback message="Could not load supermarket products" />);
      expect(screen.getByRole("alert")).toBeInTheDocument();
      expect(
        screen.getByText("Could not load supermarket products"),
      ).toBeInTheDocument();
    });
  });
});

describe("Given no specific error occurs", () => {
  describe("When rendered", () => {
    it("Then the user sees the default friendly message", () => {
      render(<Fallback />);
      expect(screen.getByRole("alert")).toBeInTheDocument();
      expect(
        screen.getByText(
          "Something went wrong. Please try checking again later.",
        ),
      ).toBeInTheDocument();
    });
  });
});
