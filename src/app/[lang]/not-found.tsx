"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";

export default function NotFound() {
  const lang = useLocale();
  const t = useTranslations("notFound");
  const homePath = `/${lang}`;

  return (
    <div
      className="min-h-screen bg-white flex flex-col"
      data-testid="page-not-found"
    >
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
            {t("title")}
          </h2>
          <p
            className="font-sans text-gray-600 mb-8 max-w-md mx-auto"
            data-testid="text-not-found-desc"
          >
            {t("description")}
          </p>
          <Link href={homePath}>
            <Button
              className="bg-gold hover:bg-gold-dark text-white font-sans px-8 py-6 transition-all duration-300 hover:scale-105"
              data-testid="button-go-home"
            >
              {t("cta")}
            </Button>
          </Link>
        </motion.div>
      </main>
    </div>
  );
}
