import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getBookingsByUser } from "@/lib/db/bookings";

import BookingList from "@/components/bookings/BookingList";


export default async function BookingsPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

 const bookings = await getBookingsByUser(
  user.id
) ?? [];

  return (
    <main className="mx-auto max-w-5xl p-6">
      <h1 className="mb-6 text-3xl font-bold">
        My Bookings
      </h1>
     <BookingList bookings={bookings} />
    </main>
  );
}