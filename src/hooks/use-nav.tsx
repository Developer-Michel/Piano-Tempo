"use client";

import { useRouter } from "next/navigation";

export function useNavScroll() {
  const router = useRouter();
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

    router.push(targetUrl);
  };
}
