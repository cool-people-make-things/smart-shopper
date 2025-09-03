import { expect, vitest } from "vitest";

import { writeToClipboard } from "./clipboard";
import { emptyCart, fullCartSimple, partialCart } from "./test/fixtures/cart";
import { fullCartStr, partialCartStr } from "./test/fixtures/clipboardCarts";

const mockWriteToClipboard = vitest.fn();

beforeAll(() => {
  Object.defineProperty(navigator, "clipboard", {
    value: {
      writeText: mockWriteToClipboard,
    },
  });
});

beforeEach(() => {
  mockWriteToClipboard.mockClear();
});

describe("Given a user has items in their cart", () => {
  describe("When the user copies the cart to the clipboard", () => {
    it("Then the copied text includes all supermarkets with items", () => {
      writeToClipboard(partialCart);

      expect(mockWriteToClipboard).toHaveBeenCalledWithPartialStr("New World:");
      expect(mockWriteToClipboard).toHaveBeenCalledWithPartialStr("PAK'nSAVE:");
    });

    it("Then the copied text does not include supermarkets with no items", () => {
      writeToClipboard(partialCart);

      expect(mockWriteToClipboard).not.toHaveBeenCalledWithPartialStr(
        "Woolworths:",
      );
    });

    it("Then items are listed with their quantities", () => {
      writeToClipboard(fullCartSimple);

      expect(mockWriteToClipboard).toHaveBeenCalledWithPartialStr(
        "- speight's gold medal beer ale Bottle 24x330mL (x1)",
      );
      expect(mockWriteToClipboard).toHaveBeenCalledWithPartialStr(
        "- Chia Sisters Gut Lemon & Golden Kiwifruit Sparkling Drink 250ml (x4)",
      );
    });

    it("Then a full cart is formatted correctly", () => {
      writeToClipboard(fullCartSimple);

      expect(mockWriteToClipboard).toHaveBeenCalledWith(fullCartStr);
    });

    it("Then a partial cart is formatted correctly", () => {
      writeToClipboard(partialCart);

      expect(mockWriteToClipboard).toHaveBeenCalledWith(partialCartStr);
    });
  });
});

describe("Given a user has no items in their cart", () => {
  describe("When the user copies the cart to the clipboard", () => {
    it("Then the copied text does not include any supermarkets", () => {
      writeToClipboard(emptyCart);

      expect(mockWriteToClipboard).not.toHaveBeenCalledWithPartialStr(
        "New World:",
      );
      expect(mockWriteToClipboard).not.toHaveBeenCalledWithPartialStr(
        "PAK'nSAVE:",
      );
      expect(mockWriteToClipboard).not.toHaveBeenCalledWithPartialStr(
        "Woolworths:",
      );
    });

    it("Then the copied text is empty", () => {
      writeToClipboard(emptyCart);

      expect(mockWriteToClipboard).toHaveBeenCalledWith("");
    });
  });
});
