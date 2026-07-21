import type { BookingWithProperty } from "@/types/booking";
import CancelBookingButton from "./CancelBookingButton";
import {
  calculateNights,
  formatDate,
  getBookingStatus,
} from "@/lib/utils/date";
import Image from "next/image";


type BookingCardProps = {
  booking: BookingWithProperty;
};

export default function BookingCard({ booking }: BookingCardProps) {
  const property = booking.properties;

  const nights = calculateNights(booking.check_in, booking.check_out);

  const totalPrice = nights * property.price;

  const bookingStatus = getBookingStatus(booking.check_in, booking.check_out);

  return (
    <div className="rounded-xl border p-4 shadow-sm">
      <Image
  src={property.image}
  alt={property.title}
  width={400}
  height={250}
  className="mb-4 h-52 w-full rounded-lg object-cover"
/>

      <h2 className="text-xl font-semibold">{property.title}</h2>
      <div
        className={`mt-2 inline-flex rounded-full px-3 py-1 text-sm font-semibold ${bookingStatus.badgeClasses}`}
      >
        {bookingStatus.badge}
      </div>

      <div
  className={`mt-3 rounded-xl border px-4 py-3 ${
    bookingStatus.status === "Upcoming"
      ? "border-green-200 bg-green-50"
      : bookingStatus.status === "Current Stay"
      ? "border-blue-200 bg-blue-50"
      : "border-zinc-200 bg-zinc-50"
  }`}
>
  <p className="text-sm font-semibold text-zinc-700">
    {bookingStatus.message}
  </p>
</div>
      <p className="text-gray-600">📍 {property.location}</p>
      <hr className="my-4" />
      <p className="mt-4">
        📅 {formatDate(booking.check_in)} → {formatDate(booking.check_out)}
      </p>

      <p>
        👥 {booking.guests} Guest
        {booking.guests > 1 ? "s" : ""}
      </p>

      <p className="mt-3">
        🌙 {nights} night{nights > 1 ? "s" : ""}
      </p>

      <p className="text-gray-600">₹{property.price} / night</p>
      <hr className="my-4" />
      <p className="mt-2 text-lg font-bold">Total: ₹{totalPrice}</p>
      {bookingStatus.status === "Upcoming" ? (
        <CancelBookingButton bookingId={booking.id} />
      ) : (
        <div className="mt-4 rounded-lg bg-zinc-100 p-3 text-center text-sm text-zinc-600">
          {bookingStatus.status === "Ongoing"
            ? "Enjoy your stay! We hope you're having a great trip."
            : "This booking has been completed."}
        </div>
      )}
    </div>
  );
}
