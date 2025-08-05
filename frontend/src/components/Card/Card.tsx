import { useLocation } from "react-router";

import { RUICard } from "@/components/retroui";

import { CardDetails } from "../CardDetails";

export type ProductProps = {
  imgSrc: string;
  productTitle: string;
  price: string;
  store: string;
};

export function Card({ imgSrc, productTitle, price, store }: ProductProps) {
  const { pathname } = useLocation();
  const isHome = pathname === "/";

  if (isHome) {
    return (
      <RUICard className="w-[350px] shadow-none hover:shadow-none pt-1 pb-1">
        <RUICard.Content className="py-0 flex justify-center">
          <img src={imgSrc} className="w-50 h-50 " alt={productTitle} />
        </RUICard.Content>
        <CardDetails productTitle={productTitle} price={price} store={store} />
      </RUICard>
    );
  } else {
    return (
      <RUICard className="shadow-none hover:shadow-none pt-1 pb-1 w-[80%]">
        <RUICard.Content className="py-0 flex justify-center">
          <img src={imgSrc} className="w-30 h-30 " alt={productTitle} />
        </RUICard.Content>
        <CardDetails productTitle={productTitle} price={price} store={store} />
      </RUICard>
    );
  }
}
