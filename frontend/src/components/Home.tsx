import { Button } from "@/components/retroui";

export default function Home() {
  const handleClick = () => {
    alert("Button Clicked!");
  };

  return (
    <div className="flex flex-col items-center justify-center gap-10 h-screen">
      <h1 className="text-4xl">SmartShopper</h1>
      <Button onClick={() => handleClick()}>Click Me!</Button>
    </div>
  );
}
