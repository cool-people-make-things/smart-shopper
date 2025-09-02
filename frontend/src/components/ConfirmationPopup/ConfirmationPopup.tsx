import { Button, Dialog, Text } from "@/components/retroui";

type ConfirmDeleteDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  onConfirm: () => void;
  mode: "removeProduct" | "clearCart";
};

export function ConfirmationPopup({
  open,
  onOpenChange,
  title,
  onConfirm,
  mode,
}: ConfirmDeleteDialogProps) {
  const message =
    mode === "removeProduct"
      ? `Are you sure you want to remove ${title} from your cart?`
      : "Are you sure you want to clear your cart?";
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <Dialog.Content aria-describedby={undefined}>
        <Dialog.Header position="fixed" asChild>
          <Text as="h5">Confirm delete</Text>
        </Dialog.Header>
        <section className="flex flex-col gap-4 p-4">
          <section className="text-xl">
            <Text>{message}</Text>
          </section>
          <section className="flex flex-row gap-4 justify-end">
            <Dialog.Trigger asChild>
              <Button
                className="bg-destructive text-white hover:bg-destructive/90"
                onClick={onConfirm}
              >
                Confirm
              </Button>
            </Dialog.Trigger>
            <Dialog.Trigger asChild>
              <Button variant="outline">Cancel</Button>
            </Dialog.Trigger>
          </section>
        </section>
      </Dialog.Content>
    </Dialog>
  );
}
