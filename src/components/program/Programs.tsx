"use client";
import { Card } from "@/components/ui/card";
import { Users } from "lucide-react";
import { GroupProgramCard } from "./GroupProgramCard";
import { useTranslations } from "next-intl";

export function Programs() {
  const t = useTranslations("home.programs");

  return (
    <section
      id="programs"
      className="py-24 bg-white"
      data-testid="section-programs"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2
            className="font-serif text-4xl md:text-5xl text-black mb-4"
            data-testid="text-programs-title"
          >
            {t("title")}
          </h2>
          <p
            className="font-serif text-xl text-gold "
            data-testid="text-programs-subtitle"
          >
            {t("subtitle")}
          </p>
        </div>

        <div className="space-y-12">
          {/* Private Course */}

          <div className="grid sm:grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
            <div className="h-full">
              <ProgramCard index={0} />
            </div>

            {/* Group Courses - single expandable card that reveals all group items from translations */}

            <div className="h-full">
              <GroupProgramCard index={1} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProgramCard({ index }: { index: number }) {
  const t = useTranslations("home.programs");
  const title = t(`private.title`);
  const description = t(`private.description`);
  const ages = t(`private.ages`);
  const price = t(`private.price`);
  const feeNote = t(`feeNote`);
  return (
    <Card
      onClick={() => {
        if (title) {
          const target = `${
            window.location.pathname
          }#contact?course=${encodeURIComponent(title)}`;
          window.location.href = target;
        }
      }}
      className="group p-6 border-border bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg cursor-pointer"
      data-testid={`card-program-${index}`}
    >
      <div className="flex items-start gap-4">
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
          <p
            className="font-sans text-gray-600 text-sm leading-relaxed"
            data-testid={`text-program-desc-${index}`}
          >
            {description}
          </p>
        </div>
      </div>
    </Card>
  );
}
