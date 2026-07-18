import Link from "next/link";

import { formatDate } from "@/lib/utils/date";

type RecentReviewsCardProps = {
  reviews: any[];
};

export default function RecentReviewsCard({ reviews }: RecentReviewsCardProps) {
  if (reviews.length === 0) {
    return (
      <section className="rounded-2xl border bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold">⭐ Recent Reviews</h2>

        <p className="mt-3 text-zinc-600">
          You haven't written any reviews yet.
        </p>

        <Link
          href="/search"
          className="mt-5 inline-block rounded-lg bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
        >
          Browse Properties
        </Link>
      </section>
    );
  }

  return (
    <section className="rounded-2xl border bg-white p-6 shadow-sm">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-xl font-semibold">⭐ Recent Reviews</h2>

        <Link
          href="/dashboard/reviews"
          className="text-sm font-medium text-blue-600 hover:underline"
        >
          View All →
        </Link>
      </div>

      <div className="space-y-5">
        {reviews.slice(0, 2).map((review) => (
          <Link
            key={review.id}
            href={`/properties/${review.property.id}`}
            className="
group
block
rounded-xl
border
border-transparent
p-4
transition-all
duration-200
ease-out
hover:-translate-y-0.5
hover:border-blue-200
hover:bg-blue-50
hover:shadow-md
"
          >
            <p className="text-lg">{"⭐".repeat(review.rating)}</p>

            <h3 className="mt-2 font-semibold">{review.property.title}</h3>

            <p className="mt-1 line-clamp-2 text-zinc-700">
              "{review.comment}"
            </p>

            <p className="mt-2 text-sm text-zinc-500">
              {formatDate(review.created_at)}
            </p>
            <div className="mt-3 flex justify-end text-blue-600 transition-transform duration-200 group-hover:translate-x-1">
  →
</div>
          </Link>
        ))}
      </div>
    </section>
  );
}
