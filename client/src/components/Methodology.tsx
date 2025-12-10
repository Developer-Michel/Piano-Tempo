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
      className="py-24 bg-gray-50 "
      data-testid="section-methodology"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item, index) => (
            <MethodologyCard
              key={index}
              item={item}
              index={index}
              isInView={isInView}
              language={language}
              Icon={iconMap[index] || Music}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function MethodologyCard({
  item,
  index,
  isInView,
  language,
  Icon,
}: {
  item: any;
  index: number;
  isInView: boolean;
  language: "en" | "fr";
  Icon: any;
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const contentPreview = item.content[language].split("\n")[0];
  const isLonger = item.content[language].length > 80;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.1 + index * 0.1 }}
      onClick={() => setIsExpanded(!isExpanded)}
      className="bg-white rounded-lg p-8 hover:shadow-lg transition-all duration-300 group shadow-sm border cursor-pointer border-gray-100"
      data-testid={`methodology-item-${index}`}
    >
      <div className="flex items-start gap-4 mb-4">
        <div className="w-12 h-12 flex items-center justify-center bg-gold/10 rounded-md shrink-0 group-hover:bg-gold/20 transition-colors">
          <Icon className="w-6 h-6 text-gold" />
        </div>
        <h3
          className="font-serif text-lg text-black group-hover:text-gold transition-colors flex-1"
          data-testid={`methodology-title-${index}`}
        >
          {item.title[language]}
        </h3>
      </div>

      {isLonger ? (
        <div className="space-y-4">
          <motion.div
            initial={false}
            animate={{ height: isExpanded ? "auto" : "60px" }}
            className="overflow-hidden"
          >
            <p
              className="font-sans text-gray-700 leading-relaxed whitespace-pre-line"
              data-testid={`methodology-content-${index}`}
            >
              {isExpanded ? item.content[language] : contentPreview}
            </p>
          </motion.div>

          <Button
            variant="ghost"
            className="text-gold hover:text-gold-dark hover:bg-gold/10 p-0 h-auto font-sans"
            data-testid={`button-methodology-expand-${index}`}
          >
            {isExpanded ? (
              <>
                Read Less <ChevronUp className="ml-1 w-4 h-4" />
              </>
            ) : (
              <>
                Read More <ChevronDown className="ml-1 w-4 h-4" />
              </>
            )}
          </Button>
        </div>
      ) : (
        <p
          className="font-sans text-gray-700 leading-relaxed"
          data-testid={`methodology-content-${index}`}
        >
          {item.content[language]}
        </p>
      )}
    </motion.div>
  );
}
