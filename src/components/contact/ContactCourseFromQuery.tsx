"use client";

import { useEffect } from "react";

import type { UseFormReturn } from "react-hook-form";
import { useSearchParams } from "next/navigation";
import { ContactFormData } from "./Contact";

export function ContactCourseFromQuery({
  form,
}: {
  form: UseFormReturn<ContactFormData>;
}) {
  const searchParams = useSearchParams();
  useEffect(() => {
    const course = searchParams.get("course");
    if (course) {
      form.setValue("course", course);
    }
  }, [searchParams]);

  return null;
}
