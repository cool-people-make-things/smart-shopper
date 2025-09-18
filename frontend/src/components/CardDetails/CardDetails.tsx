import { useLocation } from "react-router-dom";

import { Button, RUICard } from "@/components/retroui";
import { useCart } from "@/context/CartContext";
import { supermarketTitles } from "@/lib/constants";

import {
  addToCartWithToast,
  getLimit,
  getMultibuyThreshold,
  getPrimaryData,
} from "../../lib/productDetails";

export function CardDetails({ product }: { product: Product }) {
  const { title, price, supermarket, promo } = product;
  const { pathname } = useLocation();
  const isHome = pathname === "/";
  const { addCartItem, removeCartItem } = useCart();

  const primaryData = getPrimaryData(price, promo);
  const multibuyThreshold = getMultibuyThreshold(promo);
  const limit = getLimit(promo);

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
            {limit && (
              <p className={isHome ? "text-md" : "text-sm"}>limit {limit}</p>
            )}

            {multibuyThreshold && (
              <p className={isHome ? "text-md" : "text-sm"}>
                {multibuyThreshold} for
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
          {promo && "value" in promo && (
            <div className="flex flex-row gap-2 text-right">
              <p className="self-center">Was</p>
              <div className="self-center">
                <p className={isHome ? "font-bold text-2xl" : "font-bold"}>
                  ${price.value}
                </p>
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
