import { renderHook, type RenderHookResult } from "@testing-library/react";
import { vi } from "vitest";

import { CartProvider, useCart } from "../CartContext";
import { getLocalData } from "./localStorage";

/**
 * Helper function to render the CartProvider with a specific local cart state
 * @param mockLocalData - The cart data to be returned when getLocalData is called
 * @default mockLocalData { nw: {}, pns: {}, wls: {} }
 */
export function renderComponentWithCart(
  mockLocalData: CombinedCart | null = { nw: {}, pns: {}, wls: {} },
): RenderHookResult<ReturnType<typeof useCart>, unknown> {
  vi.mocked(getLocalData).mockReturnValue(mockLocalData);

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <CartProvider>{children}</CartProvider>
  );

  return renderHook(() => useCart(), { wrapper });
}
