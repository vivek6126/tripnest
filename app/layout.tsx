import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import "./globals.css";

import Navbar from "@/components/Navbar";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL!),

  title: {
    default: "TripNest",
    template: "%s | TripNest",
  },

  description:
    "TripNest is a modern hotel booking platform where you can discover, wishlist, review, and securely book stays with real-time availability and Stripe payments.",

  keywords: [
    "hotel booking",
    "travel",
    "vacation",
    "next.js",
    "supabase",
    "stripe",
    "tripnest",
  ],

  authors: [
    {
      name: "Vivek Dodiya",
    },
  ],

  openGraph: {
    title: "TripNest",
    description:
      "Discover, wishlist, review, and securely book beautiful stays with TripNest.",
    url: process.env.NEXT_PUBLIC_APP_URL,
    siteName: "TripNest",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "TripNest",
    description:
      "Discover, wishlist, review, and securely book beautiful stays.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-white">
        <Navbar />

        <main className="flex-1">
          {children}
        </main>

        <Toaster
          richColors
          position="top-right"
        />
      </body>
    </html>
  );
}