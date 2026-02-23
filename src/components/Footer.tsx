"use client";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { getPublicEnv } from "@/lib/env";
import { SiFacebook } from "react-icons/si";
import { motion } from "framer-motion";

export function Footer() {
  const lang = useLocale();
  const basePath = `/${lang}`;
  const tNav = useTranslations("common.nav");
  const tFooter = useTranslations("common.footer");
  const tPrograms = useTranslations("home.programs");

  const quickLinks = [
    { key: "home", href: basePath },
    { key: "about", href: `${basePath}/about` },
    { key: "teachers", href: `${basePath}/teachers` },
    { key: "programs", href: `${basePath}/programs` },
    { key: "contact", href: `${basePath}/contact` },
  ];

  const additionalLinks = [
    { key: "policy", href: `${basePath}/policy` },
    { key: "information", href: `${basePath}/faq` },
    { key: "gallery", href: `${basePath}/gallery` },
    { key: "resources", href: `${basePath}/resources` },
  ];

  const programLinks = [
    {
      label: tPrograms("private.title"),
      href: `${basePath}/programs`,
    },
    {
      label: tPrograms("groups.title"),
      href: `${basePath}/programs`,
    },
  ];

  const socialLinks = [
    {
      icon: SiFacebook,
      href: getPublicEnv("NEXT_PUBLIC_FACEBOOK"),
      label: "Facebook",
    },
  ];

  return (
    <footer className="bg-black text-white py-16" data-testid="footer">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div>
            <div className="mb-6">
              <span className="font-serif text-2xl">
                Piano <span className="text-gold ">a Tempo</span>
              </span>
            </div>
            <p
              className="font-sans text-white/70 mb-6"
              data-testid="text-footer-tagline"
            >
              {tFooter("tagline")}
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 flex items-center justify-center bg-gold/10 rounded-md text-gold hover:bg-gold hover:text-black transition-colors duration-300"
                  aria-label={social.label}
                  data-testid={`link-social-${social.label.toLowerCase()}`}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-serif text-lg text-gold mb-6">
              {tFooter("quickLinks")}
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.key}>
                  <Link href={link.href}>
                    <span
                      className="font-sans text-white/70 hover:text-gold transition-colors duration-300 cursor-pointer"
                      data-testid={`link-footer-${link.key}`}
                    >
                      {tNav(link.key)}
                    </span>
                  </Link>
                </li>
              ))}
              {additionalLinks.map((link) => (
                <li key={link.key}>
                  <Link href={link.href}>
                    <span
                      className="font-sans text-white/70 hover:text-gold transition-colors duration-300 cursor-pointer"
                      data-testid={`link-footer-${link.key}`}
                    >
                      {tNav(link.key)}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-serif text-lg text-gold mb-6">
              {tFooter("programs")}
            </h3>
            <ul className="space-y-3">
              {programLinks.map((link, index) => (
                <li key={index}>
                  <Link href={link.href}>
                    <span
                      className="font-sans text-white/70 hover:text-gold transition-colors duration-300 cursor-pointer"
                      data-testid={`link-footer-program-${index}`}
                    >
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-serif text-lg text-gold mb-6">
              {tFooter("contactInfo")}
            </h3>
            <ul className="space-y-3 font-sans text-white/70">
              <li>{getPublicEnv("NEXT_PUBLIC_ADDRESS")}</li>

              <li>{getPublicEnv("NEXT_PUBLIC_EMAIL")}</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8">
          <p
            className="font-sans text-white/50 text-center text-sm"
            data-testid="text-copyright"
          >
            {tFooter("copyright")}
          </p>
        </div>
      </div>
    </footer>
  );
}
