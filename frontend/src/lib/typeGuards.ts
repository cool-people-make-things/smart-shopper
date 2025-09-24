export const getPrimaryData = (price: Price, promo: Promo | null) =>
  promo && "value" in promo ? promo : price;

export function isPromoWithValue(
  promo: Promo | null,
): promo is Promo & { value: number } {
  return !!promo && "value" in promo;
}

export function hasMultibuyThreshold(
  promo: Promo | null,
): promo is Promo & { multibuyThreshold: number } {
  return !!promo && "multibuyThreshold" in promo;
}

export function hasLimit(
  promo: Promo | null,
): promo is Promo & { limit: number } {
  return !!promo && "limit" in promo;
}
