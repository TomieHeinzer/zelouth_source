import type { Metadata } from "next";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function PrivacyPage() {
  return (
    <main className="bg-cream pt-24">
      <article className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="display">Privacy Policy</h1>
        <div className="mt-8 space-y-5 text-base leading-8 text-neutral-800">
          <p>
            This site is a public brochure for Zelouth. It does not run accounts. The careers form is the only place
            that collects details from you.
          </p>
          <p>
            If you save an application, the role, name, email, city, and note are written to a file on the server and
            emailed to info@zelouth.xyz so the company can read them. Clearing the note deletes that file. An email
            that already reached the inbox stays in that mailbox.
          </p>
          <p>
            Pages may be requested through your network provider like any other website. We do not add a tracker for
            advertising.
          </p>
        </div>
      </article>
    </main>
  );
}
