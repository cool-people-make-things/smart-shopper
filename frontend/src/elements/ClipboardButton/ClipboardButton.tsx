import { Save } from "lucide-react";

import { Button } from "@/components/retroui";
import { useCart } from "@/context/CartContext";
import { writeToClipboard } from "@/lib/clipboard";

export function ClipboardButton() {
  const { cart } = useCart();

  const handleCopy = () => {
    writeToClipboard(cart);
  };

  return (
    <Button onClick={handleCopy}>
      <Save className="h-4 w-4 mr-2" />
      Save To Clipboard
    </Button>
  );
}
