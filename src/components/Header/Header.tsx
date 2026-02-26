"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { getPublicEnv } from "@/lib/env";
import { Menu, X, ChevronDown } from "lucide-react";
import { SiFacebook } from "react-icons/si";
import { Button } from "@/components/ui/button";
import { LanguageSelector } from "./Language-Selector";
import { useNavScroll } from "@/hooks/use-nav";

type NavItem = { key: string; href: string; sectionId?: string };

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const pathname = usePathname() || "";
  const locale = useLocale();
  const basePath = `/${locale}`;
  const tNav = useTranslations("common.nav");
  const nav = useNavScroll();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems: NavItem[] = useMemo(
    () => [
      { key: "home", href: `${basePath}`, sectionId: "home" },
      { key: "about", href: `${basePath}`, sectionId: "about" },
      { key: "teachers", href: `${basePath}`, sectionId: "teachers" },
      { key: "programs", href: `${basePath}`, sectionId: "programs" },
      { key: "contact", href: `${basePath}`, sectionId: "contact" },
    ],
    [basePath],
  );

  const additionalNavItems: NavItem[] = useMemo(
    () => [
      { key: "methodology", href: `${basePath}/methodology` },
      { key: "policy", href: `${basePath}/policy` },
      { key: "information", href: `${basePath}/faq` },
      { key: "gallery", href: `${basePath}/gallery` },
      { key: "resources", href: `${basePath}/resources` },
    ],
    [basePath],
  );

  const activeExtra = additionalNavItems.some((item) => item.href === pathname);

  const handleNavClick = (href: string, sectionId?: string) => {
    setIsMobileMenuOpen(false);
    nav({ href, id: sectionId || "" });
  };

  const isDarkText = isScrolled || activeExtra;

  return (
    <header
      className={[
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        isDarkText
          ? "bg-white/95 backdrop-blur-md shadow-lg"
          : "bg-transparent",
      ].join(" ")}
      data-testid="header"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href={basePath} data-testid="link-logo" aria-label="Home">
            <div className="flex items-center gap-2 cursor-pointer transition-transform duration-200 hover:scale-[1.02]">
              <span
                className={[
                  "text-2xl tracking-wide",
                  isDarkText ? "text-black" : "text-white",
                ].join(" ")}
              >
                Piano
              </span>
              <span className="text-2xl text-gold">a Tempo</span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav
            className="hidden lg:flex items-center gap-8"
            data-testid="nav-desktop"
          >
            {navItems.map((item) => (
              <NavLink
                key={item.key}
                label={tNav(item.key)}
                isDarkText={isDarkText}
                onClick={() => handleNavClick(item.href, item.sectionId)}
                testId={`nav-${item.key}`}
              />
            ))}

            {/* Lightweight dropdown using <details> */}
            <details className="relative group">
              <summary
                className={[
                  "list-none cursor-pointer select-none text-sm tracking-wide flex items-center gap-1",
                  isDarkText ? "text-black" : "text-white",
                ].join(" ")}
                aria-label="More"
              >
                {tNav("more")}
                <ChevronDown className="h-4 w-4 transition-transform duration-200 group-open:rotate-180" />
              </summary>

              {/* dropdown panel */}
              <div className="absolute right-0 mt-3 w-60 rounded-xl border bg-white shadow-lg overflow-hidden">
                {additionalNavItems.map((item) => (
                  <button
                    key={item.key}
                    onClick={() => handleNavClick(item.href)}
                    className="w-full text-left px-4 py-3 text-sm hover:bg-black/5 hover:text-gold transition-colors"
                    data-testid={`nav-${item.key}`}
                  >
                    {tNav(item.key)}
                  </button>
                ))}
              </div>
            </details>
          </nav>

          <div className="flex items-center gap-4">
            {/* Social links (desktop) */}
            <div className="hidden lg:flex items-center gap-3">
              <a
                href={getPublicEnv("NEXT_PUBLIC_FACEBOOK")}
                target="_blank"
                rel="noreferrer noopener"
                className={[
                  "w-8 h-8 flex items-center justify-center rounded-md transition-colors",
                  isDarkText
                    ? "text-black hover:text-gold"
                    : "text-white hover:text-gold",
                ].join(" ")}
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
              aria-label="mobile menu button"
              className={`lg:hidden ${isDarkText ? "text-black" : "text-white"}`}
              onClick={() => setIsMobileMenuOpen((v) => !v)}
              data-testid="button-mobile-menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu: CSS transition instead of AnimatePresence */}
      <div
        className={[
          "lg:hidden overflow-hidden border-t bg-white transition-[max-height,opacity] duration-300",
          isMobileMenuOpen ? "max-h-[520px] opacity-100" : "max-h-0 opacity-0",
        ].join(" ")}
        data-testid="nav-mobile"
      >
        <nav className="flex flex-col py-4 px-4">
          {navItems.map((item) => (
            <button
              key={item.key}
              onClick={() => handleNavClick(item.href, item.sectionId)}
              className="py-3 text-left text-lg text-black hover:text-gold transition-colors"
              data-testid={`nav-mobile-${item.key}`}
            >
              {tNav(item.key)}
            </button>
          ))}

          {additionalNavItems.map((item) => (
            <button
              key={item.key}
              onClick={() => handleNavClick(item.href)}
              className="py-3 text-left text-lg text-black hover:text-gold transition-colors"
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
      </div>
    </header>
  );
}

function NavLink({
  label,
  isDarkText,
  onClick,
  testId,
}: {
  label: string;
  isDarkText: boolean;
  onClick: () => void;
  testId: string;
}) {
  return (
    <button
      onClick={onClick}
      className={[
        "relative text-sm tracking-wide group transition-colors",
        isDarkText ? "text-black" : "text-white",
      ].join(" ")}
      data-testid={testId}
    >
      {label}
      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gold transition-all duration-300 group-hover:w-full" />
    </button>
  );
}
