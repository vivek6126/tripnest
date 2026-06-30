import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";

export default function Home() {
  return (
    <>
      <Navbar title="TripNest" />
      <Hero />  
      <main className="flex flex-1 items-center justify-center">
        <h1 className="text-5xl font-bold">
          Welcome to TripNest
        </h1>
      </main>
    </>
  );
}