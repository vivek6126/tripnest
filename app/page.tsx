import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <>
      <Navbar  title ="Bluepina"
      buttonText="Login" />

      <main className="flex flex-1 items-center justify-center">
        <h1 className="text-5xl font-bold">Welcome to TripNest</h1>
      </main>
    </>
  );
}