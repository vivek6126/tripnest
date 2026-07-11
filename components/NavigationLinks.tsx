"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Home,
  Heart,
  CalendarDays,
} from "lucide-react";

type NavigationLinksProps = {
  wishlistCount: number;
};

export default function NavigationLinks({
  wishlistCount,
}: NavigationLinksProps) {
  const pathname = usePathname();

  function linkClass(path: string) {
    const active = pathname === path;

    return `
      nav-link
      ${active ? "nav-link-active" : ""}
    `;
  }

  return (
    <>
      <Link
        href="/"
        className={linkClass("/")}
      >
        <Home size={18} />
        <span>Explore</span>
      </Link>

      <Link
        href="/wishlist"
        className={linkClass("/wishlist")}
      >
        <div className="relative">
          <Heart size={18} />

          {wishlistCount > 0 && (
            <span className="wishlist-badge">
              {wishlistCount}
            </span>
          )}
        </div>

        <span>Wishlist</span>
      </Link>

      <Link
        href="/bookings"
        className={linkClass("/bookings")}
      >
        <CalendarDays size={18} />
        <span>Bookings</span>
      </Link>
    </>
  );
}