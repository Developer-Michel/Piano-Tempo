"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslations } from "next-intl";

type RegistrationType = "parents" | "adult" | "group";

const PARENTS_FORM_SCRIPT =
  "https://app.mymusicstaff.com/Widget/v4/Widget.ashx?settings=eyJTY2hvb2xJRCI6InNjaF9HNDRKRCIsIldlYnNpdGVJRCI6Indic190WTJKMCIsIldlYnNpdGVCbG9ja0lEIjoid2JiX3pjakdTSjcifQ==";

const ADULT_FORM_SCRIPT =
  "https://app.mymusicstaff.com/Widget/v4/Widget.ashx?settings=eyJTY2hvb2xJRCI6InNjaF9HNDRKRCIsIldlYnNpdGVJRCI6Indic190WTJKMCIsIldlYnNpdGVCbG9ja0lEIjoid2JiX3pjY0JOSlIifQ==";

const GROUP_FORM_SCRIPT =
  "https://app.mymusicstaff.com/Widget/v4/Widget.ashx?settings=eyJTY2hvb2xJRCI6InNjaF9HNDRKRCIsIldlYnNpdGVJRCI6Indic190WTJKMCIsIldlYnNpdGVCbG9ja0lEIjoid2JiX3pjbDRkSmoifQ==";

const WIDGET_CONTAINER_ID = "wbb_zccBNJR";

export default function Registration() {
  const t = useTranslations("registration");
  const [selectedType, setSelectedType] = useState<RegistrationType | null>(
    null,
  );
  const [isLoadingForm, setIsLoadingForm] = useState(false);
  const loadingTimerRef = useRef<number | null>(null);

  const scriptByType = useMemo(
    () => ({
      parents: PARENTS_FORM_SCRIPT,
      adult: ADULT_FORM_SCRIPT,
      group: GROUP_FORM_SCRIPT,
    }),
    [],
  );

  useEffect(() => {
    if (!selectedType) return;

    const container = document.getElementById(WIDGET_CONTAINER_ID);
    if (!container) return;

    container.innerHTML = "";

    const script = document.createElement("script");
    script.src = scriptByType[selectedType];
    script.async = true;
    container.appendChild(script);

    return () => {
      script.remove();
      container.innerHTML = "";
    };
  }, [scriptByType, selectedType]);

  useEffect(() => {
    return () => {
      if (loadingTimerRef.current) {
        window.clearTimeout(loadingTimerRef.current);
      }
    };
  }, []);

  const clearLoadingTimer = () => {
    if (!loadingTimerRef.current) return;
    window.clearTimeout(loadingTimerRef.current);
    loadingTimerRef.current = null;
  };

  const handleSelectType = (type: RegistrationType) => {
    setSelectedType(type);

    clearLoadingTimer();
    setIsLoadingForm(true);
    loadingTimerRef.current = window.setTimeout(() => {
      setIsLoadingForm(false);
      loadingTimerRef.current = null;
    }, 3000);
  };

  const handleBack = () => {
    clearLoadingTimer();
    setIsLoadingForm(false);
    setSelectedType(null);
  };

  if (!selectedType) {
    return (
      <main
        className="min-h-screen bg-white pt-36 pb-20"
        data-testid="page-registration"
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h1 className="font-serif text-4xl md:text-5xl text-black mb-4">
              {t("title")}
            </h1>
            <p className="font-sans text-gray-600">{t("subtitle")}</p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <button
              type="button"
              className="text-left rounded-xl border border-gray-200 p-6 hover:border-gold hover:shadow-md transition-all"
              onClick={() => handleSelectType("parents")}
              data-testid="registration-option-parents"
            >
              <h2 className="font-serif text-2xl text-black mb-2">
                {t("options.parents.title")}
              </h2>
              <p className="font-sans text-sm text-gray-600 mb-4">
                {t("options.parents.description")}
              </p>
              <span className="font-sans text-gold font-semibold">
                {t("options.parents.cta")}
              </span>
            </button>

            <button
              type="button"
              className="text-left rounded-xl border border-gray-200 p-6 hover:border-gold hover:shadow-md transition-all"
              onClick={() => handleSelectType("adult")}
              data-testid="registration-option-adult"
            >
              <h2 className="font-serif text-2xl text-black mb-2">
                {t("options.adult.title")}
              </h2>
              <p className="font-sans text-sm text-gray-600 mb-4">
                {t("options.adult.description")}
              </p>
              <span className="font-sans text-gold font-semibold">
                {t("options.adult.cta")}
              </span>
            </button>

            <button
              type="button"
              className="text-left rounded-xl border border-gray-200 p-6 hover:border-gold hover:shadow-md transition-all"
              onClick={() => handleSelectType("group")}
              data-testid="registration-option-group"
            >
              <h2 className="font-serif text-2xl text-black mb-2">
                {t("options.group.title")}
              </h2>
              <p className="font-sans text-sm text-gray-600 mb-4">
                {t("options.group.description")}
              </p>
              <span className="font-sans text-gold font-semibold">
                {t("options.group.cta")}
              </span>
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main
      className="min-h-screen bg-white pt-36 pb-20"
      data-testid="page-registration"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <h1 className="font-serif text-3xl md:text-4xl text-black">
            {t(`selected.${selectedType}`)}
          </h1>
          <button
            type="button"
            className="font-sans text-sm text-gold hover:text-gold/80 transition-colors"
            onClick={handleBack}
            data-testid="registration-back"
          >
            {t("back")}
          </button>
        </div>

        <div id={WIDGET_CONTAINER_ID} className="block" />
      </div>

      {isLoadingForm ? (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-white/75 backdrop-blur-sm">
          <div className="rounded-xl border border-gray-200 bg-white px-8 py-6 shadow-lg text-center">
            <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-gold" />
            <p className="font-serif text-xl text-black">
              {t("loading.title")}
            </p>
            <p className="mt-1 font-sans text-sm text-gray-600">
              {t("loading.subtitle")}
            </p>
          </div>
        </div>
      ) : null}
    </main>
  );
}
