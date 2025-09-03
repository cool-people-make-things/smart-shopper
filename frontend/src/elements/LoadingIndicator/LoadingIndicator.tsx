import { ShoppingCart } from "lucide-react";

export function LoadingIndicator() {
  const carts = [0, 1, 2, 3];
  const bumpDistance = 6; // px
  const bumpDuration = 0.2; // fraction of total for each bump
  const totalDuration = carts.length * bumpDuration + 0.4; // last 0.4s pause

  return (
    <div className="flex h-screen items-center justify-center space-x-1">
      {carts.map((_, i) => {
        return (
          <ShoppingCart
            data-testid="loading-cart"
            key={i}
            className="w-8 h-8 text-primary"
            style={{
              animation: `bumpWave ${totalDuration}s infinite`,
              animationTimingFunction: "linear",
              animationFillMode: "forwards",
              // use a custom keyframe percentage range for each cart
              animationName: `bumpCart${i}`,
            }}
          />
        );
      })}

      <style>
        {carts
          .map(
            (_, i) => `
          @keyframes bumpCart${i} {
            0%, ${(i / carts.length) * 100}% { transform: translateX(0); }
            ${((i + 0.5) / carts.length) * 100}% { transform: translateX(${bumpDistance}px); }
            ${100}% { transform: translateX(0); }
          }
        `,
          )
          .join("\n")}
      </style>
    </div>
  );
}
