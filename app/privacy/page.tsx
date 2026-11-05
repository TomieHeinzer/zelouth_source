import type { Metadata } from "next";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function PrivacyPage() {
  return (
    <main className="bg-cream pt-24">
      <article className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="display">Privacy Policy</h1>
        <div className="mt-8 space-y-5 text-base leading-8 text-neutral-800">
          <p>
            This site is a public brochure for Zelouth. It does not run accounts, and it does not send career notes to a
            server.
          </p>
          <p>
            If you save an application on the careers page, the name, email, city, and note stay in local storage on
            that browser. Clearing the note, or clearing site data, removes it. We do not receive a copy.
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
