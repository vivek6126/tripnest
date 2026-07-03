import { NextResponse } from "next/server";
import { properties } from "@/lib/data/properties";

export async function GET() {
  return NextResponse.json(properties);
}