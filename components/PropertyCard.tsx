import Image from "next/image";

type PropertyCardProps = {
  id: number;
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
    <div className="group h-full overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <Image
        src={image}
        alt={title}
        width={500}
        height={300}
        className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-105"
      />

      <div className="space-y-3 p-6">
        <h2 className="text-2xl font-bold">
          {title}
        </h2>

        <p className="text-sm text-zinc-500">
          {location}
        </p>

        <div className="inline-flex items-center rounded-full bg-yellow-100 px-3 py-1 text-sm font-medium text-yellow-800">
          ⭐ {rating}
        </div>

        <div className="pt-2">
          <span className="text-2xl font-bold">
            ₹{price}
          </span>

          <span className="ml-1 text-zinc-500">
            / night
          </span>
        </div>
      </div>
    </div>
  );
}