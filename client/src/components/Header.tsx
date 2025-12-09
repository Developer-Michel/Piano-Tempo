import { useState, useEffect } from 'react';
import { useLanguage } from '@/lib/language-context';
import { translations } from '@/lib/translations';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'wouter';

export function Header() {
  const { language, setLanguage } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { key: 'home', href: '/', isSection: false },
    { key: 'about', href: '/#about', isSection: true },
    { key: 'teachers', href: '/#teachers', isSection: true },
    { key: 'programs', href: '/#programs', isSection: true },
    { key: 'contact', href: '/#contact', isSection: true },
  ];

  const additionalNavItems = [
    { key: 'policy', href: '/policy' },
    { key: 'information', href: '/faq' },
  ];

  const [, navigate] = useLocation();

  const handleNavClick = (href: string, isSection: boolean) => {
    setIsMobileMenuOpen(false);
    if (isSection && location === '/') {
      const sectionId = href.replace('/#', '');
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (isSection) {
      navigate('/');
      setTimeout(() => {
        const sectionId = href.replace('/#', '');
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      navigate(href);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-lg'
          : 'bg-transparent'
      }`}
      data-testid="header"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/">
            <motion.div
              className="flex items-center gap-2 cursor-pointer"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
              data-testid="link-logo"
            >
              <span className={`font-display text-2xl tracking-wide ${isScrolled ? 'text-black' : 'text-white'}`}>
                Piano
              </span>
              <span className="font-display text-2xl text-gold">à Tempo</span>
            </motion.div>
          </Link>

          <nav className="hidden lg:flex items-center gap-8" data-testid="nav-desktop">
            {navItems.map((item) => (
              <NavLink
                key={item.key}
                label={translations.nav[item.key as keyof typeof translations.nav][language]}
                href={item.href}
                isScrolled={isScrolled}
                onClick={() => handleNavClick(item.href, item.isSection)}
                testId={`nav-${item.key}`}
              />
            ))}
            {additionalNavItems.map((item) => (
              <NavLink
                key={item.key}
                label={translations.nav[item.key as keyof typeof translations.nav][language]}
                href={item.href}
                isScrolled={isScrolled}
                onClick={() => handleNavClick(item.href, false)}
                testId={`nav-${item.key}`}
              />
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <div
              className={`flex items-center gap-1 text-sm font-medium ${
                isScrolled ? 'text-black' : 'text-white'
              }`}
              data-testid="language-toggle"
            >
              <button
                onClick={() => setLanguage('en')}
                className={`px-2 py-1 transition-colors duration-300 ${
                  language === 'en' ? 'text-gold' : 'opacity-70 hover:opacity-100'
                }`}
                data-testid="button-lang-en"
              >
                EN
              </button>
              <span className="opacity-50">|</span>
              <button
                onClick={() => setLanguage('fr')}
                className={`px-2 py-1 transition-colors duration-300 ${
                  language === 'fr' ? 'text-gold' : 'opacity-70 hover:opacity-100'
                }`}
                data-testid="button-lang-fr"
              >
                FR
              </button>
            </div>

            <Button
              variant="ghost"
              size="icon"
              className={`lg:hidden ${isScrolled ? 'text-black' : 'text-white'}`}
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
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t"
            data-testid="nav-mobile"
          >
            <nav className="flex flex-col py-4 px-4">
              {navItems.map((item) => (
                <button
                  key={item.key}
                  onClick={() => handleNavClick(item.href, item.isSection)}
                  className="py-3 text-left font-sans text-lg text-black hover:text-gold transition-colors"
                  data-testid={`nav-mobile-${item.key}`}
                >
                  {translations.nav[item.key as keyof typeof translations.nav][language]}
                </button>
              ))}
              {additionalNavItems.map((item) => (
                <button
                  key={item.key}
                  onClick={() => handleNavClick(item.href, false)}
                  className="py-3 text-left font-sans text-lg text-black hover:text-gold transition-colors"
                  data-testid={`nav-mobile-${item.key}`}
                >
                  {translations.nav[item.key as keyof typeof translations.nav][language]}
                </button>
              ))}
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
        isScrolled ? 'text-black' : 'text-white'
      }`}
      data-testid={testId}
    >
      {label}
      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gold transition-all duration-300 group-hover:w-full" />
    </button>
  );
}
