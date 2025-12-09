import { useState, useRef } from "react";
import { useLanguage } from "@/lib/language-context";
import { translations } from "@/lib/translations";
import { motion, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import teacher1Image from "@assets/stock_images/angelina.jpg";
import teacher2Image from "@assets/stock_images/professional_male_pi_2b0ebdfb.jpg";

export function Teachers() {
  const { language } = useLanguage();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const teachers = [
    {
      image: teacher1Image,
      name: translations.teachers.teacher1.name,
      title: translations.teachers.teacher1.title[language],
      bio: translations.teachers.teacher1.bio[language],
    },
    {
      image: teacher2Image,
      name: translations.teachers.teacher2.name,
      title: translations.teachers.teacher2.title[language],
      bio: translations.teachers.teacher2.bio[language],
    },
  ];

  return (
    <section
      id="teachers"
      ref={sectionRef}
      className="py-24 bg-gray-50"
      data-testid="section-teachers"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2
            className="font-serif text-4xl md:text-5xl text-black mb-4"
            data-testid="text-teachers-title"
          >
            {translations.teachers.title[language]}
          </h2>
          <p
            className="font-serif text-xl text-gold italic"
            data-testid="text-teachers-subtitle"
          >
            {translations.teachers.subtitle[language]}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {teachers.map((teacher, index) => (
            <TeacherCard
              key={index}
              teacher={teacher}
              index={index}
              isInView={isInView}
              language={language}
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
  isInView,
  language,
}: {
  teacher: {
    image: string;
    name: string;
    title: string;
    bio: string;
  };
  index: number;
  isInView: boolean;
  language: "en" | "fr";
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const bioPreview = teacher.bio.split("\n\n")[0];

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: 0.2 + index * 0.2 }}
      className="bg-white rounded-md overflow-hidden shadow-sm"
      data-testid={`card-teacher-${index}`}
    >
      <div className="relative group overflow-hidden">
        <motion.div
          className="aspect-[3/4] overflow-hidden"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.4 }}
        >
          <img
            src={teacher.image}
            alt={teacher.name}
            className="w-full h-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0"
          />
          <div className="absolute inset-0 bg-gold/0 transition-all duration-500 group-hover:bg-gold/20" />
        </motion.div>
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
          <motion.div
            initial={false}
            animate={{ height: isExpanded ? "auto" : "100px" }}
            className="overflow-hidden"
          >
            <p
              className="font-sans text-gray-700 leading-relaxed whitespace-pre-line"
              data-testid={`text-teacher-bio-${index}`}
            >
              {isExpanded ? teacher.bio : bioPreview}
            </p>
          </motion.div>

          <Button
            variant="ghost"
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-gold hover:text-gold-dark hover:bg-gold/10 p-0 h-auto font-sans"
            data-testid={`button-teacher-expand-${index}`}
          >
            {isExpanded ? (
              <>
                {translations.teachers.readLess[language]}{" "}
                <ChevronUp className="ml-1 w-4 h-4" />
              </>
            ) : (
              <>
                {translations.teachers.readMore[language]}{" "}
                <ChevronDown className="ml-1 w-4 h-4" />
              </>
            )}
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
