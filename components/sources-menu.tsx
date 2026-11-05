"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { sourceLinks } from "@/lib/content";

export function SourcesMenu({ onNavigate }: { onNavigate?: () => void }) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onPointer(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    }
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <div ref={rootRef} className="relative">
      <span className="inline-flex items-center gap-1">
        <Link href="/sources" className="whitespace-nowrap transition duration-200 hover:text-accent" onClick={onNavigate}>
          More sources
        </Link>
        <button
          type="button"
          className="inline-flex h-6 w-6 items-center justify-center"
          aria-expanded={open}
          aria-haspopup="true"
          aria-label="Open More sources"
          onClick={() => setOpen((value) => !value)}
        >
          <svg viewBox="0 0 20 20" className={`h-4 w-4 transition ${open ? "rotate-180" : ""}`} fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M5 7.5 10 12.5 15 7.5" />
          </svg>
        </button>
      </span>
      {open ? (
        <div className="absolute top-full right-0 z-50 mt-3 min-w-44 rounded-lg border border-ink/10 bg-cream py-1 text-ink shadow-lg">
          {sourceLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block px-4 py-2.5 text-sm hover:bg-sand"
              onClick={() => {
                setOpen(false);
                onNavigate?.();
              }}
            >
              {item.label}
            </Link>
          ))}
        </div>
      ) : null}
    </div>
  );
}
