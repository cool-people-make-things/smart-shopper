/**
 * formatPromoTagText - Formats a promo tag text by removing full stops and converting to uppercase
 *
 * If the input is undefined or empty, the function returns null
 *
 * @param {string} [tagText] - The promo tag text to format
 * @returns {string | null} The formatted promo tag text in uppercase without full stops,
 *   or null if the input was undefined or empty
 */
export const formatPromoTagText = (tagText?: string): string | null => {
  if (!tagText) return null;

  const formattedLabel = tagText.replace(/\./g, "").toUpperCase();

  return formattedLabel;
};
