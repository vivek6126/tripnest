"use client";

import { Heart } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

type WishlistButtonProps = {
  propertyId: number;
  initialWishlisted: boolean;
};

export default function WishlistButton({
  propertyId,
  initialWishlisted,
}: WishlistButtonProps) {
  const [wishlisted, setWishlisted] = useState(
    initialWishlisted
  );
  const [loading, setLoading] = useState(false);

  async function toggleWishlist() {
    if (loading) return;

    setLoading(true);

    try {
      const response = await fetch("/api/wishlist", {
        method: wishlisted ? "DELETE" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          propertyId,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message);
      }

      setWishlisted(!wishlisted);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
   <button
  type="button"
  onClick={(event) => {
    event.preventDefault();
    event.stopPropagation();
    toggleWishlist();
  }}
  disabled={loading}
  className="rounded-full bg-white/90 p-2 shadow-md transition hover:scale-110"
>
      <Heart
        className={`h-6 w-6 transition ${
          wishlisted
            ? "fill-red-500 text-red-500"
            : "text-zinc-700"
        }`}
      />
    </button>
  );
}