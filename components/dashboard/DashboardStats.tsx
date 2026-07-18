type DashboardStatsProps = {
  bookings: number;
  wishlist: number;
  reviews: number;
  totalSpent: number;
};

const stats = [
  {
    label: "Bookings",
    value: (props: DashboardStatsProps) => props.bookings,
    icon: "🏠",
  },
  {
    label: "Wishlist",
    value: (props: DashboardStatsProps) => props.wishlist,
    icon: "❤️",
  },
  {
    label: "Reviews",
    value: (props: DashboardStatsProps) => props.reviews,
    icon: "⭐",
  },
  {
    label: "Total Spent",
    value: (props: DashboardStatsProps) =>
      `₹${props.totalSpent.toLocaleString()}`,
    icon: "💳",
  },
];

export default function DashboardStats(
  props: DashboardStatsProps
) {
  return (
    <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="rounded-2xl border bg-white p-6 shadow-sm"
        >
          <p className="text-3xl">
            {stat.icon}
          </p>

          <h3 className="mt-4 text-3xl font-bold">
            {stat.value(props)}
          </h3>

          <p className="mt-2 text-zinc-600">
            {stat.label}
          </p>
        </div>
      ))}
    </section>
  );
}