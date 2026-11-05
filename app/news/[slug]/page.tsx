import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { formatDate, posts } from "@/lib/content";

type Params = { slug: string };

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const post = posts.find((item) => item.slug === slug);
  if (!post) return { title: "News" };
  return { title: post.title, description: post.description };
}

export default async function NewsArticle({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const post = posts.find((item) => item.slug === slug);
  if (!post) notFound();

  return (
    <main className="bg-cream pt-24">
      <article className="mx-auto max-w-3xl px-6 py-16">
        <Link href="/news" className="text-sm underline hover:text-neutral-600">
          All news
        </Link>
        <p className="mt-6 text-xs tracking-wide text-neutral-600 uppercase">
          {post.category} · {formatDate(post.date)} · {post.readtime} min read
        </p>
        <h1 className="mt-3 font-display text-4xl font-medium tracking-tight text-balance md:text-5xl">{post.title}</h1>
        <p className="mt-4 text-lg leading-8 text-neutral-700">{post.description}</p>
        <div className="mt-8 overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={post.image} alt="" className="soft-photo aspect-[16/9] w-full object-cover" />
        </div>
        <div className="mt-8 space-y-5 text-base leading-8">
          {post.body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </article>
    </main>
  );
}
