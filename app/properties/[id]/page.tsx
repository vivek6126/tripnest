import Image from "next/image";
import { getPropertyById } from "@/lib/db/properties";
import BookingCard from "@/components/BookingCard";
import WishlistButton from "@/components/WishlistButton";
import { isWishlisted } from "@/lib/db/wishlist";
import {
  getReviewsByProperty,
  getAverageRating,
  getUserReview,
} from "@/lib/db/reviews";

import ReviewForm from "@/components/reviews/ReviewForm";
import ReviewList from "@/components/reviews/ReviewList";

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
  const reviews =
  await getReviewsByProperty(property.id);

const reviewSummary =
  await getAverageRating(property.id);

const userReview =
  await getUserReview(property.id);
  const wishlisted = await isWishlisted(property.id);

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
<div className="mt-8 flex flex-col gap-4">

  <div className="flex items-center justify-between gap-4">

    <h1 className="text-4xl font-bold tracking-tight">
      {property.title}
    </h1>

    <div className="flex items-center gap-3">
  <WishlistButton
    propertyId={property.id}
    initialWishlisted={wishlisted}
  />

  <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
    {property.category}
  </span>
</div>

  </div>

  <div className="flex flex-wrap items-center gap-6 text-zinc-600">

    <div className="flex items-center gap-2">
      📍
      <span>{property.location}</span>
    </div>

    <div className="flex items-center gap-2">
  
      <span>⭐ {reviewSummary.average || property.rating}
({reviewSummary.count} reviews)</span>
    </div>

    <div className="flex items-center gap-2">
      👥
      <span>{property.guests} Guests</span>
    </div>

    <div className="flex items-center gap-2">
      🛏
      <span>{property.bedrooms} Bedrooms</span>
    </div>

    <div className="flex items-center gap-2">
      🚿
      <span>{property.bathrooms} Bathrooms</span>
    </div>

  </div>

</div>
    {/* Main Content */}
        <div className="mt-10 grid gap-10 lg:grid-cols-3">
          {/* Left Section */}
          <div className="space-y-10 lg:col-span-2">
            <section>
            <h2 className="text-2xl font-semibold">
              About this stay
            </h2>

      <p className="mt-4 max-w-3xl leading-8 text-zinc-600">
        {property.description}
      </p>
    </section>

    <section className="border-t border-zinc-200 pt-8">
      <h2 className="text-2xl font-semibold">
        What this place offers
      </h2>

      <div className="mt-5 flex flex-wrap gap-3">
        {property.amenities.map((amenity) => (
          <div
            key={amenity}
            className="rounded-full border border-zinc-200 bg-zinc-50 px-4 py-2 text-sm font-medium text-zinc-700 transition hover:bg-zinc-100"
          >
            ✓ {amenity}
          </div>
          
        ))}
      </div>
    </section>
            <section className="space-y-8">
  <h2 className="text-2xl font-semibold">
    Reviews
  </h2>

 <ReviewForm
  propertyId={property.id}
  userReview={userReview}
/>

  <ReviewList
    reviews={reviews}
  />
</section>
  </div>

  {/* Right Section */}
  <aside className="self-start">
    <BookingCard
      propertyId={property.id}
      price={property.price}
      rating={property.rating}
    />
  </aside>
</div>
    </main>
  );
}