import {
  Music,
  Hand,
  BookOpen,
  Volume2,
  Lightbulb,
  Pen,
  Star,
} from "lucide-react";
import { getTranslations } from "next-intl/server";
const iconMap: { [key: number]: any } = {
  0: Music,
  1: Hand,
  2: BookOpen,
  3: Volume2,
  4: Lightbulb,
  5: Pen,
  6: Star,
};

export async function Methodology() {
  const t = await getTranslations("methodology");
  const items = t.raw("items") as { title: string; content: string }[];

  return (
    <section
      id="methodology"
      className="py-24 bg-gray-50"
      data-testid="section-methodology"
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2
            className="font-serif text-4xl md:text-5xl text-black mb-4"
            data-testid="text-methodology-title"
          >
            {t("title")}
          </h2>
          <p
            className="font-serif text-xl text-gold "
            data-testid="text-methodology-subtitle"
          >
            {t("subtitle")}
          </p>
          <div className="w-24 h-1 bg-gold mx-auto mt-6" />
        </div>

        <ul className="space-y-12">
          {items.map((item, index) => {
            const Icon = iconMap[index] || Music;
            return (
              <li
                key={index}
                className="flex items-start gap-6"
                data-testid={`methodology-item-${index}`}
              >
                <div className="w-12 h-12 flex items-center justify-center bg-gold/10 rounded-md shrink-0">
                  <Icon className="w-6 h-6 text-gold" />
                </div>
                <div>
                  <h3
                    className="font-serif text-xl text-black mb-2"
                    data-testid={`methodology-title-${index}`}
                  >
                    {item.title}
                  </h3>
                  <p
                    className="font-sans text-gray-700 leading-relaxed whitespace-pre-line"
                    data-testid={`methodology-content-${index}`}
                  >
                    {item.content}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

// Card component removed for minimalist layout
