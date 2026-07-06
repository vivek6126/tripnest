"use client";

import { useState } from "react";

type BookingCardProps = {
  price: number;
};

export default function BookingCard({
  price,
}: BookingCardProps) {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);

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
            value={checkIn}
            onChange={(event) =>
              setCheckIn(event.target.value)
            }
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

          <input
            id="guests"
            type="number"
            min={1}
            value={guests}
            onChange={(event) =>
              setGuests(Number(event.target.value))
            }
            className="w-full rounded-lg border p-2"
          />
        </div>
      </div>

      <button className="mt-6 w-full rounded-lg bg-black px-4 py-3 text-white transition hover:bg-zinc-800">
        Book Now
      </button>
    </aside>
  );
}