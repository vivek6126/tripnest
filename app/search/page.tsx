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

  const [properties, setProperties] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadProperties() {
      try {      
        setIsLoading(true);
        setError("");

        const properties  = await getProperties(destination);

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
  }, [destination]);



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

  if (properties.length === 0) {
    return (
      <main className="mx-auto flex min-h-[70vh] max-w-3xl flex-col items-center justify-center px-6 text-center">
        <h1 className="mb-4 text-5xl">😕</h1>

        <h2 className="text-3xl font-bold">
          No Properties Found
        </h2>

        <p className="mt-4 text-zinc-400">
          We couldn't find any properties matching{" "}
          <span className="font-semibold text-white">
            "{destination}"
          </span>
        </p>

        <div className="mt-8 rounded-xl border border-zinc-800 bg-zinc-900 p-6 text-left">
          <h3 className="mb-3 font-semibold">Try:</h3>

          <ul className="space-y-2 text-zinc-400">
            <li>• Check the spelling</li>
            <li>• Search a nearby city</li>
            <li>• Try another destination</li>
          </ul>
        </div>

        <Link
          href="/"
          className="mt-8 rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700"
        >
          ← Back to Search
        </Link>
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
    </main>
  );
}