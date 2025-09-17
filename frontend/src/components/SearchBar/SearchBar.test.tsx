import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import { axe } from "vitest-axe";

import { renderWithRouterAndProviders } from "@/lib/test/test-utils";

import { SearchBar } from "./SearchBar";

vi.mock("./utils/cleanInput", () => ({
  cleanInput: vi.fn((value: string) => value),
}));

beforeEach(() => {
  global.fetch = vi.fn(() =>
    Promise.resolve(
      new Response(JSON.stringify([]), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }),
    ),
  );
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe("Given a user is on the home page", () => {
  describe("When the SearchBar component is rendered", () => {
    it("Then the user can see the search bar", () => {
      renderWithRouterAndProviders(<SearchBar />);
      expect(
        screen.getByPlaceholderText("Search products..."),
      ).toBeInTheDocument();
    });

    it("Then it renders with no accessibility violations", async () => {
      const { container } = renderWithRouterAndProviders(<SearchBar />);
      const results = await axe(container, {
        rules: {
          "color-contrast": { enabled: false },
        },
      });
      expect(results).toHaveNoViolations();
    });
  });

  describe("When the user interacts with the search bar", () => {
    it("Then the user can type in the search bar", async () => {
      const { getByRole } = renderWithRouterAndProviders(<SearchBar />);

      const input = getByRole("textbox");
      expect(input).toBeInTheDocument();

      await userEvent.type(input, "test product");
      expect(input).toHaveValue("test product");
    });

    it("Then when the search is submitted, the user is shown the browse page with the query in the url", async () => {
      const { getByPlaceholderText } = renderWithRouterAndProviders(
        <SearchBar />,
      );

      expect(screen.getByTestId("location-full").textContent).toBe("/");

      const input = getByPlaceholderText("Search products...");
      await userEvent.type(input, "test product{enter}");

      expect(screen.getByTestId("location-page").textContent).toBe("/browse");
      expect(screen.getByTestId("location-full").textContent).toBe(
        "/browse?q=test%20product",
      );
    });
  });
});

describe("Given a user is on the browse page", () => {
  describe("When the SearchBar component is rendered", () => {
    it("Then the user can see the search bar", () => {
      renderWithRouterAndProviders(<SearchBar />, {
        route: "/browse",
        routeHistory: [],
      });
      expect(
        screen.getByPlaceholderText("Search products..."),
      ).toBeInTheDocument();
    });

    it("Then it renders with no accessibility violations", async () => {
      const { container } = renderWithRouterAndProviders(<SearchBar />);
      const results = await axe(container, {
        rules: {
          "color-contrast": { enabled: false },
        },
      });
      expect(results).toHaveNoViolations();
    });
  });

  describe("When the user interacts with the search bar", () => {
    it("Then the user can type in the search bar", async () => {
      const { getByRole } = renderWithRouterAndProviders(<SearchBar />, {
        route: "/browse",
        routeHistory: [],
      });

      const input = getByRole("textbox");
      expect(input).toBeInTheDocument();

      await userEvent.type(input, "test product");
      expect(input).toHaveValue("test product");
    });

    it("Then when the search is submitted, the user is shown the browse page with the query in the url", async () => {
      const { getByPlaceholderText } = renderWithRouterAndProviders(
        <SearchBar />,
        {
          route: "/browse",
          routeHistory: [],
        },
      );

      expect(screen.getByTestId("location-full").textContent).toBe("/browse");

      const input = getByPlaceholderText("Search products...");
      await userEvent.type(input, "test product{enter}");

      expect(screen.getByTestId("location-page").textContent).toBe("/browse");
      expect(screen.getByTestId("location-full").textContent).toBe(
        "/browse?q=test%20product",
      );
    });
  });
});
