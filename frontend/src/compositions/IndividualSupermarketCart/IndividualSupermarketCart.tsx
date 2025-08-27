import { useMemo } from "react";

import { Text } from "@/components/retroui";
import { supermarketTitles } from "@/lib/constants";

import { CartProduct } from "../CartProduct";

export function IndividualSupermarketCart({
  shopCode,
}: {
  shopCode: ShopCode;
}) {
  // TODO logic will be handled in Context
  const devInitialCart = useMemo(
    () => ({ nw: {}, pns: {}, wls: {} }) as CombinedCart,
    [],
  );

  // TODO logic will be handled in Context
  const supermarketSpend = useMemo(() => {
    const supermarketTotal = Object.values(devInitialCart[shopCode])
      .reduce(
        (cost, item) =>
          cost + item.quantity * parseFloat(item.product.price.value),
        0,
      )
      .toFixed(2);
    return supermarketTotal;
  }, [shopCode, devInitialCart]);

  return (
    <div id="new-world-cart">
      <div className="flex flex-row justify-between mb-4">
        <Text className="text-4xl font-semibold ">
          {supermarketTitles[shopCode]}
        </Text>
        <Text
          data-testid="supermarket-spend"
          className="text-4xl font-semibold"
        >
          ${supermarketSpend}
        </Text>
      </div>
      {devInitialCart[shopCode] &&
        Object.entries(devInitialCart[shopCode]).map(([id, item]) => (
          <CartProduct cartProductItem={item} key={id} />
        ))}
    </div>
  );
}
