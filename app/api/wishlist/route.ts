import { NextResponse } from "next/server";

import {
  addToWishlist,
  removeFromWishlist,
} from "@/lib/db/wishlist";

export async function POST(request: Request) {
  try {
    const { propertyId } = await request.json();

    await addToWishlist(propertyId);

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    return NextResponse.json(
      {
        message:
          error instanceof Error
            ? error.message
            : "Something went wrong.",
      },
      { status: 400 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { propertyId } = await request.json();

    await removeFromWishlist(propertyId);

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    return NextResponse.json(
      {
        message:
          error instanceof Error
            ? error.message
            : "Something went wrong.",
      },
      { status: 400 }
    );
  }
}