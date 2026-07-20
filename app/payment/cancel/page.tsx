import Link from "next/link";

export default function PaymentCancelPage() {
  return (
    <main className="mx-auto flex min-h-[70vh] max-w-3xl items-center justify-center px-6 py-12">
      <section className="w-full rounded-2xl border bg-white p-8 text-center shadow-sm">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100 text-3xl">
          ❌
        </div>

        <h1 className="mt-6 text-3xl font-bold">
          Payment Cancelled
        </h1>

        <p className="mt-3 text-zinc-600">
          Your payment was cancelled and no booking was created.
        </p>

        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Link
            href="/properties"
            className="rounded-xl bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700"
          >
            Explore Properties
          </Link>

          <Link
            href="/bookings"
            className="rounded-xl border px-6 py-3 font-medium transition hover:bg-zinc-100"
          >
            My Bookings
          </Link>
        </div>
      </section>
    </main>
  );
}