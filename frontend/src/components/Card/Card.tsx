import { RUICard } from "@/components/retroui";

import { CardDetails } from "../CardDetails";

export type ProductProps = {
  imgSrc: string;
  productTitle: string;
  price: string;
  store: string;
};

export function Card({ imgSrc, productTitle, price, store }: ProductProps) {
  return (
    <RUICard
      data-testid="product-card"
      className="w-[350px] shadow-none hover:shadow-none pt-1 pb-1"
    >
      <RUICard.Content className="py-0 flex justify-center">
        <img src={imgSrc} className="w-50 h-50 " alt={productTitle} />
      </RUICard.Content>
      <CardDetails productTitle={productTitle} price={price} store={store} />
    </RUICard>
  );
}
