"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

type ProfileFormProps = {
  email: string;
  fullName: string;
  avatarUrl: string | null;
  phone: string;
  bio: string;
};

export default function ProfileForm({
  email,
  fullName,
  phone,
  bio,
}: ProfileFormProps) {
  const router = useRouter();

  const [name, setName] = useState(fullName);
  const [phoneNumber, setPhoneNumber] = useState(phone);
  const [about, setAbout] = useState(bio);

  const [loading, setLoading] = useState(false);

  async function handleSave() {
    setLoading(true);

    try {
      const response = await fetch("/api/profile", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: name,
          phone: phoneNumber,
          bio: about,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message);
      }

      toast.success(result.message);

      router.refresh();
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm">
      <div className="space-y-6">
        <div>
          <label className="mb-2 block font-medium">
            Email
          </label>

          <input
            disabled
            value={email}
            className="w-full rounded-xl border bg-zinc-100 p-3 text-zinc-500"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Full Name
          </label>

          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-xl border border-zinc-300 p-3"
            placeholder="John Doe"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Phone
          </label>

          <input
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="w-full rounded-xl border border-zinc-300 p-3"
            placeholder="+91 9876543210"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Bio
          </label>

          <textarea
            rows={4}
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            className="w-full resize-none rounded-xl border border-zinc-300 p-3"
            placeholder="Tell other travellers a little about yourself..."
          />
        </div>

        <button
          onClick={handleSave}
          disabled={loading}
          className="primary-btn w-full"
        >
          {loading ? "Saving..." : "Save Profile"}
        </button>
      </div>
    </div>
  );
}