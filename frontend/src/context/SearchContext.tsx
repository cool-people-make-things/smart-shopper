import { createContext, useContext, useState } from "react";

import { useSearchAllSupermarkets } from "@/hooks/useSearchAllSupermarkets";

export type SearchContextValue = {
  query: string;
  setQuery: (q: string) => void;
  results: ReturnType<typeof useSearchAllSupermarkets>;
};

export const SearchContext = createContext<SearchContextValue | null>(null);

export function SearchProvider({ children }: { children: React.ReactNode }) {
  const [query, setQuery] = useState("");

  const results = useSearchAllSupermarkets(query);

  return (
    <SearchContext.Provider value={{ query, setQuery, results }}>
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  const ctx = useContext(SearchContext);
  if (!ctx) throw new Error("useSearch must be used inside SearchProvider");
  return ctx;
}
