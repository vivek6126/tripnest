"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

NProgress.configure({
  showSpinner: false,
  trickleSpeed: 100,
});

export default function NProgressProvider() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    NProgress.done();
  }, [pathname, searchParams]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest("a");

      if (
        link &&
        link.href &&
        link.origin === window.location.origin &&
        !link.target
      ) {
        NProgress.start();
      }
    };

    document.addEventListener("click", handleClick);

    return () =>
      document.removeEventListener("click", handleClick);
  }, []);

  return null;
}