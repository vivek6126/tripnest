"use client";

import { useSearchParams } from "next/navigation";

export default function SearchPage() {
    const searchParams = useSearchParams();
    const destination = searchParams.get("destination");
    const guests = searchParams.get("guests");
    const date = searchParams.get("date");
  
  
    return (
    <div className="p-10">
      <h1 className="text-4xl font-bold">Search Results</h1>
      <p>destination={destination}</p>
      <p>guests={guests}</p>
      <p>date={date}</p>
    </div>
  );
}