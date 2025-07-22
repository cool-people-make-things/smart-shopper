import { Card } from "@/components/Card";
import { Text } from "@/components/retroui";

export function Featured() {
  return (
    <section className="bg-gray-100 w-screen p-8 pl-40 pr-40 border-t border-black">
      <Text as="h2" className="text-center">
        Featured items - Butter
      </Text>
      <div className="grid grid-cols-3 text-center mt-4 w-auto justify-items-center">
        <Card
          imgSrc="https://a.fsimg.co.nz/product/retail/fan/image/400x400/5023660.png?w=384"
          productTitle="Pams Butter"
          price="8.45"
          store="New World"
        />
        <Card
          imgSrc="https://a.fsimg.co.nz/product/retail/fan/image/400x400/5002650.png?w=384"
          productTitle="Anchor Butter"
          price="7.45"
          store="Pak'nSave"
        />
        <Card
          imgSrc="https://a.fsimg.co.nz/product/retail/fan/image/400x400/5004821.png?w=384"
          productTitle="Rolling Meadow Butter"
          price="8.9"
          store="Woolworths"
        />
      </div>
    </section>
  );
}
