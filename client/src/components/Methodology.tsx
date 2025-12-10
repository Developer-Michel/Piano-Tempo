import { useState, useRef } from "react";
import { useLanguage } from "@/lib/language-context";
import { translations } from "@/lib/translations";
import { motion, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import {
  Music,
  Hand,
  BookOpen,
  Volume2,
  Lightbulb,
  Pen,
  Star,
} from "lucide-react";

const iconMap: { [key: number]: any } = {
  0: Music,
  1: Hand,
  2: BookOpen,
  3: Volume2,
  4: Lightbulb,
  5: Pen,
  6: Star,
};

export function Methodology() {
  const { language } = useLanguage();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const methodologyData = translations.methadlology;
  const items = methodologyData.items;

  return (
    <section
      id="methodology"
      ref={sectionRef}
      className="py-24 bg-gray-50"
      data-testid="section-methodology"
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2
            className="font-serif text-4xl md:text-5xl text-black mb-4"
            data-testid="text-methodology-title"
          >
            {methodologyData.title[language]}
          </h2>
          <p
            className="font-serif text-xl text-gold italic"
            data-testid="text-methodology-subtitle"
          >
            {methodologyData.subtitle[language]}
          </p>
          <div className="w-24 h-1 bg-gold mx-auto mt-6" />
        </motion.div>

        <ul className="space-y-12">
          {items.map((item, index) => {
            const Icon = iconMap[index] || Music;
            return (
              <motion.li
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 + index * 0.1 }}
                className="flex items-start gap-6"
                data-testid={`methodology-item-${index}`}
              >
                <div className="w-12 h-12 flex items-center justify-center bg-gold/10 rounded-md shrink-0">
                  <Icon className="w-6 h-6 text-gold" />
                </div>
                <div>
                  <h3
                    className="font-serif text-xl text-black mb-2"
                    data-testid={`methodology-title-${index}`}
                  >
                    {item.title[language]}
                  </h3>
                  <p
                    className="font-sans text-gray-700 leading-relaxed whitespace-pre-line"
                    data-testid={`methodology-content-${index}`}
                  >
                    {item.content[language]}
                  </p>
                </div>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

// Card component removed for minimalist layout
