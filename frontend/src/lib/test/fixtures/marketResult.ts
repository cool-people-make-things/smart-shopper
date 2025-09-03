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

const mockLoadingMarketResultData: SearchData = {
  data: [] as Product[],
  isLoading: true,
  error: undefined,
};

export const mockLoadingMarketResult = {
  marketResult: mockLoadingMarketResultData,
  shopCode: "nw" as ShopCode,
};
