import { useLocation } from "react-router-dom";

import { RUICard } from "@/components/retroui";
import { cn } from "@/lib/retroui.utils";

import { CardDetails } from "../CardDetails";
import { PromoSticker } from "../PromoSticker";
import { formatPromoTagText } from "./utils/promoTag";

export function Card({ product }: { product: Product }) {
  const { pathname } = useLocation();
  const isHome = pathname === "/";

  const promoTag = formatPromoTagText(product.promo?.tag);

  return (
    <RUICard
      className={cn(
        "relative shadow-none hover:shadow-none pb-1 flex flex-col",
        isHome ? "w-[350px]" : "w-[80%]",
      )}
    >
      {promoTag && <PromoSticker label={promoTag} />}

      <RUICard.Content
        className={cn("pb-4 flex justify-center", promoTag ? "pt-14" : "pt-6")}
      >
        <img
          src={product.image}
          className={cn(isHome ? "w-50 h-50 " : "w-30 h-30")}
          alt={product.title}
        />
      </RUICard.Content>
      <CardDetails product={product} />
    </RUICard>
  );
}
