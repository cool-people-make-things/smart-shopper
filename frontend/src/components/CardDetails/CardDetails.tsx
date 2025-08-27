import { useLocation } from "react-router-dom";
import { toast } from "sonner";

import { Button, RUICard } from "@/components/retroui";
import { supermarketTitles } from "@/lib/constants";

import type { ProductProps } from "../Card/Card";

// TODO /browse comp needs styling once in the browse grid

type CardDetailsProps = Omit<ProductProps, "imgSrc">;

export function CardDetails({
  productTitle,
  price,
  shopCode,
}: CardDetailsProps) {
  const { pathname } = useLocation();
  const isHome = pathname === "/";

  const addToCart = (item: string) => {
    toast.success(`${item} has been added to your cart`, {
      richColors: true,
      cancel: {
        label: "Undo",
        onClick: () => {
          alert(`${item} removed`);
        },
      },
    });
  };

  if (isHome) {
    return (
      <div data-testid="card-details">
        <RUICard.Header className="py-0">
          <RUICard.Title>{supermarketTitles[shopCode]}</RUICard.Title>
        </RUICard.Header>
        <RUICard.Content className="py-0">
          <p>{productTitle}</p>
        </RUICard.Content>
        <RUICard.Content className="flex justify-around  items-center">
          <p className="text-lg font-semibold">${price}</p>
          <Button onClick={() => addToCart(productTitle)}>Add to cart</Button>
        </RUICard.Content>
      </div>
    );
  } else {
    return (
      <div data-testid="card-details">
        <RUICard.Header className="py-0">
          <RUICard.Title className="text-center text-base">
            {productTitle}
          </RUICard.Title>
        </RUICard.Header>
        <RUICard.Content className="flex justify-around items-center">
          <p className="">${price}</p>
          <Button onClick={() => addToCart(productTitle)}>Add to cart</Button>
        </RUICard.Content>
      </div>
    );
  }
}
