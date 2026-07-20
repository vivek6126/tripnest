"use client";

import { useState } from "react";

type BookingReferenceProps = {
  reference: string;
};

export default function BookingReference({
  reference,
}: BookingReferenceProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(reference);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  }

  return (
    <div className="mt-6 rounded-xl bg-zinc-50 px-4 py-3">
      <p className="text-sm text-zinc-500">
        Booking Reference
      </p>

      <div className="mt-2 flex items-center justify-center gap-3">
        <p className="text-lg font-semibold tracking-wide">
          {reference}
        </p>

        <button
          onClick={handleCopy}
          className="rounded-md p-2 transition hover:bg-zinc-200"
          title="Copy booking reference"
        >
          📋
        </button>
      </div>

      {copied && (
        <p className="mt-2 text-sm font-medium text-green-600">
          Copied!
        </p>
      )}
    </div>
  );
}