type Promo = SimplePromo | ComplexPromo | MultibuyPromo;

type SimplePromo = {
  tag: string;
};

type ComplexPromo = {
  tag: string;
  value: string;
  unitPrice?: string;
  unit?: string;
  per?: string;
  limit?: string;
};

type MultibuyPromo = ComplexPromo & {
  multibuyThreshold: string;
};
