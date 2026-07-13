"use client";

import { useState } from "react";
import { toast } from "sonner";

type ReviewFormProps = {
  propertyId: number;
};

export default function ReviewForm({
  propertyId,
}: ReviewFormProps) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    if (comment.trim().length < 10) {
      toast.error(
        "Review must be at least 10 characters."
      );
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          propertyId,
          rating,
          comment,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message);
      }

      toast.success(result.message);

      window.location.reload();
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
      <h3 className="text-xl font-semibold">
        Leave a Review
      </h3>

      <div className="mt-5">
        <label className="mb-2 block font-medium">
          Rating
        </label>

        <select
          value={rating}
          onChange={(e) =>
            setRating(Number(e.target.value))
          }
          className="w-full rounded-xl border border-zinc-300 p-3"
        >
          {[5, 4, 3, 2, 1].map((value) => (
            <option key={value} value={value}>
              {value} Star{value > 1 && "s"}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-5">
        <label className="mb-2 block font-medium">
          Review
        </label>

        <textarea
          rows={5}
          value={comment}
          onChange={(e) =>
            setComment(e.target.value)
          }
          placeholder="Share your experience..."
          className="w-full rounded-xl border border-zinc-300 p-3"
        />
      </div>

      <button
        disabled={loading}
        onClick={handleSubmit}
        className="primary-btn mt-6 w-full"
      >
        {loading
          ? "Submitting..."
          : "Submit Review"}
      </button>
    </div>
  );
}