import nodemailer from "nodemailer";
import type { StoredApplication } from "@/lib/applications";
import { companyInbox } from "@/lib/inbox";

export type MailDelivery = {
  emailed: boolean;
  inbox: string;
  emailError: string;
};

function mailConfig() {
  const host = process.env.SMTP_HOST?.trim() ?? "";
  const user = process.env.SMTP_USER?.trim() ?? "";
  const pass = process.env.SMTP_PASSWORD ?? "";
  const port = Number(process.env.SMTP_PORT || 587);
  const from = process.env.SMTP_FROM?.trim() || user || companyInbox;
  return { host, user, pass, port, from, ready: Boolean(host && user && pass && Number.isFinite(port)) };
}

export function mailboxReady() {
  return mailConfig().ready;
}

export async function sendApplicationEmail(application: StoredApplication): Promise<MailDelivery> {
  const config = mailConfig();
  if (!config.ready) {
    return {
      emailed: false,
      inbox: companyInbox,
      emailError: `Saved on the server. The mailbox for ${companyInbox} is not connected yet.`,
    };
  }

  const transporter = nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.port === 465,
    auth: { user: config.user, pass: config.pass },
  });

  await transporter.sendMail({
    from: config.from,
    to: companyInbox,
    replyTo: application.email,
    subject: `Application for ${application.role}: ${application.name}`,
    text: [
      "A careers application was saved on Zelouth.",
      "",
      `Role: ${application.role}`,
      `Team: ${application.team}`,
      `Name: ${application.name}`,
      `Email: ${application.email}`,
      `City: ${application.place || "—"}`,
      `Note: ${application.note || "—"}`,
      "",
      `File: ${application.file}`,
    ].join("\n"),
  });

  return { emailed: true, inbox: companyInbox, emailError: "" };
}
