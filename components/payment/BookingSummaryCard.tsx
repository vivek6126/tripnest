import Image from "next/image";

import { formatDate, calculateNights } from "@/lib/utils/date";

type BookingSummaryCardProps = {
  booking: any;
};

export default function BookingSummaryCard({
  booking,
}: BookingSummaryCardProps) {
  const nights = calculateNights(
    booking.check_in,
    booking.check_out
  );

  const totalAmount =
    booking.properties.price * nights;

  return (
    <section className="rounded-2xl border bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-2xl font-semibold">
        Booking Details
      </h2>

      <div className="flex flex-col gap-6 md:flex-row">
        <Image
          src={booking.properties.image}
          alt={booking.properties.title}
          width={220}
          height={160}
          className="rounded-xl object-cover"
        />

        <div className="flex-1">
          <h3 className="text-2xl font-bold">
            {booking.properties.title}
          </h3>

          <p className="mt-1 text-zinc-600">
            📍 {booking.properties.location}
          </p>

          <div className="mt-6 grid grid-cols-2 gap-5">
            <Info
              label="Check-in"
              value={formatDate(
                booking.check_in
              )}
            />

            <Info
              label="Check-out"
              value={formatDate(
                booking.check_out
              )}
            />

            <Info
              label="Guests"
              value={booking.guests}
            />

            <Info
              label="Nights"
              value={nights}
            />

            <Info
              label="Amount Paid"
              value={`₹${totalAmount.toLocaleString()}`}
            />

            <Info
              label="Status"
              value={
                <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
                  Paid
                </span>
              }
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function Info({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div>
      <p className="text-sm text-zinc-500">
        {label}
      </p>

      <div className="mt-1 font-semibold">
        {value}
      </div>
    </div>
  );
}