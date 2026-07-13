import { NextResponse } from "next/server";
import { createReview } from "@/lib/db/reviews";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    await createReview({
      propertyId: body.propertyId,
      rating: body.rating,
      comment: body.comment,
    });

    return NextResponse.json({
      message: "Review added successfully.",
    });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        {
          message: error.message,
        },
        {
          status: 400,
        }
      );
    }

    return NextResponse.json(
      {
        message: "Something went wrong.",
      },
      {
        status: 500,
      }
    );
  }
}