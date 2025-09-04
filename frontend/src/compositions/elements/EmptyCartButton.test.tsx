import { fireEvent, screen } from "@testing-library/react";
import { vi } from "vitest";
import { axe } from "vitest-axe";

import * as CartContext from "@/context/CartContext";
import { renderWithRouterAndProviders } from "@/lib/test/test-utils";

import { EmptyCartButton } from "./EmptyCartButton";

describe("Given a user is looking at their cart", () => {
  describe("When the clear cart button is rendered", () => {
    it("Then clicking on the button empties the cart", async () => {
      const clearCartMock = vi.fn();

      vi.spyOn(CartContext, "useCart").mockReturnValue({
        clearCart: clearCartMock,
      } as unknown as CartContext.CartContextType);

      renderWithRouterAndProviders(<EmptyCartButton />);

      const clearCartButton = screen.getByTestId("clear-cart-button");
      fireEvent.click(clearCartButton);

      const confirmButton = await screen.findByRole("button", {
        name: /confirm/i,
      });
      expect(confirmButton).toBeInTheDocument();

      await fireEvent.click(confirmButton);

      expect(clearCartMock).toHaveBeenCalled();
    });
    it("Then it should have no accessibility violations", async () => {
      const { container } = renderWithRouterAndProviders(<EmptyCartButton />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
