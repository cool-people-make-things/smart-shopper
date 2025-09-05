import { ShoppingCart } from "lucide-react";

import { Text } from "@/components/retroui";
import { useCart } from "@/context/CartContext";

export function Header() {
  const { nwCart, pnsCart, wlsCart, cartCosts } = useCart();
  const cartCount =
    Object.keys(nwCart).length +
    Object.keys(pnsCart).length +
    Object.keys(wlsCart).length;

  return (
    <header className="sticky top-0 flex justify-between items-center py-2 px-30 bg-gray-300 border-b z-50">
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

      <nav aria-label="Main navigation" className="flex items-center gap-4">
        <a href="/about" className="text-xl mr-6">
          About
        </a>
        <a
          href="/cart"
          className="flex items-center gap-4 pr-2"
          aria-label={`View shopping cart with ${cartCount} item${cartCount !== 1 ? "s" : ""}`}
        >
          <div className="relative">
            <ShoppingCart className="h-10 w-auto" />
            {cartCount > 0 && (
              <span
                data-testid="cart-count"
                className="absolute -top-1.5 -right-2.5 flex items-center justify-center min-w-[1.25rem] h-5 p-1.5 text-xs font-bold text-white bg-red-500 rounded-full"
              >
                {cartCount}
              </span>
            )}
          </div>
          <Text className="text-xl">$ {cartCosts.total}</Text>
        </a>
      </nav>
    </header>
  );
}
