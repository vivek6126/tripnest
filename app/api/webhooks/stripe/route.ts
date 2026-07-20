import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { getPropertyById } from "@/lib/db/properties";
import { calculateNights } from "@/lib/utils/date";
import { stripe } from "@/lib/stripe";
import { adminClient } from "@/lib/supabase/admin";

export async function POST(request: Request) {
  const body = await request.text();

  const signature = (await headers()).get("stripe-signature");

  if (!signature) {
    return NextResponse.json(
      { error: "Missing Stripe signature." },
      { status: 400 },
    );
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!,
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Invalid webhook signature." },
      { status: 400 },
    );
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object;
      const paymentIntent =
        typeof session.payment_intent === "string"
          ? session.payment_intent
          : (session.payment_intent?.id ?? null);
      const metadata = session.metadata;

      if (
        !metadata?.userId ||
        !metadata?.propertyId ||
        !metadata?.checkIn ||
        !metadata?.checkOut ||
        !metadata?.guests
      ) {
        throw new Error("Missing Stripe metadata.");
      }

      const { userId, propertyId, checkIn, checkOut, guests } = metadata;
      
      const property = await getPropertyById(Number(propertyId));

      if (!property) {
        throw new Error("Property not found.");
      }

      const nights = calculateNights(checkIn, checkOut);

      const expectedAmount = property.price * nights * 100;

      const stripeAmount = session.amount_total;

      if (stripeAmount !== expectedAmount) {
        throw new Error(
          `Payment amount mismatch.
            Expected ₹${expectedAmount / 100},
            received ₹${stripeAmount! / 100}.`,
        );
      }
      const { error } = await adminClient.rpc("process_stripe_checkout", {
        p_event_id: event.id,
        p_user_id: userId,
        p_property_id: Number(propertyId),
        p_check_in: checkIn,
        p_check_out: checkOut,
        p_guests: Number(guests),

        p_checkout_session_id: session.id,
        p_payment_intent: paymentIntent,
      });

      if (error) {
        throw error;
      }

      console.log("Stripe checkout processed successfully.");

      break;
    }
  }

  return NextResponse.json({
    received: true,
  });
}
