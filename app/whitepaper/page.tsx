import type { Metadata } from "next";
import Link from "next/link";
import { documents } from "@/lib/sources";

export const metadata: Metadata = {
  title: "Whitepaper",
  description: "Summary, protocol paper, BLOS tokenomics, and Proof of Active Agent staking.",
};

export default function WhitepaperPage() {
  return (
    <main className="bg-cream pt-24">
      <section className="mx-auto max-w-6xl px-6 pt-16 pb-6">
        <p className="kicker text-xs text-neutral-600">
          <Link href="/sources" className="hover:text-accent">
            More sources
          </Link>
        </p>
        <h1 className="display mt-3">Whitepaper</h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-neutral-800">
          Four notes on how Zelouth puts co-owned AI into Emerald, Cref Marketplace, Blos Stack, and the BLOS token.
        </p>
        <ul className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {documents.map((doc) => (
            <li key={doc.id}>
              <a href={`#${doc.id}`} className="group block">
                <div className="flex aspect-square items-center justify-center rounded-lg border border-ink/10 bg-sand">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={doc.image} alt="" className="h-[78%] w-[78%] object-contain transition duration-500 group-hover:scale-105" />
                </div>
                <h2 className="mt-4 font-display text-xl font-medium tracking-tight group-hover:text-neutral-600">{doc.title}</h2>
              </a>
            </li>
          ))}
        </ul>
      </section>

      <div className="mx-auto max-w-3xl px-6 pt-8 pb-20">
        {documents.map((doc) => (
          <article key={doc.id} id={doc.id} className="scroll-mt-28 border-t border-ink/25 py-12">
            <div className="mb-6 flex h-28 w-28 items-center justify-center rounded-lg border border-ink/10 bg-sand">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={doc.image} alt="" className="h-20 w-20 object-contain" />
            </div>
            <h2 className="font-display text-3xl font-medium tracking-tight">{doc.title}</h2>
            <div className="mt-5 space-y-4 text-base leading-8 text-neutral-800">
              {doc.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
