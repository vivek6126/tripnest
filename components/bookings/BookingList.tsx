import type { BookingWithProperty } from "@/types/booking";
import BookingCard from "./BookingCard";

type BookingListProps = {
  bookings: BookingWithProperty[];
};

export default function BookingList({
  bookings,
}: BookingListProps) {
  if (bookings.length === 0) {
    return (
      <p className="text-center text-gray-500">
        You haven't made any bookings yet.
      </p>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {bookings.map((booking) => (
        <BookingCard
          key={booking.id}
          booking={booking}
        />
      ))}
    </div>
  );
}