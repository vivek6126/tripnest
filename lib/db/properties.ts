import { createClient } from "@/lib/supabase/server";
import type { Property } from "@/lib/api/properties";

type PropertyFilters = {
  destination?: string;
  minPrice?: string;
  maxPrice?: string;
  bedrooms?: string;
  rating?: string;
  category?: string;
};

export async function getPropertiesFromDB(
  filters: PropertyFilters = {}
): Promise<Property[]> {
   const supabase = await createClient();
  let query = supabase
    .from("properties")
    .select("*");
    if (filters.destination) {
      query = query.ilike(
      "location",
      `%${filters.destination}%`
    );
  }

  if (filters.minPrice) {
    query = query.gte(
      "price",
      Number(filters.minPrice)
    );
  }
  
  if (filters.maxPrice) {
    query = query.lte(
      "price",
      Number(filters.maxPrice)
    );
  }
  if (filters.bedrooms) {
    query = query.eq(
      "bedrooms",
      Number(filters.bedrooms)
    );
  }
  
  if (filters.rating) {
    query = query.gte(
      "rating",
    Number(filters.rating)
  );
}
if (filters.category) {
  query = query.eq(
    "category",
    filters.category
  );
}

if (!filters.category) {
  query = query
      .order("rating", { ascending: false })
      .limit(6);
}
  const { data, error } = await query;

  if (error) {
    throw error;
  }

  return data;
}

export async function getPropertyById(
  id: number
): Promise<Property> {
   const supabase = await createClient();
  const { data, error } = await supabase
    .from("properties")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    throw error;
  }

  return data;
}