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