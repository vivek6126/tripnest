import { Star } from "lucide-react";

type RatingStarsProps = {
  rating: number;
  size?: number;
};

export default function RatingStars({
  rating,
  size = 18,
}: RatingStarsProps) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, index) => {
        const filled = index < rating;

        return (
          <Star
            key={index}
            size={size}
            className={
              filled
                ? "fill-yellow-400 text-yellow-400"
                : "text-zinc-300"
            }
          />
        );
      })}
    </div>
  );
}