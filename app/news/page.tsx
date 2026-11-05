import type { Metadata } from "next";
import Link from "next/link";
import { formatDate, posts } from "@/lib/content";

export const metadata: Metadata = {
  title: "News",
  description: "Product notes, token mechanics, and field reports from people running agents they own.",
};

export default function NewsPage() {
  return (
    <main className="bg-cream pt-24">
      <section className="mx-auto max-w-screen-2xl px-6 py-16 lg:px-8">
        <h1 className="display">News</h1>
        <p className="mt-4 max-w-2xl text-lg text-neutral-700">
          Product notes, token mechanics, and field reports from people running agents they own.
        </p>
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Link key={post.slug} href={`/news/${post.slug}`} className="group h-full">
              <article className="h-full overflow-hidden rounded-lg bg-cream shadow-[0_16px_40px_-28px_rgba(52,44,60,0.35)] transition hover:shadow-[0_18px_40px_-22px_rgba(141,110,174,0.35)]">
                <div className="h-[180px] overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={post.image} alt="" className="soft-photo h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                </div>
                <div className="p-5">
                  <p className="text-xs text-neutral-600">
                    {post.category} · {formatDate(post.date)} · {post.readtime} min read
                  </p>
                  <h2 className="mt-1 font-display text-xl font-medium tracking-tight">{post.title}</h2>
                  <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-neutral-700">{post.description}</p>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
