import { Button, Card } from "@/components/retroui";
import { toast } from "sonner";

interface ProductProps {
  imgSrc: string;
  productTitle: string;
  price: number;
  store: string;
}

export default function ItemCard({
  imgSrc,
  productTitle,
  price,
  store,
}: ProductProps) {
  const addToCart = (item: string) => {
    toast.success(`${item} has been added to your cart`, {
      richColors: true,
      cancel: {
        label: "Undo",
        onClick: () => {
          alert("Item removed!");
        },
      },
    });
  };

  return (
    <Card className="w-[350px] shadow-none hover:shadow-none pt-1 pb-1">
      <Card.Content className="pb-0 pt-0 flex justify-center">
        <img src={imgSrc} className="w-50 h-50 " alt={productTitle} />
      </Card.Content>
      <Card.Header className="pb-0 pt-0">
        <Card.Title>{store}</Card.Title>
      </Card.Header>
      <Card.Content className="pb-0 pt-0">
        <p>{productTitle}</p>
      </Card.Content>
      <Card.Content className="flex justify-between items-center">
        <p className="text-lg font-semibold">${price}</p>
        <Button onClick={() => addToCart(productTitle)}>Add to cart</Button>
      </Card.Content>
    </Card>
  );
}
