import "@testing-library/jest-dom";

import { fireEvent, render, screen } from "@testing-library/react";
import { vi } from "vitest";

import { Home } from "./Home";

describe("Home", () => {
  test.skip("renders a heading", () => {
    render(<Home />);

    const heading = screen.getByRole("heading", { level: 1 });
    const headingText = screen.getByRole("heading", {
      name: /smartshopper/i,
    });

    expect(heading).toBeInTheDocument();
    expect(headingText).toBeInTheDocument();
  });

  test.skip("renders a button with text 'Click Me!'", () => {
    render(<Home />);

    const button = screen.getByRole("button", { name: /click me!/i });

    expect(button).toBeInTheDocument();
  });

  test.skip("calls alert when clicked", () => {
    render(<Home />);
    const button = screen.getByText(/click me!/i);

    const alertMock = vi.fn();
    window.alert = alertMock;
    fireEvent.click(button);

    expect(alertMock).toHaveBeenCalledWith("Button Clicked!");
  });
});
