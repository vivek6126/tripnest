import SearchBar from "./SearchBar";

export default function Hero() {
  return (
   <section className="relative overflow-hidden">
  {/* Hero Image */}
  <div
    className="relative h-[75vh] bg-cover bg-center"
    style={{
      backgroundImage: "url('/test.jpg')",
    }}
  >
    {/* Dark Overlay */}
    <div className="absolute inset-0 bg-black/40" />

    {/* Hero Content */}
    <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col items-center justify-center px-6 text-center text-white">

      <h1 className="max-w-4xl text-5xl font-bold leading-tight md:text-7xl">
        Find your next stay.
      </h1>

      <p className="mt-6 max-w-2xl text-lg text-white/90 md:text-xl">
        Unique hotels, villas and unforgettable travel experiences around the world.
      </p>

      <div className="mt-10 w-full max-w-5xl rounded-2xl bg-white p-4 shadow-2xl">
        <SearchBar />
      </div>

    </div>
  </div>
</section>
  );
}