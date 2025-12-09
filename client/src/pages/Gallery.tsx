import { useRef } from "react";
import { useLanguage } from "@/lib/language-context";
import { translations } from "@/lib/translations";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { motion, useInView } from "framer-motion";
import { Card } from "@/components/ui/card";
import { ImageIcon } from "lucide-react";

export default function Gallery() {
  const { language } = useLanguage();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const placeholderImages = Array(6).fill(null);

  return (
    <div className="min-h-screen bg-white" data-testid="page-gallery">
      <Header />
      <main className="pt-32 pb-24" ref={sectionRef}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1
              className="font-serif text-4xl md:text-5xl text-black mb-4"
              data-testid="text-gallery-title"
            >
              {translations.gallery.title[language]}
            </h1>
            <p
              className="font-serif text-xl text-gold italic mb-4"
              data-testid="text-gallery-subtitle"
            >
              {translations.gallery.subtitle[language]}
            </p>
            <div className="w-24 h-1 bg-gold mx-auto" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center mb-12"
          >
            <p
              className="font-sans text-gray-600 max-w-2xl mx-auto"
              data-testid="text-gallery-coming-soon"
            >
              {translations.gallery.comingSoon[language]}
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {placeholderImages.map((_, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 * index }}
              >
                <Card
                  className="aspect-square bg-gray-100 flex items-center justify-center group transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                  data-testid={`card-gallery-${index}`}
                >
                  <div className="text-center p-6">
                    <ImageIcon className="w-12 h-12 text-gray-300 mx-auto mb-3 group-hover:text-gold transition-colors duration-300" />
                    <p className="font-sans text-sm text-gray-400 group-hover:text-gray-600 transition-colors duration-300">
                      {language === "en" ? "Coming Soon" : "Bientôt disponible"}
                    </p>
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
