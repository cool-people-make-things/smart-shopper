import { screen } from "@testing-library/react";
import { vi } from "vitest";

import { renderWithRouter } from "@/lib/test/renderWithRouter";

import { Browse } from "./Browse";
import { axe } from "vitest-axe";
vi.mock("@/components/ProductColumn", () => ({
  ProductColumn: () => (
    <div data-testid="supermarket-container">Mocked ProductColumn</div>
  ),
}));

describe("Given a user has gone to the browse page", () => {
  describe("When the supermarkets return undefined data", () => {
    it("Then it displays a message when individual supermarket has an error", async () => {
      vi.mock("../../../../backend/app/assets/data/nw_actual.json", () => ({
        default: undefined,
      }));
      vi.mock("../../../../backend/app/assets/data/pns_actual.json", () => ({
        default: undefined,
      }));
      vi.mock("../../../../backend/app/assets/data/wls.json", () => ({
        default: undefined,
      }));

      renderWithRouter(<Browse />);

      expect(screen.getByText(/Something has gone wrong/i)).toBeInTheDocument();
    });
    it("Then it has no accessibility violations", async () => {
      const { container } = renderWithRouter(<Browse />);
      const results = await axe(container, {
        rules: {
          "color-contrast": { enabled: false },
        },
      });
      expect(results).toHaveNoViolations();
    });
  });
});
