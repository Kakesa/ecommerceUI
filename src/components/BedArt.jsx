const palettes = {
  nuage: { wall: "#e7f1ef", mattress: "#6eaeae", quilt: "#8fc4c2", wood: "#d7b892", sheet: "#f7f4ef", pillow: "#fffdfb" },
  cocon: { wall: "#f6f1ea", mattress: "#e4cbb6", quilt: "#f0ddcc", wood: "#c9a27a", sheet: "#fbf7f2", pillow: "#fffdfb" },
  source: { wall: "#eef3ea", mattress: "#b7cbb0", quilt: "#d5e3cf", wood: "#cbb08a", sheet: "#f7f8f4", pillow: "#fffdfb" },
  horizon: { wall: "#eef2f4", mattress: "#a9bdc8", quilt: "#c5d5de", wood: "#c8ad86", sheet: "#f4f6f7", pillow: "#fffdfb" },
};

export function BedArt({ variant = "nuage", className = "" }) {
  const tone = palettes[variant] || palettes.nuage;
  return (
    <svg className={className} viewBox="0 0 800 600" role="img" aria-label="Matelas sur un lit en bois clair">
      <rect width="800" height="600" fill={tone.wall} />
      <rect x="0" y="430" width="800" height="170" fill="#efe4d4" />
      <path d="M0 430h800" stroke="#e4d5c2" strokeWidth="2" />
      <rect x="70" y="250" width="250" height="210" rx="8" fill="#f3eee6" />
      <rect x="92" y="268" width="150" height="110" rx="4" fill="#d7e4e1" />
      <circle cx="620" cy="300" r="46" fill="#d5e6df" />
      <rect x="600" y="340" width="40" height="90" rx="16" fill="#c9b496" />
      <ellipse cx="620" cy="292" rx="34" ry="22" fill="#7fae98" />
      <g>
        <path d="M120 390h560c18 0 28 12 28 28v42H92v-42c0-16 10-28 28-28Z" fill={tone.wood} />
        <path d="M108 432h584v28H108z" fill="#c49a68" />
        <rect x="118" y="338" width="564" height="78" rx="18" fill={tone.mattress} />
        <path d="M128 348h544c8 0 14 6 14 14v28H128v-28c0-8 6-14 14-14Z" fill={tone.sheet} />
        <g stroke={tone.quilt} strokeWidth="3" fill="none" opacity="0.85">
          <path d="M150 372h500" />
          <path d="M170 356v40M230 356v40M290 356v40M350 356v40M410 356v40M470 356v40M530 356v40M590 356v40" />
        </g>
        <rect x="168" y="292" width="150" height="62" rx="18" fill={tone.pillow} />
        <rect x="210" y="300" width="118" height="46" rx="14" fill="#f3ece3" />
        <rect x="340" y="286" width="168" height="70" rx="20" fill={tone.pillow} />
        <rect x="530" y="300" width="120" height="54" rx="16" fill="#f6efe6" />
      </g>
      <ellipse cx="400" cy="470" rx="250" ry="12" fill="#000" opacity="0.06" />
    </svg>
  );
}
