"use client";
import { useState, useEffect, useRef } from "react";
import { useLocale, useTranslations } from "next-intl";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TestimonialItem {
  quote: string;
  rating: string;
  author: string;
  child: string;
}

type GooglePlaceReview = {
  authorAttribution?: {
    displayName?: string;
    uri: string;
    photoUri?: string;
  };
  name?: string;
  relativePublishTimeDescription?: string;
  rating?: number;
  text?: {
    text?: string;
    languageCode?: string;
  };
};

interface GoogleReviewsResponse {
  configured: boolean;
  rating?: number;
  ratingCount?: number;
  reviews: GooglePlaceReview[];
}

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const locale = useLocale();
  const t = useTranslations("home.testimonials");
  const fallbackTestimonials = t.raw("items") as TestimonialItem[];
  const [testimonials, setTestimonials] =
    useState<TestimonialItem[]>(fallbackTestimonials);
  const [data, setData] = useState<GoogleReviewsResponse>();
  useEffect(() => {
    let cancelled = false;

    const loadGoogleReviews = async () => {
      try {
        const response = await fetch(`/api/google-reviews?lang=${locale}`);
        if (!response.ok) return;

        const data = (await response.json()) as GoogleReviewsResponse;
        if (!data.configured || data.reviews.length === 0 || cancelled) return;

        const sourceLabel = locale === "fr" ? "Avis Google" : "Google Review";
        setData(data);
        setTestimonials(
          data.reviews.map((review) => ({
            quote: review.text?.text ?? "",
            rating: review.rating ? `${review.rating}` : "N/A",
            author: review.authorAttribution?.displayName ?? "",
            child: review.relativePublishTimeDescription
              ? `${sourceLabel} - ${review.relativePublishTimeDescription}`
              : sourceLabel,
          })),
        );
      } catch {
        // Keep locale-based fallback testimonials when Google API is unavailable.
      }
    };

    loadGoogleReviews();

    return () => {
      cancelled = true;
    };
  }, [locale]);
  useEffect(() => {
    if (currentIndex > testimonials.length - 1) {
      setCurrentIndex(0);
    }
  }, [currentIndex, testimonials.length]);

  useEffect(() => {
    if (testimonials.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 10000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  const goToPrev = () => {
    if (testimonials.length === 0) return;

    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length,
    );
  };

  const goToNext = () => {
    if (testimonials.length === 0) return;

    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="py-24 bg-black"
      data-testid="section-testimonials"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2
            className="font-serif text-4xl md:text-5xl text-white mb-4"
            data-testid="text-testimonials-title"
          >
            {t("title")}
          </h2>
          <p
            className="font-serif text-xl text-gold "
            data-testid="text-testimonials-subtitle"
          >
            {t("subtitle")}
          </p>
          <p
            className="font-serif text-xl text-gold "
            data-testid="text-testimonials-subtitle"
          >
            {t("reviews", {
              rating: data?.rating ? data.rating.toFixed(1) : "N/A",
              count: data?.ratingCount ?? 0,
            })}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative"
        >
          <Quote className="absolute -top-4 -left-4 w-16 h-16 text-gold/20" />

          <div className="h-[320px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="text-center px-8 h-full flex flex-col justify-center"
              >
                <p
                  className="font-serif text-sm md:text-lg text-white/90 leading-relaxed mb-8 max-h-[170px] overflow-y-auto pr-2 [scrollbar-width:thin] [scrollbar-color:rgba(212,175,55,0.55)_rgba(255,255,255,0.08)] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-white/10 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gold/60 [&::-webkit-scrollbar-thumb]:border [&::-webkit-scrollbar-thumb]:border-black [&::-webkit-scrollbar-thumb:hover]:bg-gold/80"
                  data-testid={`text-testimonial-quote-${currentIndex}`}
                >
                  "{testimonials[currentIndex].quote}"
                </p>
                <div>
                  <p
                    className="font-sans text-gold font-medium"
                    data-testid={`text-testimonial-author-${currentIndex}`}
                  >
                    {testimonials[currentIndex].author}
                  </p>
                  <p
                    className="font-sans text-white/60 text-sm"
                    data-testid={`text-testimonial-child-${currentIndex}`}
                  >
                    {testimonials[currentIndex].rating} ⭐
                  </p>
                  <p
                    className="font-sans text-white/60 text-sm"
                    data-testid={`text-testimonial-child-${currentIndex}`}
                  >
                    {testimonials[currentIndex].child}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex items-center justify-center gap-4 mt-8">
            <Button
              variant="ghost"
              size="icon"
              onClick={goToPrev}
              className="text-white/70 hover:text-gold hover:bg-white/10"
              data-testid="button-testimonial-prev"
              aria-label="back"
            >
              <ChevronLeft className="w-6 h-6" />
            </Button>

            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? "bg-gold w-6"
                      : "bg-white/30 hover:bg-white/50"
                  }`}
                  data-testid={`button-testimonial-dot-${index}`}
                  aria-label="selection testimonial"
                />
              ))}
            </div>

            <Button
              variant="ghost"
              size="icon"
              onClick={goToNext}
              className="text-white/70 hover:text-gold hover:bg-white/10"
              data-testid="button-testimonial-next"
              aria-label="next"
            >
              <ChevronRight className="w-6 h-6" />
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
