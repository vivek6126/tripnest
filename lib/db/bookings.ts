import { supabase } from "@/lib/supabase";

type CreateBookingParams = {
  propertyId: number;
  checkIn: string;
  checkOut: string;
  guests: number;
};

export async function createBooking({
  propertyId,
  checkIn,
  checkOut,
  guests,
}: CreateBookingParams) {
  const { data: existingBookings, error: checkError } =
    await supabase
      .from("bookings")
      .select("*")
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