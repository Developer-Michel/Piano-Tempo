import { useRef } from 'react';
import { useLanguage } from '@/lib/language-context';
import { translations } from '@/lib/translations';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { motion, useInView } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { FileText, XCircle, CreditCard } from 'lucide-react';

export default function Policy() {
  const { language } = useLanguage();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const policies = [
    {
      icon: FileText,
      title: translations.policy.enrollment.title[language],
      content: translations.policy.enrollment.content[language],
    },
    {
      icon: XCircle,
      title: translations.policy.cancellation.title[language],
      content: translations.policy.cancellation.content[language],
    },
    {
      icon: CreditCard,
      title: translations.policy.payment.title[language],
      content: translations.policy.payment.content[language],
    },
  ];

  return (
    <div className="min-h-screen bg-white" data-testid="page-policy">
      <Header />
      <main className="pt-32 pb-24" ref={sectionRef}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="font-display text-4xl md:text-5xl text-black mb-4" data-testid="text-policy-title">
              {translations.policy.title[language]}
            </h1>
            <div className="w-24 h-1 bg-gold mx-auto" />
          </motion.div>

          <div className="space-y-8">
            {policies.map((policy, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 * index }}
              >
                <Card className="p-8" data-testid={`card-policy-${index}`}>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 flex items-center justify-center bg-gold/10 rounded-md shrink-0">
                      <policy.icon className="w-6 h-6 text-gold" />
                    </div>
                    <div>
                      <h2 className="font-display text-xl text-black mb-3" data-testid={`text-policy-title-${index}`}>
                        {policy.title}
                      </h2>
                      <p className="font-sans text-gray-700 leading-relaxed" data-testid={`text-policy-content-${index}`}>
                        {policy.content}
                      </p>
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
