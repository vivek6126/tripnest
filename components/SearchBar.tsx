"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Search, MapPinned, CalendarDays, Users } from "lucide-react";

export default function SearchBar() {
    const [destination, setDestination] = useState("");
    const [guests, setGuests] = useState("1");
    const [date, setDate] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();
    
    const cleanedDestination = destination.trim();
    function handleSearch() {
        
        if (cleanedDestination === "") {
            setError("Please enter destination");
            return;
        }

        router.push(
            `/search?destination=${cleanedDestination}&guests=${guests}&date=${date}`
        );      
    }

    const inputClass =
      "w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-zinc-900 placeholder:text-zinc-500 outline-none transition-all duration-200 focus:border-primary focus:ring-4 focus:ring-primary/10";

return (
    <div className="grid gap-4 md:grid-cols-[2fr_1fr_1fr_auto]">


      {/* Destination */}
      <div className="w-full">
      <div className="flex flex-1 items-center gap-2">
        <MapPinned className="h-5 w-5 text-zinc-500" />

        <input
          type="text"
          value={destination}
          onChange={(event) => {
            setDestination(event.target.value);
            setError("");
            }}
          placeholder="Where are you going?"
          className={`${inputClass} flex-1`}
        />
      </div>
      {error && (
                <p className="mt-2 text-sm text-red-500">
                    {error}
                </p>
                )}       
      </div>


      {/* Guests */}
      <div className="flex items-center gap-2">
        <Users className="h-5 w-5 text-zinc-500" />

        <select className={inputClass} 
                value={guests}
                onChange={(event) => setGuests(event.target.value)}>
          <option value="1">1 Guest</option>
          <option value="2">2 Guests</option>
          <option value="3">3 Guests</option>
          <option value="4">4 Guests</option>
          
        </select>
      </div>

      {/* Date */}
      <div className="flex items-center gap-2">
        <CalendarDays className="h-5 w-5 text-zinc-500" />

        <input 
            type="date"
            className={inputClass}
            value={date}
            onChange={(event) => setDate(event.target.value)}
        />
      </div>

      {/* Search Button */}
      <button onClick={handleSearch} className="flex h-full items-center justify-center gap-2 rounded-xl bg-primary px-8 py-3 font-semibold text-primary-foreground transition-all duration-200 hover:scale-[1.02] hover:shadow-lg hover:bg-primary/90">
        <Search className="h-5 w-5" />
        Search
      </button>
    </div>
  );
}