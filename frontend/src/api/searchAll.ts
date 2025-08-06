import type { Supermarket } from "@/hooks/useSearchAllSupermarkets";
import type { Product } from "@/types/Product.types";

import { searchProducts } from "./search";

export const supermarkets = ["nw", "wls", "pns"];

type SearchStatus = "loading" | "success" | "error";

type ProductsResult = {
  status: SearchStatus;
  error?: string;
  products: Product[];
};

/**
 * Represents a mapping of supermarkets to arrays of product results
 */
export type ProductsBySupermarketWithStatus = {
  [key in Supermarket]: ProductsResult;
};

/**
 * searchAllSupermarkets - Searches products concurrently across all supermarkets
 *
 * Sends separate requests to each supermarket's API,
 * handles failures by returning empty results for those supermarkets,
 * and tags each product with its supermarket
 *
 * @param {string} query - Search term (e.g., "eggs", "milk")
 * @returns {Promise<ProductsBySupermarket>} Resolves to an object mapping supermarkets to product arrays
 *
 * @throws Does not throw on individual failures; errors are logged and that supermarket returns empty results
 */
export async function searchAllSupermarkets(
  query: string,
): Promise<ProductsBySupermarketWithStatus> {
  const settledResults = await Promise.allSettled(
    supermarkets.map((market) => searchProducts(query, market)),
  );

  const result = supermarkets.reduce((acc, market) => {
    acc[market as Supermarket] = { status: "loading", products: [] };
    return acc;
  }, {} as ProductsBySupermarketWithStatus);

  settledResults.forEach((settled, i) => {
    const market = supermarkets[i] as Supermarket;

    if (settled.status === "fulfilled") {
      result[market] = {
        status: "success",
        products: settled.value.results.map((product) => ({
          ...product,
          supermarket: market,
        })),
      };
    } else {
      result[market] = {
        status: "error",
        error: (settled.reason as Error)?.message || "Unknown error",
        products: [],
      };
    }
  });

  return result;
}
