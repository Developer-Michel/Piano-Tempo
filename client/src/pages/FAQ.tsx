import { useRef } from 'react';
import { useLanguage } from '@/lib/language-context';
import { translations } from '@/lib/translations';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { motion, useInView } from 'framer-motion';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export default function FAQ() {
  const { language } = useLanguage();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const faqItems = translations.faq.items;

  return (
    <div className="min-h-screen bg-white" data-testid="page-faq">
      <Header />
      <main className="pt-32 pb-24" ref={sectionRef}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="font-display text-4xl md:text-5xl text-black mb-4" data-testid="text-faq-title">
              {translations.faq.title[language]}
            </h1>
            <div className="w-24 h-1 bg-gold mx-auto" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Accordion type="single" collapsible className="space-y-4">
              {faqItems.map((item, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="bg-gray-50 rounded-md px-6 border-none"
                  data-testid={`accordion-faq-${index}`}
                >
                  <AccordionTrigger className="font-serif text-lg text-black hover:text-gold transition-colors py-6 [&[data-state=open]]:text-gold" data-testid={`button-faq-${index}`}>
                    {item.q[language]}
                  </AccordionTrigger>
                  <AccordionContent className="font-sans text-gray-700 pb-6 leading-relaxed" data-testid={`text-faq-answer-${index}`}>
                    {item.a[language]}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
