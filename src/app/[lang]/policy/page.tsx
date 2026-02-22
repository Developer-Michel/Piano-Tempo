"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { motion, useInView } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function Policy() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const t = useTranslations("policy");
  const groups = t.raw("groups") as {
    id: string;
    title: string;
    sections: { title: string; content: string[] }[];
  }[];

  return (
    <div
      className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white"
      data-testid="page-policy"
    >
      <main className="pt-32 pb-24" ref={sectionRef}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1
              className="font-serif text-4xl md:text-5xl text-black mb-4"
              data-testid="text-policy-title"
            >
              {t("title")}
            </h1>
            {t.has("subtitle") ? (
              <h2 className="font-serif text-xl text-gold max-w-2xl mx-auto mt-4 bold">
                {t("subtitle")}
              </h2>
            ) : null}
            <div className="w-24 h-1 bg-gold mx-auto mt-6" />
          </div>

          <Accordion
            type="single"
            collapsible
            className="space-y-4"
            data-testid="accordion-policy"
          >
            {groups.map((group, groupIndex) => (
              <AccordionItem
                key={group.id}
                value={group.id}
                data-testid={`accordion-policy-group-${groupIndex}`}
                className="border border-gray-200 rounded-xl bg-white  overflow-hidden"
              >
                <AccordionTrigger className="text-left font-serif text-xl text-black px-6 py-4 hover:bg-gold/5 transition-colors data-[state=open]:text-gold">
                  {group.title}
                </AccordionTrigger>
                <AccordionContent className="px-2 pb-4">
                  <Accordion
                    type="single"
                    collapsible
                    className="space-y-3"
                    data-testid={`accordion-policy-sub-${groupIndex}`}
                  >
                    {group.sections.map((section, sectionIndex) => (
                      <AccordionItem
                        key={`${group.id}-${sectionIndex}`}
                        value={`${group.id}-${sectionIndex}`}
                        data-testid={`accordion-policy-section-${groupIndex}-${sectionIndex}`}
                        className="border border-gray-100 rounded-lg bg-gray-50"
                      >
                        <AccordionTrigger className="text-left font-sans text-base text-black px-4 py-3 hover:bg-white transition-colors data-[state=open]:text-gold">
                          {section.title}
                        </AccordionTrigger>
                        <AccordionContent className="px-4 pb-4">
                          <ul className="space-y-2 list-disc list-inside text-gray-700">
                            {section.content.map((item, itemIndex) => (
                              <li
                                key={itemIndex}
                                className="font-sans leading-relaxed"
                                data-testid={`text-policy-item-${groupIndex}-${sectionIndex}-${itemIndex}`}
                              >
                                {item}
                              </li>
                            ))}
                          </ul>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </main>
    </div>
  );
}
