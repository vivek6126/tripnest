"use client";

import { LogOut } from "lucide-react";
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
      className="secondary-btn flex items-center gap-2 hover:border-red-300 hover:bg-red-50 hover:text-red-600"
    >
      <LogOut size={18} />
      <span>Logout</span>
    </button>
  );
}