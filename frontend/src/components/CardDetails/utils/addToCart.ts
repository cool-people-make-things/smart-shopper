import { toast } from "sonner";

export function addToCartWithToast({
  addCartItem,
  removeCartItem,
  supermarket,
  product,
}: {
  addCartItem: (supermarket: ShopCode, product: Product) => void;
  removeCartItem: (supermarket: ShopCode, productId: string) => void;
  supermarket: ShopCode;
  product: Product;
}) {
  addCartItem(supermarket, product);
  toast.success(`${product.title} has been added to your cart`, {
    richColors: true,
    cancel: {
      label: "Undo",
      onClick: () => {
        removeCartItem(supermarket, product.id);
        toast.error(`${product.title} removed`, { richColors: true });
      },
    },
  });
}
