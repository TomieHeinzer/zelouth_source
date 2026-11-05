import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center bg-sand px-6 pt-24">
      <div className="mx-auto max-w-xl">
        <p className="kicker text-xs">404</p>
        <h1 className="display mt-3">That page is not on the desk.</h1>
        <p className="mt-4 text-lg text-neutral-700">The link may have moved. The homepage still has the full brief.</p>
        <Link
          href="/"
          className="mt-8 inline-flex rounded-md border border-ink bg-ink px-6 py-3 text-sm font-semibold text-cream hover:bg-accent"
        >
          Back to Zelouth
        </Link>
      </div>
    </main>
  );
}
