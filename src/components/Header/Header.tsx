"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "@/i18n/navigation";

import { getPublicEnv } from "@/lib/env";
import { Menu, X, ChevronDown } from "lucide-react";
import { SiFacebook } from "react-icons/si";
import { Button } from "@/components/ui/button";
import { LanguageSelector } from "./Language-Selector";
import { useLocale, useTranslations } from "next-intl";

type NavItem = { key: string; href: string };
type CourseItem = { key: string; href: string; label: string };

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const pathname = usePathname() || "";
  const locale = useLocale();
  const basePath = `/` + locale;
  const tNav = useTranslations("common.nav");
  const tPrograms = useTranslations("home.programs");

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const navItems: NavItem[] = useMemo(
    () => [
      { key: "home", href: `/${locale}#home` },
      { key: "about", href: `/${locale}#about` },
      { key: "teachers", href: `/${locale}#teachers` },
      { key: "contact", href: `/${locale}#contact` },
    ],
    [locale],
  );

  const courseItems: CourseItem[] = useMemo(
    () => [
      {
        key: "private",
        href:
          locale === "fr"
            ? `/${locale}/cours-de-piano/gatineau`
            : `/${locale}/piano-lessons/gatineau`,
        label: tPrograms("private.title"),
      },
      {
        key: "groups",
        href: `/${locale}/lessons/piano/groups/gatineau`,
        label: tPrograms("groups.title"),
      },
    ],
    [locale, tPrograms],
  );

  const additionalNavItems: NavItem[] = useMemo(
    () => [
      { key: "methodology", href: "/methodology" },
      { key: "policy", href: "/policy" },
      { key: "information", href: "/faq" },
      { key: "gallery", href: "/gallery" },
      { key: "resources", href: "/resources" },
    ],
    [],
  );

  const activeExtra = pathname !== "/";

  const isDarkText = isScrolled || activeExtra;
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <header
      className={[
        "fixed top-0 left-0 right-0 z-50 transition-colors duration-300",
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
                <h2>Piano</h2>
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
                item={item}
                testId={`nav-${item.key}`}
              />
            ))}

            <CoursesDropdown
              label={tNav("programs")}
              courseItems={courseItems}
              isDarkText={isDarkText}
            />

            {/* Lightweight dropdown using <details> */}
            <MoreDrowdown
              additionalNavItems={additionalNavItems}
              tNav={tNav}
              isDarkText={isDarkText}
            />
          </nav>

          <div className="flex items-center gap-4">
            {/* Social links (desktop) */}
            <div className="hidden lg:flex items-center gap-3">
              <a
                href={getPublicEnv("NEXT_PUBLIC_FACEBOOK")}
                target="_blank"
                rel="noreferrer noopener"
                className={[
                  "w-8 h-8 flex items-center justify-center rounded-md",
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
          "lg:hidden font-sans overflow-auto border-t bg-white ",
          isMobileMenuOpen ? "max-h-[90vh] opacity-100" : "max-h-0 opacity-0",
        ].join(" ")}
        data-testid="nav-mobile"
      >
        <nav className="flex flex-col py-4 px-4">
          {navItems.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              onClick={closeMobileMenu}
              className="py-3 text-left text-lg text-black hover:text-gold"
              data-testid={`nav-mobile-${item.key}`}
            >
              {tNav(item.key)}
            </Link>
          ))}

          <p className="pt-2 pb-1 text-sm uppercase tracking-wide text-gray-500">
            {tNav("programs")}
          </p>
          {courseItems.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              onClick={closeMobileMenu}
              className="py-2 pl-3 text-left text-base text-black hover:text-gold"
              data-testid={`nav-mobile-course-${item.key}`}
            >
              {item.label}
            </Link>
          ))}

          {additionalNavItems.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              onClick={closeMobileMenu}
              className="py-3 text-left text-lg text-black hover:text-gold"
              data-testid={`nav-mobile-${item.key}`}
            >
              {tNav(item.key)}
            </Link>
          ))}

          <div className="mt-4 flex items-center gap-3">
            <a
              href={getPublicEnv("NEXT_PUBLIC_FACEBOOK")}
              target="_blank"
              rel="noreferrer noopener"
              className="w-8 h-8 flex items-center justify-center rounded-md text-black hover:text-gold"
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
function CoursesDropdown({
  label,
  courseItems,
  isDarkText,
}: {
  label: string;
  courseItems: CourseItem[];
  isDarkText: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const detailsRef = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        detailsRef.current &&
        !detailsRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <details ref={detailsRef} open={isOpen} className="relative group">
      <summary
        onClick={(e) => {
          e.preventDefault();
          setIsOpen((prev) => !prev);
        }}
        className={[
          "list-none cursor-pointer select-none text-sm tracking-wide flex items-center gap-1",
          isDarkText ? "text-black" : "text-white",
        ].join(" ")}
        aria-label={label}
      >
        {label}
        <ChevronDown className="h-4 w-4 transition-transform duration-200 group-open:rotate-180" />
      </summary>

      <div className="absolute right-0 mt-3 w-60 rounded-xl border bg-white shadow-lg overflow-hidden">
        {courseItems.map((item) => (
          <div
            key={item.key}
            className="w-full text-left text-sm hover:bg-black/5 hover:text-gold"
          >
            <Link
              href={item.href}
              onClick={() => {
                setIsOpen(false);
              }}
              data-testid={`nav-course-${item.key}`}
              className="w-full h-full block px-4 py-3"
            >
              {item.label}
            </Link>
          </div>
        ))}
      </div>
    </details>
  );
}
function MoreDrowdown({
  additionalNavItems,
  tNav,
  isDarkText,
}: {
  additionalNavItems: NavItem[];
  tNav: (key: string) => string;
  isDarkText: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const detailsRef = useRef<HTMLDetailsElement>(null);

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        detailsRef.current &&
        !detailsRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <details ref={detailsRef} open={isOpen} className="relative group">
      <summary
        onClick={(e) => {
          e.preventDefault(); // empêche le toggle natif
          setIsOpen((prev) => !prev);
        }}
        className={[
          "list-none cursor-pointer select-none text-sm tracking-wide flex items-center gap-1",
          isDarkText ? "text-black" : "text-white",
        ].join(" ")}
        aria-label="More"
      >
        {tNav("more")}
        <ChevronDown className="h-4 w-4 transition-transform duration-200 group-open:rotate-180" />
      </summary>

      <div className="absolute right-0 mt-3 w-60 rounded-xl border bg-white shadow-lg overflow-hidden">
        {additionalNavItems.map((item) => (
          <div
            key={item.key}
            className="w-full text-left  text-sm hover:bg-black/5 hover:text-gold"
          >
            <Link
              href={item.href}
              onClick={() => {
                setIsOpen(false); // ferme au clic
              }}
              data-testid={`nav-${item.key}`}
              className="w-full h-full block px-4 py-3"
            >
              {tNav(item.key)}
            </Link>
          </div>
        ))}
      </div>
    </details>
  );
}
function NavLink({
  label,
  isDarkText,
  item,
  testId,
}: {
  label: string;
  item: NavItem;
  isDarkText: boolean;
  testId: string;
}) {
  return (
    <Link
      href={item.href}
      className={[
        "relative text-sm tracking-wide group ",
        isDarkText ? "text-black" : "text-white",
      ].join(" ")}
      aria-label={label}
      data-testid={testId}
    >
      {label}

      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gold transition-all duration-300 group-hover:w-full" />
    </Link>
  );
}
