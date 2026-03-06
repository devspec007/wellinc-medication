"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

declare global {
  interface Window {
    _uxa: unknown[];
  }
}

export default function ContentSquareTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    window._uxa = window._uxa || [];
    const url = pathname + (searchParams.toString() ? `?${searchParams.toString()}` : "");
    window._uxa.push(["trackPageview", url]);
  }, [pathname, searchParams]);

  return null;
}
