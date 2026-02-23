"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export function HeroCta({ label }: { label: string }) {
  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <Button
        onClick={scrollToContact}
        className="bg-gold hover:bg-gold-dark text-white font-sans text-lg px-8 py-3 tracking-wide transition-transform duration-300 hover:scale-105 shadow-[0_0_30px_rgba(212,175,55,0.4)]"
        data-testid="button-inquire-hero"
      >
        {label}
      </Button>
    </>
  );
}
