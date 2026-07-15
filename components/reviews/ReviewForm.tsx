"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type UserReview = {
  id: number;
  rating: number;
  comment: string;
};

type ReviewFormProps = {
  propertyId: number;
  userReview: UserReview | null;
};

export default function ReviewForm({
  propertyId,
  userReview,
}: ReviewFormProps) {
  const router = useRouter();

  const [rating, setRating] = useState(
    userReview?.rating ?? 5
  );

  const [comment, setComment] = useState(
    userReview?.comment ?? ""
  );

  const [loading, setLoading] = useState(false);

  const editing = !!userReview;

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
        method: editing ? "PATCH" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(
          editing
            ? {
                reviewId: userReview.id,
                rating,
                comment,
              }
            : {
                propertyId,
                rating,
                comment,
              }
        ),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message);
      }

      toast.success(result.message);

      router.refresh();
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete() {
    const confirmed = window.confirm(
      "Delete your review?"
    );

    if (!confirmed || !userReview) return;

    setLoading(true);

    try {
      const response = await fetch("/api/reviews", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          reviewId: userReview.id,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message);
      }

      toast.success(result.message);

      router.refresh();
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
        {editing
          ? "Edit Your Review"
          : "Leave a Review"}
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
            <option
              key={value}
              value={value}
            >
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

      <div className="mt-6 flex gap-3">
        <button
          disabled={loading}
          onClick={handleSubmit}
          className="primary-btn flex-1"
        >
          {loading
            ? editing
              ? "Updating..."
              : "Submitting..."
            : editing
            ? "Update Review"
            : "Submit Review"}
        </button>

        {editing && (
          <button
            disabled={loading}
            onClick={handleDelete}
            className="rounded-xl border border-red-300 px-5 font-medium text-red-600 transition hover:bg-red-50"
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
}