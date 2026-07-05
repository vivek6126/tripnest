import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const destination =
    searchParams.get("destination")?.trim() ?? "";

  try {
    // Start building the query
    let query = supabase
      .from("properties")
      .select("*");

    // Add filters only if needed
    if (destination) {
      query = query.ilike(
        "location",
        `%${destination}%`
      );
    }

    // Execute the final query
    const { data, error } = await query;

    if (error) {
      throw error;
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Failed to fetch properties" },
      { status: 500 }
    );
  }
}