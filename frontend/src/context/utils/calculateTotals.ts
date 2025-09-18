/**
 * calculateTotals - Calculate the total prices for each supermarket cart
 * @param nwCart - The cart for New World
 * @param pnsCart - The cart for PAK'nSAVE
 * @param wlsCart - The cart for Woolworths
 * @returns CartTotals object with individual and combined costs in "0.00" format
 */
export function calculateTotals(
  nwCart: Cart,
  pnsCart: Cart,
  wlsCart: Cart,
): CartTotals {
  const nwTotal = calculateSingleCart(nwCart);
  const pnsTotal = calculateSingleCart(pnsCart);
  const wlsTotal = calculateSingleCart(wlsCart);

  return {
    nw: nwTotal.toFixed(2),
    pns: pnsTotal.toFixed(2),
    wls: wlsTotal.toFixed(2),
    total: (nwTotal + pnsTotal + wlsTotal).toFixed(2),
  };
}

/**
 * calculateSingleCart - Calculate the total price for a single cart
 * @param cart - The cart to calculate
 * @returns The total price of the cart
 */
function calculateSingleCart(cart: Cart) {
  if (!cart || Object.keys(cart).length === 0) return 0;
  return Object.values(cart).reduce((total, item) => {
    return total + getItemPrice(item);
  }, 0);
}

/**
 * getItemPrice - Get the price for a single item
 * @param item - The cart item to get the price for
 * @returns The price of the item
 */
export function getItemPrice(item: CartItem) {
  if (!item.product.price.value || !item.quantity) return 0;

  const { price, promo } = item.product;
  const isFullPromo = promo && "value" in promo && promo.value;

  if (isFullPromo && isMultibuy(item)) {
    return getMultiPrice(item);
  }

  const { value } = isFullPromo ? promo : price;
  return item.quantity * Number(value);
}

/**
 * getMultiPrice - Get the price for an item with a multibuy promo
 * @param item - The multibuy item to get the price for
 * @returns The combined price of the item
 */
function getMultiPrice(item: CartItemWithMultibuy) {
  const { price, promo } = item.product;
  const multibuyThreshold = Number(promo.multibuyThreshold);

  const multibuyGroups = Math.floor(item.quantity / multibuyThreshold);
  const multiPrice = multibuyGroups * Number(promo.value);

  const remainingProducts = item.quantity % multibuyThreshold;
  const normalPrice = remainingProducts * Number(price.value);

  return multiPrice + normalPrice;
}

/**
 * isMultibuy - Check if an item has a multibuy promo
 * @param item - The cart item to check
 * @returns True if the item has a multibuy promo, false otherwise
 */
function isMultibuy(item: CartItem): item is CartItemWithMultibuy {
  return !!item.product.promo && "multibuyThreshold" in item.product.promo;
}
