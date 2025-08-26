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

// ----- CART STATES -----

export const emptyCart = {
  nw: {},
  pns: {},
  wls: {},
};

export const cartWithSingleItem = {
  nw: {
    1110000: {
      product: {
        ...fullProductDetails,
        id: "1110000",
      },
      quantity: 1,
    },
  },
  pns: {},
  wls: {},
};

export const fullCart = {
  nw: {
    1110111: {
      product: {
        ...fullProductDetails,
        id: "1110111",
      },
      quantity: 50,
    },
    1110222: {
      product: {
        ...fullProductDetails,
        id: "1110222",
      },
      quantity: 16,
    },
  },
  pns: {
    2220111: {
      product: {
        ...fullProductDetails,
        id: "2220111",
      },
      quantity: 1,
    },
    2220222: {
      product: {
        ...fullProductDetails,
        id: "2220222",
      },
      quantity: 13,
    },
    2220333: {
      product: {
        ...fullProductDetails,
        id: "2220333",
      },
      quantity: 74,
    },
  },
  wls: {
    333011: {
      product: {
        ...fullProductDetails,
        id: "333011",
      },
      quantity: 34,
    },
    3330222: {
      product: {
        ...fullProductDetails,
        id: "3330222",
      },
      quantity: 12,
    },
    33303: {
      product: {
        ...fullProductDetails,
        id: "33303",
      },
      quantity: 8,
    },
    3330444: {
      product: {
        ...fullProductDetails,
        id: "3330444",
      },
      quantity: 5,
    },
  },
};

// ----- PARTIALLY FILLED CART & VARIANTS -----

export const partialCart = {
  nw: {
    1110001: {
      product: {
        ...fullProductDetails,
        id: "1110001",
      },
      quantity: 5,
    },
  },
  pns: {
    2220001: {
      product: {
        ...fullProductDetails,
        id: "2220001",
      },
      quantity: 12,
    },
    2220002: {
      product: {
        ...fullProductDetails,
        id: "2220002",
      },
      quantity: 1,
    },
  },
  wls: {},
};

export const partialCart_itemRemoved = {
  nw: {
    1110001: {
      product: {
        ...fullProductDetails,
        id: "1110001",
      },
      quantity: 5,
    },
  },
  pns: {
    2220002: {
      product: {
        ...fullProductDetails,
        id: "2220002",
      },
      quantity: 1,
    },
  },
  wls: {},
};

export const partialCart_quantityUpdated = {
  nw: {
    1110001: {
      product: {
        ...fullProductDetails,
        id: "1110001",
      },
      quantity: 5,
    },
  },
  pns: {
    2220001: {
      product: {
        ...fullProductDetails,
        id: "2220001",
      },
      quantity: 300,
    },
    2220002: {
      product: {
        ...fullProductDetails,
        id: "2220002",
      },
      quantity: 1,
    },
  },
  wls: {},
};
