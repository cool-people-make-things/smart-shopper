import { useLocation } from "react-router-dom";
import { toast } from "sonner";

import { Button, RUICard } from "@/components/retroui";
import { useCart } from "@/context/CartContext";

export function CardDetails({ product }: { product: Product }) {
  const { title, price, supermarket } = product;
  const { pathname } = useLocation();
  const isHome = pathname === "/";
  const { addCartItem, removeCartItem } = useCart();

  const addToCart = () => {
    addCartItem(supermarket, product);
    toast.success(`${title} has been added to your cart`, {
      richColors: true,
      cancel: {
        label: "Undo",
        onClick: () => {
          removeCartItem(supermarket, product.id);
          toast.error(`${title} removed`, { richColors: true });
        },
      },
    });
  };

  if (isHome) {
    return (
      <div data-testid="card-details">
        <RUICard.Header className="py-0">
          <RUICard.Title>{supermarket}</RUICard.Title>
        </RUICard.Header>
        <RUICard.Content className="py-0">
          <p>{title}</p>
        </RUICard.Content>
        <RUICard.Content className="flex justify-around  items-center">
          <p className="text-lg font-semibold">${price.value}</p>
          <Button onClick={() => addToCart()}>Add to cart</Button>
        </RUICard.Content>
      </div>
    );
  } else {
    return (
      <div data-testid="card-details">
        <RUICard.Header className="py-0">
          <RUICard.Title className="text-center text-base">
            {title}
          </RUICard.Title>
        </RUICard.Header>
        <RUICard.Content className="flex justify-around items-center">
          <p className="">${price.value}</p>
          <Button onClick={() => addToCart()}>Add to cart</Button>
        </RUICard.Content>
      </div>
    );
  }
}
