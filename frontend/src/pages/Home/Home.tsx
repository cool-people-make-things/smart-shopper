import { Input, Text } from "@/components/retroui";

import Featured from "../../compositions/Featured/Featured";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center h-8/10">
      <div className="w-screen h-7/20 flex flex-row">
        <div className="w-1/2 px-24 flex flex-col justify-center">
          <Input type="text" placeholder="Search Product" />
        </div>
        <div className="bg-gray-100 w-1/2 px-16 py-10 flex flex-col justify-between border-l border-black">
          <Text as="h2">Welcome!</Text>
          <Text className="font-sans text-base">
            At smart shopper we're here to help you build your shopping list
            across New Zealand's big brand supermarkets. Inspired by the rising
            costs of butter, we want to spend our money wisely but without the
            hassle of tramping back and forth between them.
          </Text>
          <Text className="font-sans text-base">
            Smart shopper will create a shopping list of items you choose and
            where you want them from.
          </Text>
        </div>
      </div>

      <div>
        <Featured />
      </div>
    </main>
  );
}
