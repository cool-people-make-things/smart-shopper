import { supermarketTitles } from "./constants";

export function writeToClipboard(cart: CombinedCart) {
  const formattedCart = prepareCartStr(cart);
  navigator.clipboard.writeText(formattedCart);
}

function prepareCartStr(cart: CombinedCart): string {
  const entries = Object.entries(cart) as [ShopCode, Cart][];
  const formattedSupermarkets = entries.map(([code, supermarketCart]) => {
    const supermarketName = supermarketTitles[code];
    const itemList = prepCartItems(Object.values(supermarketCart));
    return itemList.length ? `${supermarketName}:\n${itemList}\n` : null;
  });
  return formattedSupermarkets.filter(Boolean).join("\n");
}

function prepCartItems(items: CartItem[]): string {
  return items
    .map((item) => `- ${item.product.title} (x${item.quantity})`)
    .join("\n");
}
