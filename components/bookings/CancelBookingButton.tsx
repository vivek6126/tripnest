"use client";

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
    const confirmed = window.confirm(
      "Are you sure you want to cancel this booking?"
    );

    if (!confirmed) {
      return;
    }

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
    <button
      onClick={handleCancel}
      className="mt-4 w-full rounded-lg bg-red-600 py-2 text-white hover:bg-red-700"
    >
      Cancel Booking
    </button>
  );
}