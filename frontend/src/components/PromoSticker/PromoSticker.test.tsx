import { render, screen } from "@testing-library/react";

import { PromoSticker } from "./PromoSticker";

describe("Given a promo sticker is applied to a product with promo", () => {
  describe("When the sticker is displayed", () => {
    it("Then the sticker label text is displayed", () => {
      render(<PromoSticker label="Disney Discs Bonus Products" />);
      expect(
        screen.getByText("Disney Discs Bonus Products"),
      ).toBeInTheDocument();
    });
  });

  it("Then the sticker shape is displayed", () => {
    render(<PromoSticker label="Special" />);
    const sticker = screen.getByText("Special").parentElement;
    const triangle = sticker?.querySelector("div");
    expect(triangle).toBeInTheDocument();
  });
});
