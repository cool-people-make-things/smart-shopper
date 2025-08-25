import {
  nwProduct,
  nwProduct_membersCard_multibuy,
  nwProduct_membersCard_withLimit,
  nwProduct_multibuy,
  nwProduct_multibuy_unitless,
  nwProduct_promo,
  nwProduct_promo_withLimit,
  nwProduct_promoTag,
  nwProduct_promoTag_everyday,
  nwProduct_unitless,
  pnsProduct,
  pnsProduct_multibuy,
  pnsProduct_promo_withLimit,
  pnsProduct_promoTag,
  pnsProduct_promoTag_unitless,
  pnsProduct_unitless,
  wlsProduct,
  wlsProduct_disney,
  wlsProduct_disney_promo,
  wlsProduct_membersCard,
  wlsProduct_multibuy,
  wlsProduct_multibuy_fresh,
  wlsProduct_multibuy_low,
  wlsProduct_promo,
  wlsProduct_promo_unitless,
  wlsProduct_promoTag,
  wlsProduct_unitless,
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
      product: nwProduct_promoTag,
      quantity: 5,
    },
  },
  pns: {
    "5236771": {
      product: pnsProduct,
      quantity: 1,
    },
    "5109655": {
      product: pnsProduct_multibuy,
      quantity: 12,
    },
  },
  wls: {},
};

export const partialCart_itemAdded = {
  nw: {
    "5039976": {
      product: nwProduct_promoTag,
      quantity: 5,
    },
  },
  pns: {
    "5236771": {
      product: pnsProduct,
      quantity: 1,
    },
    "5109655": {
      product: pnsProduct_multibuy,
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

export const partialCart_itemRemoved = {
  nw: {
    "5039976": {
      product: nwProduct_promoTag,
      quantity: 5,
    },
  },
  pns: {
    "5109655": {
      product: pnsProduct_multibuy,
      quantity: 12,
    },
  },
  wls: {},
};

export const partialCart_quantityUpdated = {
  nw: {
    "5039976": {
      product: nwProduct_promoTag,
      quantity: 5,
    },
  },
  pns: {
    "5236771": {
      product: pnsProduct,
      quantity: 1,
    },
    "5109655": {
      product: pnsProduct_multibuy,
      quantity: 300,
    },
  },
  wls: {},
};

// ----- ALL PRODUCT TYPES IN COMBINED AND SUBCATEGORY CARTS -----

export const fullCart_simple = {
  nw: {
    [nwProduct.id]: {
      product: nwProduct,
      quantity: 4,
    },
    [nwProduct_unitless.id]: {
      product: nwProduct_unitless,
      quantity: 3,
    },
    [nwProduct_promoTag.id]: {
      product: nwProduct_promoTag,
      quantity: 6,
    },
    [nwProduct_promoTag_everyday.id]: {
      product: nwProduct_promoTag_everyday,
      quantity: 3,
    },
  },
  pns: {
    [pnsProduct.id]: {
      product: pnsProduct,
      quantity: 4,
    },
    [pnsProduct_unitless.id]: {
      product: pnsProduct_unitless,
      quantity: 7,
    },
    [pnsProduct_promoTag.id]: {
      product: pnsProduct_promoTag,
      quantity: 10,
    },
    [pnsProduct_promoTag_unitless.id]: {
      product: pnsProduct_promoTag_unitless,
      quantity: 4,
    },
  },
  wls: {
    [wlsProduct.id]: {
      product: wlsProduct,
      quantity: 2,
    },
    [wlsProduct_unitless.id]: {
      product: wlsProduct_unitless,
      quantity: 1,
    },
    [wlsProduct_promoTag.id]: {
      product: wlsProduct_promoTag,
      quantity: 4,
    },
    [wlsProduct_disney.id]: {
      product: wlsProduct_disney,
      quantity: 2,
    },
  },
};

export const fullCart_specials = {
  nw: {
    [nwProduct_promo.id]: {
      product: nwProduct_promo,
      quantity: 6,
    },
    [nwProduct_promo_withLimit.id]: {
      product: nwProduct_promo_withLimit,
      quantity: 3,
    },
    [nwProduct_membersCard_withLimit.id]: {
      product: nwProduct_membersCard_withLimit,
      quantity: 3,
    },
  },
  pns: {
    [pnsProduct_promo_withLimit.id]: {
      product: pnsProduct_promo_withLimit,
      quantity: 2,
    },
  },
  wls: {
    [wlsProduct_promo.id]: {
      product: wlsProduct_promo,
      quantity: 5,
    },
    [wlsProduct_promo_unitless.id]: {
      product: wlsProduct_promo_unitless,
      quantity: 2,
    },
    [wlsProduct_membersCard.id]: {
      product: wlsProduct_membersCard,
      quantity: 5,
    },
    [wlsProduct_disney_promo.id]: {
      product: wlsProduct_disney_promo,
      quantity: 4,
    },
  },
};

export const fullCart_multibuy = {
  nw: {
    [nwProduct_multibuy.id]: {
      product: nwProduct_multibuy,
      quantity: 2,
    },
    [nwProduct_multibuy_unitless.id]: {
      product: nwProduct_multibuy_unitless,
      quantity: 1,
    },
    [nwProduct_membersCard_multibuy.id]: {
      product: nwProduct_membersCard_multibuy,
      quantity: 5,
    },
  },
  pns: {
    [pnsProduct_multibuy.id]: {
      product: pnsProduct_multibuy,
      quantity: 5,
    },
  },
  wls: {
    [wlsProduct_multibuy.id]: {
      product: wlsProduct_multibuy,
      quantity: 5,
    },
    [wlsProduct_multibuy_low.id]: {
      product: wlsProduct_multibuy_low,
      quantity: 3,
    },
    [wlsProduct_multibuy_fresh.id]: {
      product: wlsProduct_multibuy_fresh,
      quantity: 1,
    },
  },
};

export const fullCart = {
  nw: {
    ...fullCart_simple.nw,
    ...fullCart_specials.nw,
    ...fullCart_multibuy.nw,
  },
  pns: {
    ...fullCart_simple.pns,
    ...fullCart_specials.pns,
    ...fullCart_multibuy.pns,
  },
  wls: {
    ...fullCart_simple.wls,
    ...fullCart_specials.wls,
    ...fullCart_multibuy.wls,
  },
};
