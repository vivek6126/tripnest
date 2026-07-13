import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { PlaneTakeoff } from "lucide-react";

import LogoutButton from "./LogoutButton";
import NavigationLinks from "./NavigationLinks";

import { getWishlistCount } from "@/lib/db/wishlist";

export default async function Navbar() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const wishlistCount = user
    ? await getWishlistCount()
    : 0;

  return (
    <nav className="sticky top-0 z-50 border-b border-zinc-200 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 text-2xl font-bold tracking-tight transition hover:text-blue-600"
        >
          <PlaneTakeoff
            size={24}
            className="-rotate-12 text-blue-600"
          />

          <span>TripNest</span>
        </Link>

        {/* Navigation */}
        <div className="flex items-center gap-2 text-sm font-medium">
          {user ? (
            <NavigationLinks
              wishlistCount={wishlistCount}
            />
          ) : (
            <Link
              href="/"
              className="nav-link"
            >
              Explore
            </Link>
          )}
        </div>

        {/* Right Side */}
        {user ? (
          <div className="flex items-center gap-4">
            <span className="hidden rounded-full bg-zinc-100 px-4 py-2 text-sm font-medium text-zinc-600 md:block">
              {user.email?.split("@")[0]}
            </span>

            <LogoutButton />
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="secondary-btn"
            >
              Login
            </Link>

            <Link
              href="/signup"
              className="primary-btn"
            >
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}