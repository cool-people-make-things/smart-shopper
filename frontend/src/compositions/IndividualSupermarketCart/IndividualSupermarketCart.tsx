import { Minus, Plus, Trash } from "lucide-react";
import { useMemo } from "react";

import { Button, Input, Label, Text } from "@/components/retroui";

const supermarketTitles = {
  nw: "New World",
  pns: "PAK'nSAVE",
  wls: "Woolworths",
};

export function IndividualSupermarketCart({
  shopCode,
}: {
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
          <div key={id} className="flex border items-center justify-center">
            <div className=" p-6">
              <img
                src={item.product.image}
                alt={item.product.title}
                className=" w-16 h-16 object-cover"
              />
            </div>
            <div className="flex-1 min-h-full">
              <Text className="text-md font-medium font-sans text-base">
                {item.product.title}
              </Text>
              <Text className=" font-sans text-base">
                ${item.product.price.value}
              </Text>
            </div>
            <div className="flex-1 flex justify-around min-h-full items-center gap-6">
              <div className="flex flex-row gap-4 items-center justify-around">
                <Label htmlFor="quantity" className="font-sans text-base">
                  Quantity:
                </Label>
                <div className="w-[50%]">
                  <Input type="number" value={item.quantity} id="quantity" />
                </div>
              </div>

              <div className="flex flex-col gap-5">
                <div className="flex gap-5 justify-between items-center">
                  <Button size="icon">
                    <Minus className="w-4 h-4" />
                  </Button>
                  <Button size="icon">
                    <Plus className="w-4 h-4" />
                  </Button>
                  <Button
                    size="icon"
                    className="bg-destructive text-white hover:bg-destructive/90"
                  >
                    <Trash className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}
