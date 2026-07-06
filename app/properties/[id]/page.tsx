import Image from "next/image";
import { getPropertyById } from "@/lib/db/properties";

type PropertyPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function PropertyPage({
  params,
}: PropertyPageProps) {
  const { id } = await params;

  const property = await getPropertyById(Number(id)); 

  return (
    <main className="mx-auto max-w-5xl p-8">
      <Image
        src={property.image}
        alt={property.title}
        width={800}
        height={500}
        className="rounded-xl"
      />

      <h1 className="mt-6 text-4xl font-bold">
        {property.title}
      </h1>

      <p className="mt-2 text-zinc-400">
        📍 {property.location}
      </p>

      <p className="mt-2">
        ⭐ {property.rating}
      </p>

      <p className="mt-2 text-xl font-semibold">
        ₹{property.price} / night
      </p>

      <p className="mt-6">
        {property.description}
      </p>
    </main>
  );
}