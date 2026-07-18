import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";
import UpcomingBookingCard from "@/components/dashboard/UpcomingBookingCard";

import { getNextBooking } from "@/lib/db/bookings";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardStats from "@/components/dashboard/DashboardStats";

import { getBookingCount, getTotalSpent } from "@/lib/db/bookings";

import { getWishlistCount } from "@/lib/db/wishlist";

import { getReviewsByUser } from "@/lib/db/reviews";

export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const [bookings, wishlist, reviews, totalSpent, nextBooking] =
    await Promise.all([
      getBookingCount(user.id),
      getWishlistCount(),
      getReviewsByUser(user.id),
      getTotalSpent(user.id),
      getNextBooking(user.id),
    ]);

  return (
    <main className="mx-auto max-w-7xl space-y-8 p-8">
      <DashboardHeader fullName="Vivek" />

      <DashboardStats
        bookings={bookings}
        wishlist={wishlist}
        reviews={reviews.length}
        totalSpent={totalSpent}
      />
      <UpcomingBookingCard booking={nextBooking} />
    </main>
  );
}
