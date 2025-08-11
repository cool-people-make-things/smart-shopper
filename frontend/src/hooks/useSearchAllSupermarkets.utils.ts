import type { UseQueryResult } from "@tanstack/react-query";

import type { MarketResult, Supermarket } from "./useSearchAllSupermarkets";

/**
 * groupQueryResultsBySupermarket - Groups query results by supermarket
 *
 * @param supermarkets - List of supermarket identifiers
 * @param queries - Corresponding query results
 * @returns A Record mapping each supermarket to its query result state
 */
export function groupQueryResultsBySupermarket(
  supermarkets: Supermarket[],
  queries: UseQueryResult<Product[]>[],
): Record<Supermarket, MarketResult> {
  const results = {} as Record<Supermarket, MarketResult>;

  supermarkets.forEach((market, index) => {
    const query = queries[index];
    results[market] = {
      data: query?.data ?? [],
      isLoading: query?.isLoading ?? false,
      error: query?.error,
    };
  });

  return results;
}
