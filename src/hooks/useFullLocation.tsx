"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export function useFullLocation() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [hash, setHash] = useState<string>("");

  useEffect(() => {
    const handleHashChange = () => {
      setHash(typeof window !== "undefined" ? window.location.hash : "");
    };

    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const search = searchParams?.toString();
  const query = search ? `?${search}` : "";

  return `${pathname ?? ""}${query}${hash}`;
}
