"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import type { UseFormReturn } from "react-hook-form";
import { useNavScroll } from "@/hooks/use-nav";

type ContactFormData = {
  name: string;
  email: string;
  phone?: string;
  language: string;
  course?: string;
  message: string;
};

export function ContactCourseFromQuery({
  form,
}: {
  form: UseFormReturn<ContactFormData>;
}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const nav = useNavScroll();
  useEffect(() => {
    const course = searchParams.get("course");
    if (course) {
      form.setValue("course", course);
    }
  }, [searchParams]);

  return null;
}
