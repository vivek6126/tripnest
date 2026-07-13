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

  setTimeout(() => {
    router.push("/");
  }, 100);
}

  return (
    <button
      onClick={handleLogout}
      title="Logout"
      className="flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-300 text-zinc-600 transition-all duration-200 hover:border-red-300 hover:bg-red-50 hover:text-red-600"
    >
      <LogOut size={18} />
    </button>
  );
}