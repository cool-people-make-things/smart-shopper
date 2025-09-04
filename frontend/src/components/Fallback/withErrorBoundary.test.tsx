import { render, screen } from "@testing-library/react";
import React from "react";
import { vi } from "vitest";

import { withErrorBoundary } from "./WithErrorBoundary";

// Normal component that renders fine
const NormalComponent: React.FC = () => <div>All good!</div>;

// Component that throws an error
const BuggyComponent: React.FC = () => {
  throw new Error("Boom!");
};

// Mock fallback component
const MockFallback: React.FC<{ error: Error }> = ({ error }) => (
  <div data-testid="mock-fallback">{error.message}</div>
);

describe("withErrorBoundary HOC", () => {
  let consoleErrorSpy: ReturnType<typeof vi.spyOn>;

  beforeAll(() => {
    consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
  });

  afterAll(() => {
    consoleErrorSpy.mockRestore();
  });

  describe("Given a component that loads successfully", () => {
    describe("When it renders", () => {
      it("Then the user sees the component content", () => {
        const SafeComponent = withErrorBoundary(NormalComponent);
        render(<SafeComponent />);
        expect(screen.getByText("All good!")).toBeInTheDocument();
      });
    });
  });

  describe("Given a component that throws an error", () => {
    describe("When it renders", () => {
      it("Then the HOC displays the provided fallback", () => {
        const SafeBuggy = withErrorBoundary(BuggyComponent, {
          FallbackComponent: MockFallback,
        });
        render(<SafeBuggy />);
        expect(screen.getByTestId("mock-fallback")).toHaveTextContent("Boom!");
      });
    });

    describe("When a different fallback is provided", () => {
      it("Then the HOC renders the correct fallback", () => {
        const AnotherFallback: React.FC<{ error: Error }> = ({ error }) => (
          <div data-testid="another-fallback">Oops: {error.message}</div>
        );
        const SafeBuggyCustom = withErrorBoundary(BuggyComponent, {
          FallbackComponent: AnotherFallback,
        });
        render(<SafeBuggyCustom />);
        expect(screen.getByTestId("another-fallback")).toHaveTextContent(
          "Oops: Boom!",
        );
      });
    });
  });
});
