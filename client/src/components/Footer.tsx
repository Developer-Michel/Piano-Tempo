import { useLanguage } from "@/lib/language-context";
import { translations } from "@/lib/translations";
import { Link } from "wouter";
import { SiFacebook, SiInstagram, SiYoutube } from "react-icons/si";
import { motion } from "framer-motion";

export function Footer() {
  const { language } = useLanguage();

  const quickLinks = [
    { key: "home", href: "/" },
    { key: "about", href: "/#about" },
    { key: "teachers", href: "/#teachers" },
    { key: "programs", href: "/#programs" },
    { key: "contact", href: "/#contact" },
  ];

  const additionalLinks = [
    { key: "policy", href: "/policy" },
    { key: "information", href: "/faq" },
    { key: "gallery", href: "/gallery" },
    { key: "resources", href: "/resources" },
  ];

  const programLinks = [
    {
      label: translations.programs.private.title[language],
      href: "/#programs",
    },
    {
      label: translations.programs.groups.title[language],
      href: "/#programs",
    },
  ];

  const socialLinks = [
    { icon: SiFacebook, href: "#", label: "Facebook" },
    { icon: SiInstagram, href: "#", label: "Instagram" },
    { icon: SiYoutube, href: "#", label: "YouTube" },
  ];

  return (
    <footer className="bg-black text-white py-16" data-testid="footer">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div>
            <div className="mb-6">
              <span className="font-serif text-2xl">
                Piano <span className="text-gold">à Tempo</span>
              </span>
            </div>
            <p
              className="font-sans text-white/70 mb-6"
              data-testid="text-footer-tagline"
            >
              {translations.footer.tagline[language]}
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
              {translations.footer.quickLinks[language]}
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.key}>
                  <Link href={link.href}>
                    <span
                      className="font-sans text-white/70 hover:text-gold transition-colors duration-300 cursor-pointer"
                      data-testid={`link-footer-${link.key}`}
                    >
                      {
                        translations.nav[
                          link.key as keyof typeof translations.nav
                        ][language]
                      }
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
                      {
                        translations.nav[
                          link.key as keyof typeof translations.nav
                        ][language]
                      }
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-serif text-lg text-gold mb-6">
              {translations.footer.programs[language]}
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
              {translations.footer.contactInfo[language]}
            </h3>
            <ul className="space-y-3 font-sans text-white/70">
              <li>Gatineau, secteur Hull, QC J8Y 1B3</li>
              {/* <li className="pt-2">(514) 555-0123</li> */}
              <li>info.pianoatempo@gmail.com</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8">
          <p
            className="font-sans text-white/50 text-center text-sm"
            data-testid="text-copyright"
          >
            {translations.footer.copyright[language]}
          </p>
        </div>
      </div>
    </footer>
  );
}
