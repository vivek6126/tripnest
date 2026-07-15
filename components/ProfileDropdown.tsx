"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import {
  ChevronDown,
  CircleUserRound,
  CalendarDays,
  Heart,
  LogOut,
} from "lucide-react";

import { supabase } from "@/lib/supabase/client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type ProfileDropdownProps = {
  name: string;
  email: string;
};

export default function ProfileDropdown({
  name,
  email,
}: ProfileDropdownProps) {
  const router = useRouter();

  async function handleLogout() {
    const { error } = await supabase.auth.signOut();

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success("Logged out successfully!");

    router.refresh();

    setTimeout(() => {
      router.push("/");
    }, 100);
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-3 rounded-xl border border-zinc-200 bg-white px-3 py-2 transition hover:bg-zinc-50">
  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-sm font-semibold text-white">
    {name.charAt(0).toUpperCase()}
  </div>

  <div className="hidden text-left md:block">
    <p className="text-sm font-semibold leading-none">
      {name}
    </p>

    <p className="mt-1 text-xs text-zinc-500">
      {email}
    </p>
  </div>

  <ChevronDown
    size={16}
    className="text-zinc-500"
  />
</DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-64 rounded-2xl"
      >
        <div className="px-3 py-3">
          <p className="font-semibold">
            {name}
          </p>

          <p className="text-sm text-zinc-500">
            {email}
          </p>
        </div>

        <DropdownMenuSeparator />

        <Link href="/profile">
  <DropdownMenuItem className="cursor-pointer">
    <CircleUserRound size={17} />
    My Profile
  </DropdownMenuItem>
</Link>

        <Link href="/bookings">
  <DropdownMenuItem className="cursor-pointer">
    <CalendarDays size={17} />
    My Bookings
  </DropdownMenuItem>
</Link>

       <Link href="/wishlist">
  <DropdownMenuItem className="cursor-pointer">
    <Heart size={17} />
    Wishlist
  </DropdownMenuItem>
</Link>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          variant="destructive"
          onClick={handleLogout}
          className="cursor-pointer"
        >
          <LogOut size={17} />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}