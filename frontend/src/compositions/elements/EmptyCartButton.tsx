import { Trash } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { Button, Dialog, Text } from "@/components/retroui";
import { useCart } from "@/context/CartContext";

export function EmptyCartButton() {
  const { clearCart } = useCart();
  const [openConfirmDelete, setOpenConfirmDelete] = useState(false);

  const handleClearCart = () => {
    clearCart();
    toast.success("Cart has been emptied", {
      richColors: true,
    });
  };

  return (
    <>
      <Button
        className="bg-destructive text-white hover:bg-destructive/90"
        onClick={() => setOpenConfirmDelete(true)}
        data-testid="clear-cart-button"
      >
        <Trash className="h-4 w-4 mr-2" /> Empty Cart
      </Button>
      <Dialog open={openConfirmDelete} onOpenChange={setOpenConfirmDelete}>
        <Dialog.Content aria-describedby={undefined}>
          <Dialog.Header position="fixed" asChild>
            <Text as="h5">Confirm delete</Text>
          </Dialog.Header>
          <section className="flex flex-col gap-4 p-4">
            <section className="text-xl">
              <Text>Are you sure you want to clear your cart?</Text>
              <Text>This action cannot be undone</Text>
            </section>
            <section className="flex flex-row gap-4 justify-end">
              <Dialog.Trigger asChild>
                <Button
                  className="bg-destructive text-white hover:bg-destructive/90"
                  onClick={handleClearCart}
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
    </>
  );
}
