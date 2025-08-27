import { labelColor } from "./stickerColours";

describe("Given a promo sticker is applied to a product", () => {
  describe("When the promo label is highlighting a collection item bonus with product", () => {
    it("Then alternate colouring is applied to the label sticker to indicate it is a bonus item", () => {
      const label = "Disney Discs Bonus Products";
      const result = labelColor(label);

      expect(result).toEqual({
        bgClass: "bg-purple-800",
        borderClass: "border-t-purple-800",
      });
    });
  });

  describe("Given a label has extra whitespace", () => {
    it("Then it still matches correctly for alternate colouring", () => {
      const label = "  disney discs bonus products  ";
      const result = labelColor(label);

      expect(result).toEqual({
        bgClass: "bg-purple-800",
        borderClass: "border-t-purple-800",
      });
    });
  });

  describe("When the promo label is unknown to the override colour map", () => {
    it("Then the label is the default colour red", () => {
      const label = "Some other promo";
      const result = labelColor(label);

      expect(result).toEqual({
        bgClass: "bg-red-600",
        borderClass: "border-t-red-600",
      });
    });
  });
});
