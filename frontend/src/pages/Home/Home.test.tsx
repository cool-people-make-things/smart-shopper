import "@testing-library/jest-dom";

import { screen } from "@testing-library/react";
import { vi } from "vitest";
import { axe } from "vitest-axe";

import { renderWithRouter } from "@/lib/test/renderWithRouter";

import { Home, welcomeBlurb, welcomeSubBlurb } from "./Home";

vi.mock("@/compositions/Featured", () => ({
  Featured: () => <div data-testid="featured-component">Mocked Featured</div>,
}));

describe("Given a user is looking at the home page", () => {
  describe("When the home page is rendered", () => {
    it("Then it displays a welcome title", async () => {
      renderWithRouter(<Home />);

      const heading = await screen.findByRole("heading", { level: 1 });

      expect(screen.getByText(/welcome/i)).toBeInTheDocument();
      expect(heading).toBeInTheDocument();
      expect(heading).toHaveTextContent(/welcome!/i);
    });

    it("Then it displays a welcome blurb", () => {
      renderWithRouter(<Home />);
      expect(screen.getByText(welcomeBlurb)).toBeInTheDocument();
      expect(screen.getByText(welcomeSubBlurb)).toBeInTheDocument();
    });

    it("Then it displays the featured component", () => {
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
