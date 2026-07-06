import { supabase } from "@/lib/supabase";

export async function getPropertiesFromDB(
  destination?: string
) {
  let query = supabase
    .from("properties")
    .select("*");

  if (destination) {
    query = query.ilike(
      "location",
      `%${destination}%`
    );
  }

  const { data, error } = await query;

  if (error) {
    throw error;
  }

  return data;
}

export async function getPropertyById(
  id: number
) {
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