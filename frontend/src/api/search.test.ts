import { describe, expect, it, vi } from "vitest";

import { apiClient } from "@/lib/apiClient";
import { nwData as mockProducts } from "@/lib/test/fixtures/nw_actual";

import { searchProducts } from "./search";

vi.mock("@/lib/apiClient", async () => {
  return {
    apiClient: vi.fn<typeof apiClient>(),
  };
});

const mockResponse = {
  query: "eggs",
  supermarket: "nw",
  source: "mock",
  results: mockProducts,
};

describe("Given a user is searching for a product", () => {
  describe("When the search request is made", () => {
    it("Then the search request has the search term and supermarket", async () => {
      const mockApiClient = apiClient as unknown as ReturnType<typeof vi.fn>;
      mockApiClient.mockResolvedValue(mockResponse);

      const result = await searchProducts("eggs", "nw");

      expect(apiClient).toHaveBeenCalledWith("/api/v1/search/nw", {
        method: "GET",
        query: { q: "eggs" },
      });

      expect(result).toEqual(mockResponse);
    });
  });
});
