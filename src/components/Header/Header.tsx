"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { getPublicEnv } from "@/lib/env";
import { Menu, X } from "lucide-react";
import { SiFacebook } from "react-icons/si";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { LanguageSelector } from "./Language-Selector";
import { useNavScroll } from "@/hooks/use-nav";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname() || "";
  const locale = useLocale();
  const basePath = `/${locale}`;
  const tNav = useTranslations("common.nav");
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { key: "home", href: `${basePath}`, sectionId: "home" },
    { key: "about", href: `${basePath}`, sectionId: "about" },
    { key: "teachers", href: `${basePath}`, sectionId: "teachers" },
    { key: "programs", href: `${basePath}`, sectionId: "programs" },
    { key: "contact", href: `${basePath}`, sectionId: "contact" },
  ];

  const additionalNavItems = [
    { key: "methodology", href: `${basePath}/methodology` },
    { key: "policy", href: `${basePath}/policy` },
    { key: "information", href: `${basePath}/faq` },
    { key: "gallery", href: `${basePath}/gallery` },
    { key: "resources", href: `${basePath}/resources` },
  ];

  const activeExtra = additionalNavItems.some((item) => item.href === pathname);

  const nav = useNavScroll();

  const handleNavClick = (href: string, sectionId?: string) => {
    setIsMobileMenuOpen(false);
    nav({
      href: href,
      id: sectionId || "",
    });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        activeExtra && "bg-white/95 backdrop-blur-md shadow-lg"
      } ${
        isScrolled ? "bg-white/95 backdrop-blur-md shadow-lg" : "bg-transparent"
      } `}
      data-testid="header"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href={basePath}>
            <motion.div
              className="flex items-center gap-2 cursor-pointer"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
              data-testid="link-logo"
            >
              <span
                className={`font-serif text-2xl tracking-wide ${
                  isScrolled || activeExtra ? "text-black" : "text-white"
                }`}
              >
                Piano
              </span>
              <span className="font-serif text-2xl text-gold">a Tempo</span>
            </motion.div>
          </Link>

          <nav
            className="hidden lg:flex items-center gap-8"
            data-testid="nav-desktop"
          >
            {navItems.map((item) => (
              <NavLink
                key={item.key}
                label={tNav(item.key)}
                href={item.href}
                isScrolled={isScrolled || activeExtra}
                onClick={() => handleNavClick(item.href, item.sectionId)}
                testId={`nav-${item.key}`}
              />
            ))}
            <DropdownMenu modal={false}>
              <DropdownMenuTrigger asChild>
                <button
                  className={`relative font-sans text-sm tracking-wide group ${
                    isScrolled || activeExtra ? "text-black" : "text-white"
                  }`}
                  aria-label="More"
                >
                  {tNav("more")}
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {additionalNavItems.map((item) => (
                  <DropdownMenuItem
                    key={item.key}
                    onClick={() => handleNavClick(item.href)}
                    data-testid={`nav-${item.key}`}
                  >
                    {tNav(item.key)}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>

          <div className="flex items-center gap-4">
            {/* Social links (desktop) */}
            <div className="hidden lg:flex items-center gap-3">
              <a
                href={getPublicEnv("NEXT_PUBLIC_FACEBOOK")}
                target="_blank"
                rel="noreferrer noopener"
                className={`w-8 h-8 flex items-center justify-center rounded-md transition-colors ${
                  isScrolled || activeExtra
                    ? "text-black hover:text-gold"
                    : "text-white hover:text-gold"
                }`}
                aria-label="Facebook"
                data-testid="link-header-facebook"
              >
                <SiFacebook className="w-5 h-5" />
              </a>
            </div>
            <LanguageSelector
              isScrolled={isScrolled}
              activeExtra={activeExtra}
            />
            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className={`lg:hidden ${
                isScrolled || activeExtra ? "text-black" : "text-white"
              }`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              data-testid="button-mobile-menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t"
            data-testid="nav-mobile"
          >
            <nav className="flex flex-col py-4 px-4">
              {navItems.map((item) => (
                <button
                  key={item.key}
                  onClick={() => handleNavClick(item.href, item.sectionId)}
                  className="py-3 text-left font-sans text-lg text-black hover:text-gold transition-colors"
                  data-testid={`nav-mobile-${item.key}`}
                >
                  {tNav(item.key)}
                </button>
              ))}
              {additionalNavItems.map((item) => (
                <button
                  key={item.key}
                  onClick={() => handleNavClick(item.href)}
                  className="py-3 text-left font-sans text-lg text-black hover:text-gold transition-colors"
                  data-testid={`nav-mobile-${item.key}`}
                >
                  {tNav(item.key)}
                </button>
              ))}
              <div className="mt-4 flex items-center gap-3">
                <a
                  href={getPublicEnv("NEXT_PUBLIC_FACEBOOK")}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="w-8 h-8 flex items-center justify-center rounded-md text-black hover:text-gold transition-colors"
                  aria-label="Facebook"
                  data-testid="link-header-facebook-mobile"
                >
                  <SiFacebook className="w-5 h-5" />
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function NavLink({
  label,
  href,
  isScrolled,
  onClick,
  testId,
}: {
  label: string;
  href: string;
  isScrolled: boolean;
  onClick: () => void;
  testId: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`relative font-sans text-sm tracking-wide group ${
        isScrolled ? "text-black" : "text-white"
      }`}
      data-testid={testId}
    >
      {label}
      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gold transition-all duration-300 group-hover:w-full" />
    </button>
  );
}
