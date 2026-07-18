import Link from "next/link";
import { formatDate } from "@/lib/utils/date";

type ReviewCardProps = {
  review: {
    id: number;
    rating: number;
    comment: string;
    created_at: string;
    property: {
      id: number;
      title: string;
    };
  };
};

export default function ReviewCard({
  review,
}: ReviewCardProps) {
  return (
    <Link
      href={`/properties/${review.property.id}`}
      className="
        group
        block
        rounded-2xl
        border
        border-transparent
        bg-white
        p-6
        shadow-sm
        transition-all
        duration-200
        hover:-translate-y-0.5
        hover:border-blue-200
        hover:bg-blue-50
        hover:shadow-md
      "
    >
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">
          {review.property.title}
        </h2>

        <span className="text-yellow-500">
          {"⭐".repeat(review.rating)}
        </span>
      </div>

      <p className="mt-4 text-zinc-700">
        {review.comment}
      </p>

      <div className="mt-6 flex items-center justify-between">
        <p className="text-sm text-zinc-500">
          {formatDate(review.created_at)}
        </p>

        <span className="text-blue-600 transition-transform duration-200 group-hover:translate-x-1">
          →
        </span>
      </div>
    </Link>
  );
}