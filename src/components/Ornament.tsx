export function Ornament({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 24"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path d="M0 12 H70 M130 12 H200" stroke="currentColor" strokeWidth="0.8" />
      <path
        d="M80 12 Q100 0 120 12 Q100 24 80 12 Z"
        stroke="currentColor"
        strokeWidth="1"
        fill="currentColor"
        fillOpacity="0.15"
      />
      <circle cx="100" cy="12" r="2" fill="currentColor" />
      <circle cx="72" cy="12" r="1.5" fill="currentColor" />
      <circle cx="128" cy="12" r="1.5" fill="currentColor" />
    </svg>
  );
}

export function Lotus({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden fill="none">
      <g stroke="currentColor" strokeWidth="1.2" fill="currentColor" fillOpacity="0.1">
        <path d="M32 50 C18 42 14 28 32 14 C50 28 46 42 32 50 Z" />
        <path d="M32 50 C46 44 56 32 50 18 C36 24 30 36 32 50 Z" />
        <path d="M32 50 C18 44 8 32 14 18 C28 24 34 36 32 50 Z" />
      </g>
      <circle cx="32" cy="42" r="2.5" fill="currentColor" />
    </svg>
  );
}
