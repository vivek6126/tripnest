import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getReviewsByUser } from "@/lib/db/reviews";

import ReviewCard from "@/components/dashboard/ReviewCard";

export default async function ReviewsPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const reviews = await getReviewsByUser(user.id);

  return (
    <main className="mx-auto max-w-6xl p-8">
      <section className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight">⭐ My Reviews</h1>

        <p className="mt-2 text-zinc-600">
          All the experiences you've shared across your trips.
        </p>
      </section>

      {reviews.length === 0 ? (
        <div className="mt-8 rounded-2xl border border-dashed p-12 text-center">
          <p className="text-lg font-medium">
            You haven't written any reviews yet.
          </p>

          <p className="mt-2 text-zinc-600">
            Stay at a property and share your experience.
          </p>
        </div>
      ) : (
        <div className="mt-8 space-y-6">
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      )}
    </main>
  );
}
