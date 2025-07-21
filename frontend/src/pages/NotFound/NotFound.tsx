import { Text } from "@/components/retroui";

export function NotFound() {
  return (
    <main className="flex flex-col items-center justify-center h-8/10">
      <Text className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">
        404: Not Found
      </Text>
    </main>
  );
}
