import { CartProductActions } from "@/components/CartProductActions";
import { Text } from "@/components/retroui";
import { getItemPrice } from "@/context/utils/calculateTotals";
import {
  getPrimaryData,
  hasLimit,
  hasMultibuyThreshold,
  isPromoWithValue,
} from "@/lib/typeGuards";

export function CartProduct({
  cartProductItem,
}: {
  cartProductItem: CartItem;
}) {
  const { product } = cartProductItem;
  const { price, promo } = product;

  const primaryData = getPrimaryData(price, promo);
  const runningItemPrice = getItemPrice(cartProductItem).toFixed(2);
  const isNonMultibuyPromo =
    isPromoWithValue(promo) && !hasMultibuyThreshold(promo);
  const isMultibuyPromo = hasMultibuyThreshold(promo);
  const isLimitPromo = hasLimit(promo);

  return (
    <section className="flex border items-center justify-center py-1">
      <div id="image-container" className="p-4">
        <img
          src={product?.image}
          alt={product?.title}
          className=" w-24 h-24 object-cover"
        />
      </div>

      <div id="information-container" className="flex-1">
        <div
          id="product-info"
          className="flex flex-col justify-between gap-2 mr-8"
        >
          <div id="product-title" className="">
            <Text className="text-xl font-medium">{product?.title}</Text>
          </div>

          <div id="promo-info" className="flex flex-row gap-2">
            <Text className="text-xl font-medium">
              ${isMultibuyPromo ? price.value : primaryData.value}
            </Text>

            {isNonMultibuyPromo && (
              <div id="product-promo-info" className="">
                <span className="flex flex-row gap-2 bg-gray-100 py-1 px-2">
                  <Text className="text-sm">Was ${price.value}</Text>
                </span>
              </div>
            )}

            {isMultibuyPromo && (
              <Text className="text-sm bg-gray-100 py-1 px-2">
                {promo.multibuyThreshold} for ${primaryData.value}
              </Text>
            )}

            {isLimitPromo && (
              <span>
                <Text className="text-sm bg-gray-100 py-1 px-2">
                  limit {promo.limit}
                </Text>
              </span>
            )}
          </div>
        </div>
      </div>

      <CartProductActions cartProductItem={cartProductItem} />
      <div id="running cost" className="mx-8 w-26 text-center">
        <Text className="text-2xl font-bold text-left">
          $ {runningItemPrice}
        </Text>
      </div>
    </section>
  );
}
