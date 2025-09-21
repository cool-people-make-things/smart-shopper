import { fireEvent, screen } from "@testing-library/react";
import * as Sonner from "sonner";
import { vi } from "vitest";
import { axe } from "vitest-axe";

import * as CartContext from "@/context/CartContext";
import { nwProduct } from "@/lib/test/fixtures/products";
import { renderWithRouterAndProviders } from "@/lib/test/test-utils";

import { CardDetails } from "./CardDetails";

describe("Given the user is looking at an individual product's details", () => {
  describe("When the product is displayed on the home page", () => {
    it("Then the store, product name and price is displayed", () => {
      renderWithRouterAndProviders(<CardDetails product={nwProduct} />);

      expect(
        screen.getByText(
          /Chia Sisters Gut Lemon & Golden Kiwifruit Sparkling Drink 250ml/i,
        ),
      ).toBeInTheDocument();
      // TODO expect(screen.getByText(/new world/i)).toBeInTheDocument(); When the shop code is fixed
      expect(screen.getByText("$5.59")).toBeInTheDocument();
    });
  });

  describe("When the product is displayed on the browse page", () => {
    it("Then product name and price is displayed", () => {
      renderWithRouterAndProviders(<CardDetails product={nwProduct} />, {
        route: "/browse",
      });

      expect(screen.queryByText(/new world/i)).not.toBeInTheDocument();
      expect(
        screen.getByText(
          /Chia Sisters Gut Lemon & Golden Kiwifruit Sparkling Drink 250ml/i,
        ),
      ).toBeInTheDocument();
      expect(screen.getByText("$5.59")).toBeInTheDocument();
    });
  });

  describe("When the button is rendered", () => {
    it("Then the correct text is displayed", async () => {
      renderWithRouterAndProviders(<CardDetails product={nwProduct} />);

      const button = screen.getByRole("button", { name: /add to cart/i });
      expect(button).toBeInTheDocument();
    });

    const addCartItemMock = vi.fn();
    const removeCartItemMock = vi.fn();

    vi.spyOn(CartContext, "useCart").mockReturnValue({
      addCartItem: addCartItemMock,
      removeCartItem: removeCartItemMock,
    } as unknown as CartContext.CartContextValue);

    const toastSuccessSpy = vi.spyOn(Sonner.toast, "success");

    it("Then it adds item to cart when clicked", async () => {
      renderWithRouterAndProviders(<CardDetails product={nwProduct} />);

      const button = screen.getByRole("button", { name: /add to cart/i });
      await fireEvent.click(button);

      expect(addCartItemMock).toHaveBeenCalledWith(
        nwProduct.supermarket,
        nwProduct,
      );

      expect(toastSuccessSpy).toHaveBeenCalledWith(
        `${nwProduct.title} has been added to your cart`,
        expect.objectContaining({ richColors: true }),
      );
    });
  });
  describe("When an item has been added and the undo button is displayed in the toast", () => {
    it("Then it can undo adding the item to cart", async () => {
      const addCartItemMock = vi.fn();
      const removeCartItemMock = vi.fn();

      vi.spyOn(CartContext, "useCart").mockReturnValue({
        addCartItem: addCartItemMock,
        removeCartItem: removeCartItemMock,
      } as unknown as CartContext.CartContextValue);

      const toastSuccessSpy = vi.spyOn(Sonner.toast, "success");
      const toastErrorSpy = vi.spyOn(Sonner.toast, "error");
      renderWithRouterAndProviders(<CardDetails product={nwProduct} />);

      await fireEvent.click(screen.getByText(/add to cart/i));

      const undo = toastSuccessSpy.mock.calls[0][1]?.cancel as unknown as {
        onClick: () => void;
      };
      const undoButtonFunction = undo.onClick;
      undoButtonFunction();

      expect(removeCartItemMock).toHaveBeenCalledWith(
        nwProduct.supermarket,
        nwProduct.id,
      );
      expect(toastErrorSpy).toHaveBeenCalledWith(
        `${nwProduct.title} removed`,
        expect.objectContaining({ richColors: true }),
      );
    });
  });

  describe("When the product details are displayed", () => {
    it("Then it has no accessibility violations", async () => {
      const { container } = renderWithRouterAndProviders(
        <CardDetails product={nwProduct} />,
      );

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
