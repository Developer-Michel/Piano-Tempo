"use client";

import { useEffect } from "react";

export default function Registration() {
  useEffect(() => {
    const container = document.getElementById("wbb_zccBNJR");
    if (!container) return;

    container.innerHTML = "";

    const script = document.createElement("script");
    script.src =
      "https://app.mymusicstaff.com/Widget/v4/Widget.ashx?settings=eyJTY2hvb2xJRCI6InNjaF9HNDRKRCIsIldlYnNpdGVJRCI6Indic190WTJKMCIsIldlYnNpdGVCbG9ja0lEIjoid2JiX3pjY0JOSlIifQ==";
    script.async = true;
    container.appendChild(script);

    return () => {
      script.remove();
      container.innerHTML = "";
    };
  }, []);

  return (
    <main className="min-h-screen">
      <div id="wbb_zccBNJR" className="mt-40 block" />
    </main>
  );
}
