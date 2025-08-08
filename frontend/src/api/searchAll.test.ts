import {
  beforeEach,
  describe,
  expect,
  it,
  type MockedFunction,
  vi,
} from "vitest";

import nwFixture from "@/lib/test/fixtures/nw_actual.json";
import wlsFixture from "@/lib/test/fixtures/wls_actual.json";

import { searchProducts, type SearchResponse } from "./search";
import type { ProductsBySupermarketWithStatus, Supermarket } from "./searchAll";
import { searchAllSupermarkets, supermarkets } from "./searchAll";

vi.mock("./search");

const mockedSearchProducts = searchProducts as MockedFunction<
  typeof searchProducts
>;

describe("Given a request is made to search all supermarkets with a given search term", () => {
  beforeEach(() => {
    mockedSearchProducts.mockReset();
  });

  describe("When the request is successful for all supermarkets", () => {
    it("Then it returns as 'success' with results of products for each of the supermarkets", async () => {
      mockedSearchProducts.mockImplementation(
        async (query: string, market: string): Promise<SearchResponse> => {
          return {
            query,
            supermarket: market,
            source: "mock",
            results: nwFixture,
          } as SearchResponse;
        },
      );

      const results: ProductsBySupermarketWithStatus =
        await searchAllSupermarkets("eggs");

      supermarkets.forEach((market: Supermarket) => {
        expect(results[market].status).toBe("success");
        expect(results[market].products.length).toBe(11);
        expect(results[market].products[0].supermarket).toBe(market);
        expect(results[market].error).toBeUndefined();
      });
    });
  });

  describe("When the request is made and fails for one or more of the supermarkets", () => {
    it("Then it returns as 'error' status and empty products for the failed supermarket requests", async () => {
      mockedSearchProducts.mockImplementation(
        async (query: string, market: string): Promise<SearchResponse> => {
          if (market === "nw") {
            return Promise.reject(new Error("Network error"));
          }
          return {
            query,
            supermarket: market,
            source: "mock",
            results: wlsFixture,
          } as SearchResponse;
        },
      );

      const results: ProductsBySupermarketWithStatus =
        await searchAllSupermarkets("milk");

      expect(results.nw.status).toBe("error");
      expect(results.nw.products).toEqual([]);
      expect(results.nw.error).toBe("Network error");

      const markets: Supermarket[] = ["pns", "wls"];

      markets.forEach((market) => {
        expect(results[market].status).toBe("success");
        expect(results[market].products.length).toBe(48);
        expect(results[market].error).toBeUndefined();
      });
    });
  });
});
