import { Text } from "@/components/retroui";
import { useCart } from "@/context/CartContext";

export function TotalSpend() {
  const {
    cartCosts: { total },
  } = useCart();

  return (
    <div
      data-testid="total-spend"
      className="text-right mt-2 flex flex-col justify-end gap-2 font-semibold"
    >
      <Text className="text-3xl">Total Spend</Text>
      <Text className="text-5xl">$ {total}</Text>
    </div>
  );
}
