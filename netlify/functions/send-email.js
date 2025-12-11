// netlify/functions/send-email.js
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function handler(event) {
  // Only allow POST
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: "Method Not Allowed",
    };
  }

  try {
    const { name, email, message, phone, language, course } = JSON.parse(
      event.body || "{}"
    );

    if (!name || !email || !message) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Missing fields" }),
      };
    }

    // Send the email
    await resend.emails.send({
      from: "Website Contact <info.pianoatempo@gmail.com>",
      to: "info.pianoatempo@gmail.com", // <- put YOUR email here
      subject: "New contact form message",
      text: `
Name: ${name}
Email: ${email}
Language Preference: ${language}
Phone: ${phone || "N/A"}
course: ${course || "N/A"}
Message:
${message}
      `,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ ok: true }),
    };
  } catch (err) {
    console.error("Email error:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to send email" }),
    };
  }
}
