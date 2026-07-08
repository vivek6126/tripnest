import Link from "next/link";
import { navigationItems } from "@/constants/navigation";
import { createClient } from "@/lib/supabase/server";
import LogoutButton from "./LogoutButton"

type NavbarProps = {
  title: string;
};

export default async function Navbar({
  title,
}: NavbarProps) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <nav className="flex items-center justify-between border-b p-4">
      <h1 className="text-2xl font-bold">{title}</h1>

      <div className="flex gap-6">
        {navigationItems.map((item) => (
          <Link key={item.id} href={item.href}>
            {item.label}
          </Link>
        ))}
      </div>

      {user ? (
        <div className="flex items-center gap-4">
          <span className="text-sm">
            {user.email}
          </span>

          <LogoutButton />
        </div>
      ) : (
        <div className="flex gap-2">
          <Link
            href="/login"
            className="rounded border px-4 py-2"
          >
            Login
          </Link>

          <Link
            href="/signup"
            className="rounded bg-black px-4 py-2 text-white"
          >
            Sign Up
          </Link>
        </div>
      )}
    </nav>
  );
}