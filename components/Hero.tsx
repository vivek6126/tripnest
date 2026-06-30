export default function Hero() {
  return (
    <section className="flex flex-1 flex-col items-center justify-center px-6 text-center">
      <h1 className="mb-6 text-5xl font-bold">
        Discover Your Next Adventure
      </h1>

      <p className="mb-8 max-w-2xl text-lg text-gray-600">
        Explore boutique hotels, surf camps, yoga retreats,
        and unforgettable travel experiences around the world.
      </p>

      <button className="rounded-lg bg-black px-6 py-3 text-white transition hover:bg-gray-800">
        Search Trips
      </button>
    </section>
  );
}