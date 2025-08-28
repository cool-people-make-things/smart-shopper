/**
 * cleanInput - Sanitises a string to allow only letters, numbers, spaces, and periods,
 * and trims it to a maximum length
 *
 * Allows letters, numbers, spaces, and periods
 * for inputs such as: Coca-Cola Soft Drink 2.25L
 *
 * @param {string} input - The string to sanitise
 * @param {number} [maxLength=50] - Maximum allowed length for the output string
 * @returns {string} The cleaned string containing only allowed characters
 */
export function cleanInput(input: string, maxLength = 50) {
  const cleaned = input.replace(/[^a-zA-Z0-9 .]/g, "");
  return cleaned.slice(0, maxLength);
}
