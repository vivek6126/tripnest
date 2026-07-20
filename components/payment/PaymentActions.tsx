import Link from "next/link";

export default function PaymentActions() {
  return (
    <section className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
      <Link
        href="/bookings"
        className="rounded-xl bg-blue-600 px-6 py-3 text-center font-medium text-white transition hover:bg-blue-700"
      >
        View My Bookings
      </Link>

      <Link
        href="/properties"
        className="rounded-xl border px-6 py-3 text-center font-medium transition hover:bg-zinc-100"
      >
        Continue Browsing
      </Link>
    </section>
  );
}