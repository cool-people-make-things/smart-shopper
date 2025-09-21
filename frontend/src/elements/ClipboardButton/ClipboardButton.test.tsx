import { fireEvent, screen } from "@testing-library/react";
import * as Sonner from "sonner";
import { vi } from "vitest";
import { axe } from "vitest-axe";

import { writeToClipboard } from "@/lib/clipboard";
import { fullCart } from "@/lib/test/fixtures/cart";
import { renderWithRouterAndProviders } from "@/lib/test/test-utils";

import { ClipboardButton } from "./ClipboardButton";

vi.mock("@/lib/clipboard", () => ({
  writeToClipboard: vi.fn(),
}));

beforeEach(() => {
  vi.clearAllMocks();
});

describe("Given a user loads the clipboard button", () => {
  describe("When the clipboard button is rendered", () => {
    it("Then it has no accessibility violations", async () => {
      const { container } = renderWithRouterAndProviders(<ClipboardButton />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});

describe("Given a user has items in their cart", () => {
  describe("When the user clicks on the clipboard button", () => {
    it("Then a toast is shown to acknowledge the action", async () => {
      renderWithRouterAndProviders(<ClipboardButton />, {
        cartContextValue: {
          cart: fullCart,
        },
      });
      const toastSuccessSpy = vi.spyOn(Sonner.toast, "success");

      const clipboardButton = screen.getByRole("button", {
        name: /save to clipboard/i,
      });
      await fireEvent.click(clipboardButton);

      expect(toastSuccessSpy).toHaveBeenCalled();
    });
    it("Then the cart is copied to the clipboard", async () => {
      renderWithRouterAndProviders(<ClipboardButton />, {
        cartContextValue: {
          cart: fullCart,
        },
      });
      const clipboardButton = screen.getByRole("button", {
        name: /save to clipboard/i,
      });
      await fireEvent.click(clipboardButton);

      expect(writeToClipboard).toHaveBeenCalledTimes(1);
      expect(writeToClipboard).toHaveBeenCalledWith(fullCart);
    });
  });
});

describe("Given a user has an empty cart", () => {
  describe("When the user clicks on the clipboard button", () => {
    it("Then an error toast is shown", async () => {
      renderWithRouterAndProviders(<ClipboardButton />);
      const toastErrorSpy = vi.spyOn(Sonner.toast, "error");

      const clipboardButton = screen.getByRole("button", {
        name: /save to clipboard/i,
      });
      await fireEvent.click(clipboardButton);

      expect(toastErrorSpy).toHaveBeenCalled();
    });
    it("Then the clipboard is not written to", async () => {
      renderWithRouterAndProviders(<ClipboardButton />);

      const clipboardButton = screen.getByRole("button", {
        name: /save to clipboard/i,
      });
      await fireEvent.click(clipboardButton);

      expect(writeToClipboard).not.toHaveBeenCalled();
    });
  });
});
