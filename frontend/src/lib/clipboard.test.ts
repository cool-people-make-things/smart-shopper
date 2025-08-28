import { vitest } from "vitest";

import { writeToClipboard } from "./clipboard";
import { fullCart } from "./test/fixtures/cart";

describe("Given a user has items in their cart", () => {
  describe("When the user copies the cart to the clipboard", () => {
    it("Then the cart is formatted correctly", () => {
      const mockWriteText = vitest.fn();
      Object.defineProperty(navigator, "clipboard", {
        value: {
          writeText: mockWriteText,
        },
      });

      writeToClipboard(fullCart);
      expect(mockWriteText).toHaveBeenCalledWith(
        expect.stringContaining("New World:"),
      );
      expect(mockWriteText).toHaveBeenCalledWith(
        expect.stringContaining("PAK'nSAVE:"),
      );
      expect(mockWriteText).toHaveBeenCalledWith(
        expect.stringContaining("Woolworths:"),
      );
    });
  });
});
