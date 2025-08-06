import { Card } from "@/components/Card";
import { Input } from "@/components/retroui";

import nwData from "../../../../backend/app/assets/data/nw_actual.json";
import pnsData from "../../../../backend/app/assets/data/pns_actual.json";
import wlsData from "../../../../backend/app/assets/data/wls.json";

export function Browse() {
  return (
    <div>
      <div className="px-24 flex justify-center border-b border-b-black">
        <div className="w-[90%] my-14  ">
          <Input type="text" placeholder="Search Product" />
        </div>
      </div>

      <div className="browse-container flex justify-center">
        <div
          data-testid="nw"
          className="supermarket-container w-1/3 pb-10 bg-gray-300"
        >
          <h3 className=" text-center text-4xl py-6">New World</h3>
          <div
            data-testid="product-grid"
            className=" grid grid-cols-2 gap-2 px-2 justify-items-center "
          >
            {nwData.map((product) => (
              <Card
                key={product.id}
                imgSrc={product.image}
                productTitle={product.title}
                price={product.price.value}
                store={"New World"}
              />
            ))}
          </div>
        </div>
        <div
          data-testid="pns"
          className="supermarket-container w-1/3 pb-10 bg-gray-100 border-x"
        >
          <h3 className=" text-center text-4xl py-6">Pak'nSave</h3>
          <div
            data-testid="product-grid"
            className=" grid grid-cols-2 gap-2 px-2 justify-items-center "
          >
            {pnsData.map((product) => (
              <Card
                key={product.id}
                imgSrc={product.image}
                productTitle={product.title}
                price={product.price.value}
                store={"Pak'nSave"}
              />
            ))}
          </div>
        </div>
        <div
          data-testid="wls"
          className="supermarket-container w-1/3 pb-10 bg-gray-300"
        >
          <h3 className=" text-center text-4xl py-6">Woolworths</h3>
          <div
            data-testid="product-grid"
            className=" grid grid-cols-2 gap-2 px-2 justify-items-center "
          >
            {wlsData.results.map((product) => (
              <Card
                key={product.id}
                imgSrc={product.image}
                productTitle={product.title}
                price={product.price.value}
                store={"Woolworths"}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
