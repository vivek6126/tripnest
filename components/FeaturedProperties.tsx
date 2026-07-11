import Link from "next/link";
import {
  getWishlistedPropertyIds,
} from "@/lib/db/wishlist";
import { getPropertiesFromDB } from "@/lib/db/properties";
import PropertyCard from "./PropertyCard";

const sectionTitles: Record<string, string> = {
  Featured: "⭐ Featured Stays",
  Beach: "🏖 Beach Stays",
  Mountain: "🏔 Mountain Retreats",
  Luxury: "✨ Luxury Escapes",
};

type FeaturedPropertiesProps = {
  category?: string;
};

export default async function FeaturedProperties({
  category,
}: FeaturedPropertiesProps) {
  const properties = await getPropertiesFromDB({
    category:
      category === "Featured"
        ? undefined
        : category,
  });
  const wishlistedIds = await getWishlistedPropertyIds();

  const title =
    sectionTitles[category ?? "Featured"] ??
    "⭐ Featured Stays";

  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <div className="mb-10">
        <h2 className="text-4xl font-bold">
          {title}
        </h2>

        <p className="mt-2 text-muted-foreground">
            {category === "Featured" || !category
            ? "Our highest-rated stays loved by travelers."
            : `Explore our best ${category.toLowerCase()} destinations.`}
        </p>
      </div>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {properties.slice(0, 6).map((property) => (
          <Link
            key={property.id}
            href={`/properties/${property.id}`}
            className="block"
          >
            <PropertyCard
              id={property.id}
              title={property.title}
              location={property.location}
              rating={property.rating}
              price={property.price}
              image={property.image}
              wishlisted={wishlistedIds.has(property.id)}
            />
          </Link>
        ))}
      </div>
    </section>
  );
}