"use client";

import { useRouter, useSearchParams } from "next/navigation";

const categories = [
  { icon: "⭐", name: "Featured" },
  { icon: "🏖", name: "Beach" },
  { icon: "🏔", name: "Mountain" },
  { icon: "✨", name: "Luxury" },
];

export default function CategorySection() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const selected =
    searchParams.get("category") ?? "Featured";

  function selectCategory(category: string) {
    if (category === "Featured") {
      router.push("/");
      return;
    }

    router.push(
      `/?category=${encodeURIComponent(category)}`
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-6 py-10">
      <div className="flex flex-wrap justify-center gap-4">
        {categories.map((category) => {
          const active =
            selected === category.name;

          return (
            <button
              key={category.name}
              onClick={() =>
                selectCategory(category.name)
              }
              className={`flex items-center gap-2 rounded-full px-5 py-3 text-sm font-medium transition-all duration-300 ${
                active
                  ? "bg-primary text-primary-foreground shadow-lg"
                  : "border bg-white hover:-translate-y-1 hover:shadow-md"
              }`}
            >
              <span>{category.icon}</span>

              {category.name}
            </button>
          );
        })}
      </div>
    </section>
  );
}