import ReviewCard from "./ReviewCard";

type Review = {
  id: number;
  rating: number;
  comment: string;
  created_at: string;
};

type ReviewListProps = {
  reviews: Review[];
};

export default function ReviewList({
  reviews,
}: ReviewListProps) {
  if (reviews.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-zinc-300 p-10 text-center">
        <h3 className="text-xl font-semibold">
          No reviews yet
        </h3>

        <p className="mt-2 text-zinc-500">
          Be the first person to review this property.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {reviews.map((review) => (
        <ReviewCard
          key={review.id}
          rating={review.rating}
          comment={review.comment}
          createdAt={review.created_at}
        />
      ))}
    </div>
  );
}