import { useLocation } from "react-router-dom";

import { Button, RUICard } from "@/components/retroui";
import { useCart } from "@/context/CartContext";
import { supermarketTitles } from "@/lib/constants";
import {
  getPrimaryData,
  hasLimit,
  hasMultibuyThreshold,
  isPromoWithValue,
} from "@/lib/typeGuards";

import { addToCartWithToast } from "./utils/addToCart";

export function CardDetails({ product }: { product: Product }) {
  const { title, price, supermarket, promo } = product;
  const { pathname } = useLocation();
  const isHome = pathname === "/";
  const { addCartItem, removeCartItem } = useCart();

  const primaryData = getPrimaryData(price, promo);

  const isPromo = isPromoWithValue(promo);
  const isMultibuyPromo = hasMultibuyThreshold(promo);
  const isLimitPromo = hasLimit(promo);

  const addToCart = () =>
    addToCartWithToast({ addCartItem, removeCartItem, supermarket, product });

  return (
    <div
      data-testid="card-details"
      className="flex flex-col flex-1 justify-end"
    >
      <RUICard.Header className="py-0">
        <RUICard.Title className={isHome ? "" : "text-center text-base"}>
          {isHome ? supermarketTitles[supermarket] : title}
        </RUICard.Title>
      </RUICard.Header>

      {isHome && (
        <RUICard.Content className="py-0">
          <p>{title}</p>
        </RUICard.Content>
      )}

      <RUICard.Content className="flex flex-col gap-4">
        <div className="flex flex-row justify-between flex-1 ">
          <div className="flex flex-col justify-center">
            {isLimitPromo && (
              <p className={isHome ? "text-md" : "text-sm"}>
                limit {promo.limit}
              </p>
            )}

            {isMultibuyPromo && (
              <p className={isHome ? "text-md" : "text-sm"}>
                {promo.multibuyThreshold} for
              </p>
            )}

            <p className={isHome ? "font-bold text-4xl" : "font-bold text-3xl"}>
              ${primaryData.value}
            </p>

            {primaryData.unitPrice != null && (
              <p className="text-left text-sm">
                ${primaryData.unitPrice}/{primaryData.unit}
              </p>
            )}
          </div>

          {isPromo && (
            <div className="flex flex-col gap-2 text-right justify-center">
              <div className="self-center">
                <div className="flex flex-row gap-2 items-end justify-end">
                  <p className="self-center text-sm">
                    {isMultibuyPromo ? "Each" : "Was"}
                  </p>
                  <p className={isHome ? "font-bold text-2xl" : "font-bold"}>
                    ${price.value}
                  </p>
                </div>

                <p className={isHome ? "text-sm" : "text-xs"}>
                  {price.unitPrice != null && (
                    <span>
                      ${price.unitPrice}/{price.unit}
                    </span>
                  )}
                </p>
              </div>
            </div>
          )}
        </div>
        <Button className="flex justify-center" onClick={addToCart}>
          Add to cart
        </Button>
      </RUICard.Content>
    </div>
  );
}
