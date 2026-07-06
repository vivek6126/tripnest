import { NextResponse } from "next/server";
import { getPropertyById } from "@/lib/db/properties";

export async function GET(
  request: Request,
  {
    params,
  }: {
    params: Promise<{ id: string }>;
  }
) {
  const { id } = await params;

  const propertyId = Number(id);

  if (Number.isNaN(propertyId)) {
    return NextResponse.json(
      { message: "Invalid property id" },
      { status: 400 }
    );
  }

  try {
    const property = await getPropertyById(propertyId);

    return NextResponse.json(property);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Property not found" },
      { status: 404 }
    );
  }
}