import type { Metadata } from "next";

export const metadata: Metadata = { title: "Terms" };

export default function TermsPage() {
  return (
    <main className="bg-cream pt-24">
      <article className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="display">Terms</h1>
        <div className="mt-8 space-y-5 text-base leading-8 text-neutral-800">
          <p>
            The pages on this site describe Zelouth, Emerald, Cref Marketplace, and the BLOS token at a product level.
            They are not an offer to sell a token, a security, or a return.
          </p>
          <p>
            Research links leave this site and point at the papers as published by their authors. Job notes you save
            are stored only in your browser.
          </p>
          <p>Product names on this site — Zelouth, Emerald, Cref Marketplace, and BLOS — identify this project.</p>
        </div>
      </article>
    </main>
  );
}
