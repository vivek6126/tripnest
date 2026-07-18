import { redirect } from "next/navigation";
import RecentReviewsCard from "@/components/dashboard/RecentReviewsCard";
import { createClient } from "@/lib/supabase/server";
import UpcomingBookingCard from "@/components/dashboard/UpcomingBookingCard";
import CurrentStayCard from "@/components/dashboard/CurrentStayCard";
import { getNextBooking, getCurrentStay } from "@/lib/db/bookings";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardStats from "@/components/dashboard/DashboardStats";
import QuickActions from "@/components/dashboard/QuickActions"
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

  const [bookings, wishlist, reviews, totalSpent, nextBooking, currentStay] =
    await Promise.all([
      getBookingCount(user.id),
      getWishlistCount(),
      getReviewsByUser(user.id),
      getTotalSpent(user.id),
      getNextBooking(user.id),
      getCurrentStay(user.id),
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
      
      <div className="grid gap-6 lg:grid-cols-2">
        <CurrentStayCard booking={currentStay} />
        <UpcomingBookingCard booking={nextBooking} />
      </div>


      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <RecentReviewsCard reviews={reviews} />
        <QuickActions /> 
      </div>
    </main>
  );
}
