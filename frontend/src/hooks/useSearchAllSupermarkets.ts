import { useQueries, type UseQueryResult } from "@tanstack/react-query";

import { searchProducts, type SearchResponse } from "@/api/search";

import { groupQueryResultsBySupermarket } from "./useSearchAllSupermarkets.utils";

/**
 * useSearchAllSupermarkets - Custom React hook to search products across multiple supermarkets at once
 *
 * Tracks loading, results, and errors separately for each supermarket
 *
 * @param {string} query - The search term to look for (e.g, "eggs").
 * @returns {MarketResults} An object keyed by supermarket, each with data, loading, and error info
 */
export function useSearchAllSupermarkets(query: string): MarketResults {
  const supermarkets: ShopCode[] = ["nw", "pns", "wls"];

  const queries = useQueries({
    queries: supermarkets.map((market) => ({
      queryKey: ["searchProducts", market, query],
      queryFn: () => searchProducts(query, market),
      enabled: !!query && !!market, // only fetch if both params are set
      select: (res: SearchResponse) =>
        res.results.map((product) => ({
          ...product,
          supermarket: market,
        })),
      staleTime: 5 * 60 * 1000, // cache results for 5 minutes
      retry: false,
    })),
  }) as UseQueryResult<Product[]>[];

  // Processes each item in the array
  return groupQueryResultsBySupermarket([...supermarkets], queries);
}
