"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { getProperties, type Property } from "@/lib/api/properties";
import Link from "next/link";
import PropertyCard from "@/components/PropertyCard";
import PropertyFilters from "@/components/properties/PropertyFilters";

export default function SearchPage() {
  const searchParams = useSearchParams();

  const destination =
    searchParams.get("destination")?.trim() ?? "";

  const guests = searchParams.get("guests");
  const date = searchParams.get("date");
  const minPrice = searchParams.get("minPrice");
  const maxPrice = searchParams.get("maxPrice");
  const bedrooms = searchParams.get("bedrooms");
  const rating = searchParams.get("rating");
  const [properties, setProperties] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadProperties() {
      try {      
        setIsLoading(true);
        setError("");

        const properties = await getProperties({
          destination,
          minPrice: minPrice ?? undefined,
          maxPrice: maxPrice ?? undefined,
          bedrooms: bedrooms ?? undefined,
          rating: rating ?? undefined,
        });

        setProperties(properties);
      }
      catch (error) {
        console.error(error);
        setError("Something went wrong while loading properties.");
      }
      finally {
        setIsLoading(false);
      }      
    }

    loadProperties();
  }, [destination,
      minPrice,
      maxPrice,
      bedrooms,
      rating,]);



  if (isLoading) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center">
        <h1 className="text-3xl font-bold">
          Loading properties...
        </h1>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center">
        <h1 className="text-2xl text-red-500">
          {error}
        </h1>
      </main>
    );
  }

  

  return (
    <main className="mx-auto max-w-7xl p-8">
      <h1 className="mb-2 text-4xl font-bold">
        Search Results
      </h1>

      <p className="mb-8 text-zinc-400">
        Destination: {destination || "All"} | Guests: {guests} |
        Date: {date || "Any"}
      </p>
        <PropertyFilters
          location={destination}
        />
      {properties.length === 0 ? (
  <div className="mt-12 rounded-xl border border-zinc-800 bg-zinc-900 p-10 text-center">
    <h2 className="mb-4 text-3xl font-bold">
      😕 No Properties Found
    </h2>

    <p className="mb-6 text-zinc-400">
      We couldn't find any properties matching your filters.
    </p>

    <div className="mx-auto max-w-md text-left">
      <h3 className="mb-3 font-semibold">
        Try:
      </h3>

      <ul className="space-y-2 text-zinc-400">
        <li>• Lower your minimum price</li>
        <li>• Increase your maximum price</li>
        <li>• Reduce the bedroom count</li>
        <li>• Lower the minimum rating</li>
        <li>• Search another destination</li>
      </ul>
    </div>
  </div>
) : (
  <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
    {properties.map((property) => (
      <Link
        key={property.id}
        href={`/properties/${property.id}`}
      >
        <PropertyCard
          id={property.id}
          title={property.title}
          location={property.location}
          rating={property.rating}
          price={property.price}
          image={property.image}
        />
      </Link>
    ))}
  </div>
)}
    </main>
  );
}