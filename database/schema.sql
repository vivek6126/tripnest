CREATE TABLE properties (
    id BIGSERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    location TEXT NOT NULL,
    description TEXT NOT NULL,
    price NUMERIC NOT NULL,
    rating NUMERIC NOT NULL,
    image TEXT NOT NULL,
    bedrooms INTEGER NOT NULL,
    amenities TEXT[] NOT NULL
);

alter policy "Public can view properties"
on "public"."properties"
to public
using (
  true
);


create table bookings (
    id bigint generated always as identity primary key,

    property_id bigint not null,

    check_in date not null,

    check_out date not null,

    guests integer not null,

    created_at timestamptz not null default now()
);

create policy "Anyone can create bookings"
on bookings
for insert
to anon, authenticated
with check (true);

create policy "Anyone can view bookings"
on bookings
for select
to anon, authenticated
using (true);