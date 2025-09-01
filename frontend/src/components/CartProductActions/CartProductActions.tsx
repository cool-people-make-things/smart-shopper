import { Minus, Plus, Trash } from "lucide-react";
import { useState } from "react";

import { Button, Dialog, Input, Label, Text } from "@/components/retroui";
import { useCart } from "@/context/CartContext";

import { handleCartAction } from "./utils/cartActions";

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
              handleCartAction({
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
              handleCartAction({
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
              handleCartAction({
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

          <Dialog open={openConfirmDelete} onOpenChange={setOpenConfirmDelete}>
            <Dialog.Content aria-describedby={undefined}>
              <Dialog.Header position="fixed" asChild>
                <Text as="h5">Confirm delete</Text>
              </Dialog.Header>
              <section className="flex flex-col gap-4 p-4">
                <section className="text-xl">
                  <Text>
                    Are you sure you want to remove {title} from your cart?
                  </Text>
                </section>
                <section className="flex flex-row gap-4 justify-end">
                  <Dialog.Trigger asChild>
                    <Button
                      className="bg-destructive text-white hover:bg-destructive/90"
                      onClick={() =>
                        handleCartAction({
                          action: "delete",
                          utilArgs,
                        })
                      }
                    >
                      Confirm
                    </Button>
                  </Dialog.Trigger>
                  <Dialog.Trigger asChild>
                    <Button variant="outline">Cancel</Button>
                  </Dialog.Trigger>
                </section>
              </section>
            </Dialog.Content>
          </Dialog>
        </div>
      </div>
    </div>
  );
}
