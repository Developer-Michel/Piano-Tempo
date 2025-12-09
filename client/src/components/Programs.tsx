import { useRef } from 'react';
import { useLanguage } from '@/lib/language-context';
import { translations } from '@/lib/translations';
import { motion, useInView } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { User, Users, GraduationCap, Briefcase, Sun } from 'lucide-react';

export function Programs() {
  const { language } = useLanguage();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const programs = [
    {
      key: 'private',
      icon: User,
      ...translations.programs.private,
    },
    {
      key: 'group7to9',
      icon: Users,
      ...translations.programs.group7to9,
    },
    {
      key: 'group10to13',
      icon: Users,
      ...translations.programs.group10to13,
    },
    {
      key: 'group13to17',
      icon: GraduationCap,
      ...translations.programs.group13to17,
    },
    {
      key: 'adult',
      icon: Briefcase,
      ...translations.programs.adult,
    },
    {
      key: 'retired',
      icon: Sun,
      ...translations.programs.retired,
    },
  ];

  return (
    <section id="programs" ref={sectionRef} className="py-24 bg-white" data-testid="section-programs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl text-black mb-4" data-testid="text-programs-title">
            {translations.programs.title[language]}
          </h2>
          <p className="font-serif text-xl text-gold italic" data-testid="text-programs-subtitle">
            {translations.programs.subtitle[language]}
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {programs.map((program, index) => (
            <motion.div
              key={program.key}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 * index }}
            >
              <ProgramCard
                icon={program.icon}
                title={program.title[language]}
                description={program.description[language]}
                ages={program.ages[language]}
                index={index}
              />
            </motion.div>
          ))}
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
          <h3 className="font-display text-xl text-black mb-2" data-testid={`text-program-title-${index}`}>
            {title}
          </h3>
          <p className="font-sans text-gray-600 text-sm leading-relaxed" data-testid={`text-program-desc-${index}`}>
            {description}
          </p>
        </div>
      </div>
    </Card>
  );
}
