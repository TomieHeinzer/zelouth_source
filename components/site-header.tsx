"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { nav } from "@/lib/content";
import { Mark } from "./mark";

function followHash(event: React.MouseEvent<HTMLAnchorElement>, href: string) {
  if (!href.startsWith("/#")) return;
  if (window.location.pathname !== "/") return;
  const target = document.getElementById(href.slice(2));
  if (!target) return;
  event.preventDefault();
  document.body.style.overflow = "";
  target.scrollIntoView({ behavior: "auto", block: "start" });
  window.history.pushState(null, "", href);
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (window.location.pathname !== "/") return;
    const id = window.location.hash.replace(/^#/, "");
    if (!id) return;
    document.getElementById(id)?.scrollIntoView({ behavior: "auto", block: "start" });
  }, []);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header className="fixed top-0 left-0 z-50 w-full bg-[#5c466e] text-cream shadow-[0_10px_28px_-18px_rgba(52,44,60,0.45)]">
      <div className="mx-auto grid h-24 max-w-[1400px] grid-cols-[1fr_auto_1fr] items-center px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2.5 text-cream" aria-label="Zelouth home">
          <Mark className="h-9 w-9 text-cream" center="#f0d7a4" />
          <span className="font-display text-[1.65rem] leading-none font-medium tracking-tight">Zelouth</span>
        </Link>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-3.5 text-sm xl:gap-8">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="whitespace-nowrap text-cream transition duration-200 hover:text-[#f0d2a8]"
                  onClick={(event) => followHash(event, item.href)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center justify-end gap-2">
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((value) => !value)}
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            {open ? (
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {open ? (
        <div id="mobile-nav" className="fixed inset-0 z-50 bg-[#4d3b5c] text-cream lg:hidden">
          <div className="flex h-24 items-center justify-end px-6">
            <button type="button" className="text-[#f0d2a8]" onClick={() => setOpen(false)} aria-label="Close menu">
              <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
          </div>
          <ul className="flex flex-col gap-2 px-6 text-lg">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="block py-2 text-cream hover:text-[#f0d2a8]"
                  onClick={(event) => {
                    setOpen(false);
                    followHash(event, item.href);
                  }}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <Mark className="mx-auto mt-16 h-16 w-16 text-cream" center="#f0d2a8" />
        </div>
      ) : null}
    </header>
  );
}
