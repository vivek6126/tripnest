import Link from "next/link";

import Navbar from "@/components/Navbar";
import PropertyCard from "@/components/PropertyCard";

import { getWishlist } from "@/lib/db/wishlist";

export default async function WishlistPage() {
  const wishlist = await getWishlist();

  return (
    <>
      <Navbar />

      <main className="mx-auto max-w-7xl px-6 py-12">

        <div className="mb-10">
          <h1 className="text-4xl font-bold">
            ❤️ My Wishlist
          </h1>

          <p className="mt-2 text-zinc-500">
            Properties you've saved for later.
          </p>
        </div>

        {wishlist.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-zinc-300 py-24 text-center">
            <h2 className="text-2xl font-semibold">
              Your wishlist is empty
            </h2>

            <p className="mt-3 text-zinc-500">
              Save your favorite places and they'll appear here.
            </p>

            <Link
              href="/"
              className="mt-8 inline-block rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
            >
              Explore Properties
            </Link>
          </div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {wishlist.map(({ property }) => (
              <Link
                key={property.id}
                href={`/properties/${property.id}`}
              >
                <PropertyCard
                  id={property.id}
                  title={property.title}
                  location={property.location}
                  rating={property.rating}
                  price={property.price}
                  image={property.image}
                  wishlisted={true}
                />
              </Link>
            ))}
          </div>
        )}

      </main>
    </>
  );
}