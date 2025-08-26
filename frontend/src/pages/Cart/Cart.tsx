import { ChevronLeft, Save, Trash } from "lucide-react";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";

import { Text } from "@/components/retroui";
import { Button } from "@/components/retroui/Button";
import { IndividualSupermarketCart } from "@/compositions/IndividualSupermarketCart";

type SupermarketSpend = {
  nwTotal: string;
  pnsTotal: string;
  wlsTotal: string;
  totalSpend: string;
};

export function Cart() {
  const navigate = useNavigate();

  // TODO logic will be handled in Context
  const devInitialCart = useMemo(
    () => ({ nw: {}, pns: {}, wls: {} }) as CombinedCart,
    [],
  );

  // TODO logic will be handled in Context
  const supermarketSpend: SupermarketSpend = useMemo(() => {
    const nwTotal = Object.values(devInitialCart.nw)
      .reduce(
        (cost, item) =>
          cost + item.quantity * parseFloat(item.product.price.value),
        0,
      )
      .toFixed(2);

    const pnsTotal = Object.values(devInitialCart.pns)
      .reduce(
        (cost, item) =>
          cost + item.quantity * parseFloat(item.product.price.value),
        0,
      )
      .toFixed(2);

    const wlsTotal = Object.values(devInitialCart.wls)
      .reduce(
        (cost, item) =>
          cost + item.quantity * parseFloat(item.product.price.value),
        0,
      )
      .toFixed(2);

    const totalSpend = (+nwTotal + +pnsTotal + +wlsTotal).toFixed(2);

    return { nwTotal, pnsTotal, wlsTotal, totalSpend };
  }, [devInitialCart]);

  return (
    <div className="min-h-screen flex flex-col gap-5 w-2/3 mx-auto">
      <div className="flex justify-between mt-5">
        <Button className="text-lg font-semibold" onClick={() => navigate("/")}>
          <ChevronLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <span className="text-lg font-semibold flex gap-4 flex-row">
          <Button>
            <Save className="h-4 w-4 mr-2" />
            Save To Clipboard
          </Button>
          <Button className="bg-destructive text-white hover:bg-destructive/90">
            <Trash className="h-4 w-4 mr-2" /> Empty Cart
          </Button>
        </span>
      </div>

      <>
        <div className="flex flex-col space-y-4 mt-5">
          <IndividualSupermarketCart shopCode="nw" />
          <IndividualSupermarketCart shopCode="pns" />
          <IndividualSupermarketCart shopCode="wls" />
        </div>

        <div className="flex justify-end">
          <div data-testid="total-spend" className="w-1/3 text-right">
            <Text as={"h3"} className="text-2xl font-semibold">
              Total Spend
            </Text>
            <Text className="text-2xl font-semibold">
              ${supermarketSpend.totalSpend}
            </Text>
          </div>
        </div>

        <div className="text-lg font-semibold flex gap-20 flex-row justify-center my-8">
          <Button>
            <Save className="h-4 w-4 mr-2" />
            Save To Clipboard
          </Button>
          <Button className="bg-destructive text-white hover:bg-destructive/90">
            <Trash className="h-4 w-4 mr-2" />
            Empty Cart
          </Button>
        </div>
      </>
    </div>
  );
}
