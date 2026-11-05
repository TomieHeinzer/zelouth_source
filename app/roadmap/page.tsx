import type { Metadata } from "next";
import Link from "next/link";
import { roadmapColumns, roadmapTable } from "@/lib/sources";

export const metadata: Metadata = {
  title: "Roadmap",
  description: "Emerald, Cref Marketplace, and the BLOS flywheel, from what ships now through the mid-term.",
};

const claims = [
  { field: "Crypto", own: "Keys", keep: "Coins" },
  { field: "AI", own: "Weights", keep: "Brain" },
  { field: "OSS", own: "Code", keep: "Destiny" },
];

export default function RoadmapPage() {
  return (
    <main className="bg-cream pt-24">
      <section className="mx-auto max-w-5xl px-6 pt-16 pb-8 text-center">
        <p className="kicker text-xs text-neutral-600">
          <Link href="/sources" className="hover:text-accent">
            More sources
          </Link>
        </p>
        <h1 className="display mt-3">Roadmap</h1>
        <p className="mt-8 font-display text-3xl font-medium tracking-tight md:text-5xl">Co-owned AI</p>
        <p className="mt-6 text-2xl text-neutral-500">=</p>
        <ul className="mx-auto mt-8 grid max-w-4xl gap-6 md:grid-cols-3">
          {claims.map((claim, index) => (
            <li key={claim.field} className="rounded-lg border border-ink/15 bg-sand px-4 py-6">
              <p className="text-sm font-semibold">{claim.field}:</p>
              <p className="mt-3 text-lg">
                Own your <span className="font-semibold">{claim.own}</span>, own your <span className="font-semibold">{claim.keep}</span>
              </p>
              {index < claims.length - 1 ? <span className="sr-only">plus</span> : null}
            </li>
          ))}
        </ul>
      </section>

      <TokenBand />

      <section className="mx-auto grid max-w-5xl gap-16 px-6 py-16 md:grid-cols-2">
        {roadmapColumns.map((column) => (
          <article key={column.name}>
            <div className="mb-6 flex h-28 w-28 items-center justify-center rounded-lg bg-sand">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={column.image} alt="" className="h-20 w-20 object-contain" />
            </div>
            <h2 className="font-display text-3xl font-medium tracking-tight">{column.name}</h2>
            <p className="mt-1 text-sm text-neutral-600">{column.kicker}</p>
            <p className="mt-4 text-base leading-8">{column.lead}</p>
            <div className="mt-4 space-y-4 text-base leading-8 text-neutral-800">
              {column.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </article>
        ))}
      </section>

      <section className="mx-auto max-w-5xl px-6 pb-8">
        <div className="overflow-x-auto rounded-lg border border-ink/20">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="bg-ink text-cream">
              <tr>
                <th className="w-36 px-4 py-3 font-medium"> </th>
                <th className="px-4 py-3 font-medium">Emerald</th>
                <th className="px-4 py-3 font-medium">Cref Marketplace</th>
              </tr>
            </thead>
            <tbody>
              {roadmapTable.map((row) => {
                const length = Math.max(row.emerald.length, row.marketplace.length);
                return Array.from({ length }, (_, index) => (
                  <tr key={`${row.phase}-${index}`} className="border-t border-ink/10">
                    <th className="px-4 py-3 align-top font-medium">{index === 0 ? row.phase : ""}</th>
                    <td className="px-4 py-3 align-top">{row.emerald[index] ?? ""}</td>
                    <td className="px-4 py-3 align-top">{row.marketplace[index] ?? ""}</td>
                  </tr>
                ));
              })}
            </tbody>
          </table>
        </div>
      </section>

      <TokenBand />
      <div className="h-16" />
    </main>
  );
}

function TokenBand() {
  return (
    <section className="mx-auto my-8 flex max-w-3xl flex-col items-center px-6 py-10 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-ink text-cream">
        <svg viewBox="0 0 64 64" className="h-10 w-10" aria-hidden="true">
          <circle cx="32" cy="32" r="6" fill="#d08a62" />
          <circle cx="32" cy="12" r="3.2" fill="currentColor" />
          <circle cx="48" cy="20" r="2.6" fill="currentColor" />
          <circle cx="50" cy="36" r="3" fill="currentColor" />
          <circle cx="40" cy="50" r="2.6" fill="currentColor" />
          <circle cx="24" cy="50" r="2.6" fill="currentColor" />
          <circle cx="14" cy="36" r="3" fill="currentColor" />
          <circle cx="16" cy="20" r="2.6" fill="currentColor" />
        </svg>
      </div>
      <h2 className="mt-4 font-display text-2xl font-medium tracking-tight">BLOS token</h2>
      <p className="mt-2 max-w-md text-base leading-7 text-neutral-700">
        BLOS bootstraps the flywheel between Emerald and Cref Marketplace.
      </p>
    </section>
  );
}
