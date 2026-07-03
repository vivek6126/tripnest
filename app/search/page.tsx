"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import PropertyCard from "@/components/PropertyCard";

export default function SearchPage() {
  const searchParams = useSearchParams();

  const destination = searchParams.get("destination");
  const guests = searchParams.get("guests");
  const date = searchParams.get("date");

  const properties = [
    {
      id: 1,
      title: "Ocean View Villa",
      location: "Bali, Indonesia",
      rating: 4.9,
      price: 180,
      image: "/hotel1.jpg",
    },
    {
      id: 2,
      title: "Mountain Escape Lodge",
      location: "Swiss Alps, Switzerland",
      rating: 4.7,
      price: 240,
      image: "/hotel2.jpg",
    },
    {
      id: 3,
      title: "City Lights Hotel",
      location: "Tokyo, Japan",
      rating: 4.5,
      price: 150,
      image: "/hotel3.jpg",
    },
    {
      id: 4,
      title: "Desert Luxury Resort",
      location: "Dubai, UAE",
      rating: 4.8,
      price: 320,
      image: "/hotel4.jpg",
    },
    {
      id: 5,
      title: "Forest Retreat",
      location: "Vancouver, Canada",
      rating: 4.6,
      price: 140,
      image: "/hotel5.jpg",
    },
    {
      id: 6,
      title: "Beach Paradise Resort",
      location: "Maldives",
      rating: 5.0,
      price: 450,
      image: "/hotel6.jpg",
    },
  ];

  const filteredProperties = destination
    ? properties.filter(
        (property) =>
          property.location
            .toLowerCase()
            .includes(destination.toLowerCase()) ||
          property.title
            .toLowerCase()
            .includes(destination.toLowerCase())
      )
    : properties;
  
    
  if (filteredProperties.length === 0) {
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
          <h3 className="mb-3 font-semibold">
            Try:
          </h3>

          <ul className="space-y-2 text-zinc-400">
            <li>• Checking the spelling</li>
            <li>• Searching a nearby city</li>
            <li>• Choosing another destination</li>
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
      <h1 className="mb-2 text-4xl font-bold">Search Results</h1>

      <p className="mb-8 text-zinc-400">
        Destination: {destination} | Guests: {guests} | Date: {date}
      </p>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredProperties.map((property) => (
          <PropertyCard
            key={property.id}
            title={property.title}
            location={property.location}
            rating={property.rating}
            price={property.price}
            image={property.image}
          />
        ))}
      </div>
    </main>
  );
}