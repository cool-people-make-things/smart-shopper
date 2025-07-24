export type Promo = NWPromo | PNSPromo | WLSPromo;

type NWPromo = {
  tag: string;
  value: string;
  per: string;
  unitPrice: string;
  unit: string;
  limit?: string;
};

type PNSPromo = {
  tag: string;
  value: string;
};

type WLSPromo = {
  tag: string;
  value: string;
};
