import { nwData } from "./nw_actual";

// ----- SUCCESS -----
const mockMarketResultData: SearchData = {
  data: nwData as Product[],
  isLoading: false,
  error: null,
};

export const mockMarketResult = {
  marketResult: mockMarketResultData,
  shopCode: "nw" as ShopCode,
};

// ----- EMPTY SUCCESS -----
const mockMarketResultEmptyData: SearchData = {
  data: [] as Product[],
  isLoading: false,
  error: null,
};

export const mockEmptyMarketResult = {
  marketResult: mockMarketResultEmptyData,
  shopCode: "nw" as ShopCode,
};

// ----- LOADING -----
const mockLoadingMarketResultData: SearchData = {
  data: [] as Product[],
  isLoading: true,
  error: null,
};

export const mockLoadingMarketResult = {
  marketResult: mockLoadingMarketResultData,
  shopCode: "nw" as ShopCode,
};

// ----- ERROR -----
const mockMarketResultError: SearchData = {
  data: [] as Product[],
  isLoading: false,
  error: { name: "Error:", message: "Mock error message" },
};

export const mockErrorMarketResult = {
  marketResult: mockMarketResultError,
  shopCode: "nw" as ShopCode,
};
