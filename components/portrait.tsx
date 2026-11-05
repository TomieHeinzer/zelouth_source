export function Portrait({ src, alt }: { src?: string; alt: string }) {
  if (!src) {
    return (
      <div className="relative flex aspect-[38/53] w-full items-center justify-center overflow-hidden bg-blush">
        <svg viewBox="0 0 80 80" className="h-24 w-24 text-accent" aria-hidden="true">
          <circle cx="40" cy="30" r="14" fill="currentColor" opacity="0.85" />
          <path d="M16 70c3-14 13-20 24-20s21 6 24 20" fill="currentColor" opacity="0.85" />
        </svg>
        <span className="sr-only">{alt}. Portrait not published.</span>
      </div>
    );
  }

  return (
    <div className="duotone relative aspect-[38/53] w-full overflow-hidden rounded-sm bg-blush">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} className="h-full w-full object-cover object-[center_18%]" />
    </div>
  );
}
