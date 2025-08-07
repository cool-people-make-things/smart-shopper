import { ProductColumn } from "@/components/ProductColumn";
import { Input } from "@/components/retroui";
import nwData from "@/lib/test/fixtures/nw_actual.json";
import pnsData from "@/lib/test/fixtures/pns_actual.json";
import wlsData from "@/lib/test/fixtures/wls_actual.json";

export function Browse() {
  const dummyData = {
    nw: { data: nwData, store: "New World" },
    pns: { data: pnsData, store: "Pak'nSave" },
    wls: { data: wlsData, store: "Woolworths" },
  };

  return (
    <div>
      <div className="px-24 flex justify-center border-b border-b-black">
        <div className="w-[90%] my-14  ">
          <Input type="text" placeholder="Search Product" />
        </div>
      </div>

      <div className="browse-container grid grid-cols-3 divide-x divide-gray-600">
        <ProductColumn {...dummyData.nw} />
        <ProductColumn {...dummyData.pns} />
        <ProductColumn {...dummyData.wls} />
      </div>
    </div>
  );
}
