import { Card } from "@/components/Card";
import { Text } from "@/components/retroui";
import {
  nwProduct,
  pnsProduct,
  wlsProduct,
} from "@/lib/test/fixtures/products";

export function Featured() {
  return (
    <section
      data-testid="featured-component"
      className="bg-gray-100 w-screen p-8 pl-40 pr-40 border-t border-black"
    >
      <Text as="h2" className="text-center">
        Featured items - Butter
      </Text>
      <div className="grid grid-cols-3 text-center mt-4 w-auto justify-items-center">
        <Card product={nwProduct} />
        <Card product={pnsProduct} />
        <Card product={wlsProduct} />
      </div>
    </section>
  );
}
