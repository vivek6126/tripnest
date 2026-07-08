import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { deleteBooking } from "@/lib/db/bookings";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function DELETE(
  request: Request,
  { params }: RouteContext
) {
  try {
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { message: "Please log in." },
        { status: 401 }
      );
    }

    const { id } = await params;

    await deleteBooking(
      Number(id),
      user.id
    );

    return NextResponse.json({
      message: "Booking cancelled successfully.",
    });
  } catch (error) {
    console.error(error);

    const message =
      error instanceof Error
        ? error.message
        : "Failed to cancel booking.";

    return NextResponse.json(
      { message },
      { status: 400 }
    );
  }
}