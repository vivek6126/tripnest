import { createClient } from "@/lib/supabase/server";

export async function getReviewsByProperty(
  propertyId: number
) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("reviews")
    .select(`
      id,
      rating,
      comment,
      created_at,
      user_id
    `)
    .eq("property_id", propertyId)
    .order("created_at", {
      ascending: false,
    });

  if (error) throw error;

  return data;
}

export async function getAverageRating(
  propertyId: number
) {
  const reviews =
    await getReviewsByProperty(propertyId);

  if (reviews.length === 0) {
    return {
      average: 0,
      count: 0,
    };
  }

  const total = reviews.reduce(
    (sum, review) => sum + review.rating,
    0
  );

  return {
    average: Number(
      (total / reviews.length).toFixed(1)
    ),
    count: reviews.length,
  };
}

export async function createReview({
  propertyId,
  rating,
  comment,
}: {
  propertyId: number;
  rating: number;
  comment: string;
}) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Please login first.");
  }

  const { error } = await supabase
    .from("reviews")
    .insert({
      property_id: propertyId,
      user_id: user.id,
      rating,
      comment,
    });

  if (error) {
    if (error.code === "23505") {
      throw new Error(
        "You have already reviewed this property."
      );
    }

    throw error;
  }
}

export async function updateReview({
  reviewId,
  rating,
  comment,
}: {
  reviewId: number;
  rating: number;
  comment: string;
}) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("reviews")
    .update({
      rating,
      comment,
      updated_at: new Date(),
    })
    .eq("id", reviewId);

  if (error) throw error;
}

export async function deleteReview(
  reviewId: number
) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("reviews")
    .delete()
    .eq("id", reviewId);

  if (error) throw error;
}

export async function getUserReview(
  propertyId: number
) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data, error } = await supabase
    .from("reviews")
    .select("*")
    .eq("property_id", propertyId)
    .eq("user_id", user.id)
    .maybeSingle();

  if (error) throw error;

  return data;
}