import { InfoIcon } from "lucide-react";

import { Alert } from "@/components/retroui/Alert";

type FallbackProps = {
  error?: Error | null;
  resetErrorBoundary?: () => void;
  message?: string;
};

export function Fallback({ error, message }: FallbackProps) {
  const fallbackMessage = message
    ? message
    : "Something went wrong. Please try checking again later.";
  return (
    <Alert
      status="warning"
      className="flex items-center max-h-32 overflow-auto p-4"
    >
      <InfoIcon className="h-4 w-4 mr-3" />

      <Alert.Title>{error?.message ?? fallbackMessage}</Alert.Title>
    </Alert>
  );
}
