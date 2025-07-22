import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { axe } from "vitest-axe";
import { MemoryRouter } from "react-router";

import { CardDetails } from "./CardDetails";

describe("Given a user is", () => {
  describe("When the user can see the CardDetails component", () => {
    it("Then the user is seeing the correct information when on the '/' route", () => {
      render(
        <MemoryRouter initialEntries={["/"]}>
          <CardDetails productTitle="Pams Butter" price="3.50" store="Woolworths" />
        </MemoryRouter>,
      );
      expect(screen.getByText(/pams butter/i)).toBeInTheDocument();
    });

    it("Then the user is not seeing the store when on the '/browse' route", () => {
      render(
        <MemoryRouter initialEntries={["/browse"]}>
          <CardDetails productTitle="Pams Butter" price="3.50" store="Woolworths" />
        </MemoryRouter>,
      );
      expect(screen.queryByText(/woolworths/i)).not.toBeInTheDocument();
    });

    it("has no accessibility violations", async () => {
      const { container } = render(
        <MemoryRouter initialEntries={["/"]}>
          <CardDetails productTitle="Pams Butter" price="3.50" store="Woolworths" />,
        </MemoryRouter>,
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
