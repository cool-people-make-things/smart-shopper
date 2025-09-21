import type { SearchContextValue } from "@/context/SearchContext";

export const mockedSearchContextValue: SearchContextValue = {
  query: "",
  setQuery: () => {},
  results: {
    nw: { data: [], isLoading: false, error: null },
    pns: { data: [], isLoading: false, error: null },
    wls: { data: [], isLoading: false, error: null },
  },
};
