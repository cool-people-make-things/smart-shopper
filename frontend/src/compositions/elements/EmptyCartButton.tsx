import { Trash } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { handleCartAction } from "@/components/CartProductActions/utils/cartActions";
import { ConfirmationPopup } from "@/components/ConfirmationPopup";
import { Button } from "@/components/retroui";
import { useCart } from "@/context/CartContext";

export function EmptyCartButton() {
  const { clearCart } = useCart();
  const [openConfirmClearCart, setOpenConfirmClearCart] = useState(false);

  const handleClearCart = () => {
    handleCartAction({
      action: "clearCart",
      utilArgs: { clearCart },
    });
    toast.success("Cart has been emptied", {
      richColors: true,
    });
  };

  return (
    <>
      <Button
        className="bg-destructive text-white hover:bg-destructive/90"
        onClick={() => setOpenConfirmClearCart(true)}
        data-testid="clear-cart-button"
      >
        <Trash className="h-4 w-4 mr-2" /> Empty Cart
      </Button>
      <ConfirmationPopup
        open={openConfirmClearCart}
        onOpenChange={setOpenConfirmClearCart}
        onConfirm={handleClearCart}
        mode="clearCart"
      />
    </>
  );
}
