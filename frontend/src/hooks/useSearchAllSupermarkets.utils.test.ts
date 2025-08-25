import type { UseQueryResult } from "@tanstack/react-query";
import { describe, expect, it } from "vitest";

import { nwData as mockProducts } from "@/lib/test/fixtures/nw_actual";

import type { Supermarket } from "./useSearchAllSupermarkets";
import { groupQueryResultsBySupermarket } from "./useSearchAllSupermarkets.utils";

const supermarkets: Supermarket[] = ["nw", "wls", "pns"];

describe("Given a request has been made to all supermarkets and the groupQueryResultsBySupermarket is called to group the results", () => {
  describe("When all request results are successful", () => {
    it("Then it returns results with product data and no loading or error states", () => {
      const mockQueries: UseQueryResult<Product[]>[] = supermarkets.map(() => ({
        data: mockProducts,
        isLoading: false,
        error: null,
      })) as unknown as UseQueryResult<Product[]>[];

      const result = groupQueryResultsBySupermarket(supermarkets, mockQueries);

      supermarkets.forEach((market) => {
        expect(result[market].data).toEqual(mockProducts);
        expect(result[market].isLoading).toBe(false);
        expect(result[market].error).toBeNull();
      });
    });
  });

  describe("When each supermarket returns a different request state", () => {
    it("Then it should return a result object with appropriate data, loading, and error for each market", () => {
      const mockQueries: UseQueryResult<Product[]>[] = [
        { data: mockProducts, isLoading: false, error: null },
        { data: [], isLoading: true, error: null },
        {
          data: undefined,
          isLoading: false,
          error: new Error("Failed to fetch"),
        },
      ] as UseQueryResult<Product[]>[];

      const result = groupQueryResultsBySupermarket(supermarkets, mockQueries);

      expect(result.nw).toEqual({
        data: mockProducts,
        isLoading: false,
        error: null,
      });

      expect(result.wls).toEqual({
        data: [],
        isLoading: true,
        error: null,
      });

      expect(result.pns.data).toEqual([]);
      expect(result.pns.isLoading).toBe(false);
      expect(result.pns.error).toBeInstanceOf(Error);
      expect((result.pns.error as Error).message).toBe("Failed to fetch");
    });
  });

  describe("When the queries array is empty", () => {
    it("Then it should return empty data arrays with no error and isLoading as false for each supermarket", () => {
      const mockQueries: UseQueryResult<Product[]>[] = [];

      const result = groupQueryResultsBySupermarket(supermarkets, mockQueries);

      supermarkets.forEach((market) => {
        expect(result[market]).toEqual({
          data: [],
          isLoading: false,
          error: undefined,
        });
      });
    });
  });

  describe("When some queries return undefined data", () => {
    it("Then it should fallback to an empty array for data and retain other query state values", () => {
      const mockQueries: UseQueryResult<Product[]>[] = [
        { data: undefined, isLoading: false, error: null },
        { data: mockProducts, isLoading: false, error: null },
        { data: mockProducts, isLoading: false, error: null },
      ] as UseQueryResult<Product[]>[];

      const result = groupQueryResultsBySupermarket(supermarkets, mockQueries);

      expect(result.nw).toEqual({
        data: [],
        isLoading: false,
        error: null,
      });

      expect(result.wls).toEqual({
        data: mockProducts,
        isLoading: false,
        error: null,
      });

      expect(result.pns).toEqual({
        data: mockProducts,
        isLoading: false,
        error: null,
      });
    });
  });
});
