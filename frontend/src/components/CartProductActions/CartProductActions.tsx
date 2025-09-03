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
    <div className="flex-1 flex justify-around min-h-full items-center gap-6">
      <form
        className="flex flex-row gap-4 items-center justify-around"
        onSubmit={(e) => e.preventDefault()}
      >
        <Label htmlFor="quantity" className="font-sans text-base">
          Quantity:
        </Label>
        <div className="w-[50%]">
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
          />
        </div>
      </form>

      <div className="flex flex-col gap-5">
        <div className="flex gap-5 justify-between items-center">
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
    </div>
  );
}
