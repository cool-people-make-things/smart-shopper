module MockTestData
  PNS_MULTIBUY_OBJ = {
    id: "5109655",
    title: "Mogu Mogu Lychee Juice With Nate De Coco",
    amt: "320ml",
    image: "https://a.fsimg.co.nz/product/retail/fan/image/400x400/5109655.png?w=384",
    productPageUrl: "/shop/product/5109655_ea_000pns?name=mogu-mogu-lychee-juice-with-nate-de-coco",
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
  }

  PNS_LIMIT_OBJ = {
    id: "5236273",
    title: "Karicare 1 Baby Infant Formula From Birth to 6 Months",
    amt: "900g",
    image: "https://a.fsimg.co.nz/product/retail/fan/image/400x400/5236273.png?w=384",
    productPageUrl: "/shop/product/5236273_ea_000pns?name=karicare-1-baby-infant-formula-from-birth-to-6-months",
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
  }
  PNS_EXTRA_LOW_OBJ = {
    id: "5011024",
    title: "Arnott's Shapes Originals Chicken Crimpy Crackers",
    amt: "175g",
    image: "https://a.fsimg.co.nz/product/retail/fan/image/400x400/5011024.png?w=384",
    productPageUrl: "/shop/product/5011024_ea_000pns?name=arnott%27s-shapes-originals-chicken-crimpy-crackers",
    price: {
      value: "1.99",
      per: "ea",
      unitPrice: "1.14",
      unit: "100g",
    },
    promo: {
      tag: "Extra Low",
    },
  }

  PNS_NORMAL_OBJ = {
    id: "5236771",
    title: "Flying Goose Original Sriracha Hot Chilli Sauce",
    amt: "455ml",
    image: "https://a.fsimg.co.nz/product/retail/fan/image/400x400/5236771.png?w=384",
    productPageUrl: "/shop/product/5236771_ea_000pns?name=flying-goose-original-sriracha-hot-chilli-sauce",
    price: {
      value: "8.49",
      per: "ea",
      unitPrice: "1.87",
      unit: "100ml",
    },
    promo: nil,
  }

  PNS_RETURN_OBJ = {
    query: "mogumogu",
    supermarket: "pns",
    source: "https://www.paknsave.co.nz/shop/search?pg=1&q=mogumogu",
    results: [PNS_MULTIBUY_OBJ, PNS_LIMIT_OBJ, PNS_EXTRA_LOW_OBJ, PNS_NORMAL_OBJ],
  }
end
