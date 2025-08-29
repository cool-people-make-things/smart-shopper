import { nwData } from "./nw_actual";

const mockMarketResultData: SearchData = {
  data: nwData as Product[],
  isLoading: false,
  error: undefined,
};

export const mockMarketResult = {
  marketResult: mockMarketResultData,
  shopCode: "nw" as ShopCode,
};

const mockMarketResultEmptyData: SearchData = {
  data: [] as Product[],
  isLoading: false,
  error: undefined,
};

export const mockEmptyMarketResult = {
  marketResult: mockMarketResultEmptyData,
  shopCode: "nw" as ShopCode,
};
