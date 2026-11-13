import Link from "next/link";
import { nav } from "@/lib/content";
import { companyInbox } from "@/lib/inbox";
import { Mark } from "./mark";

export function SiteFooter() {
  return (
    <footer className="bg-ink text-cream">
      <div className="mx-auto flex w-full max-w-[1400px] flex-col px-6 py-12 lg:px-8">
        <div className="flex flex-col justify-between gap-10 xl:flex-row">
          <div>
            <Mark className="mb-2 h-16 w-16 text-cream" />
            <p className="font-display text-5xl leading-none font-medium tracking-tight">Zelouth</p>
            <div className="mt-6 flex gap-4">
              <a href="https://x.com" aria-label="Zelouth on X" className="hover:text-accent" target="_blank" rel="noreferrer">
                <XIcon />
              </a>
              <a
                href="https://www.linkedin.com"
                aria-label="Zelouth on LinkedIn"
                className="hover:text-accent"
                target="_blank"
                rel="noreferrer"
              >
                <LinkedInIcon />
              </a>
            </div>
          </div>

          <nav aria-label="Footer" className="flex flex-col gap-2 text-sm lg:flex-row lg:gap-8 xl:gap-10">
            {nav.map((item) => (
              <Link key={item.href} href={item.href} className="whitespace-nowrap hover:text-accent">
                {item.label}
              </Link>
            ))}
          </nav>

          <p className="text-sm leading-6 xl:text-right">
            Zelouth
            <br />
            <a href={`mailto:${companyInbox}`} className="hover:text-accent">
              {companyInbox}
            </a>
            <br />
            Remote-first
            <br />
            Since 2025
          </p>
        </div>

        <div className="mt-12 text-center text-sm">
          <p>© 2025–2026 Zelouth</p>
          <p className="mt-1">
            <Link href="/privacy" className="hover:text-accent">
              Privacy Policy
            </Link>
            <span> · </span>
            <Link href="/terms" className="hover:text-accent">
              Terms
            </Link>
            <span> · </span>
            <Link href="/#careers" className="hover:text-accent">
              Careers
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true">
      <path d="M14.7 10.3 22.4 1h-1.8l-6.7 8-5.4-8H1.2l8.1 12.2L1 23h1.8l7.1-8.5L15.7 23h7.1L14.7 10.3Zm-2.5 3-0.8-1.2L3.7 2.5h2.8l5.3 7.8.8 1.2 6.9 10h-2.8l-5.5-8.2Z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true">
      <path d="M4.7 3.3A2.2 2.2 0 1 0 4.7 7.7 2.2 2.2 0 0 0 4.7 3.3ZM3 8.8h3.4V21H3V8.8Zm6.2 0H12.5v1.7h.1c.5-.9 1.7-1.9 3.5-1.9 3.7 0 4.4 2.4 4.4 5.6V21H17v-5.4c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9V21H9.2V8.8Z" />
    </svg>
  );
}
