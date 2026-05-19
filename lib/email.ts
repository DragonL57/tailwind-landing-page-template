import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);

export type SendEmailParams = {
  to: string | string[];
  subject: string;
  html: string;
  text?: string;
  from?: string;
  cc?: string | string[];
  bcc?: string | string[];
  replyTo?: string | string[];
  scheduledAt?: string;
  attachments?: { filename: string; content: Buffer | string }[];
  tags?: { name: string; value: string }[];
};

export async function sendEmail(params: SendEmailParams) {
  const {
    to,
    subject,
    html,
    text,
    from = "VMG Education <noreply@vmg-tesol.edu.vn>",
    cc,
    bcc,
    replyTo,
    scheduledAt,
    attachments,
    tags,
  } = params;

  const { data, error } = await resend.emails.send({
    from,
    to,
    subject,
    html,
    text,
    cc,
    bcc,
    replyTo,
    scheduledAt,
    attachments,
    tags,
  });

  if (error) {
    console.error("[Email] Failed to send:", error);
    throw new Error(error.message);
  }

  return data;
}