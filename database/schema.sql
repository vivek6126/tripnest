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