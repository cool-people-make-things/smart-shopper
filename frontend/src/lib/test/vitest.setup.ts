/* eslint-disable max-params */
import "@testing-library/jest-dom";
import "vitest-axe/extend-expect";

import { expect } from "vitest";
import * as matchers from "vitest-axe/matchers";
expect.extend(matchers);

// Mock canvas getContext to avoid jsdom limitation
Object.defineProperty(HTMLCanvasElement.prototype, "getContext", {
  value: () => {
    return {
      // you can mock methods like fillRect, clearRect if needed
      fillRect: () => {},
      clearRect: () => {},
      getImageData: (_x: number, _y: number, w: number, h: number) => ({
        data: new Array(w * h * 4),
      }),
      putImageData: () => {},
      createImageData: () => [],
      setTransform: () => {},
      drawImage: () => {},
      save: () => {},
      restore: () => {},
      beginPath: () => {},
      moveTo: () => {},
      lineTo: () => {},
      closePath: () => {},
      stroke: () => {},
      translate: () => {},
      scale: () => {},
      rotate: () => {},
      arc: () => {},
      fill: () => {},
      measureText: () => ({ width: 0 }),
      transform: () => {},
      rect: () => {},
      clip: () => {},
    };
  },
});

declare module "vitest" {
  interface Assertion {
    toHaveCart(expected: CombinedCart): void;
    toHaveBeenCalledWithPartialStr(expected: string): void;
  }

  interface AsymmetricMatchersContaining {
    toHaveCart(expected: CombinedCart): void;
    toHaveBeenCalledWithPartialStr(expected: string): void;
  }
}

expect.extend({
  toHaveCart(received, expected) {
    const { nwCart, pnsCart, wlsCart } = received;
    const resultingCart = { nw: nwCart, pns: pnsCart, wls: wlsCart };

    const pass = this.equals(resultingCart, expected);

    return {
      pass,
      message: () =>
        `Expected cart ${pass ? "not " : ""}to equal:\n` +
        this.utils.printExpected(expected) +
        "\nReceived:\n" +
        this.utils.printReceived(resultingCart),
    };
  },

  toHaveBeenCalledWithPartialStr(received, expected: string) {
    if (typeof received !== "function" || !received.mock) {
      return {
        pass: false,
        message: () => "Received value is not a spy/mock function",
      };
    }

    const calls = received.mock.calls.flat();
    const pass = calls.some(
      (arg: unknown) => typeof arg === "string" && arg.includes(expected),
    );

    return {
      pass,
      message: () =>
        `Expected mock ${pass ? "not " : ""}to have been called with a string containing:\n` +
        this.utils.printExpected(expected) +
        "\nReceived calls:\n" +
        this.utils.printReceived(calls),
    };
  },
});
