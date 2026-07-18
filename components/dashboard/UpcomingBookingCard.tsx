import Link from "next/link";
import Image from "next/image";

import { formatDate } from "@/lib/utils/date";

type UpcomingBookingCardProps = {
  booking: any;
};

export default function UpcomingBookingCard({
  booking,
}: UpcomingBookingCardProps) {
  if (!booking) {
    return (
      <section className="rounded-2xl border bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold">
          📅 Your Next Trip
        </h2>

        <p className="mt-3 text-zinc-600">
          You don't have any upcoming trips.
        </p>

        <Link
          href="/properties"
          className="mt-5 inline-block rounded-xl bg-blue-600 px-5 py-3 text-white transition hover:bg-blue-700"
        >
          Explore Properties
        </Link>
      </section>
    );
  }

  return (
    <section className="rounded-2xl border bg-white p-6 shadow-sm">
      <h2 className="mb-5 text-xl font-semibold">
        📅 Your Next Trip
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
              📅 {formatDate(booking.check_in)}
            </p>

            <p>
              → {formatDate(booking.check_out)}
            </p>
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