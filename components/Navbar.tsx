import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import LogoutButton from "./LogoutButton"

export default async function Navbar() {

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <nav className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur-md">
  <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-6">
     <Link href="/" className="text-2xl font-bold tracking-tight">
        TripNest
      </Link>

     <div className="flex items-center gap-8 text-sm font-medium">
        <Link href="/">
          Explore
        </Link>

        {user && (
          <Link href="/bookings">
            My Bookings
          </Link>
        )}
      </div>

      {user ? (
        <div className="flex items-center gap-4">
          <span className="hidden text-sm text-muted-foreground md:block">
            {user.email}
          </span>

          <LogoutButton />
        </div>
      ) : (
        <div className="flex items-center gap-3">
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
      </div>
    </nav>
  );
}