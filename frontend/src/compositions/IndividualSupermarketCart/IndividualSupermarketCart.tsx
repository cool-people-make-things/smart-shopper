import { Text } from "@/components/retroui";
import { useCart } from "@/context/CartContext";
import { supermarketTitles } from "@/lib/constants";

import { CartProduct } from "../CartProduct";

export function IndividualSupermarketCart({
  shopCode,
}: {
  shopCode: ShopCode;
}) {
  const cartsData = useCart();
  const supermarketCart = cartsData[`${shopCode}Cart`];
  const { cartCosts } = cartsData;

  return (
    <div data-testid="individual-shopping-cart" id={`${shopCode}-cart`}>
      <div className="flex flex-row justify-between mb-4">
        <Text className="text-4xl font-semibold ">
          {supermarketTitles[shopCode]}
        </Text>
        <Text
          data-testid="supermarket-spend"
          className="text-4xl font-semibold"
        >
          ${cartCosts[shopCode]}
        </Text>
      </div>

      {supermarketCart &&
        Object.values(supermarketCart).map((item) => (
          <CartProduct cartProductItem={item} key={item.product.id} />
        ))}
    </div>
  );
}
