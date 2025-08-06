import { ProductColumn } from "@/components/ProductColumn";
import { Input } from "@/components/retroui";

import nwData from "../../../../backend/app/assets/data/nw_actual.json";
import pnsData from "../../../../backend/app/assets/data/pns_actual.json";
import wlsData from "../../../../backend/app/assets/data/wls.json";

export function Browse() {
  if (!nwData && !pnsData && !wlsData) {
    return (
      <div>
        <div className="px-24 flex justify-center border-b border-b-black">
          <div className="w-[90%] my-14  ">
            <Input type="text" placeholder="Search Product" />
          </div>
        </div>
        <p>Something has gone wrong, try again...</p>
      </div>
    );
  }

  const dummyData = {
    nw: { data: nwData, store: "New World" },
    pns: { data: pnsData, store: "Pak'nSave" },
    wls: { data: wlsData.results, store: "Woolworths" },
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
