"use client";

import { ChevronDown, ChevronUp, Users } from "lucide-react";

import { use, useState } from "react";
import { Card } from "../ui/card";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { Button } from "../ui/button";

export function GroupProgramCard({ index }: { index: number }) {
  const t = useTranslations("home.programs");
  const groupItems = t.raw("groups.items") as string[];
  const title = t("groups.title");
  const description = t("groups.description");
  const ages = t("groups.ages");
  const price = t("groups.price");
  const feeNote = t("feeNote");
  const [open, setOpen] = useState(false);
  return (
    <Card className="group h-full p-6 border-border bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg cursor-pointer">
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

          {open && (
            <>
              <div>
                <p className="font-sans text-gray-700 text-sm mb-2">
                  {description}
                </p>
              </div>
              <div className="mt-6 grid whitespace-pre-line sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {groupItems.map((courseName, i) => (
                  <div
                    key={i}
                    className="p-3 text-left border rounded text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <Link
                      href={`/?course=${encodeURIComponent(courseName)}#contact`}
                      key={i}
                      type="button"
                      data-testid={`group-item-${i}`}
                      aria-label={courseName}
                    >
                      {courseName}
                    </Link>
                  </div>
                ))}
              </div>
            </>
          )}
          <Button
            variant="ghost"
            onClick={() => setOpen(!open)}
            className="text-gold hover:text-gold-dark hover:bg-gold/10 p-0  h-auto font-sans"
            data-testid={`button-teacher-expand-${index}`}
          >
            {open ? (
              <>
                {t("learnLess")} <ChevronUp className="ml-1 w-4 h-4" />
              </>
            ) : (
              <>
                {t("learnMore")} <ChevronDown className="ml-1 w-4 h-4" />
              </>
            )}
          </Button>
        </div>
      </div>
    </Card>
  );
}
