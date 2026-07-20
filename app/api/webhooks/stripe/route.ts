import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";

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

      const { error } = await adminClient.rpc("process_stripe_checkout", {
        p_event_id: event.id,
        p_user_id: userId,
        p_property_id: Number(propertyId),
        p_check_in: checkIn,
        p_check_out: checkOut,
        p_guests: Number(guests),
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
