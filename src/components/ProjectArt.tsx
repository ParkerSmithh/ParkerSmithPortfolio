/** Flat SVG stand-ins for project imagery, shown until real thumbnails are added in data/projects.ts. */

const base = "absolute inset-0 h-full w-full transition-transform duration-700 ease-out group-hover:scale-[1.04]";

export function YouTubeArt() {
  return (
    <svg aria-hidden viewBox="0 0 400 260" preserveAspectRatio="xMidYMid slice" className={base}>
      <rect width="400" height="260" fill="#f64932" />
      <circle cx="350" cy="30" r="90" fill="#ffb110" />
      {[0, 1, 2].map((i) => (
        <rect
          key={i}
          x={40 + i * 22}
          y={60 - i * 14}
          width="200"
          height="120"
          rx="12"
          fill={i === 2 ? "#fff" : "none"}
          stroke="#fff"
          strokeOpacity={0.5 + i * 0.25}
          strokeWidth="2"
        />
      ))}
      <circle cx="184" cy="92" r="26" fill="#f64932" />
      <path d="M176 79v26l21-13z" fill="#fff" />
      <rect x="248" y="166" width="120" height="64" rx="10" fill="#02093a" />
      <text x="262" y="208" fill="#fff" fontFamily="Inter, system-ui" fontWeight="700" fontSize="30" letterSpacing="-1">
        33K
      </text>
      <rect x="40" y="200" width="150" height="10" rx="5" fill="#fff" opacity="0.6" />
      <rect x="40" y="218" width="96" height="10" rx="5" fill="#fff" opacity="0.35" />
    </svg>
  );
}

export function FortniteArt() {
  return (
    <svg aria-hidden viewBox="0 0 400 260" preserveAspectRatio="xMidYMid slice" className={base}>
      <rect width="400" height="260" fill="#ffb110" />
      <circle cx="320" cy="70" r="34" fill="#fff" opacity="0.9" />
      <ellipse cx="200" cy="210" rx="190" ry="44" fill="#62aef0" />
      <path d="M60 200c30-60 70-90 110-70s60-40 100-30 60 50 70 100z" fill="#02093a" />
      <path d="M120 196c18-30 40-44 60-36s30-18 52-12 34 26 40 48z" fill="#097fe8" />
      <rect x="182" y="120" width="34" height="46" rx="4" fill="#f64932" />
      <path d="M176 122l23-22 23 22z" fill="#fff" />
      <g fill="#02093a">
        <rect x="40" y="40" width="10" height="10" rx="2" />
        <rect x="56" y="40" width="10" height="10" rx="2" opacity="0.5" />
        <rect x="72" y="40" width="10" height="10" rx="2" opacity="0.25" />
      </g>
    </svg>
  );
}

export function CybercabArt() {
  return (
    <svg aria-hidden viewBox="0 0 400 260" preserveAspectRatio="xMidYMid slice" className={base}>
      <rect width="400" height="260" fill="#02093a" />
      <g stroke="#fff" strokeOpacity="0.08" strokeWidth="1">
        {Array.from({ length: 17 }, (_, i) => (
          <line key={`v${i}`} x1={i * 25} y1="0" x2={i * 25} y2="260" />
        ))}
        {Array.from({ length: 11 }, (_, i) => (
          <line key={`h${i}`} x1="0" y1={i * 25} x2="400" y2={i * 25} />
        ))}
      </g>
      <path d="M-10 200 C80 190 90 120 170 120 S260 60 330 70 400 30 420 30" stroke="#62aef0" strokeWidth="5" fill="none" strokeLinecap="round" />
      <path d="M40 40 L120 90 L110 170 L230 210" stroke="#fff" strokeOpacity="0.25" strokeWidth="3" fill="none" strokeDasharray="2 8" strokeLinecap="round" />
      {[
        [170, 120, "#ffb110"],
        [330, 70, "#f64932"],
        [110, 170, "#ffb110"],
        [262, 96, "#fff"],
      ].map(([x, y, c], i) => (
        <g key={i}>
          <circle cx={x as number} cy={y as number} r="14" fill={c as string} opacity="0.2" />
          <circle cx={x as number} cy={y as number} r="6" fill={c as string} />
        </g>
      ))}
      <rect x="236" y="168" width="140" height="66" rx="10" fill="#fff" />
      <rect x="250" y="182" width="56" height="8" rx="4" fill="#02093a" opacity="0.3" />
      <text x="250" y="218" fill="#02093a" fontFamily="Inter, system-ui" fontWeight="700" fontSize="20" letterSpacing="-0.5">
        Live map
      </text>
    </svg>
  );
}

export const projectArt = { youtube: YouTubeArt, fortnite: FortniteArt, cybercab: CybercabArt } as const;
