import { Home } from "./pages/Home";
import { Toaster } from "@/components/retroui";

function App() {
  return (
    <main className="h-screen">
      <div className="bg-gray-400 w-screen h-1/10 text-center flex items-center justify-center text-5xl">
        I AM A HEADER
      </div>
      <Home />
      <div className="bg-gray-600 w-screen h-1/10 text-center flex items-center justify-center text-5xl">
        I AM A FOOTER
      </div>
      <Toaster />
    </main>
  );
}

export default App;
