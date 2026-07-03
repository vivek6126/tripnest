"use client";

import { useSearchParams } from "next/navigation";
import PropertyCard from "@/components/PropertyCard";
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


export default function SearchPage() {
    const searchParams = useSearchParams();
    const destination = searchParams.get("destination");
    const guests = searchParams.get("guests");
    const date = searchParams.get("date");
  
  
    return (
    <div className="p-10">
      <h1 className="text-4xl font-bold">Search Results</h1>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {properties.map((property) => (
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
      <p>destination={destination}</p>
      <p>guests={guests}</p>
      <p>date={date}</p>
    </div>
  );
}