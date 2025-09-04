import { Card } from "@/components/Card";
import { Fallback } from "@/components/Fallback";
import { withErrorBoundary } from "@/components/Fallback/WithErrorBoundary";
import { Text } from "@/components/retroui";
import { LoadingIndicator } from "@/elements/LoadingIndicator";
import { supermarketTitles } from "@/lib/constants";

type ProductColumnProps = {
  marketResult: SearchData;
  shopCode: ShopCode;
};

function ProductColumn({ marketResult, shopCode }: ProductColumnProps) {
  const { data, isLoading, error } = marketResult;

  const supermarketName = supermarketTitles[shopCode];

  if (isLoading) {
    return <LoadingIndicator />;
  }

  if (error) {
    return (
      <Fallback
        error={error}
        message="Something went wrong while fetching products. Please try again later."
      />
    );
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

export const ProductColumnWithErrorBoundary = withErrorBoundary(ProductColumn, {
  message: "Unable to display products for this store",
  FallbackComponent: Fallback,
});
