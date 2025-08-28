import { Card } from "../Card";
import { Text } from "../retroui";

type ProductColumnProps = {
  data: Product[];
  store: string;
};

export function ProductColumn({ data, store }: ProductColumnProps) {
  return (
    <div
      data-testid="nw"
      className={`supermarket-container w-full pb-10 ${store === "PAK'nSAVE" ? "bg-gray-100" : "bg-gray-300"}`}
    >
      <Text as={"h2"} className="py-6 text-center">
        {store ? store : "Error displaying Supermarket name"}
      </Text>
      <div
        data-testid="product-grid"
        className=" grid grid-cols-2 gap-2 px-2 justify-items-center "
      >
        {data && data.length !== 0 ? (
          data.map((product) => <Card product={product} key={product.id} />)
        ) : (
          <Text className="text-center" as={"h4"}>
            No products at {store}...
          </Text>
        )}
      </div>
    </div>
  );
}
