const pns: ShopCode = "pns";

// ----- SIMPLE PRODUCTS -----

export const pnsProduct = {
  id: "5236771",
  title: "Flying Goose Original Sriracha Hot Chilli Sauce 455ml",
  image:
    "https://a.fsimg.co.nz/product/retail/fan/image/400x400/5236771.png?w=384",
  productPageUrl:
    "https://www.paknsave.co.nz/shop/product/5236771_ea_000pns?name=flying-goose-original-sriracha-hot-chilli-sauce",
  price: {
    value: "8.49",
    per: "ea",
    unitPrice: "1.87",
    unit: "100ml",
  },
  promo: null,
  supermarket: pns,
};

export const pnsProductUnitless = {
  id: "5297621",
  title: "Speight's Summit Ultra Low Carb Larger Beer Cans 24 x 330ml",
  image:
    "https://a.fsimg.co.nz/product/retail/fan/image/400x400/5297621.png?w=384",
  productPageUrl:
    "https://www.paknsave.co.nz/shop/product/5297621_ea_000pns?name=speight%27s-summit-ultra-low-carb-larger-beer-cans",
  price: {
    value: "43.49",
    per: "ea",
    unitPrice: null,
    unit: null,
  },
  promo: null,
  supermarket: pns,
};

export const pnsProductPromoTag = {
  id: "5011024",
  title: "Arnott's Shapes Originals Chicken Crimpy Crackers 175g",
  image:
    "https://a.fsimg.co.nz/product/retail/fan/image/400x400/5011024.png?w=384",
  productPageUrl:
    "https://www.paknsave.co.nz/shop/product/5011024_ea_000pns?name=arnott%27s-shapes-originals-chicken-crimpy-crackers",
  price: {
    value: "1.99",
    per: "ea",
    unitPrice: "1.14",
    unit: "100g",
  },
  promo: {
    tag: "Extra Low",
  },
  supermarket: pns,
};

export const pnsProductPromoTagUnitless = {
  id: "5220257",
  title: "Speight's Summit Ultra Low Carb Lager Beer Bottles 12 x 330ml",
  image:
    "https://a.fsimg.co.nz/product/retail/fan/image/400x400/5220257.png?w=384",
  productPageUrl:
    "https://www.paknsave.co.nz/shop/product/5220257_ea_000pns?name=speight%27s-summit-ultra-low-carb-lager-beer-bottles",
  price: {
    value: "22.99",
    per: "ea",
    unitPrice: null,
    unit: null,
  },
  promo: {
    tag: "Extra Low",
  },
  supermarket: pns,
};

// ----- PROMO PRODUCTS -----

export const pnsProductPromoWithLimit = {
  id: "5236273",
  title: "Karicare 1 Baby Infant Formula From Birth To 6 Months 900g",
  image:
    "https://a.fsimg.co.nz/product/retail/fan/image/400x400/5236273.png?w=384",
  productPageUrl:
    "https://www.paknsave.co.nz/shop/product/5236273_ea_000pns?name=karicare-1-baby-infant-formula-from-birth-to-6-months",
  price: {
    value: "20.39",
    per: "ea",
    unitPrice: "2.27",
    unit: "100g",
  },
  promo: {
    tag: "Extra Low",
    value: "19.99",
    unitPrice: "2.22",
    unit: "100g",
    limit: "2",
  },
  supermarket: pns,
};

// ----- MULTIBUY -----

export const pnsProductMultibuy = {
  id: "5109655",
  title: "Mogu Mogu Lychee Juice With Nate De Coco 320ml",
  image:
    "https://a.fsimg.co.nz/product/retail/fan/image/400x400/5109655.png?w=384",
  productPageUrl:
    "https://www.paknsave.co.nz/shop/product/5109655_ea_000pns?name=mogu-mogu-lychee-juice-with-nate-de-coco",
  price: {
    value: "1.89",
    per: "ea",
    unitPrice: "5.91",
    unit: "1L",
  },
  promo: {
    tag: "Extra Low",
    value: "5.00",
    unitPrice: "3.91",
    unit: "1L",
    multibuyThreshold: "4",
  },
  supermarket: pns,
};
