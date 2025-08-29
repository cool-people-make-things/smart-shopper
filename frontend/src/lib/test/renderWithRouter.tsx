// Boiler plate from https://testing-library.com/docs/example-react-router/
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { ReactElement } from "react";
import { MemoryRouter, Route, Routes } from "react-router-dom";

import { CartProvider } from "@/context/CartContext";

export function renderWithRouter(
  ui: ReactElement,
  { route = "/", path = "/" }: { route?: string; path?: string } = {},
) {
  window.history.pushState({}, "Test page", route);

  return {
    user: userEvent.setup(),
    ...render(
      <MemoryRouter initialEntries={[route]}>
        <CartProvider>
          <Routes>
            <Route path={path} element={ui} />
          </Routes>
        </CartProvider>
      </MemoryRouter>,
    ),
  };
}
