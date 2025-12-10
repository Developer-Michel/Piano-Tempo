import { useRef, useState } from "react";
import { useLanguage } from "@/lib/language-context";
import { translations } from "@/lib/translations";
import { motion, useInView } from "framer-motion";
import { Card } from "@/components/ui/card";
import {
  User,
  Users,
  GraduationCap,
  Briefcase,
  Sun,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

export function Programs() {
  const { language } = useLanguage();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const programs = [
    {
      key: "private",
      icon: User,
      ...translations.programs.private,
    },
    {
      key: "groups",
      icon: Users,
      ...translations.programs.groups,
    },
  ];

  return (
    <section
      id="programs"
      ref={sectionRef}
      className="py-24 bg-white"
      data-testid="section-programs"
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
            data-testid="text-programs-title"
          >
            {translations.programs.title[language]}
          </h2>
          <p
            className="font-serif text-xl text-gold italic"
            data-testid="text-programs-subtitle"
          >
            {translations.programs.subtitle[language]}
          </p>
        </motion.div>

        <div className="space-y-12">
          {/* Private Course */}

          <div className="grid sm:grid-cols-1 lg:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0 }}
            >
              <ProgramCard
                icon={programs[0].icon}
                title={translations.programs.private.title[language]}
                description={
                  translations.programs.private.description[language]
                }
                ages={translations.programs.private.ages[language]}
                index={0}
              />
            </motion.div>

            {/* Group Courses - single expandable card that reveals all group items from translations */}

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <GroupProgramCard
                icon={programs[1].icon}
                description={
                  programs[1].description
                    ? programs[1].description[language]
                    : translations.programs.groups.description[language]
                }
                items={translations.programs.groups.items}
                title={translations.programs.groups.title[language]}
                ages={translations.programs.groups.ages[language]}
                index={1}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProgramCard({
  icon: Icon,
  title,
  description,
  ages,
  index,
}: {
  icon: typeof User;
  title: string;
  description: string;
  ages: string;
  index: number;
}) {
  return (
    <Card
      className="group p-6 border-border bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg cursor-pointer"
      data-testid={`card-program-${index}`}
    >
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 flex items-center justify-center bg-gold/10 rounded-md shrink-0 transition-colors duration-300 group-hover:bg-gold/20">
          <Icon className="w-6 h-6 text-gold" />
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

function GroupProgramCard({
  icon: Icon,
  title,
  description,
  items,
  ages,
  index,
}: {
  icon: typeof Users;
  title: string;
  description: string;
  items: { en: string; fr: string }[];
  ages: string;
  index: number;
}) {
  const { language } = useLanguage();
  const [open, setOpen] = useState(false);

  return (
    <Card
      onClick={() => setOpen((v) => !v)}
      className="group p-6 border-border bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg cursor-pointer"
    >
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 flex items-center justify-center bg-gold/10 rounded-md shrink-0 transition-colors duration-300 group-hover:bg-gold/20">
          <Icon className="w-6 h-6 text-gold" />
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
          <div>
            <p className="font-sans text-gray-700 text-sm mb-2">
              {description}
            </p>
          </div>
        </div>
      </div>

      {open && (
        <div className="mt-6 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((it, i) => (
            <div
              key={i}
              className="p-3 border rounded bg-gray-50 text-sm text-gray-700"
              data-testid={`group-item-${i}`}
            >
              {it[language]}
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}
