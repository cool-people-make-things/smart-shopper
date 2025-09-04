type ShopCode = "nw" | "pns" | "wls";

type SearchData = {
  data: Product[];
  isLoading: boolean;
  error: Error | null;
};

type MarketResults = Record<ShopCode, SearchData>;
