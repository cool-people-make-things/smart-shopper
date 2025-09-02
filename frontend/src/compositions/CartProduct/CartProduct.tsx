import { CartProductActions } from "@/components/CartProductActions";
import { Text } from "@/components/retroui";

export function CartProduct({
  cartProductItem,
}: {
  cartProductItem: CartItem;
}) {
  const { product } = cartProductItem;
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
      <CartProductActions cartProductItem={cartProductItem} />
    </div>
  );
}
