import { NextResponse } from "next/server";
import { properties } from "@/lib/data/properties";

export async function GET(request: Request) {
  const url = new URL(request.url);

  const destination = url.searchParams.get("destination");

  const filteredProperties = destination
    ? properties.filter(
        (property) =>
          property.location
            .toLowerCase()
            .includes(destination.toLowerCase()) ||
          property.title
            .toLowerCase()
            .includes(destination.toLowerCase())
      )
    : properties;

  return NextResponse.json(filteredProperties);
}