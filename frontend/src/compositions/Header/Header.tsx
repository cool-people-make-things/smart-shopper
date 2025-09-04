import { ShoppingCart } from "lucide-react";

import { Text } from "@/components/retroui";
import { useCart } from "@/context/CartContext";

export function Header() {
  const { nwCart, pnsCart, wlsCart } = useCart();
  const cartCount =
    Object.keys(nwCart).length +
    Object.keys(pnsCart).length +
    Object.keys(wlsCart).length;

  return (
    <header className="sticky top-0 flex justify-between items-center py-2 px-20 bg-gray-300 border-b z-50">
      <a
        href="/"
        className="flex items-center gap-2"
        aria-label="Go to homepage"
      >
        <img
          src="/icons/smart-shopper-bag-logo-no-text.png"
          alt="Smart Shopper Logo"
          className="h-12 w-auto cursor-pointer"
        />
        <div className="flex flex-col" data-testid="smart-shopper-heading">
          <Text className="text-xl font-bold">Smart</Text>
          <Text className="text-xl font-bold">Shopper</Text>
        </div>
      </a>

      <nav aria-label="Main navigation" className="flex items-center gap-10">
        <a href="/about" className="text-xl">
          About
        </a>
        <a
          href="/cart"
          className="relative"
          aria-label={`View shopping cart with ${cartCount} item${cartCount !== 1 ? "s" : ""}`}
        >
          <ShoppingCart className="h-10 w-auto pr-2" />
          {cartCount > 0 && (
            <span
              data-testid="cart-count"
              className="absolute -top-1.5 -right-0.5 flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full"
            >
              {cartCount}
            </span>
          )}
        </a>
      </nav>
    </header>
  );
}
