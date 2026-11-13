import dns from "dns";
import nodemailer from "nodemailer";
import { readResume, type StoredApplication } from "@/lib/applications";
import { companyInbox } from "@/lib/inbox";

dns.setDefaultResultOrder("ipv4first");

export type MailDelivery = {
  emailed: boolean;
  inbox: string;
  emailError: string;
};

function mailConfig() {
  const host = process.env.SMTP_HOST?.trim() || "smtp.privateemail.com";
  const user = process.env.SMTP_USER?.trim() || companyInbox;
  const pass = process.env.SMTP_PASSWORD ?? "";
  const port = Number(process.env.SMTP_PORT || 465);
  const from = process.env.SMTP_FROM?.trim() || companyInbox;
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
      emailError: `Saved on the server. ${companyInbox} did not receive it because the mailbox password is not set.`,
    };
  }

  const transporter = nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.port === 465,
    auth: { user: config.user, pass: config.pass },
    connectionTimeout: 8_000,
    greetingTimeout: 8_000,
    socketTimeout: 8_000,
  });

  const resume = await readResume(application);
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
      `Document: ${application.resumeName || "—"}`,
      "",
      `File: ${application.file}`,
    ].join("\n"),
    attachments: resume
      ? [{ filename: resume.filename, content: resume.content, contentType: resume.contentType }]
      : undefined,
  });

  return { emailed: true, inbox: companyInbox, emailError: "" };
}
