"use client";

import { useState } from "react";
import { navigationItems } from "@/constants/navigation";

type NavbarProps = {
  title: string;
};

export default function Navbar({ title }: NavbarProps) {
  const [buttonText, setButtonText] = useState("Login");

  function changeButton() {
    setButtonText(
      buttonText === "Login" ? "Logout" : "Login"
    );
  }

  return (
    <nav className="flex items-center justify-between border-b p-4">
      <h1 className="text-2xl font-bold">{title}</h1>

      <div className="flex gap-6">
        {navigationItems.map((item) => (
          <a key={item.id} href={item.href}>
            {item.label}
          </a>
        ))}
      </div>

      <button
        onClick={changeButton}
        className="rounded bg-black px-4 py-2 text-white"
      >
        {buttonText}
      </button>
    </nav>
  );
}