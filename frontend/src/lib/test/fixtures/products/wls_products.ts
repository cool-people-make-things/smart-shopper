const wls: ShopCode = "wls";

// ----- SIMPLE PRODUCTS -----

export const wlsProduct = {
  id: "132815",
  title: "v vitalise energy drink 250ml Can 4pack",
  image:
    "https://assets.woolworths.com.au/images/2010/132815.jpg?impolicy=wowcdxwbjbx&w=200&h=200",
  productPageUrl:
    "https://www.woolworths.co.nz/shop/productdetails?stockcode=132815&name=v-vitalise-energy-drink-250ml",
  price: {
    value: "8.99",
    per: "ea",
    unitPrice: "8.99",
    unit: "1L",
  },
  promo: null,
  supermarket: wls,
};

export const wlsProduct_unitless = {
  id: "907038",
  title: "speight's gold medal beer ale Bottle 24x330mL",
  image:
    "https://assets.woolworths.com.au/images/2010/907038.jpg?impolicy=wowcdxwbjbx&w=200&h=200",
  productPageUrl:
    "https://www.woolworths.co.nz/shop/productdetails?stockcode=907038&name=speights-gold-medal-beer-ale",
  price: {
    value: "48.99",
    per: "ea",
    unitPrice: null,
    unit: null,
  },
  promo: null,
  supermarket: wls,
};

export const wlsProduct_promoTag = {
  id: "98508",
  title: "turks free range chicken breast skinless fillet 450g",
  image:
    "https://assets.woolworths.com.au/images/2010/98508.jpg?impolicy=wowcdxwbjbx&w=200&h=200",
  productPageUrl:
    "https://www.woolworths.co.nz/shop/productdetails?stockcode=98508&name=turks-free-range-chicken-breast-skinless-fillet",
  price: {
    value: "9.90",
    per: "ea",
    unitPrice: "22.00",
    unit: "1kg",
  },
  promo: {
    tag: "LOW PRICE",
  },
  supermarket: wls,
};

// ----- PROMO PRODUCTS -----

export const wlsProduct_promo = {
  id: "315692",
  title: "v vitalise energy drink Single can 500mL",
  image:
    "https://assets.woolworths.com.au/images/2010/315692.jpg?impolicy=wowcdxwbjbx&w=200&h=200",
  productPageUrl:
    "https://www.woolworths.co.nz/shop/productdetails?stockcode=315692&name=v-vitalise-energy-drink",
  price: {
    value: "4.19",
    per: "ea",
    unitPrice: "6.00",
    unit: "1L",
  },
  promo: {
    value: "3.00",
    per: "ea",
    tag: "Special",
  },
  supermarket: wls,
};

export const wlsProduct_promo_unitless = {
  id: "705958",
  title: "speight's summit beer lager ultra low carb Bottle 24x330mL",
  image:
    "https://assets.woolworths.com.au/images/2010/705958.jpg?impolicy=wowcdxwbjbx&w=200&h=200",
  productPageUrl:
    "https://www.woolworths.co.nz/shop/productdetails?stockcode=705958&name=speights-summit-beer-lager-ultra-low-carb",
  price: {
    value: "49.99",
    per: "ea",
    unitPrice: null,
    unit: null,
  },
  promo: {
    tag: "Special",
    value: "41.00",
    per: "ea",
  },
  supermarket: wls,
};

// ----- MULTIBUY -----

export const wlsProduct_multibuy = {
  id: "344618",
  title: "woolworths chicken whole Each 1.35kg",
  image:
    "https://assets.woolworths.com.au/images/2010/344618.jpg?impolicy=wowcdxwbjbx&w=200&h=200",
  productPageUrl:
    "https://www.woolworths.co.nz/shop/productdetails?stockcode=344618&name=woolworths-chicken-whole",
  price: {
    value: "14.80",
    per: "ea",
    unitPrice: "10.96",
    unit: "1kg",
  },
  promo: {
    tag: "Special",
    value: "20.00",
    unitPrice: "7.41",
    unit: "1kg",
    multibuyThreshold: "2",
  },
  supermarket: wls,
};

export const wlsProduct_multibuy_low = {
  id: "251463",
  title: "woolworths NZ chicken mince breast 3% fat barn raised Tray 400g",
  image:
    "https://assets.woolworths.com.au/images/2010/251463.jpg?impolicy=wowcdxwbjbx&w=200&h=200",
  productPageUrl:
    "https://www.woolworths.co.nz/shop/productdetails?stockcode=251463&name=woolworths-nz-chicken-mince-breast-3-fat-barn-raised",
  price: {
    value: "8.00",
    per: "ea",
    unitPrice: "20.00",
    unit: "1kg",
  },
  promo: {
    tag: "LOW PRICE",
    value: "20.00",
    unitPrice: "16.67",
    unit: "1kg",
    multibuyThreshold: "3",
  },
  supermarket: wls,
};

export const wlsProduct_multibuy_fresh = {
  id: "281082",
  title: "fresh vegetable broccoli head",
  image:
    "https://assets.woolworths.com.au/images/2010/281082.jpg?impolicy=wowcdxwbjbx&w=200&h=200",
  productPageUrl:
    "https://www.woolworths.co.nz/shop/productdetails?stockcode=281082&name=fresh-vegetable-broccoli-head",
  price: {
    value: "1.75",
    per: "ea",
    unitPrice: "1.75",
    unit: "1ea",
  },
  promo: {
    tag: "Fresh Deal",
    value: "3.00",
    multibuyThreshold: "2",
  },
  supermarket: wls,
};

// ----- CLUB DEALS -----

export const wlsProduct_membersCard = {
  id: "139864",
  title: "v vitalise energy drink guarana Single can 250mL",
  image:
    "https://assets.woolworths.com.au/images/2010/139864.jpg?impolicy=wowcdxwbjbx&w=200&h=200",
  productPageUrl:
    "https://www.woolworths.co.nz/shop/productdetails?stockcode=139864&name=v-vitalise-energy-drink-guarana",
  price: {
    value: "2.49",
    per: "ea",
    unitPrice: "9.96",
    unit: "1L",
  },
  promo: {
    value: "2.00",
    per: "ea",
    unitPrice: "8.00",
    unit: "1L",
    tag: "Member Price",
  },
  supermarket: wls,
};

// ----- LIMITED TIME -----

export const wlsProduct_disney = {
  id: "6014370",
  title: "tegel free range quick cook chicken steaks chargrilled 4pk 400g",
  image:
    "https://assets.woolworths.com.au/images/2010/6014370.jpg?impolicy=wowcdxwbjbx&w=200&h=200",
  productPageUrl:
    "https://www.woolworths.co.nz/shop/productdetails?stockcode=6014370&name=tegel-free-range-quick-cook-chicken-steaks-chargrilled",
  price: {
    value: "10.60",
    per: "ea",
    unitPrice: "26.50",
    unit: "1kg",
  },
  promo: {
    tag: "Disney Discs Bonus Products.",
  },
  supermarket: wls,
};

export const wlsProduct_disney_promo = {
  id: "363271",
  title: "tegel meal maker free range shredded roast chicken 100g 2 x 50g pks",
  image:
    "https://assets.woolworths.com.au/images/2010/363271.jpg?impolicy=wowcdxwbjbx&w=200&h=200",
  productPageUrl:
    "https://www.woolworths.co.nz/shop/productdetails?stockcode=363271&name=tegel-meal-maker-free-range-shredded-roast-chicken",
  price: {
    value: "5.69",
    per: "ea",
    unitPrice: "40.00",
    unit: "1kg",
  },
  promo: {
    tag: "Disney Discs Bonus Products.",
    value: "4.00",
    per: "ea",
  },
  supermarket: wls,
};
