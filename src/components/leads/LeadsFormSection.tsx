"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { motion, useInView } from "framer-motion";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  CheckCircle,
  Clock,
  Loader2,
  Mail,
  MapPin,
  Plus,
  Trash2,
} from "lucide-react";

import { getPublicEnv } from "@/lib/env";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MapEmbedOnView } from "@/components/contact/GoogleMap";

type DayKey =
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"
  | "sunday";

type TimeRange = {
  from: string;
  to: string;
};

type DayAvailability = {
  available: boolean;
  ranges: TimeRange[];
};

type SessionOption = {
  value: string;
  label: string;
};

const dayKeys: DayKey[] = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];

const defaultRange: TimeRange = {
  from: "4:00 PM",
  to: "6:00 PM",
};

const dayAvailabilitySchema = z
  .object({
    available: z.boolean(),
    ranges: z
      .array(
        z.object({
          from: z.string().min(1),
          to: z.string().min(1),
        }),
      )
      .default([]),
  })
  .refine((value) => !value.available || value.ranges.length > 0, {
    message: "Add at least one time range for available days",
    path: ["ranges"],
  });

const childSchema = z.object({
  studentName: z.string().trim().min(2, "Student name is required"),
  studentAge: z.string().trim().min(1, "Student age is required"),
  lessonType: z.string().trim().min(1, "Lesson type is required"),
  lessonLength: z.string().trim().min(1, "Lesson length is required"),
  notes: z.string().trim().min(1, "Notes are required"),
  availability: z.object({
    monday: dayAvailabilitySchema,
    tuesday: dayAvailabilitySchema,
    wednesday: dayAvailabilitySchema,
    thursday: dayAvailabilitySchema,
    friday: dayAvailabilitySchema,
    saturday: dayAvailabilitySchema,
    sunday: dayAvailabilitySchema,
  }),
});

const leadsSchema = z.object({
  email: z.string().email("Valid email required"),
  parentName: z.string().trim().optional(),
  phoneNumber: z.string().trim().optional(),
  language: z.string().trim().min(1, "Preferred language is required"),
  startSessionInterest: z.string().trim().min(1, "Start date is required"),
  children: z.array(childSchema).min(1, "At least one student is required"),
});

export type LeadsFormData = z.infer<typeof leadsSchema>;

function buildTimeOptions() {
  const options: string[] = [];
  for (let hour = 7; hour <= 21; hour += 1) {
    for (const minute of [0, 30]) {
      if (hour === 21 && minute === 30) {
        continue;
      }
      const period = hour >= 12 ? "PM" : "AM";
      const hour12 = hour % 12 === 0 ? 12 : hour % 12;
      const minuteText = minute === 0 ? "00" : "30";
      options.push(`${hour12}:${minuteText} ${period}`);
    }
  }
  return options;
}

const timeOptions = buildTimeOptions();
const timeOptionOrder = new Map(
  timeOptions.map((time, index) => [time, index]),
);

function isTimeAfter(left: string, right: string) {
  const leftIndex = timeOptionOrder.get(left) ?? -1;
  const rightIndex = timeOptionOrder.get(right) ?? -1;
  return leftIndex > rightIndex;
}

function makeDefaultAvailability() {
  return dayKeys.reduce(
    (acc, day) => {
      acc[day] = {
        available: false,
        ranges: [{ ...defaultRange }],
      };
      return acc;
    },
    {} as Record<DayKey, DayAvailability>,
  );
}

function buildUpcomingSessionOptions(
  locale: string,
  now = new Date(),
): SessionOption[] {
  const month = now.getMonth();
  const year = now.getFullYear();

  let firstSession: { season: "winter" | "summer"; year: number };
  let secondSession: { season: "winter" | "summer"; year: number };

  if (month <= 5) {
    // Jan-Jun: currently in winter session
    firstSession = { season: "summer", year };
    secondSession = { season: "winter", year: year + 1 };
  } else if (month <= 7) {
    // Jul-Aug: between sessions
    firstSession = { season: "summer", year };
    secondSession = { season: "winter", year: year + 1 };
  } else {
    // Sep-Dec: currently in summer session
    firstSession = { season: "winter", year: year + 1 };
    secondSession = { season: "summer", year: year + 1 };
  }

  const toLabel = (session: { season: "winter" | "summer"; year: number }) => {
    if (locale === "fr") {
      return session.season === "winter"
        ? `Hiver ${session.year} (janvier à juin)`
        : `Été ${session.year} (septembre à décembre)`;
    }

    return session.season === "winter"
      ? `Winter ${session.year} (January to June)`
      : `Summer ${session.year} (September to December)`;
  };

  return [firstSession, secondSession].map((session) => ({
    value: `${session.season}-${session.year}`,
    label: toLabel(session),
  }));
}

export function LeadsFormSection({
  compact = false,
  showContactPanel = true,
}: {
  compact?: boolean;
  showContactPanel?: boolean;
}) {
  const lang = useLocale();
  const t = useTranslations("leads");
  const tPrograms = useTranslations("home.programs");
  const searchParams = useSearchParams();
  const { toast } = useToast();

  const sectionRef = useRef<HTMLElement | null>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const form = useForm<LeadsFormData>({
    resolver: zodResolver(leadsSchema),
    defaultValues: {
      email: "",
      parentName: "",
      phoneNumber: "",
      language: lang,
      startSessionInterest: "",
      children: [
        {
          studentName: "",
          studentAge: "",
          lessonType: "",
          lessonLength: "",
          notes: "",
          availability: makeDefaultAvailability(),
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "children",
  });

  useEffect(() => {
    const course = searchParams.get("course");
    if (!course) {
      return;
    }

    const firstType = form.getValues("children.0.lessonType");
    if (!firstType) {
      form.setValue("children.0.lessonType", course, {
        shouldDirty: true,
        shouldValidate: true,
      });
    }
  }, [form, searchParams]);

  const contactInfo = useMemo(
    () => [
      {
        icon: MapPin,
        label: t("info.address"),
        value: getPublicEnv("NEXT_PUBLIC_ADDRESS"),
      },
      {
        icon: Mail,
        label: t("info.email"),
        value: getPublicEnv("NEXT_PUBLIC_EMAIL"),
      },
      {
        icon: Clock,
        label: t("info.hours"),
        value: t("info.hoursDetail"),
      },
    ],
    [t],
  );

  const upcomingSessionOptions = useMemo(
    () => buildUpcomingSessionOptions(lang),
    [lang],
  );

  const addRange = (studentIndex: number, day: DayKey) => {
    const dayValue = form.getValues(
      `children.${studentIndex}.availability.${day}`,
    );
    form.setValue(
      `children.${studentIndex}.availability.${day}.ranges`,
      [...dayValue.ranges, { ...defaultRange }],
      { shouldDirty: true },
    );
  };

  const removeRange = (studentIndex: number, day: DayKey, index: number) => {
    const dayValue = form.getValues(
      `children.${studentIndex}.availability.${day}`,
    );
    const nextRanges = dayValue.ranges.filter((_, i) => i !== index);
    form.setValue(
      `children.${studentIndex}.availability.${day}.ranges`,
      nextRanges,
      {
        shouldDirty: true,
        shouldValidate: true,
      },
    );
  };

  const onSubmit = async (values: LeadsFormData) => {
    setStatus("loading");

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error("Failed to submit lead");
      }

      setStatus("success");
      form.reset({
        email: "",
        parentName: "",
        phoneNumber: "",
        language: lang,
        startSessionInterest: "",
        children: [
          {
            studentName: "",
            studentAge: "",
            lessonType: "",
            lessonLength: "",
            notes: "",
            availability: makeDefaultAvailability(),
          },
        ],
      });

      toast({
        title: t("toast.successTitle"),
        description: t("toast.successDescription"),
      });
    } catch {
      setStatus("error");
      toast({
        title: t("toast.errorTitle"),
        description: t("toast.errorDescription"),
        variant: "destructive",
      });
    } finally {
      setStatus((prev) => (prev === "success" ? "success" : "idle"));
    }
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className={["bg-gray-50", compact ? "py-10" : "py-24"].join(" ")}
      data-testid="section-leads"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="font-serif text-4xl md:text-5xl text-black mb-4">
            {t("title")}
          </h1>
          <p className="font-serif text-xl text-gold">{t("subtitle")}</p>
        </motion.div>

        <div
          className={[
            "grid gap-12",
            showContactPanel ? "lg:grid-cols-2" : "lg:grid-cols-1",
          ].join(" ")}
        >
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15 }}
          >
            <Card className="p-6 md:p-8 bg-white">
              {status === "success" ? (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <CheckCircle className="w-14 h-14 text-green-500 mb-4" />
                  <p className="font-sans text-lg text-gray-800">
                    {t("form.success")}
                  </p>
                </div>
              ) : (
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                  >
                    <div className="grid md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{t("form.email")}</FormLabel>
                            <FormControl>
                              <Input {...field} type="email" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="phoneNumber"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{t("form.phone")}</FormLabel>
                            <FormControl>
                              <Input {...field} type="tel" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="parentName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t("form.parentName")}</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="language"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t("form.language")}</FormLabel>
                          <FormControl>
                            <Select
                              value={field.value}
                              onValueChange={field.onChange}
                            >
                              <SelectTrigger>
                                <SelectValue
                                  placeholder={t("form.languagePlaceholder")}
                                />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="fr">
                                  {t("form.languageOptions.fr")}
                                </SelectItem>
                                <SelectItem value="en">
                                  {t("form.languageOptions.en")}
                                </SelectItem>
                                <SelectItem value="none">
                                  {t("form.languageOptions.none")}
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="startSessionInterest"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            {t("form.startSessionInterest")}
                          </FormLabel>
                          <FormControl>
                            <Select
                              value={field.value}
                              onValueChange={field.onChange}
                            >
                              <SelectTrigger>
                                <SelectValue
                                  placeholder={t(
                                    "form.startSessionPlaceholder",
                                  )}
                                />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="earliest">
                                  {t("form.startSessionOptions.earliest")}
                                </SelectItem>
                                {upcomingSessionOptions.map((option) => (
                                  <SelectItem
                                    key={option.value}
                                    value={option.value}
                                  >
                                    {option.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h2 className="font-serif text-2xl text-black">
                          {t("students.title")}
                        </h2>
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() =>
                            append({
                              studentName: "",
                              studentAge: "",
                              lessonType: "",
                              lessonLength: "",
                              notes: "",
                              availability: makeDefaultAvailability(),
                            })
                          }
                        >
                          <Plus className="w-4 h-4 mr-2" />
                          {t("students.add")}
                        </Button>
                      </div>

                      {fields.map((field, index) => (
                        <Card
                          key={field.id}
                          className="p-4 border border-gray-200"
                        >
                          <div className="flex items-center justify-between mb-4">
                            <h3 className="font-sans font-semibold text-gray-800">
                              {t("students.studentLabel", {
                                number: index + 1,
                              })}
                            </h3>
                            {fields.length > 1 ? (
                              <Button
                                type="button"
                                variant="ghost"
                                className="text-red-600 hover:text-red-700"
                                onClick={() => remove(index)}
                              >
                                <Trash2 className="w-4 h-4 mr-2" />
                                {t("students.remove")}
                              </Button>
                            ) : null}
                          </div>

                          <div className="grid md:grid-cols-2 gap-4">
                            <FormField
                              control={form.control}
                              name={`children.${index}.studentName`}
                              render={({ field: childField }) => (
                                <FormItem>
                                  <FormLabel>{t("students.name")}</FormLabel>
                                  <FormControl>
                                    <Input {...childField} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name={`children.${index}.studentAge`}
                              render={({ field: childField }) => (
                                <FormItem>
                                  <FormLabel>{t("students.age")}</FormLabel>
                                  <FormControl>
                                    <Input {...childField} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name={`children.${index}.lessonType`}
                              render={({ field: childField }) => (
                                <FormItem>
                                  <FormLabel>
                                    {t("students.lessonType")}
                                  </FormLabel>
                                  <Select
                                    value={childField.value}
                                    onValueChange={childField.onChange}
                                  >
                                    <FormControl>
                                      <SelectTrigger>
                                        <SelectValue
                                          placeholder={t(
                                            "students.lessonTypePlaceholder",
                                          )}
                                        />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      <SelectItem
                                        value={tPrograms("private.title")}
                                      >
                                        {tPrograms("private.title")}
                                      </SelectItem>
                                      {tPrograms
                                        .raw("groups.items")
                                        .map((item: string, idx: number) => (
                                          <SelectItem
                                            value={item}
                                            key={`${item}-${idx}`}
                                          >
                                            {item}
                                          </SelectItem>
                                        ))}
                                    </SelectContent>
                                  </Select>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name={`children.${index}.lessonLength`}
                              render={({ field: childField }) => (
                                <FormItem>
                                  <FormLabel>
                                    {t("students.lessonLength")}
                                  </FormLabel>
                                  <Select
                                    value={childField.value}
                                    onValueChange={childField.onChange}
                                  >
                                    <FormControl>
                                      <SelectTrigger>
                                        <SelectValue
                                          placeholder={t(
                                            "students.lessonLengthPlaceholder",
                                          )}
                                        />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      <SelectItem value="30">30 min</SelectItem>
                                      <SelectItem value="45">45 min</SelectItem>
                                      <SelectItem value="60">60 min</SelectItem>
                                    </SelectContent>
                                  </Select>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>

                          <FormField
                            control={form.control}
                            name={`children.${index}.notes`}
                            render={({ field: childField }) => (
                              <FormItem className="mt-4">
                                <FormLabel>{t("students.notes")}</FormLabel>
                                <FormControl>
                                  <Textarea
                                    {...childField}
                                    rows={3}
                                    className="resize-none"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <div className="space-y-4 mt-6">
                            <h4 className="font-serif text-xl text-black">
                              {t("availability.title")}
                            </h4>
                            <p className="font-sans text-sm text-gray-600">
                              {t("availability.subtitle")}
                            </p>
                            <p className="font-sans text-sm text-gray-600 italic">
                              {t("availability.note")}
                            </p>

                            {dayKeys.map((day) => {
                              const dayValue = form.watch(
                                `children.${index}.availability.${day}`,
                              );

                              return (
                                <Card
                                  key={`${field.id}-${day}`}
                                  className="p-4 border border-gray-200"
                                >
                                  <div className="flex flex-wrap items-center justify-between gap-3">
                                    <span className="font-sans font-semibold text-gray-900">
                                      {t(`availability.days.${day}`)}
                                    </span>

                                    <div className="flex items-center gap-3">
                                      <Button
                                        type="button"
                                        variant={
                                          dayValue.available
                                            ? "default"
                                            : "outline"
                                        }
                                        className={
                                          dayValue.available
                                            ? "bg-black text-white"
                                            : ""
                                        }
                                        onClick={() =>
                                          form.setValue(
                                            `children.${index}.availability.${day}.available`,
                                            true,
                                            {
                                              shouldDirty: true,
                                              shouldValidate: true,
                                            },
                                          )
                                        }
                                      >
                                        <span className="mr-2 h-2 w-2 rounded-full bg-current" />
                                        {t("availability.available")}
                                      </Button>
                                      <Button
                                        type="button"
                                        variant={
                                          !dayValue.available
                                            ? "default"
                                            : "outline"
                                        }
                                        className={
                                          !dayValue.available
                                            ? "bg-gray-700 text-white"
                                            : ""
                                        }
                                        onClick={() =>
                                          form.setValue(
                                            `children.${index}.availability.${day}.available`,
                                            false,
                                            {
                                              shouldDirty: true,
                                              shouldValidate: true,
                                            },
                                          )
                                        }
                                      >
                                        <span className="mr-2 h-2 w-2 rounded-full border border-current" />
                                        {t("availability.unavailable")}
                                      </Button>
                                    </div>
                                  </div>

                                  {dayValue.available ? (
                                    <div className="mt-4 space-y-4">
                                      {dayValue.ranges.map((_, rangeIdx) => (
                                        <div
                                          key={`${field.id}-${day}-${rangeIdx}`}
                                          className="grid md:grid-cols-[1fr_1fr_auto] gap-3 items-end"
                                        >
                                          <FormField
                                            control={form.control}
                                            name={`children.${index}.availability.${day}.ranges.${rangeIdx}.from`}
                                            render={({ field }) => (
                                              <FormItem>
                                                <FormLabel>
                                                  {t("availability.from")}
                                                </FormLabel>
                                                <Select
                                                  value={field.value}
                                                  onValueChange={(nextFrom) => {
                                                    field.onChange(nextFrom);
                                                    const toPath =
                                                      `children.${index}.availability.${day}.ranges.${rangeIdx}.to` as const;
                                                    const currentTo =
                                                      form.getValues(toPath);

                                                    if (
                                                      isTimeAfter(
                                                        nextFrom,
                                                        currentTo,
                                                      )
                                                    ) {
                                                      form.setValue(
                                                        toPath,
                                                        nextFrom,
                                                        {
                                                          shouldDirty: true,
                                                          shouldValidate: true,
                                                        },
                                                      );
                                                    }
                                                  }}
                                                >
                                                  <FormControl>
                                                    <SelectTrigger>
                                                      <SelectValue />
                                                    </SelectTrigger>
                                                  </FormControl>
                                                  <SelectContent>
                                                    {timeOptions.map((time) => (
                                                      <SelectItem
                                                        value={time}
                                                        key={`${day}-from-${time}`}
                                                      >
                                                        {time}
                                                      </SelectItem>
                                                    ))}
                                                  </SelectContent>
                                                </Select>
                                                <FormMessage />
                                              </FormItem>
                                            )}
                                          />

                                          <FormField
                                            control={form.control}
                                            name={`children.${index}.availability.${day}.ranges.${rangeIdx}.to`}
                                            render={({ field }) => (
                                              <FormItem>
                                                <FormLabel>
                                                  {t("availability.to")}
                                                </FormLabel>
                                                <Select
                                                  value={field.value}
                                                  onValueChange={(nextTo) => {
                                                    field.onChange(nextTo);
                                                    const fromPath =
                                                      `children.${index}.availability.${day}.ranges.${rangeIdx}.from` as const;
                                                    const currentFrom =
                                                      form.getValues(fromPath);

                                                    if (
                                                      isTimeAfter(
                                                        currentFrom,
                                                        nextTo,
                                                      )
                                                    ) {
                                                      form.setValue(
                                                        fromPath,
                                                        nextTo,
                                                        {
                                                          shouldDirty: true,
                                                          shouldValidate: true,
                                                        },
                                                      );
                                                    }
                                                  }}
                                                >
                                                  <FormControl>
                                                    <SelectTrigger>
                                                      <SelectValue />
                                                    </SelectTrigger>
                                                  </FormControl>
                                                  <SelectContent>
                                                    {timeOptions.map((time) => (
                                                      <SelectItem
                                                        value={time}
                                                        key={`${day}-to-${time}`}
                                                      >
                                                        {time}
                                                      </SelectItem>
                                                    ))}
                                                  </SelectContent>
                                                </Select>
                                                <FormMessage />
                                              </FormItem>
                                            )}
                                          />

                                          <Button
                                            type="button"
                                            variant="outline"
                                            onClick={() =>
                                              removeRange(index, day, rangeIdx)
                                            }
                                            disabled={
                                              dayValue.ranges.length === 1
                                            }
                                          >
                                            <Trash2 className="w-4 h-4" />
                                          </Button>
                                        </div>
                                      ))}

                                      <Button
                                        type="button"
                                        variant="ghost"
                                        onClick={() => addRange(index, day)}
                                      >
                                        <Plus className="w-4 h-4 mr-2" />
                                        {t("availability.addRange")}
                                      </Button>
                                    </div>
                                  ) : null}
                                </Card>
                              );
                            })}
                          </div>
                        </Card>
                      ))}
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-gold hover:bg-gold-dark text-white"
                      disabled={status === "loading"}
                    >
                      {status === "loading" ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          {t("form.submitting")}
                        </>
                      ) : (
                        t("form.submit")
                      )}
                    </Button>
                  </form>
                </Form>
              )}
            </Card>
          </motion.div>

          {showContactPanel ? (
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="space-y-8"
            >
              {contactInfo.map((info, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="w-12 h-12 flex items-center justify-center bg-gold/10 rounded-md shrink-0">
                    <info.icon className="w-6 h-6 text-gold" />
                  </div>
                  <div>
                    <h3 className="font-sans font-medium text-black mb-1">
                      {info.label}
                    </h3>
                    <p className="font-sans text-gray-600 whitespace-pre-line">
                      {info.value}
                    </p>
                  </div>
                </div>
              ))}

              <MapEmbedOnView />
            </motion.div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
