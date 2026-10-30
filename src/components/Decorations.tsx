/** Flat decorative marks — squiggles, sparkles, flowers. Purely ornamental, hidden from assistive tech. */

type MarkProps = { className?: string; color?: string };

export function Sparkle({ className, color = "#ffb110" }: MarkProps) {
  return (
    <svg aria-hidden viewBox="0 0 48 48" className={className}>
      <path d="M24 2c2 12 10 20 22 22-12 2-20 10-22 22-2-12-10-20-22-22C14 22 22 14 24 2Z" fill={color} />
    </svg>
  );
}

export function Squiggle({ className, color = "#f64932" }: MarkProps) {
  return (
    <svg aria-hidden viewBox="0 0 120 32" className={className} fill="none">
      <path
        d="M4 20c10-16 20-16 28 0s18 16 28 0 18-16 28 0 18 16 28 0"
        stroke={color}
        strokeWidth="6"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Flower({ className, color = "#62aef0" }: MarkProps) {
  return (
    <svg aria-hidden viewBox="0 0 64 64" className={className}>
      {[0, 60, 120].map((r) => (
        <ellipse key={r} cx="32" cy="32" rx="10" ry="28" fill={color} transform={`rotate(${r} 32 32)`} />
      ))}
      <circle cx="32" cy="32" r="8" fill="#fff" />
    </svg>
  );
}

export function Ring({ className, color = "#097fe8" }: MarkProps) {
  return (
    <svg aria-hidden viewBox="0 0 48 48" className={className} fill="none">
      <circle cx="24" cy="24" r="18" stroke={color} strokeWidth="6" />
    </svg>
  );
}

export function Arrow({ className, color = "#000" }: MarkProps) {
  return (
    <svg aria-hidden viewBox="0 0 80 60" className={className} fill="none">
      <path d="M6 8c18 34 40 44 64 42" stroke={color} strokeWidth="3" strokeLinecap="round" />
      <path d="M58 40l12 10-14 6" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
