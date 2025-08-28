type ShopCode = "nw" | "pns" | "wls";

type SearchData = {
  data: Product[];
  isLoading: boolean;
  error: unknown;
};

type MarketResults = Record<ShopCode, SearchData>;
