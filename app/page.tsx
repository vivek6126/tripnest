
import Hero from "@/components/Hero";
import FeaturedProperties from "@/components/FeaturedProperties";
import CategorySection from "@/components/CategorySection";

type HomeProps = {
  searchParams: Promise<{
    category?: string;
  }>;
};

export default async function Home({
  searchParams,
}: HomeProps) {
  const { category } = await searchParams;
  return (
    <>
      
      <Hero />
      <CategorySection />
      <FeaturedProperties
        category={category}
      />
    </>
  );
}