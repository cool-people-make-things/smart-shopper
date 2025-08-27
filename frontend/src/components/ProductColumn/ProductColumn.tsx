import type { MarketResult } from "@/hooks/useSearchAllSupermarkets";
import { supermarketTitles } from "@/lib/constants";

import { Card } from "../Card";
import { Text } from "../retroui";

type ProductColumnProps = {
  marketResult: MarketResult;
  shopCode: ShopCode;
};

export function ProductColumn({ marketResult, shopCode }: ProductColumnProps) {
  const { data, isLoading, error } = marketResult;

  const supermarketName = supermarketTitles[shopCode];

  // TODO styled loading indcator
  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error</p>;
  }

  return (
    <div
      className={`supermarket-container w-full pb-10 ${shopCode === "pns" ? "bg-gray-100" : "bg-gray-300"}`}
    >
      <Text as={"h2"} className="py-6 text-center">
        {supermarketName
          ? supermarketName
          : "Error displaying supermarket name"}
      </Text>

      {data && data.length !== 0 ? (
        <div
          data-testid="product-grid"
          className="grid grid-cols-2 gap-2 px-2 justify-items-center"
        >
          {data.map((product) => (
            <Card
              key={`${shopCode}-${product.id}`}
              imgSrc={product.image}
              productTitle={product.title}
              price={product.price.value}
              promo={product.promo}
              shopCode={shopCode}
            />
          ))}
        </div>
      ) : (
        <div
          data-testid="product-grid"
          className="grid grid-cols-1 gap-2 px-2 justify-items-center"
        >
          <Text className="text-center" as={"h4"}>
            No product results to display.
          </Text>
        </div>
      )}
    </div>
  );
}
