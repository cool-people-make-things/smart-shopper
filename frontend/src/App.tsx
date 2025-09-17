/* eslint-disable import/no-default-export */
import { Route, Routes } from "react-router";

import { Toaster } from "@/components/retroui";
import { Header } from "@/compositions/Header";
import { CartProvider } from "@/context/CartContext";
import { SearchProvider } from "@/context/SearchContext";
import { Browse } from "@/pages/Browse";
import { Cart } from "@/pages/Cart";
import { Home } from "@/pages/Home";
import { NotFound } from "@/pages/NotFound";

function App() {
  return (
    <CartProvider>
      <SearchProvider>
        <Header />
        <main>
          <Routes>
            <Route index element={<Home />} />
            <Route path="browse" element={<Browse />} />
            <Route path="cart" element={<Cart />} />
            <Route path="*" element={<NotFound />} />
          </Routes>

          <div className="bg-gray-600 w-screen h-1/10 text-center flex items-center justify-center text-5xl">
            I AM A FOOTER
          </div>
          <Toaster />
        </main>
      </SearchProvider>
    </CartProvider>
  );
}

export default App;
