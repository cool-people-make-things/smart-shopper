import { ChevronLeft, Save } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { Text } from "@/components/retroui";
import { Button } from "@/components/retroui/Button";
import { EmptyCartButton } from "@/compositions/elements/EmptyCartButton";
import { IndividualSupermarketCart } from "@/compositions/IndividualSupermarketCart";
import { useCart } from "@/context/CartContext";

export function Cart() {
  const navigate = useNavigate();
  const { cartCosts } = useCart();

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
          <EmptyCartButton />
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
            <Text className="text-2xl font-semibold">${cartCosts.total}</Text>
          </div>
        </div>

        <div className="text-lg font-semibold flex gap-20 flex-row justify-center my-8">
          <Button>
            <Save className="h-4 w-4 mr-2" />
            Save To Clipboard
          </Button>
          <EmptyCartButton />
        </div>
      </>
    </div>
  );
}
