"use client";

import { Users } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

import { useState } from "react";
import { Card } from "../ui/card";
import { useTranslations } from "next-intl";

export function GroupProgramCard({ index }: { index: number }) {
  const t = useTranslations("home.programs");
  const groupItems = t.raw("groups.items") as string[];
  const title = t("groups.title");
  const description = t("groups.description");
  const ages = t("groups.ages");
  const price = t("groups.price");
  const feeNote = t("feeNote");
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname() || "/";
  return (
    <Card
      onClick={() => setOpen((v) => !v)}
      className="group h-full p-6 border-border bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg cursor-pointer"
    >
      <div className="flex   gap-4">
        <div className="w-12 h-12 flex items-center justify-center bg-gold/10 rounded-md shrink-0 transition-colors duration-300 group-hover:bg-gold/20">
          <Users className="w-6 h-6 text-gold" />
        </div>
        <div className="flex-1">
          <span className="inline-block px-2 py-1 text-xs font-sans text-gold bg-gold/10 rounded mb-2">
            {ages}
          </span>
          <h3
            className="font-serif text-xl text-black mb-2"
            data-testid={`text-program-title-${index}`}
          >
            {title}
          </h3>
          {price && (
            <p
              className="font-sans text-gold text-sm mb-2"
              data-testid={`text-program-price-${index}`}
            >
              {price}
            </p>
          )}
          {price && (
            <p className="font-sans text-xs text-gray-500 mb-2">{feeNote}</p>
          )}
          <div>
            <p className="font-sans text-gray-700 text-sm mb-2">
              {description}
            </p>
          </div>
        </div>
      </div>

      {open && (
        <div className="mt-6 grid whitespace-pre-line sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {groupItems.map((courseName, i) => (
            <button
              key={i}
              type="button"
              onClick={() => {
                const target = `${pathname}#contact?course=${encodeURIComponent(
                  courseName,
                )}`;
                window.location.href = target;
              }}
              className="p-3 text-left border rounded text-sm text-gray-700 hover:bg-gray-100"
              data-testid={`group-item-${i}`}
            >
              {courseName}
            </button>
          ))}
        </div>
      )}
    </Card>
  );
}
