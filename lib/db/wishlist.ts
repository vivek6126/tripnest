import { createClient } from "@/lib/supabase/server";

export async function isWishlisted(
  propertyId: number
): Promise<boolean> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return false;

  const { data } = await supabase
    .from("wishlists")
    .select("id")
    .eq("user_id", user.id)
    .eq("property_id", propertyId)
    .maybeSingle();

  return !!data;
}

export async function addToWishlist(
  propertyId: number
) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Please login first.");
  }

  const { error } = await supabase
    .from("wishlists")
    .insert({
      user_id: user.id,
      property_id: propertyId,
    });

  if (error) throw error;
}

export async function removeFromWishlist(
  propertyId: number
) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Please login first.");
  }

  const { error } = await supabase
    .from("wishlists")
    .delete()
    .eq("user_id", user.id)
    .eq("property_id", propertyId);

  if (error) throw error;
}

export async function getWishlist() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return [];

  const { data, error } = await supabase
    .from("wishlists")
    .select(`
      property:properties (
        id,
        title,
        location,
        image,
        price,
        rating
      )
    `)
    .eq("user_id", user.id)
    .returns<
      {
        property: {
          id: number;
          title: string;
          location: string;
          image: string;
          price: number;
          rating: number;
        };
      }[]
    >();

  if (error) throw error;

  return data;
}
export async function getWishlistedPropertyIds(): Promise<Set<number>> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return new Set();

  const { data, error } = await supabase
    .from("wishlists")
    .select("property_id")
    .eq("user_id", user.id);

  if (error) throw error;

  return new Set(
    data.map((item) => item.property_id)
  );
}
export async function getWishlistCount(): Promise<number> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return 0;

  const { count, error } = await supabase
    .from("wishlists")
    .select("*", {
      count: "exact",
      head: true,
    })
    .eq("user_id", user.id);

  if (error) throw error;

  return count ?? 0;
}