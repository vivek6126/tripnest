"use client";

import { useState } from "react";
import { Search, MapPinned, CalendarDays, Users } from "lucide-react";

export default function SearchBar() {
  const [destination, setDestination] = useState("");

  const inputClass =
    "rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-3 text-white placeholder:text-zinc-500 outline-none transition focus:border-blue-500";

  return (
    <div className="flex items-center gap-4 rounded-2xl border border-zinc-700 bg-black p-4 shadow-lg">

      {/* Destination */}
      <div className="flex flex-1 items-center gap-2">
        <MapPinned className="h-5 w-5 text-zinc-400" />

        <input
          type="text"
          value={destination}
          onChange={(event) => setDestination(event.target.value)}
          placeholder="Destination"
          className={`${inputClass} flex-1`}
        />
      </div>

      {/* Guests */}
      <div className="flex items-center gap-2">
        <Users className="h-5 w-5 text-zinc-400" />

        <select className={inputClass}>
          <option>1 Guest</option>
          <option>2 Guests</option>
          <option>3 Guests</option>
          <option>4 Guests</option>
        </select>
      </div>

      {/* Date */}
      <div className="flex items-center gap-2">
        <CalendarDays className="h-5 w-5 text-zinc-400" />

        <input
          type="date"
          className={inputClass}
        />
      </div>

      {/* Search Button */}
      <button className="flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700">
        <Search className="h-5 w-5" />
        Search
      </button>
    </div>
  );
}