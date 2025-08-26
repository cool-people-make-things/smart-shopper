import { Minus, Plus, Trash } from "lucide-react";

import { Button, Input, Label, Text } from "@/components/retroui";

export function CartProduct({
  cartProductItem,
}: {
  cartProductItem: CartItem;
}) {
  const { product, quantity } = cartProductItem;
  return (
    <div className="flex border items-center justify-center">
      <div className=" p-6">
        <img
          src={product?.image}
          alt={product?.title}
          className=" w-16 h-16 object-cover"
        />
      </div>
      <div className="flex-1 min-h-full">
        <Text className="text-xl font-medium font-sans">
          {product?.title ?? ""}
        </Text>
        <Text className="inline-block bg-gray-100 rounded-md text-xl font-sans py-1 px-3">
          ${product?.price?.value ?? "0.00"}
        </Text>
      </div>
      <div className="flex-1 flex justify-around min-h-full items-center gap-6">
        <div className="flex flex-row gap-4 items-center justify-around">
          <Label htmlFor="quantity" className="font-sans text-base">
            Quantity:
          </Label>
          <div className="w-[50%]">
            <Input type="number" value={quantity ?? 0} id="quantity" />
          </div>
        </div>

        <div className="flex flex-col gap-5">
          <div className="flex gap-5 justify-between items-center">
            <Button size="icon" aria-label="Decrease quantity">
              <Minus className="w-4 h-4" />
            </Button>
            <Button size="icon" aria-label="Increase quantity">
              <Plus className="w-4 h-4" />
            </Button>
            <Button
              size="icon"
              className="bg-destructive text-white hover:bg-destructive/90"
              aria-label="Remove from cart"
            >
              <Trash className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
