import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    return NextResponse.json(body);
  } catch {
    return NextResponse.json(
      {
        error: "Something went wrong.",
      },
      {
        status: 500,
      }
    );
  }
}