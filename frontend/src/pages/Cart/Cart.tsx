import { useNavigate } from "react-router-dom";

export function Cart() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col p-4 gap-20">
      <div className="flex justify-between items-center">
        <button
          className="text-md decoration-black hover:underline hover:underline-offset-4 inline-flex items-center"
          onClick={() => navigate("/")}
        >
          &lt; back
        </button>
        <p className="text-lg font-semibold">Cart Actions</p>
      </div>

      <>
        <div className="flex mx-8">
          <div className="w-2/3 space-y-4">
            <p className="text-xl font-semibold">Shopping List New World</p>
            <p className="text-xl font-semibold">Shopping List Woolworths</p>
            <p className="text-xl font-semibold">Shopping List Pak'n'Save</p>
          </div>
        </div>

        <div className="flex-grow" />

        <div className="flex justify-end mb-8">
          <div className="w-1/3 text-right">
            <h3 className="text-lg font-semibold">Total Spend</h3>
            <p className="text-lg font-semibold">$168.90</p>
          </div>
        </div>
      </>
    </div>
  );
}
