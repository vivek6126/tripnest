import type { BookingWithProperty } from "@/types/booking";
import CancelBookingButton from "./CancelBookingButton";
import {
  calculateNights,
  formatDate,
} from "@/lib/utils/date";


type BookingCardProps = {
  booking: BookingWithProperty;
};


export default function BookingCard({
  booking,
}: BookingCardProps) {
  const property = booking.properties;
  const checkIn = new Date(booking.check_in);
  const checkOut = new Date(booking.check_out);

 const nights = calculateNights(
  booking.check_in,
  booking.check_out
);

const totalPrice =
  nights * property.price;

const today = new Date();

today.setHours(0, 0, 0, 0);

checkIn.setHours(0, 0, 0, 0);
checkOut.setHours(0, 0, 0, 0);

let status = "Upcoming";
let badgeClasses =
  "bg-green-100 text-green-700";

if (
  today >= checkIn &&
  today < checkOut
) {
  status = "Ongoing";
  badgeClasses =
    "bg-blue-100 text-blue-700";
}

if (today >= checkOut) {
  status = "Completed";
  badgeClasses =
    "bg-zinc-200 text-zinc-700";
}

return (
    <div className="rounded-xl border p-4 shadow-sm">
      <img
        src={property.image}
        alt={property.title}
        className="mb-4 h-52 w-full rounded-lg object-cover"
      />

      <h2 className="text-xl font-semibold">
        {property.title}
      </h2>
      <div
  className={`mt-2 inline-flex rounded-full px-3 py-1 text-sm font-semibold ${badgeClasses}`}
>
  {
  status === "Upcoming"
    ? "🟢 Upcoming"
    : status === "Ongoing"
    ? "🔵 Ongoing"
    : "⚫ Completed"
}
</div>
      <p className="text-gray-600">
        📍 {property.location}
      </p>
    <hr className="my-4" />
        <p className="mt-4">
            📅 {formatDate(booking.check_in)} →{" "}
            {formatDate(booking.check_out)}
        </p>

        <p>
            👥 {booking.guests} Guest
            {booking.guests > 1 ? "s" : ""}
        </p>

      <p className="mt-3">
      🌙 {nights} night{nights > 1 ? "s" : ""}
      </p>

    <p className="text-gray-600">
      ₹{property.price} / night
    </p>
    <hr className="my-4" />
    <p className="mt-2 text-lg font-bold">
        Total: ₹{totalPrice}
    </p>
      <CancelBookingButton
        bookingId={booking.id}
      />
    </div>
  );
}