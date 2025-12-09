import { Link } from "wouter";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/language-context";

export default function NotFound() {
  const { language } = useLanguage();

  return (
    <div
      className="min-h-screen bg-white flex flex-col"
      data-testid="page-not-found"
    >
      <Header />
      <main className="flex-1 flex items-center justify-center pt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center px-4"
        >
          <h1
            className="font-serif text-8xl text-gold mb-4"
            data-testid="text-404"
          >
            404
          </h1>
          <h2
            className="font-serif text-2xl text-black mb-6"
            data-testid="text-not-found-title"
          >
            {language === "en" ? "Page Not Found" : "Page non trouvée"}
          </h2>
          <p
            className="font-sans text-gray-600 mb-8 max-w-md mx-auto"
            data-testid="text-not-found-desc"
          >
            {language === "en"
              ? "The page you're looking for doesn't exist or has been moved."
              : "La page que vous recherchez n'existe pas ou a été déplacée."}
          </p>
          <Link href="/">
            <Button
              className="bg-gold hover:bg-gold-dark text-white font-sans px-8 py-6 transition-all duration-300 hover:scale-105"
              data-testid="button-go-home"
            >
              {language === "en" ? "Return Home" : "Retour à l'accueil"}
            </Button>
          </Link>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
}
