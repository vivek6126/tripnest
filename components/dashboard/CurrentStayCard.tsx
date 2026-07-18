import Image from "next/image";
import Link from "next/link";

import { formatDate } from "@/lib/utils/date";

type CurrentStayCardProps = {
  booking: any;
};

export default function CurrentStayCard({
  booking,
}: CurrentStayCardProps) {
  if (!booking) {
    return (
      <section className="rounded-2xl border bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold">
          🏨 Current Stay
        </h2>

        <p className="mt-3 text-zinc-600">
          You're not currently staying anywhere.
        </p>
      </section>
    );
  }

  return (
    <section className="rounded-2xl border bg-white p-6 shadow-sm">
      <h2 className="mb-5 text-xl font-semibold">
        🏨 Current Stay
      </h2>

      <div className="flex gap-5">
        <Image
          src={booking.properties.image}
          alt={booking.properties.title}
          width={180}
          height={140}
          className="rounded-xl object-cover"
        />

        <div className="flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-bold">
              {booking.properties.title}
            </h3>

            <p className="mt-1 text-zinc-600">
              📍 {booking.properties.location}
            </p>

            <p className="mt-3">
              Check-in: {formatDate(booking.check_in)}
            </p>

            <p>
              Check-out: {formatDate(booking.check_out)}
            </p>

            <div className="mt-4 inline-flex rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-700">
              🔵 Stay in Progress
            </div>
          </div>

          <Link
            href="/bookings"
            className="mt-4 w-fit rounded-lg bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
          >
            View Booking
          </Link>
        </div>
      </div>
    </section>
  );
}