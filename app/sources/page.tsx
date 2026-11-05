import type { Metadata } from "next";
import Link from "next/link";
import { documents } from "@/lib/sources";

export const metadata: Metadata = {
  title: "More sources",
  description: "The Zelouth whitepaper and the roadmap for Emerald, Cref Marketplace, and BLOS.",
};

const cards = [
  {
    href: "/whitepaper",
    title: "Whitepaper",
    image: documents[0].image,
    body: "Summary, the protocol paper, BLOS tokenomics, and Proof of Active Agent staking.",
  },
  {
    href: "/roadmap",
    title: "Roadmap",
    image: "/images/sources/mark-emerald.jpg",
    body: "What Emerald and Cref Marketplace ship now, next, and in the middle distance. BLOS is the flywheel between them.",
  },
];

export default function SourcesPage() {
  return (
    <main className="bg-cream pt-24">
      <section className="mx-auto max-w-6xl px-6 py-16">
        <p className="kicker text-xs text-neutral-600">Zelouth</p>
        <h1 className="display mt-3">More sources</h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-neutral-800">
          The papers and the roadmap. Emerald is the agent app store. Cref Marketplace is the bazaar. BLOS is the token between them. Blos Stack is the software underneath.
        </p>
        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {cards.map((card) => (
            <Link key={card.href} href={card.href} className="group overflow-hidden rounded-lg border border-ink/10 bg-sand transition hover:border-accent">
              <div className="flex h-56 items-center justify-center bg-blush">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={card.image} alt="" className="h-40 w-40 object-contain transition duration-500 group-hover:scale-105" />
              </div>
              <div className="p-6">
                <h2 className="font-display text-3xl font-medium tracking-tight">{card.title}</h2>
                <p className="mt-3 text-sm leading-6 text-neutral-700">{card.body}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
