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
  const labelColorMap: Record<
    string,
    { bgClass: string; borderClass: string }
  > = {
    "disney discs bonus products": {
      bgClass: "bg-purple-800",
      borderClass: "border-t-purple-800",
    },
    default: {
      bgClass: "bg-red-600",
      borderClass: "border-t-red-600",
    },
  };

  const matchedLabel = Object.keys(labelColorMap).find((key) =>
    normalized.includes(key),
  );

  return matchedLabel ? labelColorMap[matchedLabel] : labelColorMap.default;
}
