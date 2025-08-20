import { ChevronLeft, Minus, Plus, Save, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Input, Label, Text } from "@/components/retroui";
import { Button } from "@/components/retroui/Button";

type SupermarketSpend = {
  nwTotal: string;
  pnsTotal: string;
  wlsTotal: string;
  totalSpend: string;
};

export function Cart() {
  const navigate = useNavigate();
  const devInitialCart = { nw: {}, pns: {}, wls: {} } as Cart;
  const [supermarketSpend, setSupermarketSpend] = useState(
    {} as SupermarketSpend,
  );

  // Calculate the total spend for each supermarket and the overall total
  useEffect(() => {
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
    setSupermarketSpend({ nwTotal, pnsTotal, wlsTotal, totalSpend });
  }, []);

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
        <div className="flex flex-col  mt-5">
          <div className=" space-y-4 ">
            <div id="new-world-cart">
              <div className="flex flex-row justify-between mb-4">
                <Text className="text-4xl font-semibold ">New World</Text>
                <Text className="text-4xl font-semibold">
                  ${supermarketSpend.nwTotal}
                </Text>
              </div>
              {devInitialCart.nw &&
                Object.entries(devInitialCart.nw).map(([id, item]) => (
                  <div
                    key={id}
                    className="flex border items-center justify-center"
                  >
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
                        <Label
                          htmlFor="quantity"
                          className="font-sans text-base"
                        >
                          Quantity:
                        </Label>
                        <div className="w-[50%]">
                          <Input
                            placeholder={String(item.quantity)}
                            id="quantity"
                          />
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
            <div id="pak-n-save-cart">
              <div className="flex flex-row justify-between mb-4">
                <Text className="text-4xl font-semibold">Pak'nSave</Text>
                <Text className="text-4xl font-semibold">
                  ${supermarketSpend.pnsTotal}
                </Text>
              </div>
              {devInitialCart.pns &&
                Object.entries(devInitialCart.pns).map(([id, item]) => (
                  <div
                    key={id}
                    className="flex border items-center justify-center"
                  >
                    <div className=" p-6">
                      <img
                        src={item.product.image}
                        alt={item.product.title}
                        className="w-24 h-24 object-cover"
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
                        <Label
                          htmlFor="quantity"
                          className="font-sans text-base"
                        >
                          Quantity:
                        </Label>
                        <div className="w-[50%]">
                          <Input
                            placeholder={String(item.quantity)}
                            id="quantity"
                          />
                        </div>
                      </div>

                      <div className="flex flex-col gap-5">
                        <div className="flex gap-5 justify-between items-center">
                          <Button size="icon">
                            <Minus className="w-4 h-4" />
                          </Button>
                          <Text className="font-sans text-base">
                            {item.quantity}
                          </Text>
                          <Button size="icon">
                            <Plus className="w-4 h-4" />
                          </Button>
                        </div>
                        <Button className="bg-destructive text-white hover:bg-destructive/90">
                          <Trash />
                          Remove
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
            <div id="woolworths-cart">
              <div className="flex flex-row justify-between mb-4">
                <Text className="text-4xl font-semibold">Woolworths</Text>
                <Text className="text-4xl font-semibold">
                  ${supermarketSpend.wlsTotal}
                </Text>
              </div>
              {devInitialCart.wls &&
                Object.entries(devInitialCart.wls).map(([id, item]) => (
                  <div
                    key={id}
                    className="flex border items-center justify-center"
                  >
                    <div className=" p-6">
                      <img
                        src={item.product.image}
                        alt={item.product.title}
                        className="w-24 h-24 object-cover"
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
                        <Label
                          htmlFor="quantity"
                          className="font-sans text-base"
                        >
                          Quantity:
                        </Label>
                        <div className="w-[50%]">
                          <Input
                            placeholder={String(item.quantity)}
                            id="quantity"
                          />
                        </div>
                      </div>

                      <div className="flex flex-col gap-5">
                        <div className="flex gap-5 justify-between items-center">
                          <Button size="icon">
                            <Minus className="w-4 h-4" />
                          </Button>
                          <Text className="font-sans text-base">
                            {item.quantity}
                          </Text>
                          <Button size="icon">
                            <Plus className="w-4 h-4" />
                          </Button>
                        </div>
                        <Button className="bg-destructive text-white hover:bg-destructive/90">
                          <Trash />
                          Remove
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <div className="w-1/3 text-right">
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
