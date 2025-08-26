/* eslint-disable @typescript-eslint/no-explicit-any */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

type Method = "GET";

interface RequestOptions extends RequestInit {
  method?: Method;
  headers?: HeadersInit;
  body?: any;
  query?: Record<string, string>;
}

/**
 * buildUrl - Constructs a full URL string with optional query parameters appended
 *
 * @param {string} path - The API endpoint path (e.g., "/search")
 * @param {Record<string, string>} [query] - Optional query parameters to append
 * @returns {string} The full URL including base URL and query parameters
 */
function buildUrl(path: string, query?: Record<string, string>) {
  const url = new URL(`${API_BASE_URL}${path}`);
  if (query) {
    Object.entries(query).forEach(([key, value]) =>
      url.searchParams.append(key, value),
    );
  }
  return url.toString();
}

/**
 * apiClient - A generic API client helper function to make HTTP requests to the backend.
 *
 * @template T - The expected response data type.
 * @param {string} path - The API endpoint path (relative to base URL).
 * @param {RequestOptions} [options] - Optional request configuration.
 * @param {Method} [options.method="GET"] - HTTP method to use.
 * @param {HeadersInit} [options.headers={}] - Additional headers to include.
 * @param {any} [options.body] - Request body data; will be JSON-stringified.
 * @param {Record<string, string>} [options.query] - Query parameters to append to the URL.
 * @returns {Promise<T>} A promise resolving to the parsed JSON response of type T.
 *
 * @throws Throws an Error if the HTTP response is not ok (status outside 200-299).
 * The error message is extracted from the response JSON if available.
 */
export async function apiClient<T = unknown>(
  path: string,
  { method = "GET", headers = {}, body, query, ...rest }: RequestOptions = {},
): Promise<T> {
  const url = buildUrl(path, query);

  const res = await fetch(url, {
    method,
    headers: { "Content-Type": "application/json", ...headers },
    body: body ? JSON.stringify(body) : undefined,
    ...rest,
  });

  if (!res.ok) {
    const errorBody = await res.json().catch(() => ({}));
    const message =
      (errorBody && typeof errorBody === "object" && "error" in errorBody
        ? (errorBody as any).error
        : undefined) || `API error: ${res.status}`;
    throw new Error(message);
  }
  return res.json();
}
