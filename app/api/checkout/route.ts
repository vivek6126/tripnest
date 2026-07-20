import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getPropertyById } from "@/lib/db/properties";
import { checkBookingAvailability } from "@/lib/db/bookings";
import { calculateNights } from "@/lib/utils/date";
import { stripe } from "@/lib/stripe";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { propertyId, checkIn, checkOut, guests } = body;

    if (!propertyId || !checkIn || !checkOut || !guests) {
      return NextResponse.json(
        {
          error: "Missing required fields.",
        },
        {
          status: 400,
        },
      );
    }

    const property = await getPropertyById(propertyId);
    if (!property) {
      return NextResponse.json(
        {
          error: "Property not found.",
        },
        {
          status: 404,
        },
      );
    }

    const available = await checkBookingAvailability(
      propertyId,
      checkIn,
      checkOut,
    );

    if (!available) {
      return NextResponse.json(
        {
          error: "Property is no longer available for these dates.",
        },
        {
          status: 409,
        },
      );
    }

    const nights = calculateNights(checkIn, checkOut);

    if (nights <= 0) {
      return NextResponse.json(
        {
          error: "Invalid booking dates.",
        },
        {
          status: 400,
        },
      );
    }

    const totalAmount = property.price * nights;
    const stripeAmount = totalAmount * 100;

    const session = await stripe.checkout.sessions.create({
      mode: "payment",

      payment_method_types: ["card"],

      customer_email: user.email!,
      metadata: {
        userId: user.id,
        propertyId: property.id.toString(),
        checkIn,
        checkOut,
        guests: guests.toString(),
      },
      
      line_items: [
        {
          quantity: 1,

          price_data: {
            currency: "inr",

            unit_amount: stripeAmount,

            product_data: {
              name: property.title,

              description: `${nights} night${nights > 1 ? "s" : ""} • ${property.location}`,
            },
          },
        },
      ],

      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/payment/success`,

      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/properties/${property.id}`,
    });
    
    return NextResponse.json({
      url: session.url,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Something went wrong.",
      },
      {
        status: 500,
      },
    );
  }
}
