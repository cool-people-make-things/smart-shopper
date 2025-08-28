import type { UseQueryResult } from "@tanstack/react-query";

/**
 * groupQueryResultsBySupermarket - Groups query results by supermarket
 *
 * @param supermarkets - List of supermarket identifiers
 * @param queries - Corresponding query results
 * @returns A Record mapping each supermarket to its query result state
 */
export function groupQueryResultsBySupermarket(
  supermarkets: ShopCode[],
  queries: UseQueryResult<Product[]>[],
): MarketResults {
  const results = {} as MarketResults;

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
