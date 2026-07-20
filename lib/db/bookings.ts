import { createClient } from "@/lib/supabase/server";
import { calculateNights } from "@/lib/utils/date";
import type { Property } from "@/lib/api/properties";

type CreateBookingParams = {
  userId: string;
  propertyId: number;
  checkIn: string;
  checkOut: string;
  guests: number;
};

export async function createBooking({
  userId,
  propertyId,
  checkIn,
  checkOut,
  guests,
}: CreateBookingParams) {
  const supabase = await createClient();

  const available = await checkBookingAvailability(
  propertyId,
  checkIn,
  checkOut
);

if (!available) {
  throw new Error(
    "Property is already booked for these dates."
  );
}


  const { data, error } = await supabase
    .from("bookings")
    .insert({
      user_id: userId,
      property_id: propertyId,
      check_in: checkIn,
      check_out: checkOut,
      guests,
    })
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}

export async function getBookingsByUser(userId: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("bookings")
    .select(
      `
      *,
      properties (
        id,
        title,
        image,
        location,
        price
      )
    `,
    )
    .eq("user_id", userId)
    .order("created_at", {
      ascending: false,
    });

  if (error) {
    throw error;
  }

  return data;
}

export async function deleteBooking(bookingId: number, userId: string) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("bookings")
    .delete()
    .eq("id", bookingId)
    .eq("user_id", userId);

  if (error) {
    throw error;
  }
}

export async function getBookedDates(propertyId: number) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("bookings")
    .select(
      `
      check_in,
      check_out
    `,
    )
    .eq("property_id", propertyId);

  if (error) {
    throw error;
  }

  return data;
}

export async function getBookingCount(userId: string) {
  const supabase = await createClient();

  const { count, error } = await supabase
    .from("bookings")
    .select("*", {
      count: "exact",
      head: true,
    })
    .eq("user_id", userId);

  if (error) throw error;

  return count ?? 0;
}

export async function getTotalSpent(userId: string): Promise<number> {
  const bookings = await getBookingsByUser(userId);

  return bookings.reduce((total, booking) => {
    const nights = calculateNights(booking.check_in, booking.check_out);

    return total + booking.properties.price * nights;
  }, 0);
}

export async function getNextBooking(userId: string) {
  const supabase = await createClient();

  const today = new Date().toISOString().split("T")[0];

  const { data, error } = await supabase
    .from("bookings")
    .select(
      `
      *,
      properties (
        id,
        title,
        image,
        location
      )
    `,
    )
    .eq("user_id", userId)
    .gt("check_in", today)
    .order("check_in", {
      ascending: true,
    })
    .limit(1)
    .maybeSingle();

  if (error) throw error;

  return data;
}

export async function getCurrentStays(userId: string) {
  const supabase = await createClient();

  const today = new Date().toISOString().split("T")[0];

  const { data, error } = await supabase
    .from("bookings")
    .select(
      `
    *,
    properties (
      id,
      title,
      image,
      location
    )
  `,
    )
    .eq("user_id", userId)
    .lte("check_in", today)
    .gt("check_out", today)
    .order("check_in", { ascending: true })
    .limit(1)
    .maybeSingle();

  if (error) throw error;

  return data;
}


export async function checkBookingAvailability(
  propertyId: number,
  checkIn: string,
  checkOut: string
): Promise<boolean> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("bookings")
    .select("id")
    .eq("property_id", propertyId)
    .lt("check_in", checkOut)
    .gt("check_out", checkIn);

  if (error) {
    throw error;
  }

  return data.length === 0;
}

export async function getLatestPaidBooking(
  userId: string
) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("bookings")
    .select(`
      *,
      properties (
        *
      )
    `)
    .eq("user_id", userId)
    .eq("payment_status", "paid")
    .order("created_at", {
      ascending: false,
    })
    .limit(1)
    .maybeSingle();

  if (error) {
    throw error;
  }

  return data;
}

export async function getBookingByCheckoutSession(
  sessionId: string
) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("bookings")
    .select(`
      *,
      properties (
        *
      )
    `)
    .eq("stripe_checkout_session_id", sessionId)
    .eq("payment_status", "paid")
    .maybeSingle();

  if (error) {
    throw error;
  }

  return data;
}