import { NextResponse } from "next/server";
import { getPropertiesFromDB } from "@/lib/db/properties";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const destination =
    searchParams.get("destination")?.trim() ?? "";

  const minPrice = searchParams.get("minPrice");
  const maxPrice = searchParams.get("maxPrice");
  const bedrooms = searchParams.get("bedrooms");
  const rating = searchParams.get("rating");
  try {
    const properties = await getPropertiesFromDB({
  destination,
  minPrice: minPrice ?? undefined,
  maxPrice: maxPrice ?? undefined,
  bedrooms: bedrooms ?? undefined,
  rating: rating ?? undefined,
});

    return NextResponse.json(properties);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Failed to fetch properties" },
      { status: 500 }
    );
  }
}