import { redirect } from "next/navigation";

import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardStats from "@/components/dashboard/DashboardStats";
import CurrentStayCard from "@/components/dashboard/CurrentStayCard";
import UpcomingBookingCard from "@/components/dashboard/UpcomingBookingCard";
import RecentReviewsCard from "@/components/dashboard/RecentReviewsCard";
import QuickActions from "@/components/dashboard/QuickActions";
import { getCurrentProfile } from "@/lib/db/profiles";
import { createClient } from "@/lib/supabase/server";

import {
  getBookingCount,
  getCurrentStay,
  getNextBooking,
  getTotalSpent,
} from "@/lib/db/bookings";

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


  const [
  bookingCount,
  wishlistCount,
  reviews,
  totalSpent,
  nextBooking,
  currentStay,
  profile,
] = await Promise.all([
  getBookingCount(user.id),
  getWishlistCount(),
  getReviewsByUser(user.id),
  getTotalSpent(user.id),
  getNextBooking(user.id),
  getCurrentStay(user.id),
  getCurrentProfile(),
]);


    const fullName =
            profile?.full_name ?? "Traveler";


  return (
    <main className="mx-auto max-w-7xl space-y-8 p-8">

      <DashboardHeader
        fullName={fullName}
      />


      <DashboardStats
        bookings={bookingCount}
        wishlist={wishlistCount}
        reviews={reviews.length}
        totalSpent={totalSpent}
      />


      <section className="grid gap-6 lg:grid-cols-2">
        <CurrentStayCard
          booking={currentStay}
        />

        <UpcomingBookingCard
          booking={nextBooking}
        />
      </section>


      <section className="grid gap-6 lg:grid-cols-2">
        <RecentReviewsCard
          reviews={reviews}
        />

        <QuickActions />
      </section>

    </main>
  );
}