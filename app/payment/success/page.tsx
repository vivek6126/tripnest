import { redirect } from "next/navigation";
import PaymentSuccessCard from "@/components/payment/PaymentSuccessCard";
import { getCurrentProfile } from "@/lib/db/profiles";
import { getBookingByCheckoutSession } from "@/lib/db/bookings";
import BookingSummaryCard from "@/components/payment/BookingSummaryCard";
import PaymentActions from "@/components/payment/PaymentActions";

export default async function PaymentSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{
    session_id?: string;
  }>;
}) {
  const { session_id } = await searchParams;

  if (!session_id) {
    redirect("/");
  }

  const profile = await getCurrentProfile();

  if (!profile) {
    redirect("/login");
  }

  const booking = await getBookingByCheckoutSession(session_id);

  if (!booking) {
    redirect("/bookings");
  }

  return (
    <main className="mx-auto max-w-5xl px-6 py-12">
      <PaymentSuccessCard bookingReference={booking.booking_reference} />

      <div className="mt-8">
        <BookingSummaryCard booking={booking} />
      </div>

      <PaymentActions />
    </main>
  );
}
