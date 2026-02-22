import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { FileText, BookOpen, Music, Download } from "lucide-react";
import type { Locale } from "@/lib/i18n/config";
import { getTranslations } from "next-intl/server";

export default async function Resources({}: {}) {
  const t = await getTranslations("resources");
  const resourceCategories = t.raw("categories") as {
    title: string;
    description: string;
  }[];
  const icons = [FileText, BookOpen, Music];

  return (
    <div className="min-h-screen bg-white" data-testid="page-resources">
      <main className="pt-32 pb-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1
              className="font-serif text-4xl md:text-5xl text-black mb-4"
              data-testid="text-resources-title"
            >
              {t("title")}
            </h1>
            <p
              className="font-serif text-xl text-gold  mb-4"
              data-testid="text-resources-subtitle"
            >
              {t("subtitle")}
            </p>
            <div className="w-24 h-1 bg-gold mx-auto" />
          </div>

          <div className="text-center mb-12">
            <p
              className="font-sans text-gray-600 max-w-2xl mx-auto"
              data-testid="text-resources-coming-soon"
            >
              {t("comingSoon")}
            </p>
          </div>

          <div className="space-y-6">
            {resourceCategories.map((resource, index) => {
              const Icon = icons[index] ?? FileText;
              return (
                <div key={index} className="transition-all duration-300">
                  <Card
                    className="p-6 group transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                    data-testid={`card-resource-${index}`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 flex items-center justify-center bg-gold/10 rounded-md shrink-0 transition-colors duration-300 group-hover:bg-gold/20">
                        <Icon className="w-7 h-7 text-gold" />
                      </div>
                      <div className="flex-1">
                        <h2
                          className="font-serif text-xl text-black mb-1"
                          data-testid={`text-resource-title-${index}`}
                        >
                          {resource.title}
                        </h2>
                        <p
                          className="font-sans text-gray-600 text-sm"
                          data-testid={`text-resource-desc-${index}`}
                        >
                          {resource.description}
                        </p>
                      </div>
                      <div className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-md text-gray-400 group-hover:bg-gold/10 group-hover:text-gold transition-all duration-300">
                        <Download className="w-5 h-5" />
                      </div>
                    </div>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}
