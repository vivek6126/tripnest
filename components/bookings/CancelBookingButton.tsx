"use client";
import ConfirmDialog from "@/components/shared/ConfirmDialog";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type CancelBookingButtonProps = {
  bookingId: number;
};

export default function CancelBookingButton({
  bookingId,
}: CancelBookingButtonProps) {
  const router = useRouter();

  async function handleCancel() {
  
     try {
      const response = await fetch(
        `/api/bookings/${bookingId}`,
        {
          method: "DELETE",
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message);
      }

      toast.success(result.message);

      router.refresh();
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  }

  return (
  <ConfirmDialog
    title="Cancel Booking"
    description="Are you sure you want to cancel this booking? This action cannot be undone."
    confirmText="Cancel Booking"
    onConfirm={handleCancel}
  >
    <Button variant="destructive">
      Cancel Booking
    </Button>
  </ConfirmDialog>
  );
}