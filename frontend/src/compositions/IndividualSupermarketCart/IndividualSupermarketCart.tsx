import { Text } from "@/components/retroui";
import { useCart } from "@/context/CartContext";

import { CartProduct } from "../CartProduct";

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
  const cartsData = useCart();
  const supermarketCart = cartsData[`${shopCode}Cart`];
  const { cartCosts } = cartsData;

  return (
    <div id={`${shopCode}-cart`}>
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
