"use client";

import { useEffect } from "react";

export default function StudentPortal() {
  useEffect(() => {
    const container = document.getElementById("wbb_zc5ycJl");
    if (!container) return;

    container.innerHTML = "";

    const script = document.createElement("script");
    script.src =
      "https://app.mymusicstaff.com/Widget/v4/Widget.ashx?settings=eyJTY2hvb2xJRCI6InNjaF9HNDRKRCIsIldlYnNpdGVJRCI6Indic190WTJKMCIsIldlYnNpdGVCbG9ja0lEIjoid2JiX3pjNXljSmwifQ==";
    script.async = true;
    container.appendChild(script);

    return () => {
      script.remove();
      container.innerHTML = "";
    };
  }, []);

  return (
    <main className="mx-auto min-h-screen w-full max-w-5xl px-4 py-16">
      <h1 className="mt-6 text-3xl font-bold">Student Portal</h1>
      <div id="wbb_zc5ycJl" className="mt-6 block" />
    </main>
  );
}
