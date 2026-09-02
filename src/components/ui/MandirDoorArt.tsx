/**
 * SVG building blocks for the custom carved mandir gate.
 * Inspired by traditional temple doors — original artwork, not photo copies.
 */

export function DoorSvgDefs({ id }: { id: string }) {
  return (
    <defs>
      <linearGradient id={`${id}-wood`} x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#9B6534" />
        <stop offset="35%" stopColor="#7A4E28" />
        <stop offset="70%" stopColor="#6B4423" />
        <stop offset="100%" stopColor="#4A2E15" />
      </linearGradient>
      <linearGradient id={`${id}-recess`} x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#3D2817" stopOpacity="0.6" />
        <stop offset="100%" stopColor="#2A1A0F" stopOpacity="0.3" />
      </linearGradient>
      <linearGradient id={`${id}-gold`} x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFE566" />
        <stop offset="40%" stopColor="#D4AF37" />
        <stop offset="100%" stopColor="#9A7B30" />
      </linearGradient>
      <pattern id={`${id}-floral`} width="24" height="24" patternUnits="userSpaceOnUse">
        <path
          d="M4 12 Q8 4 12 12 Q16 20 20 12"
          fill="none"
          stroke="#4A2E15"
          strokeWidth="0.4"
          opacity="0.35"
        />
        <circle cx="12" cy="12" r="1" fill="#4A2E15" opacity="0.2" />
      </pattern>
      <filter id={`${id}-emboss`} x="-5%" y="-5%" width="110%" height="110%">
        <feDropShadow dx="1" dy="1" stdDeviation="1" floodColor="#000" floodOpacity="0.4" />
        <feDropShadow dx="-0.5" dy="-0.5" stdDeviation="0.5" floodColor="#FFE566" floodOpacity="0.3" />
      </filter>
    </defs>
  );
}

export function DoorBorder({ prefix }: { prefix: string }) {
  return (
    <g>
      <rect x="4" y="4" width="212" height="472" rx="2" fill={`url(#${prefix}-wood)`} />
      <rect x="4" y="4" width="212" height="472" rx="2" fill={`url(#${prefix}-floral)`} />
      <rect x="8" y="8" width="204" height="464" fill="none" stroke="#4A2E15" strokeWidth="3" />
      <rect
        x="14"
        y="14"
        width="192"
        height="452"
        fill="none"
        stroke="#B8860B"
        strokeWidth="1.5"
        opacity="0.7"
      />
      {[
        [20, 20],
        [200, 20],
        [20, 460],
        [200, 460],
      ].map(([cx, cy]) => (
        <circle
          key={`${cx}-${cy}`}
          cx={cx}
          cy={cy}
          r="6"
          fill={`url(#${prefix}-gold)`}
          filter={`url(#${prefix}-emboss)`}
        />
      ))}
    </g>
  );
}

export function DoorTopArch({ prefix, mirror }: { prefix: string; mirror?: boolean }) {
  return (
    <g transform={mirror ? "scale(-1,1) translate(-220,0)" : undefined}>
      <path
        d="M30 90 Q110 30 190 90 L190 130 L30 130 Z"
        fill={`url(#${prefix}-recess)`}
        stroke="#4A2E15"
        strokeWidth="1"
      />
      <path
        d="M40 95 Q110 45 180 95"
        fill="none"
        stroke={`url(#${prefix}-gold)`}
        strokeWidth="1.5"
        opacity="0.8"
      />
      {[55, 80, 110, 140, 165].map((x) => (
        <circle key={x} cx={x} cy={78} r="3" fill={`url(#${prefix}-gold)`} opacity="0.6" />
      ))}
    </g>
  );
}

export function DoorJali({ prefix, x }: { prefix: string; x: number }) {
  return (
    <g>
      <rect
        x={x}
        y="100"
        width="36"
        height="48"
        rx="2"
        fill={`url(#${prefix}-recess)`}
        stroke="#4A2E15"
        strokeWidth="1"
      />
      {[0, 1, 2, 3, 4].map((i) => (
        <rect
          key={i}
          x={x + 6 + i * 6}
          y="106"
          width="3"
          height="36"
          rx="1"
          fill={`url(#${prefix}-gold)`}
          filter={`url(#${prefix}-emboss)`}
        />
      ))}
    </g>
  );
}

export function DoorApsara({
  prefix,
  x,
  facing,
}: {
  prefix: string;
  x: number;
  facing: "left" | "right";
}) {
  const flip = facing === "left" ? "scale(-1,1)" : "";
  const tx = facing === "left" ? x + 30 : x;
  return (
    <g transform={`translate(${tx}, 108) ${flip}`}>
      <rect
        x="-12"
        y="38"
        width="24"
        height="8"
        rx="1"
        fill={`url(#${prefix}-gold)`}
        filter={`url(#${prefix}-emboss)`}
      />
      <ellipse cx="0" cy="22" rx="8" ry="14" fill={`url(#${prefix}-gold)`} filter={`url(#${prefix}-emboss)`} />
      <circle cx="0" cy="8" r="6" fill={`url(#${prefix}-gold)`} filter={`url(#${prefix}-emboss)`} />
      <path
        d="M6 14 Q14 6 10 0"
        fill="none"
        stroke={`url(#${prefix}-gold)`}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </g>
  );
}

export function DoorElephant({ prefix, facing }: { prefix: string; facing: "left" | "right" }) {
  const isLeft = facing === "left";
  const cx = isLeft ? 155 : 65;
  const flip = isLeft ? "" : "scale(-1,1) translate(-220,0)";

  return (
    <g transform={flip} filter={`url(#${prefix}-emboss)`}>
      <path d="M100 268 L170 268 L175 280 L95 280 Z" fill={`url(#${prefix}-recess)`} />
      <path d="M105 280 L165 280 L168 290 L102 290 Z" fill="#4A2E15" opacity="0.5" />
      <ellipse cx={cx} cy="248" rx="38" ry="28" fill={`url(#${prefix}-gold)`} />
      <ellipse cx={cx + (isLeft ? 22 : -22)} cy="228" rx="22" ry="20" fill={`url(#${prefix}-gold)`} />
      <path
        d={
          isLeft
            ? "M175 222 Q195 200 188 175 Q182 165 178 172"
            : "M45 222 Q25 200 32 175 Q38 165 42 172"
        }
        fill="none"
        stroke={`url(#${prefix}-gold)`}
        strokeWidth="8"
        strokeLinecap="round"
      />
      <ellipse
        cx={cx + (isLeft ? 8 : -8)}
        cy="222"
        rx="12"
        ry="16"
        fill={`url(#${prefix}-gold)`}
        opacity="0.85"
      />
      <circle cx={cx + (isLeft ? 28 : -28)} cy="224" r="2.5" fill="#3D2817" />
      {[0, 1, 2].map((i) => (
        <rect
          key={i}
          x={cx - 20 + i * 14}
          y="268"
          width="8"
          height="18"
          rx="2"
          fill={`url(#${prefix}-gold)`}
          opacity="0.9"
        />
      ))}
      <path
        d={`M${cx - 15} 230 Q${cx} 218 ${cx + 15} 230`}
        fill="none"
        stroke="#B8860B"
        strokeWidth="2"
      />
    </g>
  );
}

export function DoorLotusPanel({ prefix }: { prefix: string }) {
  return (
    <g>
      <rect
        x="36"
        y="310"
        width="148"
        height="148"
        fill={`url(#${prefix}-recess)`}
        stroke="#4A2E15"
        strokeWidth="2"
      />
      <rect
        x="42"
        y="316"
        width="136"
        height="136"
        fill="none"
        stroke={`url(#${prefix}-gold)`}
        strokeWidth="1"
        opacity="0.6"
      />
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i * 30 * Math.PI) / 180;
        const px = 110 + Math.cos(angle) * 28;
        const py = 384 + Math.sin(angle) * 28;
        return (
          <ellipse
            key={i}
            cx={px}
            cy={py}
            rx="10"
            ry="18"
            fill={`url(#${prefix}-gold)`}
            opacity="0.85"
            transform={`rotate(${i * 30} ${px} ${py})`}
            filter={`url(#${prefix}-emboss)`}
          />
        );
      })}
      <circle cx="110" cy="384" r="12" fill={`url(#${prefix}-gold)`} filter={`url(#${prefix}-emboss)`} />
    </g>
  );
}

export function DoorKalash({ prefix, x }: { prefix: string; x: number }) {
  return (
    <g transform={`translate(${x}, 355)`} filter={`url(#${prefix}-emboss)`}>
      <path d="M0 40 L-14 40 Q-16 28 0 20 Q16 28 14 40 Z" fill={`url(#${prefix}-gold)`} />
      <ellipse cx="0" cy="18" rx="10" ry="6" fill={`url(#${prefix}-gold)`} />
      <path d="M-4 12 Q0 0 4 12" fill="#3D2817" opacity="0.5" />
      <path d="M-8 8 Q-14 0 -6 -4" fill="none" stroke="#228B22" strokeWidth="1.5" />
      <path d="M8 8 Q14 0 6 -4" fill="none" stroke="#228B22" strokeWidth="1.5" />
    </g>
  );
}

export function DoorCentrePillar({ prefix, side }: { prefix: string; side: "left" | "right" }) {
  return (
    <rect
      x={side === "left" ? 200 : 5}
      y="90"
      width="10"
      height="280"
      rx="1"
      fill={`url(#${prefix}-gold)`}
      opacity="0.5"
      filter={`url(#${prefix}-emboss)`}
    />
  );
}

export function DoorBands({ prefix }: { prefix: string }) {
  return (
    <g opacity="0.5">
      {[155, 300].map((y) => (
        <rect key={y} x="20" y={y} width="180" height="2" fill={`url(#${prefix}-gold)`} />
      ))}
    </g>
  );
}
