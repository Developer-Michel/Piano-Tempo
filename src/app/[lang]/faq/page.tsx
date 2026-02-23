"use client";

import { useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { motion, useInView } from "framer-motion";
import { Search } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function FAQ() {
  const [searchQuery, setSearchQuery] = useState("");
  const t = useTranslations("faq");
  const faqItems = t.raw("items") as { q: string; a: string }[];

  const normalizeText = (text: string) => {
    return text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  };

  const filteredItems = faqItems.filter((item) =>
    normalizeText(item.q).includes(normalizeText(searchQuery)),
  );

  return (
    <div className="min-h-screen bg-white" data-testid="page-faq">
      <main className="pt-32 pb-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1
              className="font-serif text-4xl md:text-5xl text-black mb-4"
              data-testid="text-faq-title"
            >
              {t("title")}
            </h1>
            <div className="w-24 h-1 bg-gold mx-auto" />
          </div>

          <div className="mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 size-5" />
              <input
                type="text"
                placeholder={t("searchPlaceholder")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent text-black placeholder-gray-400"
                data-testid="search-faq"
              />
            </div>
          </div>

          <div>
            <Accordion type="single" collapsible className="space-y-4">
              {filteredItems.map((item, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="bg-gray-50 rounded-md px-6 border-none"
                  data-testid={`accordion-faq-${index}`}
                >
                  <AccordionTrigger
                    className="font-serif text-lg text-black hover:text-gold transition-colors py-6 [&[data-state=open]]:text-gold"
                    data-testid={`button-faq-${index}`}
                  >
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent
                    className="font-sans text-gray-700 pb-6 leading-relaxed"
                    data-testid={`text-faq-answer-${index}`}
                  >
                    <p className="whitespace-pre-line">{item.a}</p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
            {filteredItems.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 font-sans">{t("noResults")}</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
