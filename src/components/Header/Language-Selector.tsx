import { Locale, useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import { useParams } from "next/navigation";

export const LanguageSelector = ({
  isScrolled,
  activeExtra,
}: {
  isScrolled: boolean;
  activeExtra: boolean;
}) => {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams<{ city?: string }>();

  const handleLanguageChange = (target: Locale) => {
    if (
      pathname === "/lessons/piano/groups/[city]" ||
      pathname === "/lessons/piano/private/[city]"
    ) {
      router.push(
        {
          pathname,
          params: { city: params.city ?? "gatineau" },
        },
        { locale: target },
      );
      return;
    }

    router.push(pathname, { locale: target });
  };
  return (
    <div
      className={`flex items-center gap-1 text-sm font-medium ${
        isScrolled || activeExtra ? "text-black" : "text-white"
      }`}
      data-testid="params.lang-toggle"
    >
      <button
        onClick={() => handleLanguageChange("fr")}
        className={`px-2 py-1 transition-colors duration-300 ${
          locale === "fr" ? "text-gold" : "opacity-70 hover:opacity-100"
        }`}
        data-testid="button-lang-fr"
      >
        FR
      </button>
      <span className="opacity-50">|</span>
      <button
        onClick={() => handleLanguageChange("en")}
        className={`px-2 py-1 transition-colors duration-300 ${
          locale === "en" ? "text-gold" : "opacity-70 hover:opacity-100"
        }`}
        data-testid="button-lang-en"
      >
        EN
      </button>
    </div>
  );
};
