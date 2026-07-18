type DashboardHeaderProps = {
  fullName: string;
};

export default function DashboardHeader({
  fullName,
}: DashboardHeaderProps) {
  return (
    <section className="mb-10">
      <h1 className="text-4xl font-bold">
        Welcome back, {fullName} 👋
      </h1>

      <p className="mt-2 text-zinc-600">
        Here's what's happening with your trips.
      </p>
    </section>
  );
}