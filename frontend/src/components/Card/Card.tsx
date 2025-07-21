import { RUICard, Button } from "@/components/retroui";
import { toast } from "sonner";

interface ProductProps {
  imgSrc: string;
  productTitle: string;
  price: number;
  store: string;
}

export function Card({ imgSrc, productTitle, price, store }: ProductProps) {
  const addToCart = (item: string) => {
    toast.success(`${item} has been added to your cart`, {
      richColors: true,
      cancel: {
        label: "Undo",
        onClick: () => {
          alert(`${item} removed`);
        },
      },
    });
  };

  return (
    <main>
      <RUICard className="w-[350px] shadow-none hover:shadow-none pt-1 pb-1">
        <RUICard.Content className="pb-0 pt-0 flex justify-center">
          <img src={imgSrc} className="w-50 h-50 " alt={productTitle} />
        </RUICard.Content>
        <RUICard.Header className="pb-0 pt-0">
          <RUICard.Title>{store}</RUICard.Title>
        </RUICard.Header>
        <RUICard.Content className="pb-0 pt-0">
          <p>{productTitle}</p>
        </RUICard.Content>
        <RUICard.Content className="flex justify-between items-center">
          <p className="text-lg font-semibold">${price}</p>
          <Button onClick={() => addToCart(productTitle)}>Add to cart</Button>
        </RUICard.Content>
      </RUICard>
    </main>
  );
}
