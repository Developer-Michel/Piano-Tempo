"use client";

import { useRouter, usePathname } from "next/navigation";

export function useNavScroll() {
  const router = useRouter();
  const pathname = usePathname();
  return ({
    href,
    id,
    params,
  }: {
    href?: string;
    id?: string;
    params?: string;
  }) => {
    const targetPath = href && href.length > 0 ? href : "/";
    const targetQuery = params ?? "";
    const targetHash = id ? `#${id}` : "";
    const targetUrl = `${targetPath}${targetQuery}${targetHash}`;
    if (id && pathname === targetPath) {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
    router.push(targetUrl);
  };
}
