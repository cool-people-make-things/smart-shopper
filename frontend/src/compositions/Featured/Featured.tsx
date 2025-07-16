import { Text } from "@/components/retroui";
import ItemCard from "../../components/ItemCard/ItemCard";

// TODO - Component using template data, will need to add api
// * This will effect both the props passed to the children
// * and also the title

export default function Featured() {
  return (
    <main className="bg-gray-100 w-screen p-8 pl-40 pr-40 border-t border-black">
      <Text as="h2" className="text-center">
        Featured items - Butter
      </Text>
      <div className="grid grid-cols-3 text-center mt-4 w-auto justify-items-center">
        <ItemCard
          imgSrc="https://a.fsimg.co.nz/product/retail/fan/image/400x400/5023660.png?w=384"
          productTitle="Pams Butter"
          price={8.45}
          store="New World"
        />
        <ItemCard
          imgSrc="https://a.fsimg.co.nz/product/retail/fan/image/400x400/5002650.png?w=384"
          productTitle="Anchor Butter"
          price={7.45}
          store="Pak'nSave"
        />
        <ItemCard
          imgSrc="https://a.fsimg.co.nz/product/retail/fan/image/400x400/5004821.png?w=384"
          productTitle="Rolling Meadow Butter"
          price={8.9}
          store="Woolworths"
        />
      </div>
    </main>
  );
}
