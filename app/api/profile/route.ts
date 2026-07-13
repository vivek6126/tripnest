import { NextResponse } from "next/server";

import { updateProfile } from "@/lib/db/profiles";

export async function PATCH(request: Request) {
  try {
    const body = await request.json();

    await updateProfile({
      fullName: body.fullName,
      avatarUrl: null,
      phone: body.phone,
      bio: body.bio,
    });

    return NextResponse.json({
      message: "Profile updated successfully.",
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