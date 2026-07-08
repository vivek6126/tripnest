export type BookingWithProperty = {
  id: number;
  property_id: number;
  check_in: string;
  check_out: string;
  guests: number;
  created_at: string;
  user_id: string;

  properties: {
    id: number;
    title: string;
    image: string;
    location: string;
    price: number;
  };
};