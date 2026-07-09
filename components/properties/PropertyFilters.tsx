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

  function handleSearch() {
    const params = new URLSearchParams(searchParams.toString());

    if (destination.trim()) {
      params.set("destination", destination.trim());
    } else {
      params.delete("destination");
    }

    router.push(`/search?${params.toString()}`);
  }

  return (
    <div className="mb-8 rounded-lg border p-4">
      <h2 className="mb-4 text-lg font-semibold">
        Search Properties
      </h2>

      <div className="flex gap-3">
        <input
          type="text"
          placeholder="Search by location..."
          value={destination}
          onChange={(e) =>
            setDestination(e.target.value)
          }
          className="flex-1 rounded-md border px-3 py-2"
        />

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