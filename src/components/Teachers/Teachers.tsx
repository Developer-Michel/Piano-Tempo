"use client";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { Reveal } from "../ui/Reveal";

export function Teachers() {
  const t = useTranslations("home.teachers");
  const teachers = t.raw("items") as {
    name: string;
    title: string;
    bio: string;
    background?: string[];
  }[];

  const teacherImages = ["/angelina.jpg", "/inessa.jpg"];

  return (
    <section
      id="teachers"
      className="py-24 bg-gray-50"
      data-testid="section-teachers"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2
            className="font-serif text-4xl md:text-5xl text-black mb-4"
            data-testid="text-teachers-title"
          >
            {t("title")}
          </h2>
          <p
            className="font-serif text-xl text-gold "
            data-testid="text-teachers-subtitle"
          >
            {t("subtitle")}
          </p>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-12">
          {teachers.map((teacher, index) => (
            <TeacherCard
              key={index}
              teacher={{ ...teacher, image: teacherImages[index] }}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function TeacherCard({
  teacher,
  index,
}: {
  teacher: {
    image: string;
    name: string;
    title: string;
    bio: string;
    background?: string[];
  };
  index: number;
}) {
  const t = useTranslations("home.teachers");
  const [isExpanded, setIsExpanded] = useState(false);
  const [showBackground, setShowBackground] = useState(false);
  const bioPreview = teacher.bio.split("\n\n")[0];

  return (
    <Reveal
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 + index * 0.2 }}
      className="bg-white rounded-md overflow-hidden shadow-sm"
      data-testid={`card-teacher-${index}`}
    >
      <div className="relative group overflow-hidden">
        <Reveal
          className="aspect-[3/4] overflow-hidden"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.4 }}
        >
          <img
            src={teacher.image}
            alt={teacher.name}
            className="w-full h-full object-cover transition-all duration-500"
          />
        </Reveal>
      </div>

      <div className="p-8">
        <h3
          className="font-serif text-2xl text-black mb-1"
          data-testid={`text-teacher-name-${index}`}
        >
          {teacher.name}
        </h3>
        <p
          className="font-sans text-gold mb-4"
          data-testid={`text-teacher-title-${index}`}
        >
          {teacher.title}
        </p>

        <div className="space-y-4">
          <div
            style={{ height: isExpanded ? "auto" : "100px" }}
            className="overflow-hidden"
          >
            <p
              className="font-sans text-gray-700 leading-relaxed whitespace-pre-line"
              data-testid={`text-teacher-bio-${index}`}
            >
              {isExpanded ? teacher.bio : bioPreview}
            </p>
            {teacher.background?.length ? (
              <div className="border-t border-gray-100 pt-4">
                <Button
                  variant="ghost"
                  onClick={() => setShowBackground((prev) => !prev)}
                  className="text-gold hover:text-gold-dark hover:bg-gold/10 p-0 h-auto font-sans flex items-center"
                  data-testid={`button-teacher-background-${index}`}
                >
                  {showBackground ? t("backgroundHide") : t("backgroundShow")}
                  {showBackground ? (
                    <ChevronUp className="ml-1 w-4 h-4" />
                  ) : (
                    <ChevronDown className="ml-1 w-4 h-4" />
                  )}
                </Button>

                {showBackground && (
                  <ul
                    className="mt-3 space-y-2 list-disc list-inside text-gray-700"
                    data-testid={`list-teacher-background-${index}`}
                  >
                    {teacher.background.map((item, bgIndex) => (
                      <li
                        key={bgIndex}
                        className="font-sans text-sm leading-relaxed"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ) : null}
          </div>

          <Button
            variant="ghost"
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-gold hover:text-gold-dark hover:bg-gold/10 p-0 h-auto font-sans"
            data-testid={`button-teacher-expand-${index}`}
          >
            {isExpanded ? (
              <>
                {t("readLess")} <ChevronUp className="ml-1 w-4 h-4" />
              </>
            ) : (
              <>
                {t("readMore")} <ChevronDown className="ml-1 w-4 h-4" />
              </>
            )}
          </Button>
        </div>
      </div>
    </Reveal>
  );
}
