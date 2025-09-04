import { screen } from "@testing-library/react";
import { type Mock, vi } from "vitest";
import { axe } from "vitest-axe";

import { useCart } from "@/context/CartContext";
import {
  cartWithSingleItem,
  emptyCart,
  fullCart,
} from "@/lib/test/fixtures/cart";
import { renderWithRouterAndProviders } from "@/lib/test/test-utils";

import { Header } from "./Header";

vi.mock("@/context/CartContext", async () => {
  const actual = await vi.importActual<typeof import("@/context/CartContext")>(
    "@/context/CartContext",
  );
  return {
    ...actual,
    useCart: vi.fn(),
  };
});

beforeEach(() => {
  (useCart as Mock).mockReturnValue({
    nwCart: {},
    pnsCart: {},
    wlsCart: {},
  });
});

describe("Given a user is looking at the header", () => {
  describe("When the header is rendered", () => {
    it("Then it displays a header tag", () => {
      renderWithRouterAndProviders(<Header />);
      expect(screen.getByRole("banner")).toBeInTheDocument();
    });

    it("Then is displays the smart shopper logo with link to homepage", async () => {
      renderWithRouterAndProviders(<Header />);
      const headerText = await screen.getByTestId("smart-shopper-heading");

      const logoLink = screen.getByRole("link", { name: /go to homepage/i });
      expect(logoLink).toBeInTheDocument();

      expect(headerText).toBeInTheDocument();
      expect(headerText).toHaveTextContent(/smart/i);
      expect(headerText).toHaveTextContent(/shopper/i);
    });

    it("Then it displays the about link", () => {
      renderWithRouterAndProviders(<Header />);
      const aboutLink = screen.getByRole("link", { name: /about/i });
      expect(aboutLink).toBeInTheDocument();
    });

    it("Then it displays a cart icon with a link to the cart", () => {
      (useCart as Mock).mockReturnValue({
        nwCart: fullCart.nw,
        pnsCart: fullCart.pns,
        wlsCart: fullCart.wls,
      });
      renderWithRouterAndProviders(<Header />);
      const cartIcon = screen.getByRole("link", {
        name: /view shopping cart with 27 items/i,
      });
      expect(cartIcon).toBeInTheDocument();
    });

    it("Then it displays the cart item count when the cart is full", () => {
      (useCart as Mock).mockReturnValue({
        nwCart: fullCart.nw,
        pnsCart: fullCart.pns,
        wlsCart: fullCart.wls,
      });
      renderWithRouterAndProviders(<Header />);
      const cartCount = screen.getByTestId("cart-count");
      expect(cartCount).toBeInTheDocument();
      expect(cartCount).toHaveTextContent("27");
    });

    it("Then it does not display a count when it is empty", () => {
      (useCart as Mock).mockReturnValue({
        nwCart: emptyCart.nw,
        pnsCart: emptyCart.pns,
        wlsCart: emptyCart.wls,
      });
      renderWithRouterAndProviders(<Header />);
      const cartCount = screen.queryByTestId("cart-count");
      expect(cartCount).not.toBeInTheDocument();
    });

    it("Then it shows the correct cart count aria label with a full cart", () => {
      (useCart as Mock).mockReturnValue({
        nwCart: fullCart.nw,
        pnsCart: fullCart.pns,
        wlsCart: fullCart.wls,
      });

      renderWithRouterAndProviders(<Header />);

      const cartIcon = screen.getByRole("link", {
        name: /view shopping cart/i,
      });

      expect(cartIcon).toHaveAttribute(
        "aria-label",
        "View shopping cart with 27 items",
      );
    });
    it("Then it shows the correct cart count aria label with 1 item", () => {
      (useCart as Mock).mockReturnValue({
        nwCart: cartWithSingleItem.nw,
        pnsCart: {},
        wlsCart: {},
      });

      renderWithRouterAndProviders(<Header />);

      const cartIcon = screen.getByRole("link", {
        name: /view shopping cart/i,
      });

      expect(cartIcon).toHaveAttribute(
        "aria-label",
        "View shopping cart with 1 item",
      );
    });

    it("Then it has no accessibility violations", async () => {
      const { container } = renderWithRouterAndProviders(<Header />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
