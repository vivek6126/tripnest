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
  className="
    rounded-xl
    border
    bg-white
    p-5
    shadow-sm
    transition-all
    duration-200
    hover:-translate-y-0.5
    hover:border-blue-200
    hover:shadow-md
  "
>
  <div className="flex items-center justify-between">
    <div>
      <p className="text-sm text-zinc-500">
        {stat.label}
      </p>

      <h3 className="mt-1 text-2xl font-bold">
        {stat.value(props)}
      </h3>
    </div>

    <span className="text-3xl">
      {stat.icon}
    </span>
  </div>
</div>
      ))}
    </section>
  );
}