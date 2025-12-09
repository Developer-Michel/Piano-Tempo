import { useRef } from 'react';
import { useLanguage } from '@/lib/language-context';
import { translations } from '@/lib/translations';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { motion, useInView } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { FileText, BookOpen, Music, Download } from 'lucide-react';

export default function Resources() {
  const { language } = useLanguage();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const resourceCategories = [
    {
      icon: FileText,
      title: language === 'en' ? 'Practice Sheets' : 'Feuilles de pratique',
      description: language === 'en' 
        ? 'Weekly practice logs and assignment trackers for students'
        : 'Journaux de pratique hebdomadaires et suivis de devoirs pour les élèves',
    },
    {
      icon: BookOpen,
      title: language === 'en' ? 'Theory Guides' : 'Guides de théorie',
      description: language === 'en'
        ? 'Music theory fundamentals from beginner to advanced levels'
        : 'Fondamentaux de la théorie musicale du niveau débutant au niveau avancé',
    },
    {
      icon: Music,
      title: language === 'en' ? 'Sheet Music' : 'Partitions',
      description: language === 'en'
        ? 'Curated selection of pieces for various skill levels'
        : 'Sélection de pièces pour différents niveaux',
    },
  ];

  return (
    <div className="min-h-screen bg-white" data-testid="page-resources">
      <Header />
      <main className="pt-32 pb-24" ref={sectionRef}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="font-display text-4xl md:text-5xl text-black mb-4" data-testid="text-resources-title">
              {translations.resources.title[language]}
            </h1>
            <p className="font-serif text-xl text-gold italic mb-4" data-testid="text-resources-subtitle">
              {translations.resources.subtitle[language]}
            </p>
            <div className="w-24 h-1 bg-gold mx-auto" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center mb-12"
          >
            <p className="font-sans text-gray-600 max-w-2xl mx-auto" data-testid="text-resources-coming-soon">
              {translations.resources.comingSoon[language]}
            </p>
          </motion.div>

          <div className="space-y-6">
            {resourceCategories.map((resource, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 * index }}
              >
                <Card
                  className="p-6 group transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                  data-testid={`card-resource-${index}`}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 flex items-center justify-center bg-gold/10 rounded-md shrink-0 transition-colors duration-300 group-hover:bg-gold/20">
                      <resource.icon className="w-7 h-7 text-gold" />
                    </div>
                    <div className="flex-1">
                      <h2 className="font-display text-xl text-black mb-1" data-testid={`text-resource-title-${index}`}>
                        {resource.title}
                      </h2>
                      <p className="font-sans text-gray-600 text-sm" data-testid={`text-resource-desc-${index}`}>
                        {resource.description}
                      </p>
                    </div>
                    <div className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-md text-gray-400 group-hover:bg-gold/10 group-hover:text-gold transition-all duration-300">
                      <Download className="w-5 h-5" />
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
