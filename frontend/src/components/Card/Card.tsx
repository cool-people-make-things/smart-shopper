import { useLocation } from "react-router-dom";

import { RUICard } from "@/components/retroui";
import { cn } from "@/lib/retroui.utils";

import { CardDetails } from "../CardDetails";

export function Card({ product }: { product: Product }) {
  const { pathname } = useLocation();
  const isHome = pathname === "/";

  return (
    <RUICard
      className={cn(
        "shadow-none hover:shadow-none pt-1 pb-1",
        isHome ? "w-[350px]" : "w-[80%]",
      )}
    >
      <RUICard.Content className="py-0 flex justify-center">
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
