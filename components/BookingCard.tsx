"use client";

import { useState } from "react";
import { toast } from "sonner";

type BookingCardProps = {
  propertyId: number;
  price: number;
};

export default function BookingCard({
  propertyId,
  price,
}: BookingCardProps) {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);
  const [isBooking, setIsBooking] = useState(false);


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

    toast.success(
      result.message ?? "Booking created successfully!"
    );
  } catch (error) {
    if (error instanceof Error) {
      toast.error(error.message);
    }
  } finally {
    setIsBooking(false);
  }
}


  return (
    <aside className="rounded-xl border p-6 shadow-sm">
      <p className="text-3xl font-bold">
        ₹{price}
        <span className="text-base font-normal text-zinc-500">
          {" "}
          / night
        </span>
      </p>

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
            className="w-full rounded-lg border p-2"
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
            className="w-full rounded-lg border p-2"
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
              className="h-10 w-10 rounded-lg border"
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
              className="h-10 w-10 rounded-lg border"
            >
              +
            </button>
          </div>
        </div>
      </div>

      {nights > 0 && (
        <div className="mt-6 space-y-2 border-t pt-4">
          <div className="flex justify-between">
            <span>
              ₹{price} × {nights}{" "}
              {nights === 1
                ? "night"
                : "nights"}
            </span>

            <span>₹{totalPrice}</span>
          </div>

          <div className="flex justify-between">
            <span>Guests</span>

            <span>{guests}</span>
          </div>

          <div className="flex justify-between border-t pt-2 text-lg font-bold">
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
  className="mt-6 w-full rounded-lg bg-black px-4 py-3 text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:bg-zinc-400"
>
  {isBooking ? "Booking..." : "Book Now"}
</button>
    </aside>  
  );
}