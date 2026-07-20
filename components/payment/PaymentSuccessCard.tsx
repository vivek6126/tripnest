import BookingReference from "./BookingReference";

type PaymentSuccessCardProps = {
  bookingReference: string;
};

export default function PaymentSuccessCard({
  bookingReference,
}: PaymentSuccessCardProps) {
  return (
    <section className="mx-auto mb-8 max-w-2xl rounded-2xl border bg-white p-6 text-center shadow-sm">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-2xl">
        ✅
      </div>

      <h1 className="mt-6 text-3xl font-bold">Payment Successful</h1>

      <p className="mt-2 text-zinc-600">Your booking has been confirmed.</p>

      <div className="mt-6 rounded-xl bg-zinc-50 p-4">
        <BookingReference reference={bookingReference} />
      </div>
    </section>
  );
}
