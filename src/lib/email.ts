import { Resend } from "resend";
import { formatEventRange } from "@/lib/format";
import type { EventRecord } from "@/lib/types";

function getResend() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return null;
  return new Resend(apiKey);
}

export async function sendSignupConfirmation(options: {
  name: string;
  email: string;
  event: EventRecord;
}) {
  const resend = getResend();
  if (!resend) {
    return { sent: false, error: "Email is not configured." };
  }

  const from = process.env.EMAIL_FROM ?? "CAGH UTM <onboarding@resend.dev>";
  const when = formatEventRange(options.event.starts_at, options.event.ends_at);

  const { error } = await resend.emails.send({
    from,
    to: options.email,
    subject: `You're signed up for ${options.event.title}`,
    html: `
      <div style="font-family: Arial, Helvetica, sans-serif; color: #173b52; line-height: 1.6; max-width: 560px;">
        <p style="font-size: 12px; letter-spacing: .18em; text-transform: uppercase; color: #b07f22; font-weight: 700;">CAGH UTM</p>
        <h1 style="font-size: 28px; line-height: 1.1; color: #1b587d;">You're on the list, ${escapeHtml(options.name)}.</h1>
        <p>Thanks for signing up. Here are the event details:</p>
        <div style="border: 1px solid #dbe7ef; border-radius: 20px; padding: 20px; background: #f5fbfe;">
          <p style="margin: 0 0 8px; font-size: 12px; letter-spacing: .14em; text-transform: uppercase; color: #57a9d6; font-weight: 700;">${escapeHtml(options.event.tag)}</p>
          <h2 style="margin: 0 0 12px; font-size: 22px; color: #1b587d;">${escapeHtml(options.event.title)}</h2>
          <p style="margin: 0 0 8px;"><strong>When:</strong> ${escapeHtml(when)}</p>
          <p style="margin: 0 0 8px;"><strong>Where:</strong> ${escapeHtml(options.event.location)}</p>
          <p style="margin: 12px 0 0;">${escapeHtml(options.event.description)}</p>
        </div>
        <p style="margin-top: 24px; color: #48627a;">We look forward to seeing you there.</p>
      </div>
    `,
  });

  if (error) {
    return { sent: false, error: error.message };
  }

  return { sent: true };
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}
