import { Card } from "@/components/Card";
import { Input } from "@/components/retroui";

export function Browse() {
  return (
    <div>
      <div className="px-24 flex justify-center border-b border-b-black">
        <div className="w-[90%] my-14  ">
          <Input type="text" placeholder="Search Product" />
        </div>
      </div>

      <div className="browse-container flex justify-center">
        <div className="supermarket-container nw w-1/3 pb-10 bg-gray-300">
          <h3 className=" text-center text-4xl py-6">New World</h3>
          <div className="product-grid grid grid-cols-2 gap-2 px-2 justify-items-center ">
            <Card
              imgSrc="https://a.fsimg.co.nz/product/retail/fan/image/400x400/5023660.png?w=384"
              productTitle="Pams Butter"
              price="8.45"
              store="New World"
            />
            <Card
              imgSrc="https://a.fsimg.co.nz/product/retail/fan/image/400x400/5023660.png?w=384"
              productTitle="Pams Butter"
              price="8.45"
              store="New World"
            />
            <Card
              imgSrc="https://a.fsimg.co.nz/product/retail/fan/image/400x400/5023660.png?w=384"
              productTitle="Pams Butter"
              price="8.45"
              store="New World"
            />
            <Card
              imgSrc="https://a.fsimg.co.nz/product/retail/fan/image/400x400/5023660.png?w=384"
              productTitle="Pams Butter"
              price="8.45"
              store="New World"
            />
            <Card
              imgSrc="https://a.fsimg.co.nz/product/retail/fan/image/400x400/5023660.png?w=384"
              productTitle="Pams Butter"
              price="8.45"
              store="New World"
            />
            <Card
              imgSrc="https://a.fsimg.co.nz/product/retail/fan/image/400x400/5023660.png?w=384"
              productTitle="Pams Butter"
              price="8.45"
              store="New World"
            />
          </div>
        </div>
        <div className="supermarket-container pns w-1/3 pb-10 bg-gray-100 border-x">
          <h3 className=" text-center text-4xl py-6">Pak'nSave</h3>
          <div className="product-grid grid grid-cols-2 gap-2 px-2 justify-items-center ">
            <Card
              imgSrc="https://a.fsimg.co.nz/product/retail/fan/image/400x400/5002650.png?w=384"
              productTitle="Anchor Butter"
              price="7.45"
              store="Pak'nSave"
            />
            <Card
              imgSrc="https://a.fsimg.co.nz/product/retail/fan/image/400x400/5002650.png?w=384"
              productTitle="Anchor Butter"
              price="7.45"
              store="Pak'nSave"
            />
            <Card
              imgSrc="https://a.fsimg.co.nz/product/retail/fan/image/400x400/5002650.png?w=384"
              productTitle="Anchor Butter"
              price="7.45"
              store="Pak'nSave"
            />
            <Card
              imgSrc="https://a.fsimg.co.nz/product/retail/fan/image/400x400/5002650.png?w=384"
              productTitle="Anchor Butter"
              price="7.45"
              store="Pak'nSave"
            />
            <Card
              imgSrc="https://a.fsimg.co.nz/product/retail/fan/image/400x400/5002650.png?w=384"
              productTitle="Anchor Butter"
              price="7.45"
              store="Pak'nSave"
            />
          </div>
        </div>
        <div className="supermarket-container wls w-1/3 pb-10 bg-gray-300">
          <h3 className=" text-center text-4xl py-6">Woolworths</h3>
          <div className="product-grid grid grid-cols-2 gap-2 px-2 justify-items-center ">
            <Card
              imgSrc="https://a.fsimg.co.nz/product/retail/fan/image/400x400/5004821.png?w=384"
              productTitle="Rolling Meadow Butter"
              price="8.90"
              store="Woolworths"
            />
            <Card
              imgSrc="https://a.fsimg.co.nz/product/retail/fan/image/400x400/5004821.png?w=384"
              productTitle="Rolling Meadow Butter"
              price="8.90"
              store="Woolworths"
            />
            <Card
              imgSrc="https://a.fsimg.co.nz/product/retail/fan/image/400x400/5004821.png?w=384"
              productTitle="Rolling Meadow Butter"
              price="8.90"
              store="Woolworths"
            />
            <Card
              imgSrc="https://a.fsimg.co.nz/product/retail/fan/image/400x400/5004821.png?w=384"
              productTitle="Rolling Meadow Butter"
              price="8.90"
              store="Woolworths"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
