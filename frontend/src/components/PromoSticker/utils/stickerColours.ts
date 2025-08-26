type LabelColors = {
  bgClass: string;
  borderClass: string;
};

/**
 * labelColor - The function takes the label and matches it against label keywords.
 * If a match is found, it returns the corresponding Tailwind classes,
 * otherwise - it falls back to red.
 *
 * @param {string} label - The promo label to get colors for
 * @returns {LabelColors} An object containing `bgClass` and `borderClass`
 *   representing the Tailwind CSS classes for background and the triangle border
 */
export function labelColor(label: string): LabelColors {
  const normalized = label.trim().toLowerCase();

  // Map of label keywords -> Tailwind classes
  const labelColorMap: Record<string, { bg: string; border: string }> = {
    "disney discs bonus products": {
      bg: "bg-purple-800",
      border: "border-t-purple-800",
    },
  };

  const matchedColor = Object.entries(labelColorMap).find(([key]) =>
    normalized.includes(key),
  );

  const bgClass = matchedColor ? matchedColor[1].bg : "bg-red-600";
  const borderClass = matchedColor
    ? matchedColor[1].border
    : "border-t-red-600";

  return { bgClass, borderClass };
}
