import Image from "next/image";
import { getPropertyById } from "@/lib/db/properties";
import BookingCard from "@/components/BookingCard";
  
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
    <main className="mx-auto max-w-6xl p-8">
      {/* Hero Image */}
      <Image
        src={property.image}
        alt={property.title}
        width={1200}
        height={600}
        className="h-[450px] w-full rounded-xl object-cover"
      />

      {/* Property Header */}
      <div className="mt-6">
        <h1 className="text-4xl font-bold">
          {property.title}
        </h1>

        <div className="mt-2 flex items-center gap-6 text-zinc-600">
          <p>📍 {property.location}</p>
          <p>⭐ {property.rating}</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="mt-10 grid gap-10 lg:grid-cols-3">
        {/* Left Section */}
        <div className="space-y-8 lg:col-span-2">
          <section>
            <h2 className="text-2xl font-semibold">
              Description
            </h2>

            <p className="mt-3 text-zinc-700">
              {property.description}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold">
              Bedrooms
            </h2>

            <p className="mt-3">
              🛏️ {property.bedrooms} Bedrooms
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold">
              Amenities
            </h2>

            <ul className="mt-3 space-y-2">
              {property.amenities.map((amenity) => (
                <li key={amenity}>
                  ✓ {amenity}
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* Right Section */}
        <aside>
          <BookingCard
            price={property.price}
          />
        </aside>
      </div>
    </main>
  );
}