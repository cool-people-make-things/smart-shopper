import { ProductColumnWithErrorBoundary } from "@/components/ProductColumn";
import { SearchBar } from "@/components/SearchBar";
import { useSearch } from "@/context/SearchContext";

export function Browse() {
  const { results } = useSearch();

  return (
    <div>
      <div className="px-24 flex justify-center border-b border-b-black">
        <div className="w-[90%] my-14">
          <SearchBar />
        </div>
      </div>

      <div className="browse-container grid grid-cols-3 divide-x divide-gray-600">
        {Object.entries(results).map(([shopCode, marketResult]) => (
          <ProductColumnWithErrorBoundary
            key={shopCode}
            marketResult={marketResult}
            shopCode={shopCode as ShopCode}
          />
        ))}
      </div>
    </div>
  );
}
