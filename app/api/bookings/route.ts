import { NextResponse } from "next/server";
import { createBooking } from "@/lib/db/bookings";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  try {
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { message: "Please log in to book a property." },
        { status: 401 }
      );
    }

    const {
      propertyId,
      checkIn,
      checkOut,
      guests,
    } = await request.json();

    const booking = await createBooking({
      userId: user.id,
      propertyId,
      checkIn,
      checkOut,
      guests,
    });

    return NextResponse.json(booking, {
      status: 201,
    });
  } catch (error) {
    console.error(error);

    const message =
      error instanceof Error
        ? error.message
        : "Failed to create booking.";

    return NextResponse.json(
      { message },
      { status: 400 }
    );
  }
}