type Product = {
  supermarket: ShopCode;
  id: string;
  title: string;
  image: string;
  productPageUrl: string;
  price: Price;
  promo: Promo | null;
};

type ShopCode = "nw" | "pns" | "wls";
