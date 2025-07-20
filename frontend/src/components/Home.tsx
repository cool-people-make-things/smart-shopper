import { Button, Input, Text, Card } from "@/components/retroui";
import { toast } from "sonner";

export default function Home() {
  const addToCart = (item: string) => {
    toast.success(`${item} has been added to your cart`, {
      // description: " items in cart",
      richColors: true,
      cancel: {
        label: "See Cart",
        onClick: () => {
          alert("Cart clicked!");
        },
      },
    });
  };

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

      <div className="bg-gray-100 w-screen h-13/20 p-8 pl-40 pr-40 border-t border-black">
        <Text as="h2" className="text-center">
          Featured items - Butter
        </Text>
        <div className="grid grid-cols-3 text-center mt-4 w-auto justify-items-center">
          <Card className="w-[350px] shadow-none hover:shadow-none pt-1 pb-1">
            <Card.Content className="pb-0 pt-0 flex justify-center">
              <img
                src="https://a.fsimg.co.nz/product/retail/fan/image/400x400/5023660.png?w=384"
                className="w-50 h-50 "
                alt="Pams Butter"
              />
            </Card.Content>
            <Card.Header className="pb-0 pt-0">
              <Card.Title>New World</Card.Title>
            </Card.Header>
            <Card.Content className="pb-0 pt-0">
              <p>Pams Butter</p>
            </Card.Content>
            <Card.Content className="flex justify-between items-center">
              <p className="text-lg font-semibold">$8.45</p>
              <Button onClick={() => addToCart("Pams Butter")}>
                Add to cart
              </Button>
            </Card.Content>
          </Card>

          <Card className="w-[350px] shadow-none hover:shadow-none pt-1 pb-1">
            <Card.Content className="pb-0 pt-0 flex justify-center">
              <img
                src="https://a.fsimg.co.nz/product/retail/fan/image/400x400/5002650.png?w=384"
                className="w-50 h-50 "
                alt="Anchor Butter"
              />
            </Card.Content>
            <Card.Header className="pb-0 pt-0">
              <Card.Title>Pak'nSave</Card.Title>
            </Card.Header>
            <Card.Content className="pb-0 pt-0">
              <p>Anchor Butter</p>
            </Card.Content>
            <Card.Content className="flex justify-between items-center">
              <p className="text-lg font-semibold">$7.45</p>
              <Button onClick={() => addToCart("Anchor Butter")}>
                Add to cart
              </Button>
            </Card.Content>
          </Card>

          <Card className="w-[350px] shadow-none hover:shadow-none pt-1 pb-1">
            <Card.Content className="pb-0 pt-0 flex justify-center">
              <img
                src="https://a.fsimg.co.nz/product/retail/fan/image/400x400/5004821.png?w=384"
                className="w-50 h-50"
                alt="Rolling Meadow Butter"
              />
            </Card.Content>
            <Card.Header className="pb-0 pt-0">
              <Card.Title>Woolworths</Card.Title>
            </Card.Header>
            <Card.Content className="pb-0 pt-0">
              <p>Rolling Meadow Butter</p>
            </Card.Content>
            <Card.Content className="flex justify-between items-center">
              <p className="text-lg font-semibold">$8.90</p>
              <Button onClick={() => addToCart("Rolling Meadow Butter")}>
                Add to cart
              </Button>
            </Card.Content>
          </Card>
        </div>
      </div>
    </main>
  );
}
