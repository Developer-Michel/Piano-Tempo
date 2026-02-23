"use client";

import { getPublicEnv } from "@/lib/env";
import { useEffect, useMemo, useRef, useState } from "react";

function buildMapsSrc() {
  const lat = getPublicEnv("NEXT_PUBLIC_MAP_LAT");
  const lng = getPublicEnv("NEXT_PUBLIC_MAP_LNG");
  const address = getPublicEnv("NEXT_PUBLIC_ADDRESS");

  if (lat && lng)
    return `https://maps.google.com/maps?q=${encodeURIComponent(`${lat},${lng}`)}&z=15&output=embed`;
  if (address)
    return `https://maps.google.com/maps?q=${encodeURIComponent(address)}&z=15&output=embed`;
  return null;
}

export function MapEmbedOnView() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [loadMap, setLoadMap] = useState(false);
  const src = useMemo(() => buildMapsSrc(), []);

  useEffect(() => {
    if (!ref.current || !src) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLoadMap(true);
          obs.disconnect();
        }
      },
      { rootMargin: "300px" }, // commence à charger un peu avant d’être visible
    );

    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [src]);

  return (
    <div ref={ref} className="w-full h-64 rounded-md overflow-hidden border">
      {!src ? (
        <div className="w-full h-full bg-gray-100 flex items-center justify-center">
          <span className="font-sans text-gray-500">Map location</span>
        </div>
      ) : loadMap ? (
        <iframe
          title="Studio location"
          src={src}
          className="w-full h-full"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      ) : (
        <div className="w-full h-full bg-gray-100 flex items-center justify-center">
          <span className="font-sans text-gray-500">
            Chargement de la carte…
          </span>
        </div>
      )}
    </div>
  );
}
