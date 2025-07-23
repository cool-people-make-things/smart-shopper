/* eslint-disable import/no-default-export */
import { Route, Routes } from "react-router";

import { Toaster } from "@/components/retroui";

import { Cart } from "./pages/Cart";
import { Home } from "./pages/Home";
import { NotFound } from "./pages/NotFound";

function App() {
  return (
    <main className="h-screen">
      <div className="bg-gray-400 w-screen h-1/10 text-center flex items-center justify-center text-5xl">
        I AM A HEADER
      </div>

      <Routes>
        <Route index element={<Home />} />
        {/* <Route path="browse" element={<Browse />} /> */}
        <Route path="cart" element={<Cart />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <div className="bg-gray-600 w-screen h-1/10 text-center flex items-center justify-center text-5xl">
        I AM A FOOTER
      </div>
      <Toaster />
    </main>
  );
}

export default App;
