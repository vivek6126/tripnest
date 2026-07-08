"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase/client";

export default function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    const { error } = await supabase.auth.signOut();

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success("Logged out successfully!");

    router.refresh();
    router.push("/");
  }

  return (
    <button
      onClick={handleLogout}
      className="rounded bg-black px-4 py-2 text-white"
    >
      Logout
    </button>
  );
}