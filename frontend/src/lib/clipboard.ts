export function writeToClipboard(cart: CombinedCart) {
  const formattedCart = prepareCartStr(cart);
  navigator.clipboard.writeText(formattedCart);
}

const supermarketTitles: Record<ShopCode, string> = {
  nw: "New World",
  pns: "PAK'nSAVE",
  wls: "Woolworths",
};

function prepareCartStr(cart: CombinedCart): string {
  const entries = Object.entries(cart) as [ShopCode, Cart][];
  const formattedSupermarkets = entries.map(([code, supermarketCart]) => {
    const supermarketName = supermarketTitles[code];
    const itemList = prepCartItems(Object.values(supermarketCart));
    return `${supermarketName}:\n${itemList}\n`;
  });
  return formattedSupermarkets.join("\n");
}

function prepCartItems(items: CartItem[]): string {
  return items
    .map((item) => `- ${item.product.title} (x${item.quantity})`)
    .join("\n");
}
