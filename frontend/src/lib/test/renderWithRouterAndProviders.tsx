// Boiler plate from https://testing-library.com/docs/example-react-router/
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { ReactElement } from "react";
import { MemoryRouter, Route, Routes } from "react-router-dom";

import { SearchProvider } from "@/components/SearchBar/SearchContext";
import { CartProvider } from "@/context/CartContext";

export function renderWithRouterAndProviders(
  ui: ReactElement,
  { route = "/", path = "/" }: { route?: string; path?: string } = {},
) {
  window.history.pushState({}, "Test page", route);

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
    },
  });
  return {
    user: userEvent.setup(),
    ...render(
      <MemoryRouter initialEntries={[route]}>
        <QueryClientProvider client={queryClient}>
          <CartProvider>
            <SearchProvider>
              <Routes>
                <Route path={path} element={ui} />
              </Routes>
            </SearchProvider>
          </CartProvider>
        </QueryClientProvider>
      </MemoryRouter>,
    ),
  };
}
