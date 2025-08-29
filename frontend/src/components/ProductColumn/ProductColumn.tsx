import { supermarketTitles } from "@/lib/constants";

import { Card } from "../Card";
import { Text } from "../retroui";

type ProductColumnProps = {
  marketResult: SearchData;
  shopCode: ShopCode;
};

export function ProductColumn({ marketResult, shopCode }: ProductColumnProps) {
  const { data, isLoading, error } = marketResult;

  const supermarketName = supermarketTitles[shopCode];

  // TODO styled loading indicator
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
      <div
        data-testid="product-grid"
        className=" grid grid-cols-2 gap-2 px-2 justify-items-center "
      >
        {data && data.length !== 0 ? (
          data.map((product: Product) => (
            <Card product={product} key={product.id} />
          ))
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
    </div>
  );
}
