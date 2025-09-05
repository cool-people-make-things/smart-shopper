import { supermarketTitles } from "./constants";

/**
 * writeToClipboard - Copies the cart to the user's clipboard with formatting
 *
 * @param {CombinedCart} cart - The combined cart, containing items from all supermarkets
 */
export function writeToClipboard(cart: CombinedCart) {
  const formattedCart = prepareCartStr(cart);
  navigator.clipboard.writeText(formattedCart);
}

/**
 * prepareCartStr - Formats the cart into a readable string for copying
 *
 * @param {CombinedCart} cart - The combined cart, containing items from all supermarkets
 * @returns {string} The formatted string with supermarket lists, but only for supermarkets that have items
 */
function prepareCartStr(cart: CombinedCart): string {
  const entries = Object.entries(cart) as [ShopCode, Cart][];
  const formattedSupermarkets = entries.map(([code, supermarketCart]) => {
    const supermarketName = supermarketTitles[code];
    const itemList = prepCartItems(supermarketCart);
    return itemList.length ? `${supermarketName}:\n${itemList}\n` : null;
  });
  return formattedSupermarkets.filter(Boolean).join("\n");
}

/**
 * prepCartItems - Formats individual cart items into a string list
 *
 * @param {Cart} cart - The cart object for a specific supermarket
 * @returns {string} The formatted list of cart items
 * @example
 * // Given a cart with items:
 * const cart = {
 *   "651356465": { product: { title: "Milk", ... }, quantity: 2 },
 *   "571435841": { product: { title: "Bread", ... }, quantity: 1 },
 *   "245543525": { product: { title: "Eggs", ... }, quantity: 12 },
 * };
 *
 * // The function will return:
 * "- Milk (x2)\n- Bread (x1)\n- Eggs (x12)"
 */
function prepCartItems(cart: Cart): string {
  return Object.values(cart)
    .map((item) => `- ${item.product.title} (x${item.quantity})`)
    .join("\n");
}
