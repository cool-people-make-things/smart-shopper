import {
  nwProduct,
  nwProductMembersCardMultibuy,
  nwProductMembersCardWithLimit,
  nwProductMultibuy,
  nwProductMultibuyUnitless,
  nwProductPromo,
  nwProductPromoTag,
  nwProductPromoTagEveryday,
  nwProductPromoWithLimit,
  nwProductUnitless,
  pnsProduct,
  pnsProductMultibuy,
  pnsProductPromoTag,
  pnsProductPromoTagUnitless,
  pnsProductPromoWithLimit,
  pnsProductUnitless,
  wlsProduct,
  wlsProductDisney,
  wlsProductDisneyPromo,
  wlsProductMembersCard,
  wlsProductMultibuy,
  wlsProductMultibuyFresh,
  wlsProductMultibuyLow,
  wlsProductPromo,
  wlsProductPromoTag,
  wlsProductPromoUnitless,
  wlsProductUnitless,
} from "./products";

export const fullProductDetails = {
  id: "0000000",
  title: "Product Name 500g",
  image: "https://example.com/product/p1.jpg",
  productPageUrl: "https://example.com/product/p1",
  price: {
    value: "4.29",
    per: "ea",
    unitPrice: "0.86",
    unit: "100g",
  },
  promo: null,
} as Product;

// ----- PARTIALLY FILLED CART & VARIANTS -----

export const emptyCart = {
  nw: {},
  pns: {},
  wls: {},
};

export const cartWithSingleItem = {
  nw: {
    "5331318": {
      product: nwProduct,
      quantity: 1,
    },
  },
  pns: {},
  wls: {},
};

export const partialCart = {
  nw: {
    "5039976": {
      product: nwProductPromoTag,
      quantity: 5,
    },
  },
  pns: {
    "5236771": {
      product: pnsProduct,
      quantity: 1,
    },
    "5109655": {
      product: pnsProductMultibuy,
      quantity: 12,
    },
  },
  wls: {},
};

export const partialCartItemAdded = {
  nw: {
    "5039976": {
      product: nwProductPromoTag,
      quantity: 5,
    },
  },
  pns: {
    "5236771": {
      product: pnsProduct,
      quantity: 1,
    },
    "5109655": {
      product: pnsProductMultibuy,
      quantity: 12,
    },
  },
  wls: {
    "132815": {
      product: wlsProduct,
      quantity: 1,
    },
  },
};

export const partialCartItemRemoved = {
  nw: {
    "5039976": {
      product: nwProductPromoTag,
      quantity: 5,
    },
  },
  pns: {
    "5109655": {
      product: pnsProductMultibuy,
      quantity: 12,
    },
  },
  wls: {},
};

export const partialCartQuantityUpdated = {
  nw: {
    "5039976": {
      product: nwProductPromoTag,
      quantity: 5,
    },
  },
  pns: {
    "5236771": {
      product: pnsProduct,
      quantity: 1,
    },
    "5109655": {
      product: pnsProductMultibuy,
      quantity: 300,
    },
  },
  wls: {},
};

// ----- ALL PRODUCT TYPES IN COMBINED AND SUBCATEGORY CARTS -----

export const fullCartSimple = {
  nw: {
    [nwProduct.id]: {
      product: nwProduct,
      quantity: 4,
    },
    [nwProductUnitless.id]: {
      product: nwProductUnitless,
      quantity: 3,
    },
    [nwProductPromoTag.id]: {
      product: nwProductPromoTag,
      quantity: 6,
    },
    [nwProductPromoTagEveryday.id]: {
      product: nwProductPromoTagEveryday,
      quantity: 3,
    },
  },
  pns: {
    [pnsProduct.id]: {
      product: pnsProduct,
      quantity: 4,
    },
    [pnsProductUnitless.id]: {
      product: pnsProductUnitless,
      quantity: 7,
    },
    [pnsProductPromoTag.id]: {
      product: pnsProductPromoTag,
      quantity: 10,
    },
    [pnsProductPromoTagUnitless.id]: {
      product: pnsProductPromoTagUnitless,
      quantity: 4,
    },
  },
  wls: {
    [wlsProduct.id]: {
      product: wlsProduct,
      quantity: 2,
    },
    [wlsProductUnitless.id]: {
      product: wlsProductUnitless,
      quantity: 1,
    },
    [wlsProductPromoTag.id]: {
      product: wlsProductPromoTag,
      quantity: 4,
    },
    [wlsProductDisney.id]: {
      product: wlsProductDisney,
      quantity: 2,
    },
  },
};

export const fullCartSpecials = {
  nw: {
    [nwProductPromo.id]: {
      product: nwProductPromo,
      quantity: 6,
    },
    [nwProductPromoWithLimit.id]: {
      product: nwProductPromoWithLimit,
      quantity: 3,
    },
    [nwProductMembersCardWithLimit.id]: {
      product: nwProductMembersCardWithLimit,
      quantity: 3,
    },
  },
  pns: {
    [pnsProductPromoWithLimit.id]: {
      product: pnsProductPromoWithLimit,
      quantity: 2,
    },
  },
  wls: {
    [wlsProductPromo.id]: {
      product: wlsProductPromo,
      quantity: 5,
    },
    [wlsProductPromoUnitless.id]: {
      product: wlsProductPromoUnitless,
      quantity: 2,
    },
    [wlsProductMembersCard.id]: {
      product: wlsProductMembersCard,
      quantity: 5,
    },
    [wlsProductDisneyPromo.id]: {
      product: wlsProductDisneyPromo,
      quantity: 4,
    },
  },
};

export const fullCartMultibuy = {
  nw: {
    [nwProductMultibuy.id]: {
      product: nwProductMultibuy,
      quantity: 2,
    },
    [nwProductMultibuyUnitless.id]: {
      product: nwProductMultibuyUnitless,
      quantity: 1,
    },
    [nwProductMembersCardMultibuy.id]: {
      product: nwProductMembersCardMultibuy,
      quantity: 5,
    },
  },
  pns: {
    [pnsProductMultibuy.id]: {
      product: pnsProductMultibuy,
      quantity: 5,
    },
  },
  wls: {
    [wlsProductMultibuy.id]: {
      product: wlsProductMultibuy,
      quantity: 5,
    },
    [wlsProductMultibuyLow.id]: {
      product: wlsProductMultibuyLow,
      quantity: 3,
    },
    [wlsProductMultibuyFresh.id]: {
      product: wlsProductMultibuyFresh,
      quantity: 1,
    },
  },
};

export const fullCart = {
  nw: {
    ...fullCartSimple.nw,
    ...fullCartSpecials.nw,
    ...fullCartMultibuy.nw,
  },
  pns: {
    ...fullCartSimple.pns,
    ...fullCartSpecials.pns,
    ...fullCartMultibuy.pns,
  },
  wls: {
    ...fullCartSimple.wls,
    ...fullCartSpecials.wls,
    ...fullCartMultibuy.wls,
  },
};
