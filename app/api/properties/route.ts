import { NextResponse } from "next/server";
import { getPropertiesFromDB } from "@/lib/db/properties";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const destination =
    searchParams.get("destination")?.trim() ?? "";

  try {
    const properties = await getPropertiesFromDB(
      destination
    );

    return NextResponse.json(properties);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Failed to fetch properties" },
      { status: 500 }
    );
  }
}