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
    "rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-3 text-white placeholder:text-zinc-500 outline-none transition focus:border-blue-500";

return (
    <div className="flex items-center gap-4 rounded-2xl border border-zinc-700 bg-black p-4 shadow-lg">


      {/* Destination */}
      <div className="w-full">
      <div className="flex flex-1 items-center gap-2">
        <MapPinned className="h-5 w-5 text-zinc-400" />

        <input
          type="text"
          value={destination}
          onChange={(event) => {
            setDestination(event.target.value);
            setError("");
            }}
          placeholder="Destination"
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
        <Users className="h-5 w-5 text-zinc-400" />

        <select className={inputClass} 
                value={guests}
                onChange={(event) => setGuests(event.target.value)}>
          <option value="1">1 Guest</option>
          <option value="2">2 Guest</option>
          <option value="3">3 Guest</option>
          <option value="4">4 Guest</option>
          
        </select>
      </div>

      {/* Date */}
      <div className="flex items-center gap-2">
        <CalendarDays className="h-5 w-5 text-zinc-400" />

        <input 
            type="date"
            className={inputClass}
            value={date}
            onChange={(event) => setDate(event.target.value)}
        />
      </div>

      {/* Search Button */}
      <button onClick={handleSearch} className="flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700">
        <Search className="h-5 w-5" />
        Search
      </button>
    </div>
  );
}