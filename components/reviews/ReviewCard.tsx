import RatingStars from "./RatingStars";

type ReviewCardProps = {
  rating: number;
  comment: string;
  createdAt: string;
};

export default function ReviewCard({
  rating,
  comment,
  createdAt,
}: ReviewCardProps) {
  const formattedDate = new Date(
    createdAt
  ).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <article className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition hover:shadow-md">
      <div className="flex items-center justify-between">
        <RatingStars rating={rating} />

        <span className="text-sm text-zinc-500">
          {formattedDate}
        </span>
      </div>

      <p className="mt-5 leading-7 text-zinc-700">
        {comment}
      </p>

      <div className="mt-6 border-t border-zinc-200 pt-4">
        <p className="font-semibold text-zinc-800">
          Anonymous User
        </p>
      </div>
    </article>
  );
}