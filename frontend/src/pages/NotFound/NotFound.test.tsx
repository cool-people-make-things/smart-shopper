import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { axe } from "vitest-axe";

import { renderWithRouterAndProviders } from "@/lib/test/test-utils";

import { NotFound, notFoundMessage } from "./NotFound";

describe("Given a user has gone to an unknown page", () => {
  describe("When the NotFound page is rendered", () => {
    it("Then it displays the 404 message to the user", () => {
      renderWithRouterAndProviders(<NotFound />);

      expect(screen.getByText("404")).toBeInTheDocument();
      expect(screen.getByText("Page not found")).toBeInTheDocument();
      expect(screen.getByText(notFoundMessage)).toBeInTheDocument();
    });

    it("Then the home button is visible", () => {
      renderWithRouterAndProviders(<NotFound />);
      const homeButton = screen.getByRole("button", { name: /Go back home/i });
      expect(homeButton).toBeInTheDocument();
    });

    it("Then navigates when home button is clicked", async () => {
      const { user } = renderWithRouterAndProviders(<NotFound />, {
        route: "/unknown",
      });
      const homeButton = screen.getByRole("button", { name: /Go back home/i });

      await user.click(homeButton);

      expect(screen.getByTestId("location-page")).toHaveTextContent("/");
    });

    it("Then it has no accessibility violations", async () => {
      const { container } = renderWithRouterAndProviders(<NotFound />);
      const results = await axe(container, {
        rules: {
          "color-contrast": { enabled: false },
        },
      });
      expect(results).toHaveNoViolations();
    });
  });
});
