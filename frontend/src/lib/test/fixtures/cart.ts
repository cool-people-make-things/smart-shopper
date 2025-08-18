export const fullProductDetails = {
  id: "fake_id",
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

export const preexistingCart = {
  nw: {
    nw1: {
      product: {
        ...fullProductDetails,
        id: "nw1",
      },
      quantity: 5,
    },
  },
  pns: {
    pns1: {
      product: {
        ...fullProductDetails,
        id: "pns1",
      },
      quantity: 12,
    },
    pns2: {
      product: {
        ...fullProductDetails,
        id: "pns2",
      },
      quantity: 1,
    },
  },
  wls: {},
};
