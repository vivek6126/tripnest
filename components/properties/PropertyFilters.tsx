"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

type PropertyFiltersProps = {
  location: string;
};

export default function PropertyFilters({
  location,
}: PropertyFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [destination, setDestination] = useState(location);
  const [minPrice, setMinPrice] = useState(
      searchParams.get("minPrice") ?? ""
    );
  const [maxPrice, setMaxPrice] = useState(
      searchParams.get("maxPrice") ?? ""
    );
  const [bedrooms, setBedrooms] = useState(
      searchParams.get("bedrooms") ?? ""
    );

  const [rating, setRating] = useState(
      searchParams.get("rating") ?? ""
    ); 


  function handleSearch() {
    const params = new URLSearchParams(searchParams.toString());

    if (destination.trim()) {
      params.set("destination", destination.trim());
    } else {
      params.delete("destination");
    }
    if (minPrice) {
      params.set("minPrice", minPrice);
    } else {
      params.delete("minPrice");
    }
    if (maxPrice) {
      params.set("maxPrice", maxPrice);
    } else {
      params.delete("maxPrice");
    }
    if (bedrooms) {
      params.set("bedrooms", bedrooms);
    } else {
      params.delete("bedrooms");
    }
    if (rating) {
      params.set("rating", rating);
    } else {
      params.delete("rating");
    }

    router.push(`/search?${params.toString()}`);
  }

  return (
    <div className="mb-8 rounded-lg border p-4">
      <h2 className="mb-4 text-lg font-semibold">
        Search Properties
      </h2>

      <div className="grid gap-3 md:grid-cols-4">
        <input
          type="text"
          placeholder="Search by location..."
          value={destination}
          onChange={(e) =>
            setDestination(e.target.value)
          }
          className="flex-1 rounded-md border px-3 py-2"
        />
        <input
          type="number"
          placeholder="Min Price"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          className="rounded-md border px-3 py-2"
        />

        <input
          type="number"
          placeholder="Max Price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className="rounded-md border px-3 py-2"
        />
<input
  type="number"
  placeholder="Bedrooms"
  min="1"
  value={bedrooms}
  onChange={(e) => setBedrooms(e.target.value)}
  className="rounded-md border px-3 py-2"
/>

<select
  value={rating}
  onChange={(e) => setRating(e.target.value)}
  className="rounded-md border px-3 py-2"
>
  <option value="">Any Rating</option>
  <option value="5">⭐ 5+</option>
  <option value="4">⭐ 4+</option>
  <option value="3">⭐ 3+</option>
  <option value="2">⭐ 2+</option>
  <option value="1">⭐ 1+</option>
</select>
        <button
          onClick={handleSearch}
          className="rounded-md bg-blue-600 px-6 py-2 text-white hover:bg-blue-700"
        >
          Search
        </button>
      </div>
    </div>
  );
}