export function Mark({ className = "h-9 w-9", center = "#f0d7a4" }: { className?: string; center?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <g fill="currentColor">
        <circle cx="32" cy="8.5" r="4.6" />
        <circle cx="49.2" cy="16.2" r="3.7" />
        <circle cx="55.2" cy="33" r="4.3" />
        <circle cx="46.5" cy="49.5" r="3.8" />
        <circle cx="32" cy="56" r="4.2" />
        <circle cx="17.5" cy="49.5" r="3.8" />
        <circle cx="8.8" cy="33" r="4.3" />
        <circle cx="14.8" cy="16.2" r="3.7" />
        <circle cx="24" cy="24.5" r="2.5" opacity="0.55" />
        <circle cx="40" cy="24.5" r="2.5" opacity="0.55" />
        <circle cx="24" cy="40" r="2.5" opacity="0.55" />
        <circle cx="40" cy="40" r="2.5" opacity="0.55" />
      </g>
      <circle cx="32" cy="32.2" r="6.1" fill={center} />
    </svg>
  );
}
