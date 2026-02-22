import publicEnv from "./public-env.json";

const envMap: Record<string, string> = publicEnv;

const normalizeKey = (key: string) => {
  if (key.startsWith("NEXT_PUBLIC_")) return key;
  if (key.startsWith("VITE_"))
    return `NEXT_PUBLIC_${key.replace(/^VITE_/, "")}`;
  return key;
};

export function getPublicEnv(key: string, fallback = "") {
  const normalizedKey = normalizeKey(key);
  const value =
    envMap[normalizedKey] ??
    // legacy Vite-style names fallback (VITE_FOO -> NEXT_PUBLIC_FOO)
    envMap[`VITE_${normalizedKey.replace(/^NEXT_PUBLIC_/, "")}`];

  return value ?? fallback;
}
