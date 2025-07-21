import { Price } from "./Price.types";
import { Promo } from "./Promo.types";

type Product = {
  id: string;
  title: string;
  amt?: string;
  image: string;
  productPageUrl: string;
  price: Price;
  promo: Promo;
};
