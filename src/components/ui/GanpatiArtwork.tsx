/** Elegant minimalist Ganpati silhouette — SVG line art for hero and opening. */
export function GanpatiArtwork({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 240"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      {/* Soft outer glow circle */}
      <circle cx="100" cy="110" r="88" stroke="currentColor" strokeOpacity="0.12" strokeWidth="0.5" />
      <circle cx="100" cy="110" r="72" stroke="currentColor" strokeOpacity="0.08" strokeWidth="0.5" />

      {/* Crown / modak */}
      <path
        d="M100 28 C88 42 78 48 72 58 C68 64 72 70 80 68 C86 66 92 58 100 52 C108 58 114 66 120 68 C128 70 132 64 128 58 C122 48 112 42 100 28Z"
        fill="currentColor"
        fillOpacity="0.9"
      />

      {/* Head */}
      <ellipse cx="100" cy="98" rx="52" ry="48" fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="1.2" />

      {/* Trunk — elegant curve */}
      <path
        d="M100 108 C108 118 112 132 104 148 C98 158 88 162 82 156 C78 152 82 146 90 144 C96 142 100 134 100 124 C100 118 98 112 100 108Z"
        fill="currentColor"
        fillOpacity="0.85"
        stroke="currentColor"
        strokeWidth="0.8"
      />

      {/* Ears */}
      <path d="M52 88 C38 78 28 88 34 102 C40 114 52 108 56 98" fill="currentColor" fillOpacity="0.7" />
      <path d="M148 88 C162 78 172 88 166 102 C160 114 148 108 144 98" fill="currentColor" fillOpacity="0.7" />

      {/* Eyes — serene closed lids */}
      <path d="M78 92 C82 90 88 90 92 92" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M108 92 C112 90 118 90 122 92" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />

      {/* Body / shawl drape */}
      <path
        d="M52 148 C48 168 56 188 72 200 C84 208 100 212 100 212 C100 212 116 208 128 200 C144 188 152 168 148 148"
        fill="currentColor"
        fillOpacity="0.12"
        stroke="currentColor"
        strokeWidth="1"
      />

      {/* Left hand — blessing mudra */}
      <ellipse cx="58" cy="168" rx="12" ry="16" fill="currentColor" fillOpacity="0.6" />

      {/* Right hand — modak */}
      <circle cx="142" cy="162" r="10" fill="currentColor" fillOpacity="0.75" />

      {/* Base lotus */}
      <path
        d="M100 212 C72 212 56 224 48 232 C64 228 82 226 100 226 C118 226 136 228 152 232 C144 224 128 212 100 212Z"
        fill="currentColor"
        fillOpacity="0.25"
        stroke="currentColor"
        strokeWidth="0.8"
      />
      <path d="M100 212 C88 218 82 228 80 234 C90 230 96 224 100 220 C104 224 110 230 120 234 C118 228 112 218 100 212Z" fill="currentColor" fillOpacity="0.4" />
    </svg>
  );
}
