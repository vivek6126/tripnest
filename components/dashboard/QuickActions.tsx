import Link from "next/link";

const actions = [
  {
    title: "Explore Properties",
    description: "Browse new places to stay",
    icon: "🔍",
    href: "/search",
  },
  {
    title: "My Bookings",
    description: "Manage your reservations",
    icon: "📖",
    href: "/bookings",
  },
  {
    title: "Wishlist",
    description: "View your saved stays",
    icon: "❤️",
    href: "/wishlist",
  },
  {
    title: "Profile",
    description: "Update your account",
    icon: "👤",
    href: "/profile",
  },
];

export default function QuickActions() {
  return (
    <section className="rounded-2xl border bg-white p-6 shadow-sm">
      <h2 className="text-xl font-semibold">
        ⚡ Quick Actions
      </h2>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {actions.map((action) => (
          <Link
            key={action.title}
            href={action.href}
            className="group rounded-xl border p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-200 hover:bg-blue-50 hover:shadow-md"
          >
            <div className="text-3xl">
              {action.icon}
            </div>

            <h3 className="mt-4 font-semibold">
              {action.title}
            </h3>

            <p className="mt-1 text-sm text-zinc-600">
              {action.description}
            </p>

            <div className="mt-4 text-blue-600 transition-transform duration-200 group-hover:translate-x-1">
              →
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}