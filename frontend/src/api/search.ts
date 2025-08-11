export type SearchResponse = {
  query: string;
  supermarket: string;
  source: string;
  results: Product[];
};

import { apiClient } from "../lib/apiClient";

/**
 * searchProducts - Fetches products matching the query from a specific supermarket
 *
 * @param {string} query - The search term to look for (e.g., "eggs")
 * @param {string} supermarket - The supermarket identifier (e.g., "nw", "pns")
 * @returns {Promise<SearchResponse>} A promise resolving to the search results,
 *   including the original query, supermarket, source, and an array of products
 */
export async function searchProducts(
  query: string,
  supermarket: string,
): Promise<SearchResponse> {
  return apiClient(`/search/${supermarket}`, {
    method: "GET",
    query: { q: query },
  });
}
