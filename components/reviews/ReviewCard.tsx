import RatingStars from "./RatingStars";

type ReviewCardProps = {
  rating: number;
  comment: string;
  createdAt: string;
  fullName: string | null;
};

export default function ReviewCard({
  rating,
  comment,
  createdAt,
  fullName,
}: ReviewCardProps) {
  const formattedDate = new Date(
    createdAt
  ).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const displayName =
    fullName?.trim() || "Anonymous User";

  const initials = displayName
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

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

      <div className="mt-6 flex items-center gap-3 border-t border-zinc-200 pt-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 font-semibold text-blue-600">
          {initials}
        </div>

        <div>
          <p className="font-semibold text-zinc-800">
            {displayName}
          </p>

          <p className="text-sm text-zinc-500">
            Verified Traveler
          </p>
        </div>
      </div>
    </article>
  );
}