import { fireEvent, screen } from "@testing-library/react";
import { vi } from "vitest";
import { axe } from "vitest-axe";

import * as CartContext from "@/context/CartContext";
import { nwProduct } from "@/lib/test/fixtures/products";
import { renderWithRouterAndProviders } from "@/lib/test/test-utils";

import { CartProductActions } from "./CartProductActions";

const singleMockProduct = {
  quantity: 782,
  product: nwProduct,
} as CartItem;

describe("Given a user is looking at a product in a supermarket cart", () => {
  describe("When the user is looking the product actions", () => {
    it("Then it should display the correct quantity", () => {
      renderWithRouterAndProviders(
        <CartProductActions cartProductItem={singleMockProduct} />,
      );

      const quantityInput = screen.getByTestId(
        "cart-product-input",
      ) as HTMLInputElement;
      expect(quantityInput.value).toBe("782");
    });
    it("Then it should have no accessibility violations", async () => {
      const { container } = renderWithRouterAndProviders(
        <CartProductActions cartProductItem={singleMockProduct} />,
      );
      const results = await axe(container, {
        rules: {
          "color-contrast": { enabled: false },
        },
      });
      expect(results).toHaveNoViolations();
    });
  });

  describe("When the user interacts with the product action buttons", () => {
    it("Then using the typing input updates the cart total", async () => {
      const updateCartItemQuantityMock = vi.fn();

      vi.spyOn(CartContext, "useCart").mockReturnValue({
        updateCartItemQuantity: updateCartItemQuantityMock,
      } as unknown as CartContext.CartContextType);

      renderWithRouterAndProviders(
        <CartProductActions cartProductItem={singleMockProduct} />,
      );

      const quantityInput = screen.getByTestId(
        "cart-product-input",
      ) as HTMLInputElement;

      fireEvent.change(quantityInput, { target: { value: "8" } });

      expect(updateCartItemQuantityMock).toHaveBeenCalledWith(
        singleMockProduct.product.supermarket,
        singleMockProduct.product.id,
        8,
      );
    });

    it("Then clicking the minus button decreases item quantity by 1", async () => {
      const updateCartItemQuantityMock = vi.fn();

      vi.spyOn(CartContext, "useCart").mockReturnValue({
        updateCartItemQuantity: updateCartItemQuantityMock,
      } as unknown as CartContext.CartContextType);

      renderWithRouterAndProviders(
        <CartProductActions cartProductItem={singleMockProduct} />,
      );

      const minusButton = screen.getByTestId("cart-product-minus");
      await fireEvent.click(minusButton);

      expect(updateCartItemQuantityMock).toHaveBeenCalledWith(
        singleMockProduct.product.supermarket,
        singleMockProduct.product.id,
        singleMockProduct.quantity - 1,
      );
    });

    it("Then clicking the plus button increases item quantity by 1", async () => {
      const updateCartItemQuantityMock = vi.fn();

      vi.spyOn(CartContext, "useCart").mockReturnValue({
        updateCartItemQuantity: updateCartItemQuantityMock,
      } as unknown as CartContext.CartContextType);

      renderWithRouterAndProviders(
        <CartProductActions cartProductItem={singleMockProduct} />,
      );

      const plusButton = screen.getByTestId("cart-product-increase");
      await fireEvent.click(plusButton);

      expect(updateCartItemQuantityMock).toHaveBeenCalledWith(
        singleMockProduct.product.supermarket,
        singleMockProduct.product.id,
        singleMockProduct.quantity + 1,
      );
    });

    it("Then clicking the trash button removes the product from the cart", async () => {
      const removeCartItemMock = vi.fn();

      vi.spyOn(CartContext, "useCart").mockReturnValue({
        removeCartItem: removeCartItemMock,
      } as unknown as CartContext.CartContextType);

      renderWithRouterAndProviders(
        <CartProductActions cartProductItem={singleMockProduct} />,
      );

      const trashButton = screen.getByTestId("cart-product-trash");
      fireEvent.click(trashButton);

      const confirmButton = await screen.findByRole("button", {
        name: /confirm/i,
      });
      expect(confirmButton).toBeInTheDocument();

      await fireEvent.click(confirmButton);

      expect(removeCartItemMock).toHaveBeenCalledWith(
        singleMockProduct.product.supermarket,
        singleMockProduct.product.id,
      );
    });

    it("Then clicking the minus button when the quantity is 1 asks the user for deletion confirmation ", async () => {
      const updateCartItemQuantityMock = vi.fn();

      vi.spyOn(CartContext, "useCart").mockReturnValue({
        updateCartItemQuantity: updateCartItemQuantityMock,
      } as unknown as CartContext.CartContextType);

      renderWithRouterAndProviders(
        <CartProductActions
          cartProductItem={{
            quantity: 1,
            product: nwProduct,
          }}
        />,
      );

      const minusButton = screen.getByTestId("cart-product-minus");
      await fireEvent.click(minusButton);

      const trashConfirmButton = await screen.findByRole("button", {
        name: /confirm/i,
      });
      expect(trashConfirmButton).toBeInTheDocument();
    });
  });

  describe("When the user inputs invalid data", () => {
    let updateCartItemQuantityMock: ReturnType<typeof vi.fn>;
    let quantityInput: HTMLInputElement;

    beforeEach(() => {
      updateCartItemQuantityMock = vi.fn();

      vi.spyOn(CartContext, "useCart").mockReturnValue({
        updateCartItemQuantity: updateCartItemQuantityMock,
      } as unknown as CartContext.CartContextType);

      renderWithRouterAndProviders(
        <CartProductActions cartProductItem={singleMockProduct} />,
      );

      quantityInput = screen.getByTestId(
        "cart-product-input",
      ) as HTMLInputElement;
    });

    it("Then using the typing input with a value of 0 updates the cart total to 1", async () => {
      fireEvent.change(quantityInput, { target: { value: "0" } });
      expect(updateCartItemQuantityMock).not.toHaveBeenCalled();
    });

    it("Then using the typing input with an invalid input changes the cart total to 1", async () => {
      fireEvent.change(quantityInput, { target: { value: "-5" } });
      expect(updateCartItemQuantityMock).not.toHaveBeenCalled();
    });

    it("Then using the typing input with a NaN input keeps quantity as previous value", async () => {
      fireEvent.change(quantityInput, { target: { value: NaN } });
      expect(updateCartItemQuantityMock).not.toHaveBeenCalled();
    });
  });
});
