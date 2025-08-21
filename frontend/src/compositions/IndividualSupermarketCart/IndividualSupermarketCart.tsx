import { useMemo } from "react";

import { Text } from "@/components/retroui";

import { CartProduct } from "../CartProduct";

export function IndividualSupermarketCart({
  supermarket,
  shopCode,
}: {
  supermarket: string;
  shopCode: ShopCode;
}) {
  // TODO logic will be handled in Context
  const devInitialCart = useMemo(
    () => ({ nw: {}, pns: {}, wls: {} }) as Cart,
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
        <Text className="text-4xl font-semibold ">{supermarket}</Text>
        <Text
          data-testid="supermarket-spend"
          className="text-4xl font-semibold"
        >
          ${supermarketSpend}
        </Text>
      </div>
      {devInitialCart[shopCode] &&
        Object.entries(devInitialCart[shopCode]).map(([id, item]) => (
          <CartProduct item={item} key={id} />
        ))}
    </div>
  );
}
