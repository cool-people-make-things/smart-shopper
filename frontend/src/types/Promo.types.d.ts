type Promo = NWPromo | PNSPromo | WLSPromo;

type NWPromo = {
  tag: string;
  value: string;
  per: string;
  unitPrice: string;
  unit: string;
  limit?: string;
};

type PNSPromo = PNSSimplePromo | PNSComplexPromo;

type PNSSimplePromo = {
  tag: string;
};

type PNSComplexPromo = {
  tag: string;
  value: string;
  unit: string;
  unitPrice: string;
  multibuyThreshold?: string;
  limit?: string;
};

type WLSPromo = WLSSimplePromo | WLSComplexPromo;

type WLSSimplePromo = {
  tag: string;
};

type WLSComplexPromo = {
  tag: string;
  value: string;
  per?: string;
  unit: string;
  unitPrice: string;
};
