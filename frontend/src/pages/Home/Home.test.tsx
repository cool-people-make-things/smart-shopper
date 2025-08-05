import "@testing-library/jest-dom";

import { screen } from "@testing-library/react";
import { axe } from "vitest-axe";

import { renderWithRouter } from "@/lib/test/renderWithRouter";

import { Home, welcomeBlurb, welcomeSubBlurb } from "./Home";

describe("Given a user is looking at the home page", () => {
  describe("When the home page is rendered", () => {
    it("Then is displays a welcome message", async () => {
      renderWithRouter(<Home />);

      const heading = await screen.findByRole("heading", { level: 1 });

      expect(screen.getByText(/welcome/i)).toBeInTheDocument();
      expect(heading).toBeInTheDocument();
      expect(heading).toHaveTextContent(/welcome!/i);
    });

    it("Then it has a welcome message", () => {
      renderWithRouter(<Home />);
      expect(screen.getByText(welcomeBlurb)).toBeInTheDocument();
      expect(screen.getByText(welcomeSubBlurb)).toBeInTheDocument();
    });

    it("Then it renders the child components", () => {
      renderWithRouter(<Home />);

      expect(screen.getByTestId("featured-component")).toBeInTheDocument();
    });

    it("Then it has no accessibility violations", async () => {
      const { container } = renderWithRouter(<Home />);

      const results = await axe(container, {
        rules: {
          "color-contrast": { enabled: false },
        },
      });
      expect(results).toHaveNoViolations();
    });
  });
});
