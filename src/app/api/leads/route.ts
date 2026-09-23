import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

type DayKey =
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"
  | "sunday";

const timeRangeSchema = z.object({
  from: z.string().min(1),
  to: z.string().min(1),
});

const daySchema = z
  .object({
    available: z.boolean(),
    ranges: z.array(timeRangeSchema),
  })
  .refine((day) => !day.available || day.ranges.length > 0, {
    message: "Available days must include at least one range",
  });

const leadBodySchema = z.object({
  email: z.string().email(),
  parentName: z.string().optional(),
  phoneNumber: z.string().optional(),
  language: z.string().min(1),
  startSessionInterest: z.string().min(1),
  children: z
    .array(
      z.object({
        studentName: z.string().min(1),
        studentAge: z.string().min(1),
        lessonType: z.string().min(1),
        lessonLength: z.string().min(1),
        notes: z.string().min(1),
        availability: z.object({
          monday: daySchema,
          tuesday: daySchema,
          wednesday: daySchema,
          thursday: daySchema,
          friday: daySchema,
          saturday: daySchema,
          sunday: daySchema,
        }),
      }),
    )
    .min(1),
});

function normalizeAvailability(
  availability: Record<
    DayKey,
    { available: boolean; ranges: { from: string; to: string }[] }
  >,
) {
  return dayOrder.reduce(
    (acc, day) => {
      acc[day] = {
        available: availability[day].available,
        ranges: availability[day].available ? availability[day].ranges : [],
      };
      return acc;
    },
    {} as Record<
      DayKey,
      { available: boolean; ranges: { from: string; to: string }[] }
    >,
  );
}

function formatAvailabilityForEmail(
  availability: Record<
    DayKey,
    { available: boolean; ranges: { from: string; to: string }[] }
  >,
) {
  return dayOrder
    .map((day) => {
      const dayValue = availability[day];
      if (!dayValue.available) {
        return `${day}: unavailable`;
      }

      const ranges = dayValue.ranges
        .map((range) => `${range.from} - ${range.to}`)
        .join(", ");
      return `${day}: ${ranges}`;
    })
    .join("\n");
}

function formatSessionValue(value: string) {
  if (value === "earliest") {
    return "earliest";
  }

  const [season, year] = value.split("-");
  if (!season || !year) {
    return value;
  }

  return `${season} ${year}`;
}

const dayOrder: DayKey[] = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];

export async function POST(request: Request) {
  const resendApiKey = process.env.RESEND_API_KEY;
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceRoleKey) {
    return NextResponse.json(
      {
        error:
          "Supabase config missing. Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.",
      },
      { status: 500 },
    );
  }

  let parsed;
  try {
    const body = await request.json();
    parsed = leadBodySchema.parse(body);
  } catch {
    return NextResponse.json(
      { error: "Invalid lead payload" },
      { status: 400 },
    );
  }

  const parentName = parsed.parentName?.trim() || null;
  const phoneNumber = parsed.phoneNumber?.trim() || null;
  const language = parsed.language.trim();

  const rows = parsed.children.map((student) => ({
    email: parsed.email,
    language,
    student_name: student.studentName,
    student_age: student.studentAge,
    lesson_type: student.lessonType,
    lesson_length: student.lessonLength,
    notes: student.notes,
    parent_name: parentName,
    phone_number: phoneNumber,
    start_session_interest: parsed.startSessionInterest,
    availabilitiy: normalizeAvailability(student.availability),
  }));

  try {
    const response = await fetch(`${supabaseUrl}/rest/v1/Leads`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: supabaseServiceRoleKey,
        Authorization: `Bearer ${supabaseServiceRoleKey}`,
        Prefer: "return=minimal",
      },
      body: JSON.stringify(rows),
    });

    if (!response.ok) {
      const details = await response.text();
      return NextResponse.json(
        { error: "Failed to insert leads", details },
        { status: 500 },
      );
    }

    let emailSent = false;
    if (resendApiKey) {
      try {
        const resend = new Resend(resendApiKey);

        const studentsText = parsed.children
          .map((student, index) => {
            const availabilityText = formatAvailabilityForEmail(
              normalizeAvailability(student.availability),
            );

            return [
              `Student #${index + 1}`,
              `Name: ${student.studentName}`,
              `Age: ${student.studentAge}`,
              `Lesson Type: ${student.lessonType}`,
              `Lesson Length: ${student.lessonLength}`,
              `Notes: ${student.notes}`,
              "Availability:",
              availabilityText,
            ].join("\n");
          })
          .join("\n\n------------------------------\n\n");

        await resend.emails.send({
          from: "Website Leads <noreply@pianoatempo.ca>",
          to: "info.pianoatempo@gmail.com",
          subject: `New lesson inquiry (${parsed.children.length} student${parsed.children.length > 1 ? "s" : ""})`,
          text: [
            "A new lesson inquiry was submitted:",
            "",
            `Email: ${parsed.email}`,
            `Phone: ${phoneNumber ?? "N/A"}`,
            `Parent Name: ${parentName ?? "N/A"}`,
            `Preferred Language: ${language}`,
            `Preferred Start: ${formatSessionValue(parsed.startSessionInterest)}`,
            "",
            studentsText,
          ].join("\n"),
        });

        emailSent = true;
      } catch (emailError) {
        console.error("Lead email notification failed", emailError);
      }
    }

    return NextResponse.json({ ok: true, emailSent });
  } catch (error) {
    console.error("Lead insert error", error);
    return NextResponse.json({ error: "Failed to save lead" }, { status: 500 });
  }
}
