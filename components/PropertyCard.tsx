import Image from "next/image";

type PropertyCardProps = {
  title: string;
  location: string;
  rating: number;
  price: number;
  image: string;
};

export default function PropertyCard({
  title,
  location,
  rating,
  price,
  image,
}: PropertyCardProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 shadow-lg transition hover:scale-[1.02] hover:shadow-xl">
      {/* Property Image */}
      <Image
        src={image}
        alt={title}
        width={500}
        height={300}
        className="h-60 w-full object-cover"
      />

      {/* Property Details */}
      <div className="space-y-2 p-5">
        <h2 className="text-2xl font-bold">{title}</h2>

        <p className="text-zinc-400">{location}</p>

        <p>⭐ {rating}</p>

        <p className="text-xl font-semibold">₹{price} / night</p>

        <button className="mt-4 w-full rounded-lg bg-blue-600 py-3 font-medium text-white transition hover:bg-blue-700">
          Book Now
        </button>
      </div>
    </div>
  );
}