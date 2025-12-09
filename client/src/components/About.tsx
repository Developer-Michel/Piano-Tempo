import { useLanguage } from '@/lib/language-context';
import { translations } from '@/lib/translations';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Music, Award, Calendar } from 'lucide-react';

export function About() {
  const { language } = useLanguage();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const stats = [
    { icon: Music, value: '500+', label: translations.about.stats.students[language] },
    { icon: Award, value: '14+', label: translations.about.stats.years[language] },
    { icon: Calendar, value: '4', label: translations.about.stats.recitals[language] },
  ];

  return (
    <section id="about" ref={sectionRef} className="py-24 bg-white" data-testid="section-about">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl text-black mb-4" data-testid="text-about-title">
            {translations.about.title[language]}
          </h2>
          <p className="font-serif text-xl text-gold italic" data-testid="text-about-subtitle">
            {translations.about.subtitle[language]}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="space-y-6">
              <p className="font-sans text-lg text-gray-700 leading-relaxed" data-testid="text-about-p1">
                {translations.about.p1[language]}
              </p>
              <p className="font-sans text-lg text-gray-700 leading-relaxed" data-testid="text-about-p2">
                {translations.about.p2[language]}
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-3 gap-4"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                className="text-center p-6 bg-gray-50 rounded-md"
                data-testid={`stat-${index}`}
              >
                <stat.icon className="w-8 h-8 mx-auto mb-3 text-gold" />
                <div className="font-display text-3xl text-black mb-1">{stat.value}</div>
                <div className="font-sans text-sm text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={isInView ? { opacity: 1, scaleX: 1 } : {}}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-16 h-px bg-gradient-to-r from-transparent via-gold to-transparent"
        />
      </div>
    </section>
  );
}
