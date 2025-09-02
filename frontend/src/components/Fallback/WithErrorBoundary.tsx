import type { ComponentType, ErrorInfo } from "react";
import { ErrorBoundary, type FallbackProps } from "react-error-boundary";

import { Fallback } from "@/components/Fallback";

type WithErrorBoundaryOptions = {
  message?: string;
  onReset?: () => void;
  onError?: (error: Error, info: ErrorInfo) => void;
  FallbackComponent?: ComponentType<FallbackProps>;
};

export function withErrorBoundary<P extends object>(
  WrappedComponent: ComponentType<P>,
  options: WithErrorBoundaryOptions = {},
) {
  const { message, onReset, onError, FallbackComponent } = options;

  function WithErrorBoundary(props: P) {
    return (
      <ErrorBoundary
        FallbackComponent={(fallbackProps) => {
          if (FallbackComponent) {
            return <FallbackComponent {...fallbackProps} />;
          }
          return <Fallback error={fallbackProps.error} message={message} />;
        }}
        onReset={onReset}
        onError={onError}
      >
        <WrappedComponent {...props} />
      </ErrorBoundary>
    );
  }

  const wrappedName =
    WrappedComponent.displayName || WrappedComponent.name || "Component";
  WithErrorBoundary.displayName = `withErrorBoundary(${wrappedName})`;

  return WithErrorBoundary;
}
