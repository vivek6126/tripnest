import { Suspense } from "react";
import SearchContent from "@/components/SearchContent";

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-[70vh] items-center justify-center">
          <h1 className="text-3xl font-bold">
            Loading properties...
          </h1>
        </main>
      }
    >
      <SearchContent />
    </Suspense>
  );
}