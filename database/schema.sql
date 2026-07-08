-- WARNING: This schema is for context only and is not meant to be run.
-- Table order and constraints may not be valid for execution.

CREATE TABLE public.properties (
  id bigint NOT NULL DEFAULT nextval('properties_id_seq'::regclass),
  title text NOT NULL,
  location text NOT NULL,
  description text NOT NULL,
  price numeric NOT NULL,
  rating numeric NOT NULL,
  image text NOT NULL,
  bedrooms integer NOT NULL,
  amenities ARRAY NOT NULL,
  CONSTRAINT properties_pkey PRIMARY KEY (id)
);
CREATE TABLE public.bookings (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  property_id bigint NOT NULL,
  check_in date NOT NULL,
  check_out date NOT NULL,
  guests integer NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  user_id uuid NOT NULL,
  CONSTRAINT bookings_pkey PRIMARY KEY (id),
  CONSTRAINT bookings_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id),
  CONSTRAINT bookings_property_id_fkey FOREIGN KEY (property_id) REFERENCES public.properties(id)
);