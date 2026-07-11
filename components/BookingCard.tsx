"use client";
import SuccessDialog from "@/components/shared/SuccessDialog";
import { useState } from "react";
import { toast } from "sonner";

type BookingCardProps = {
  propertyId: number;
  price: number;
  rating: number;
};

export default function BookingCard({
  propertyId,
  price,
  rating,
}: BookingCardProps) {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);
  const [isBooking, setIsBooking] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] =
  useState(false);

  const today = new Date()
    .toISOString()
    .split("T")[0];

  const minimumCheckoutDate = (() => {
    if (!checkIn) return today;

    const date = new Date(checkIn);
    date.setDate(date.getDate() + 1);

    return date.toISOString().split("T")[0];
  })();

  const checkInDate = new Date(checkIn);
  const checkOutDate = new Date(checkOut);

  const difference =
    checkOutDate.getTime() -
    checkInDate.getTime();

  const nights =
    checkIn && checkOut
      ? difference / (1000 * 60 * 60 * 24)
      : 0;

  const totalPrice = nights * price;

  const isBookingValid =
    checkIn !== "" &&
    checkOut !== "" &&
    nights > 0;


  async function handleBooking() {
  setIsBooking(true);

  try {
    const response = await fetch("/api/bookings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        propertyId,
        checkIn,
        checkOut,
        guests,
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message);
    }

    setShowSuccessDialog(true);
  } catch (error) {
    if (error instanceof Error) {
      toast.error(error.message);
    }
  } finally {
    setIsBooking(false);
  }
}


  return (
    <aside className="sticky top-24 rounded-3xl border border-zinc-200 bg-white p-8 shadow-xl">
     <div className="flex items-center justify-between">

  <div>
    <p className="text-4xl font-bold tracking-tight">
      ₹{price}
    </p>

    <p className="text-sm text-zinc-500">
      per night
    </p>
  </div>

  <div className="rounded-full bg-yellow-100 px-3 py-2 text-sm font-semibold text-yellow-800">
    ⭐ {rating}
  </div>

</div>

      <div className="mt-6 space-y-4">
        <div>
          <label
            htmlFor="check-in"
            className="mb-1 block text-sm font-medium"
          >
            Check-in
          </label>

          <input
            id="check-in"
            type="date"
            min={today}
            value={checkIn}
            onChange={(event) => {
              const selectedDate = new Date(
                event.target.value
              );

              selectedDate.setDate(
                selectedDate.getDate() + 1
              );

              const nextDay =
                selectedDate
                  .toISOString()
                  .split("T")[0];

              setCheckIn(event.target.value);
              setCheckOut(nextDay);
            }}
            className="w-full rounded-xl border border-zinc-300 px-4 py-3 transition focus:border-blue-500 focus:outline-none"
          />
        </div>

        <div>
          <label
            htmlFor="check-out"
            className="mb-1 block text-sm font-medium"
          >
            Check-out
          </label>

          <input
            id="check-out"
            type="date"
            min={minimumCheckoutDate}
            value={checkOut}
            onChange={(event) =>
              setCheckOut(event.target.value)
            }
          className="w-full rounded-xl border border-zinc-300 px-4 py-3 transition focus:border-blue-500 focus:outline-none"
            
          />
        </div>

        <div>
          <label
            htmlFor="guests"
            className="mb-1 block text-sm font-medium"
          >
            Guests
          </label>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() =>
                setGuests((prev) =>
                  Math.max(1, prev - 1)
                )
              }
              className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-300 transition hover:bg-zinc-100"
            >
              -
            </button>

            <span className="w-8 text-center font-semibold">
              {guests}
            </span>

            <button
              type="button"
              onClick={() =>
                setGuests((prev) => prev + 1)
              }
              className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-300 transition hover:bg-zinc-100"
            >
              +
            </button>
          </div>
        </div>
      </div>

      {nights > 0 && (
  <div className="mt-6 space-y-3 border-t border-zinc-200 pt-5">

    <div className="flex justify-between text-zinc-700">
      <span>
        ₹{price} × {nights} {nights === 1 ? "night" : "nights"}
      </span>

      <span>₹{totalPrice}</span>
    </div>

    <div className="flex justify-between text-zinc-600">
      <span>Guests</span>

      <span>{guests}</span>
    </div>

    <div className="mt-2 flex justify-between border-t border-zinc-200 pt-4 text-xl font-bold">
      <span>Total</span>

      <span>₹{totalPrice}</span>
    </div>

  </div>
)}

      {!isBookingValid && (
        <p className="mt-4 text-sm text-red-500">
          Please select valid check-in and
          check-out dates.
        </p>
      )}

    <button
  type="button"
  disabled={!isBookingValid || isBooking}
  onClick={handleBooking}
  className="mt-8 w-full rounded-xl bg-blue-600 py-4 text-lg font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-zinc-400"
>
  {isBooking ? "Booking..." : "Reserve Now"}
</button>
<SuccessDialog
  open={showSuccessDialog}
  onOpenChange={setShowSuccessDialog}
  title="🎉 Your reservation is confirmed!"
  description="We've reserved your stay successfully. You can view it anytime from My Bookings."
  primaryText="View My Bookings"
  secondaryText="Continue Browsing"
  primaryHref="/bookings"
  onSecondary={() => setShowSuccessDialog(false)}
/>
    </aside>  
  );
}