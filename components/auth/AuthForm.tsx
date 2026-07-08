"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase/client";

type AuthFormProps = {
  mode: "login" | "signup";
};

export default function AuthForm({
  mode,
}: AuthFormProps) {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] =
    useState("");

  const [isLoading, setIsLoading] =
    useState(false);

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setIsLoading(true);

    try {
      if (mode === "signup") {
        const { error } =
          await supabase.auth.signUp({
            email,
            password,
          });

        if (error) throw error;

        toast.success(
          "Account created successfully!"
        );

        router.push("/login");
      } else {
        const { error } =
          await supabase.auth.signInWithPassword(
            {
              email,
              password,
            }
          );

        if (error) throw error;

        toast.success(
          "Logged in successfully!"
        );

        router.push("/");
        router.refresh();
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto mt-20 max-w-md space-y-4 rounded-xl border p-8"
    >
      <h1 className="text-center text-3xl font-bold">
        {mode === "login"
          ? "Login"
          : "Create Account"}
      </h1>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(event) =>
          setEmail(event.target.value)
        }
        className="w-full rounded-lg border p-3"
        required
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(event) =>
          setPassword(event.target.value)
        }
        className="w-full rounded-lg border p-3"
        required
      />

      <button
        type="submit"
        disabled={isLoading}
        className="w-full rounded-lg bg-black py-3 text-white disabled:cursor-not-allowed disabled:bg-zinc-400"
      >
        {isLoading
          ? mode === "login"
            ? "Logging in..."
            : "Creating account..."
          : mode === "login"
          ? "Login"
          : "Sign Up"}
      </button>
    </form>
  );
}