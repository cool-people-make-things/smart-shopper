import "@testing-library/jest-dom";
import "vitest-axe/extend-expect";

import * as matchers from "vitest-axe/matchers";
import { expect } from "vitest";
expect.extend(matchers);

// Mock canvas getContext to avoid jsdom limitation
Object.defineProperty(HTMLCanvasElement.prototype, "getContext", {
  value: () => {
    return {
      // you can mock methods like fillRect, clearRect if needed
      fillRect: () => {},
      clearRect: () => {},
      getImageData: (x: number, y: number, w: number, h: number) => ({
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
