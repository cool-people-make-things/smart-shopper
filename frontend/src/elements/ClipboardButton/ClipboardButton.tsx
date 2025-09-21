import { Save } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/retroui";
import { useCart } from "@/context/CartContext";
import { writeToClipboard } from "@/lib/clipboard";

export function ClipboardButton() {
  const { cart } = useCart();

  const handleCopy = () => {
    const hasItems = Object.values(cart).some(
      (shopCart) => Object.values(shopCart).length > 0,
    );

    if (!hasItems) {
      toast.error("Your cart is empty - nothing to copy");
      return;
    }

    writeToClipboard(cart);
    toast.success("Cart has been copied to clipboard");
  };

  return (
    <Button onClick={handleCopy}>
      <Save className="h-4 w-4 mr-2" />
      Save To Clipboard
    </Button>
  );
}
