"use client";

import { useState } from "react";
export default function SearchBar() {
  const [destination, setDestination] = useState("");

  return (
    <div className="flex items-center gap-4 rounded-xl border border-gray-200 bg-black p-4 shadow-md">
      <input
        type="text"
        value={destination}
        onChange={(event) => setDestination(event.target.value)}
        placeholder="Where do you want to go?"
        className="flex-1 rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
      />

      <select className="rounded-lg border border-gray-300 bg-black px-4 py-3 outline-none">
        <option>1 Guest</option>
        <option>2 Guests</option>
        <option>3 Guests</option>
        <option>4 Guests</option>
      </select>

      <input
        type="date"
        className="rounded-lg border border-gray-300 px-4 py-3 outline-none"
      />

      <button className="rounded-lg bg-black px-6 py-3 text-white transition hover:bg-gray-800">
        Search
      </button>
    </div>
  );
}