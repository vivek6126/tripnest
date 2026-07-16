import { createClient } from "@/lib/supabase/server";


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

  const { data: existingBookings, error: checkError } =
    await supabase
      .from("bookings")
      .select("id")
      .eq("property_id", propertyId)
      .lt("check_in", checkOut)
      .gt("check_out", checkIn);

  if (checkError) {
    throw checkError;
  }

  if (existingBookings.length > 0) {
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

export async function getBookingsByUser(
  userId: string
) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("bookings")
    .select(`
      *,
      properties (
        id,
        title,
        image,
        location,
        price
      )
    `)    
    .eq("user_id", userId)
    .order("created_at", {
      ascending: false,
    });

  if (error) {
    throw error;
  }

  return data;
}


export async function deleteBooking(
  bookingId: number,
  userId: string
) {
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


export async function getBookedDates(
  propertyId: number
) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("bookings")
    .select(`
      check_in,
      check_out
    `)
    .eq("property_id", propertyId);

  if (error) {
    throw error;
  }

  return data;
}