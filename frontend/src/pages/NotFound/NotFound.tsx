import { useNavigate } from "react-router-dom";

import { Button, RUICard, Text } from "@/components/retroui";

export const notFoundMessage =
  "Uh oh! Seems you've gotten lost. The page you're looking for doesn't exist.";

export function NotFound() {
  const navigate = useNavigate();

  return (
    <>
      <div className="flex h-screen items-center justify-center bg-gray-50">
        <RUICard className="flex flex-col items-center justify-center p-12 space-y-8 w-full max-w-2xl shadow-xl rounded-2xl hover:shadow-xl hover:scale-100">
          <Text className="text-7xl font-extrabold text-primary">404</Text>
          <Text className="text-2xl font-semibold">Page not found</Text>
          <Text className="text-center text-gray-600 text-lg">
            {notFoundMessage}
          </Text>
          <Button onClick={() => navigate("/")} className="px-6 py-2">
            Go back home
          </Button>
        </RUICard>
      </div>
    </>
  );
}
