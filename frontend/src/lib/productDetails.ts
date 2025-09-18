import { toast } from "sonner";

export const getPrimaryData = (price: Price, promo: Promo | null) => {
  if (promo && "value" in promo) return promo;
  return price;
};

export const getMultibuyThreshold = (promo: Promo | null) =>
  promo && "multibuyThreshold" in promo ? promo.multibuyThreshold : null;

export const getLimit = (promo: Promo | null) =>
  promo && "limit" in promo ? promo.limit : null;

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
