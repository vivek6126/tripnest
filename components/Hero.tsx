import SearchBar from "./SearchBar";

export default function Hero() {
  return (
    <section className="flex flex-1 items-center justify-center px-6 py-20">
      <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
        <h1 className="text-5xl font-bold leading-tight md:text-6xl">
          Discover Your Next Adventure
        </h1>
        <SearchBar />

        <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-600">
          Explore boutique hotels, surf camps, yoga retreats, and unforgettable
          travel experiences around the world.
        </p>
        
      </div>
    </section>
  );
}