import { NextResponse } from "next/server";
import { createBooking } from "@/lib/db/bookings";

export async function POST(
  request: Request
) {
  try {
    const body = await request.json();

    const booking =
      await createBooking({
        propertyId: body.propertyId,
        checkIn: body.checkIn,
        checkOut: body.checkOut,
        guests: body.guests,
      });

    return NextResponse.json(
      booking,
      { status: 201 }
    );
  } catch (error) {
        console.error(error);

         const message =
         error instanceof Error
            ? error.message
            :"Failed to create booking.";

        return NextResponse.json(
            { message },
            { status: 400 }
        );
    }
}