import { Minus, Plus, Trash } from "lucide-react";
import { useState } from "react";

import { ConfirmationPopup } from "@/components/ConfirmationPopup";
import { Button, Input, Label } from "@/components/retroui";
import { useCart } from "@/context/CartContext";

import { handleProductAction } from "./utils/cartActions";

export function CartProductActions({
  cartProductItem,
}: {
  cartProductItem: CartItem;
}) {
  const { removeCartItem, updateCartItemQuantity } = useCart();
  const [openConfirmDelete, setOpenConfirmDelete] = useState(false);

  const { quantity, product } = cartProductItem;
  const { id, supermarket, title } = product;
  const utilArgs = {
    supermarket,
    id,
    quantity,
    updateCartItemQuantity,
    removeCartItem,
  };

  return (
    <div
      data-testid="cart-product-actions"
      className="flex min-h-full items-center gap-2"
    >
      <form
        className="flex flex-row gap-2 items-center justify-around w-24"
        onSubmit={(e) => e.preventDefault()}
      >
        <Label htmlFor="quantity" className="font-sans text-base">
          Qty:
        </Label>
        <div className="">
          <Input
            data-testid="cart-product-input"
            type="number"
            value={quantity}
            id="quantity"
            name="quantity"
            onChange={(e) => {
              handleProductAction({
                action: "input",
                utilArgs,
                value: Number(e.target.value),
              });
            }}
            className="pl-3.5 pr-0 leading-none shadow-none text-center"
          />
        </div>
      </form>

      <div className="flex gap-3 justify-between items-center">
        <Button
          data-testid="cart-product-minus"
          onClick={() =>
            handleProductAction({
              action: "decrease",
              utilArgs,
              onRequireConfirm: () => setOpenConfirmDelete(true),
            })
          }
          size="icon"
          aria-label="Decrease quantity"
        >
          <Minus className="w-4 h-4" />
        </Button>

        <Button
          data-testid="cart-product-increase"
          onClick={() =>
            handleProductAction({
              action: "increase",
              utilArgs,
            })
          }
          size="icon"
          aria-label="Increase quantity"
        >
          <Plus className="w-4 h-4" />
        </Button>

        <Button
          data-testid="cart-product-trash"
          size="icon"
          className="bg-destructive text-white hover:bg-destructive/90"
          aria-label="Remove from cart"
          onClick={() => setOpenConfirmDelete(true)}
        >
          <Trash className="w-4 h-4" />
        </Button>

        <ConfirmationPopup
          open={openConfirmDelete}
          onOpenChange={setOpenConfirmDelete}
          title={title}
          onConfirm={() =>
            handleProductAction({
              action: "delete",
              utilArgs,
            })
          }
          mode="removeProduct"
        />
      </div>
    </div>
  );
}
