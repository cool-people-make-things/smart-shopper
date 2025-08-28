// Boiler plate from https://testing-library.com/docs/example-react-router/
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { ReactElement } from "react";
import { MemoryRouter, useLocation } from "react-router-dom";

import { CartProvider } from "@/context/CartContext";
import { SearchProvider } from "@/context/SearchContext";

/**
 * renderWithRouterAndProviders - Test utility for rendering React components with all required providers and routing context
 *
 * Wraps the given UI element with:
 * - MemoryRouter (React Router) to simulate navigation in tests
 * - QueryClientProvider (React Query) with retry disabled for predictable results
 * - CartProvider and SearchProvider (contexts)
 * - A LocationDisplay helper that exposes current pathname and search for test assertions
 *
 * @param {ReactElement} ui - The React component to render in the test
 * @param {Object} [options] - Optional configuration for routing
 * @param {string} [options.route="/"] - Initial route path to set before rendering
 * @param {string[]} [options.routeHistory=[]] - Additional history entries for MemoryRouter
 * @returns {Object} The result of React Testing Library's (RTL) render function extended with:
 *   - `user`: a userEvent instance for simulating user interactions
 *   - All standard query functions from RTL (e.g getByText, queryByTestId)
 */
export function renderWithRouterAndProviders(
  ui: ReactElement,
  {
    routeHistory = [],
    route = "/",
  }: { route?: string; routeHistory?: string[] } = {},
) {
  window.history.pushState({}, "Test page", route);

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
    },
  });

  const LocationDisplay = () => {
    const { pathname, search } = useLocation();
    const fullPath = `${pathname}${search}`;
    return (
      <>
        <div data-testid="location-page">{pathname}</div>
        <div data-testid="location-full">{fullPath}</div>
      </>
    );
  };

  return {
    user: userEvent.setup(),
    ...render(
      <MemoryRouter initialEntries={[...routeHistory, route]}>
        <LocationDisplay />
        <QueryClientProvider client={queryClient}>
          <CartProvider>
            <SearchProvider>
              <>{ui}</>
            </SearchProvider>
          </CartProvider>
        </QueryClientProvider>
      </MemoryRouter>,
    ),
  };
}
