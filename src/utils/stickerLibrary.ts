export interface CartoonStickerAsset {
  id: string;
  label: string;
  category: "cartoon" | "sticker";
  svg: string;
  defaultWidthPct: number;
  aspectRatio: number;
}

export function svgToDataUrl(svg: string): string {
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

export const CARTOON_ASSETS: CartoonStickerAsset[] = [
  {
    id: "cartoon-sun",
    label: "Sun (နေမင်း)",
    category: "cartoon",
    defaultWidthPct: 16,
    aspectRatio: 1,
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
  <g stroke="#000000" stroke-linecap="round" stroke-linejoin="round" fill="none">
    <circle cx="100" cy="100" r="46" fill="#FFFFFF" stroke-width="5.5"/>
    <line x1="100" y1="16" x2="100" y2="40" stroke-width="5.5"/>
    <line x1="100" y1="160" x2="100" y2="184" stroke-width="5.5"/>
    <line x1="16" y1="100" x2="40" y2="100" stroke-width="5.5"/>
    <line x1="160" y1="100" x2="184" y2="100" stroke-width="5.5"/>
    <line x1="40" y1="40" x2="58" y2="58" stroke-width="5.5"/>
    <line x1="142" y1="142" x2="160" y2="160" stroke-width="5.5"/>
    <line x1="160" y1="40" x2="142" y2="58" stroke-width="5.5"/>
    <line x1="58" y1="142" x2="40" y2="160" stroke-width="5.5"/>
    <circle cx="85" cy="92" r="4" fill="#000000"/>
    <circle cx="115" cy="92" r="4" fill="#000000"/>
    <path d="M 84 110 Q 100 124, 116 110" stroke-width="4.5"/>
  </g>
</svg>`,
  },
  {
    id: "cartoon-cloud",
    label: "Cloud (တိမ်)",
    category: "cartoon",
    defaultWidthPct: 22,
    aspectRatio: 1.5,
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 160">
  <g stroke="#000000" stroke-linecap="round" stroke-linejoin="round">
    <path d="M 52 130 C 26 130, 14 110, 22 88 C 28 70, 48 64, 66 72 C 78 40, 118 32, 146 52 C 166 40, 198 50, 206 74 C 224 76, 232 94, 226 112 C 220 126, 206 130, 190 130 Z" fill="#FFFFFF" stroke-width="5.5"/>
    <circle cx="105" cy="94" r="3.5" fill="#000000"/>
    <circle cx="135" cy="94" r="3.5" fill="#000000"/>
    <path d="M 110 107 Q 120 116, 130 107" fill="none" stroke-width="4"/>
  </g>
</svg>`,
  },
  {
    id: "cartoon-rabbit",
    label: "Rabbit (ယုန်)",
    category: "cartoon",
    defaultWidthPct: 18,
    aspectRatio: 1,
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
  <g stroke="#000000" stroke-linecap="round" stroke-linejoin="round">
    <ellipse cx="90" cy="140" rx="46" ry="38" fill="#FFFFFF" stroke-width="5"/>
    <circle cx="44" cy="148" r="14" fill="#FFFFFF" stroke-width="4.5"/>
    <ellipse cx="118" cy="90" rx="30" ry="27" fill="#FFFFFF" stroke-width="5"/>
    <ellipse cx="108" cy="40" rx="10" ry="30" transform="rotate(-10 108 40)" fill="#FFFFFF" stroke-width="4.5"/>
    <ellipse cx="130" cy="40" rx="10" ry="30" transform="rotate(10 130 40)" fill="#FFFFFF" stroke-width="4.5"/>
    <circle cx="128" cy="84" r="4" fill="#000000"/>
    <ellipse cx="146" cy="93" rx="5" ry="3.5" fill="#000000"/>
    <ellipse cx="82" cy="174" rx="20" ry="10" fill="#FFFFFF" stroke-width="4.5"/>
    <ellipse cx="120" cy="174" rx="18" ry="10" fill="#FFFFFF" stroke-width="4.5"/>
  </g>
</svg>`,
  },
  {
    id: "cartoon-elephant",
    label: "Baby Elephant (ဆင်ကလေး)",
    category: "cartoon",
    defaultWidthPct: 22,
    aspectRatio: 1.15,
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 230 200">
  <g stroke="#000000" stroke-linecap="round" stroke-linejoin="round">
    <ellipse cx="96" cy="118" rx="62" ry="44" fill="#FFFFFF" stroke-width="5"/>
    <rect x="50" y="146" width="22" height="38" rx="7" fill="#FFFFFF" stroke-width="4.8"/>
    <rect x="80" y="150" width="22" height="34" rx="7" fill="#EAEAEA" stroke-width="4.8"/>
    <rect x="118" y="146" width="22" height="38" rx="7" fill="#FFFFFF" stroke-width="4.8"/>
    <circle cx="154" cy="94" r="38" fill="#FFFFFF" stroke-width="5"/>
    <ellipse cx="122" cy="92" rx="24" ry="32" fill="#EAEAEA" stroke-width="4.8"/>
    <path d="M 184 102 C 214 106, 222 138, 204 156 C 194 166, 182 158, 186 146 C 194 132, 188 120, 170 118" fill="#FFFFFF" stroke-width="4.8"/>
    <circle cx="166" cy="84" r="4.5" fill="#000000"/>
    <path d="M 35 110 Q 16 128, 20 148" fill="none" stroke-width="4.5"/>
  </g>
</svg>`,
  },
  {
    id: "cartoon-butterfly",
    label: "Butterfly (လိပ်ပြာ)",
    category: "cartoon",
    defaultWidthPct: 16,
    aspectRatio: 1.2,
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 170">
  <g stroke="#000000" stroke-linecap="round" stroke-linejoin="round" transform="translate(100 92)">
    <ellipse cx="-40" cy="-24" rx="42" ry="28" fill="#FFFFFF" stroke-width="5"/>
    <ellipse cx="40" cy="-24" rx="42" ry="28" fill="#FFFFFF" stroke-width="5"/>
    <ellipse cx="-30" cy="24" rx="30" ry="22" fill="#FFFFFF" stroke-width="4.8"/>
    <ellipse cx="30" cy="24" rx="30" ry="22" fill="#FFFFFF" stroke-width="4.8"/>
    <circle cx="-42" cy="-24" r="10" fill="#EAEAEA" stroke-width="3.5"/>
    <circle cx="42" cy="-24" r="10" fill="#EAEAEA" stroke-width="3.5"/>
    <ellipse cx="0" cy="4" rx="8" ry="32" fill="#000000"/>
    <path d="M -4 -26 Q -18 -54, -30 -50 M 4 -26 Q 18 -54, 30 -50" fill="none" stroke-width="4"/>
  </g>
</svg>`,
  },
  {
    id: "cartoon-snail",
    label: "Snail (ခရု)",
    category: "cartoon",
    defaultWidthPct: 17,
    aspectRatio: 1.3,
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 170">
  <g stroke="#000000" stroke-linecap="round" stroke-linejoin="round">
    <path d="M 24 142 Q 100 116, 174 130 Q 198 136, 190 152 Q 100 160, 24 152 Z" fill="#FFFFFF" stroke-width="5"/>
    <circle cx="102" cy="96" r="46" fill="#FFFFFF" stroke-width="5.2"/>
    <path d="M 102 96 m -7 0 a 7 7 0 1 0 14 0 a 14 14 0 1 0 -28 0 a 22 22 0 1 0 44 0" fill="none" stroke-width="4.2"/>
    <path d="M 168 128 L 178 98 M 182 130 L 196 102" fill="none" stroke-width="4"/>
    <circle cx="179" cy="95" r="4.5" fill="#000000"/>
    <circle cx="197" cy="100" r="4.5" fill="#000000"/>
  </g>
</svg>`,
  },
  {
    id: "cartoon-house",
    label: "House (အိမ်)",
    category: "cartoon",
    defaultWidthPct: 22,
    aspectRatio: 1.1,
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 200">
  <g stroke="#000000" stroke-linecap="round" stroke-linejoin="round">
    <rect x="38" y="88" width="144" height="96" fill="#FFFFFF" stroke-width="5.2"/>
    <polygon points="20,90 110,20 200,90" fill="#EAEAEA" stroke-width="5.2"/>
    <rect x="144" y="30" width="22" height="36" fill="#FFFFFF" stroke-width="4.5"/>
    <rect x="90" y="124" width="40" height="60" rx="4" fill="#FFFFFF" stroke-width="4.5"/>
    <circle cx="122" cy="154" r="3.5" fill="#000000"/>
    <rect x="50" y="110" width="28" height="28" fill="#FFFFFF" stroke-width="4"/>
    <line x1="64" y1="110" x2="64" y2="138" stroke-width="3"/>
    <line x1="50" y1="124" x2="78" y2="124" stroke-width="3"/>
    <rect x="142" y="110" width="28" height="28" fill="#FFFFFF" stroke-width="4"/>
    <line x1="156" y1="110" x2="156" y2="138" stroke-width="3"/>
    <line x1="142" y1="124" x2="170" y2="124" stroke-width="3"/>
  </g>
</svg>`,
  },
  {
    id: "cartoon-tree",
    label: "Tree (အပင်)",
    category: "cartoon",
    defaultWidthPct: 20,
    aspectRatio: 0.85,
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 210">
  <g stroke="#000000" stroke-linecap="round" stroke-linejoin="round">
    <path d="M 76 196 L 80 120 L 100 120 L 104 196 Z" fill="#FFFFFF" stroke-width="5"/>
    <circle cx="90" cy="72" r="46" fill="#FFFFFF" stroke-width="5"/>
    <circle cx="52" cy="96" r="34" fill="#FFFFFF" stroke-width="5"/>
    <circle cx="128" cy="96" r="34" fill="#FFFFFF" stroke-width="5"/>
    <circle cx="90" cy="100" r="36" fill="#FFFFFF" stroke-width="4.5"/>
  </g>
</svg>`,
  },
  {
    id: "cartoon-rainbow",
    label: "Rainbow (သက်တံ)",
    category: "cartoon",
    defaultWidthPct: 28,
    aspectRatio: 1.7,
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 260 150">
  <g stroke="#000000" stroke-linecap="round" stroke-linejoin="round" fill="none">
    <path d="M 30 126 A 100 100 0 0 1 230 126" stroke-width="5"/>
    <path d="M 48 126 A 82 82 0 0 1 212 126" stroke-width="4.5"/>
    <path d="M 66 126 A 64 64 0 0 1 194 126" stroke-width="4.5"/>
    <path d="M 84 126 A 46 46 0 0 1 176 126" stroke-width="4.5"/>
    <path d="M 18 134 C 10 134, 6 124, 14 116 C 18 106, 34 106, 40 114 C 48 110, 62 116, 62 126 C 62 132, 56 134, 48 134 Z" fill="#FFFFFF" stroke-width="4.5"/>
    <path d="M 206 134 C 198 134, 194 124, 202 116 C 206 106, 222 106, 228 114 C 236 110, 250 116, 250 126 C 250 132, 244 134, 236 134 Z" fill="#FFFFFF" stroke-width="4.5"/>
  </g>
</svg>`,
  },
  {
    id: "cartoon-flower",
    label: "Flower (ပန်း)",
    category: "cartoon",
    defaultWidthPct: 14,
    aspectRatio: 0.9,
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 180">
  <g stroke="#000000" stroke-linecap="round" stroke-linejoin="round">
    <path d="M 80 86 L 80 168" fill="none" stroke-width="5"/>
    <path d="M 80 136 Q 52 120, 44 138 Q 62 150, 80 136 Z" fill="#FFFFFF" stroke-width="4.5"/>
    <circle cx="80" cy="40" r="18" fill="#FFFFFF" stroke-width="4.5"/>
    <circle cx="110" cy="60" r="18" fill="#FFFFFF" stroke-width="4.5"/>
    <circle cx="100" cy="92" r="18" fill="#FFFFFF" stroke-width="4.5"/>
    <circle cx="60" cy="92" r="18" fill="#FFFFFF" stroke-width="4.5"/>
    <circle cx="50" cy="60" r="18" fill="#FFFFFF" stroke-width="4.5"/>
    <circle cx="80" cy="68" r="17" fill="#EAEAEA" stroke-width="4.5"/>
  </g>
</svg>`,
  },
  {
    id: "cartoon-dove",
    label: "Dove (ငှက်)",
    category: "cartoon",
    defaultWidthPct: 16,
    aspectRatio: 1.25,
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 160">
  <g stroke="#000000" stroke-linecap="round" stroke-linejoin="round">
    <path d="M 45 104 C 65 82, 108 78, 134 92 C 148 74, 168 78, 164 96 L 178 100 L 162 108 C 146 132, 92 138, 52 120 L 22 132 L 38 112 L 20 102 Z" fill="#FFFFFF" stroke-width="4.8"/>
    <path d="M 78 88 C 68 48, 96 24, 122 36 C 118 56, 114 74, 112 86" fill="#FFFFFF" stroke-width="4.8"/>
    <circle cx="152" cy="90" r="3.5" fill="#000000"/>
  </g>
</svg>`,
  },
  {
    id: "sticker-speech",
    label: "Speech Bubble",
    category: "sticker",
    defaultWidthPct: 22,
    aspectRatio: 1.35,
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 175">
  <path d="M 32 22 L 208 22 Q 226 22, 226 40 L 226 114 Q 226 132, 208 132 L 96 132 L 58 162 L 68 132 L 32 132 Q 14 132, 14 114 L 14 40 Q 14 22, 32 22 Z" fill="#FFFFFF" stroke="#000000" stroke-width="5.5" stroke-linejoin="round"/>
</svg>`,
  },
  {
    id: "sticker-star",
    label: "Star Sticker (ကြယ်)",
    category: "sticker",
    defaultWidthPct: 14,
    aspectRatio: 1,
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 180">
  <polygon points="90,14 112,64 166,68 124,104 138,158 90,128 42,158 56,104 14,68 68,64" fill="#FFFFFF" stroke="#000000" stroke-width="5.5" stroke-linejoin="round"/>
  <circle cx="78" cy="86" r="4" fill="#000000"/>
  <circle cx="102" cy="86" r="4" fill="#000000"/>
  <path d="M 80 100 Q 90 110, 100 100" fill="none" stroke="#000000" stroke-width="4" stroke-linecap="round"/>
</svg>`,
  },
  {
    id: "sticker-heart",
    label: "Heart Sticker",
    category: "sticker",
    defaultWidthPct: 14,
    aspectRatio: 1.05,
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 170">
  <path d="M 90 150 C 40 118, 16 86, 16 56 C 16 32, 36 16, 58 16 C 74 16, 84 26, 90 36 C 96 26, 106 16, 122 16 C 144 16, 164 32, 164 56 C 164 86, 140 118, 90 150 Z" fill="#FFFFFF" stroke="#000000" stroke-width="5.5" stroke-linejoin="round"/>
</svg>`,
  },
  {
    id: "sticker-crown",
    label: "Crown Sticker",
    category: "sticker",
    defaultWidthPct: 16,
    aspectRatio: 1.35,
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 150">
  <g stroke="#000000" stroke-linecap="round" stroke-linejoin="round">
    <polygon points="24,120 18,44 62,82 100,26 138,82 182,44 176,120" fill="#FFFFFF" stroke-width="5.5"/>
    <rect x="24" y="120" width="152" height="18" rx="4" fill="#EAEAEA" stroke-width="5"/>
    <circle cx="18" cy="38" r="7" fill="#FFFFFF" stroke-width="4"/>
    <circle cx="100" cy="20" r="8" fill="#FFFFFF" stroke-width="4"/>
    <circle cx="182" cy="38" r="7" fill="#FFFFFF" stroke-width="4"/>
  </g>
</svg>`,
  },
  {
    id: "sticker-banner",
    label: "Ribbon Banner",
    category: "sticker",
    defaultWidthPct: 26,
    aspectRatio: 2.6,
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 260 100">
  <g stroke="#000000" stroke-linejoin="round">
    <polygon points="10,30 46,30 46,74 10,74 24,52" fill="#EAEAEA" stroke-width="4.5"/>
    <polygon points="250,30 214,30 214,74 250,74 236,52" fill="#EAEAEA" stroke-width="4.5"/>
    <rect x="40" y="18" width="180" height="54" rx="8" fill="#FFFFFF" stroke-width="5"/>
  </g>
</svg>`,
  },
];

export const EMOJI_STICKERS: { emoji: string; label: string }[] = [
  { emoji: "☀️", label: "Sun" },
  { emoji: "☁️", label: "Cloud" },
  { emoji: "🌈", label: "Rainbow" },
  { emoji: "🐇", label: "Rabbit" },
  { emoji: "🐘", label: "Elephant" },
  { emoji: "🦋", label: "Butterfly" },
  { emoji: "🐌", label: "Snail" },
  { emoji: "🏠", label: "House" },
  { emoji: "🌳", label: "Tree" },
  { emoji: "🌸", label: "Flower" },
  { emoji: "⭐", label: "Star" },
  { emoji: "❤️", label: "Heart" },
  { emoji: "🕊️", label: "Dove" },
  { emoji: "🌙", label: "Moon" },
  { emoji: "👑", label: "Crown" },
  { emoji: "✨", label: "Sparkle" },
  { emoji: "😊", label: "Smile" },
  { emoji: "🎨", label: "Palette" },
];
