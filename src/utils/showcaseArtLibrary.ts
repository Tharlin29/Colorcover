import { ShowcaseCardSlot, ShowcaseDesignConfig } from "../types/studio";
import { svgToDataUrl } from "./stickerLibrary";

// ---------------------------------------------------------------------------
// 1. Handprint Craft Card SVGs (Inspired by Festive Keepsake Craft Pin)
// ---------------------------------------------------------------------------

function reindeerKraftSvg(): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 680" width="500" height="680">
  <rect width="500" height="680" fill="#C9A37E"/>
  <g stroke="#FFFFFF" stroke-width="2.5" stroke-linecap="round" opacity="0.72">
    <path d="M70 70 v32 M54 86 h32 M58 74 l24 24 M82 74 l-24 24"/>
    <path d="M415 110 v32 M399 126 h32 M403 114 l24 24 M427 114 l-24 24"/>
    <path d="M90 545 v28 M76 559 h28 M80 549 l20 20 M100 549 l-20 20"/>
    <path d="M420 515 v30 M405 530 h30 M409 519 l22 22 M431 519 l-22 22"/>
    <circle cx="150" cy="45" r="3" fill="#FFF"/><circle cx="350" cy="60" r="3" fill="#FFF"/>
    <circle cx="55" cy="360" r="3" fill="#FFF"/><circle cx="445" cy="320" r="3" fill="#FFF"/>
  </g>
  <!-- Handprint Antlers + Face -->
  <g fill="#6D381E">
    <rect x="115" y="165" width="38" height="145" rx="19" transform="rotate(-24 134 235)"/>
    <rect x="180" y="102" width="40" height="165" rx="20" transform="rotate(-10 200 185)"/>
    <rect x="242" y="90" width="42" height="175" rx="21"/>
    <rect x="304" y="114" width="40" height="158" rx="20" transform="rotate(11 324 190)"/>
    <rect x="358" y="218" width="36" height="132" rx="18" transform="rotate(34 376 284)"/>
    <ellipse cx="250" cy="342" rx="115" ry="102"/>
  </g>
  <!-- Googly Eyes -->
  <circle cx="206" cy="296" r="23" fill="#FFFFFF" stroke="#451A03" stroke-width="2"/>
  <circle cx="210" cy="300" r="11" fill="#111113"/>
  <circle cx="292" cy="296" r="23" fill="#FFFFFF" stroke="#451A03" stroke-width="2"/>
  <circle cx="288" cy="300" r="11" fill="#111113"/>
  <!-- Red Pom-Pom Nose & Smile -->
  <circle cx="250" cy="348" r="29" fill="#DC2626"/>
  <circle cx="241" cy="338" r="8" fill="#FCA5A5" opacity="0.7"/>
  <path d="M210 388 Q250 422 290 388" fill="none" stroke="#1F1209" stroke-width="6" stroke-linecap="round"/>
  <!-- Red-White Twine Bow + Gold Bell -->
  <g transform="translate(250 482)">
    <path d="M0 0 C-58 -36 -82 8 -20 12 Z" fill="none" stroke="#B91C1C" stroke-width="11" stroke-linejoin="round"/>
    <path d="M0 0 C-58 -36 -82 8 -20 12 Z" fill="none" stroke="#FFFFFF" stroke-width="5" stroke-dasharray="10 10"/>
    <path d="M0 0 C58 -36 82 8 20 12 Z" fill="none" stroke="#B91C1C" stroke-width="11" stroke-linejoin="round"/>
    <path d="M0 0 C58 -36 82 8 20 12 Z" fill="none" stroke="#FFFFFF" stroke-width="5" stroke-dasharray="10 10"/>
    <path d="M-8 6 L-46 68 M8 6 L46 68" stroke="#B91C1C" stroke-width="8" stroke-linecap="round"/>
    <path d="M-8 6 L-46 68 M8 6 L46 68" stroke="#FFFFFF" stroke-width="4" stroke-dasharray="8 8" stroke-linecap="round"/>
    <circle cx="0" cy="18" r="16" fill="#FBBF24" stroke="#92400E" stroke-width="3"/>
    <circle cx="-5" cy="13" r="4" fill="#FEF9C3"/>
  </g>
</svg>`;
}

function treeHandprintWhiteSvg(): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 680" width="500" height="680">
  <rect width="500" height="680" fill="#FAF8F4"/>
  <!-- Gold Stars -->
  <g stroke="#CA8A04" stroke-width="3.5" stroke-linecap="round">
    <path d="M88 145 v28 M74 159 h28 M78 149 l20 20 M98 149 l-20 20"/>
    <path d="M402 155 v28 M388 169 h28 M392 159 l20 20 M412 159 l-20 20"/>
    <path d="M90 505 v26 M77 518 h26 M81 509 l18 18 M99 509 l-18 18"/>
    <path d="M406 498 v26 M393 511 h26 M397 502 l18 18 M415 502 l-18 18"/>
  </g>
  <!-- Trunk -->
  <rect x="220" y="505" width="60" height="82" rx="8" fill="#7C4A26"/>
  <!-- Upside-Down Green Handprint Tree -->
  <g fill="#16A34A">
    <ellipse cx="250" cy="300" rx="108" ry="125"/>
    <rect x="108" y="348" width="38" height="150" rx="19" transform="rotate(24 127 423)"/>
    <rect x="172" y="370" width="40" height="160" rx="20" transform="rotate(10 192 450)"/>
    <rect x="230" y="382" width="42" height="162" rx="21"/>
    <rect x="292" y="370" width="40" height="158" rx="20" transform="rotate(-10 312 448)"/>
    <rect x="355" y="346" width="38" height="145" rx="19" transform="rotate(-24 374 418)"/>
  </g>
  <!-- Pom-Pom Ornaments -->
  <circle cx="250" cy="235" r="18" fill="#EF4444"/>
  <circle cx="204" cy="295" r="17" fill="#FACC15"/>
  <circle cx="302" cy="302" r="18" fill="#38BDF8"/>
  <circle cx="255" cy="355" r="17" fill="#EC4899"/>
  <circle cx="176" cy="402" r="17" fill="#10B981"/>
  <circle cx="322" cy="410" r="17" fill="#EF4444"/>
  <circle cx="248" cy="455" r="17" fill="#FACC15"/>
  <!-- Gold Glitter Star -->
  <polygon points="250,76 266,118 310,120 275,148 288,192 250,166 212,192 225,148 190,120 234,118" fill="#FBBF24" stroke="#D97706" stroke-width="4"/>
</svg>`;
}

function twinReindeerSvg(): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 680" width="500" height="680">
  <rect width="500" height="680" fill="#FCFBF8"/>
  <!-- Hearts -->
  <path d="M250 185 C250 150 202 145 202 182 C202 214 250 245 250 245 C250 245 298 214 298 182 C298 145 250 150 250 185 Z" fill="none" stroke="#EF4444" stroke-width="6"/>
  <path d="M210 278 C210 264 190 262 190 278 C190 290 210 302 210 302 C210 302 230 290 230 278 C230 262 210 264 210 278 Z" fill="#EF4444"/>
  <path d="M292 292 C292 280 276 278 276 292 C276 302 292 312 292 312 C292 312 308 302 308 292 C308 278 292 280 292 292 Z" fill="#EF4444"/>
  <!-- Left Handprint Reindeer -->
  <g transform="translate(135 420)">
    <g fill="#854D27">
      <rect x="-118" y="-58" width="24" height="92" rx="12" transform="rotate(-68 -106 -12)"/>
      <rect x="-118" y="-12" width="24" height="92" rx="12" transform="rotate(-86 -106 34)"/>
      <rect x="-108" y="32" width="24" height="88" rx="12" transform="rotate(-108 -96 76)"/>
      <ellipse cx="0" cy="25" rx="68" ry="52"/>
      <ellipse cx="52" cy="-35" rx="34" ry="30"/>
    </g>
    <path d="M35 -60 L20 -115 M27 -88 L8 -96 M55 -62 L58 -118 M56 -88 L75 -98" stroke="#451A03" stroke-width="5" stroke-linecap="round"/>
    <circle cx="54" cy="-38" r="13" fill="#FFF"/><circle cx="58" cy="-38" r="6" fill="#111"/>
    <circle cx="84" cy="-26" r="11" fill="#DC2626"/>
    <path d="M-28 70 L-32 135 M-4 72 L-4 135 M22 72 L24 135 M44 68 L50 135" stroke="#292524" stroke-width="6" stroke-linecap="round"/>
  </g>
  <!-- Right Handprint Reindeer -->
  <g transform="translate(365 420) scale(-1 1)">
    <g fill="#854D27">
      <rect x="-118" y="-58" width="24" height="92" rx="12" transform="rotate(-68 -106 -12)"/>
      <rect x="-118" y="-12" width="24" height="92" rx="12" transform="rotate(-86 -106 34)"/>
      <rect x="-108" y="32" width="24" height="88" rx="12" transform="rotate(-108 -96 76)"/>
      <ellipse cx="0" cy="25" rx="68" ry="52"/>
      <ellipse cx="52" cy="-35" rx="34" ry="30"/>
    </g>
    <path d="M35 -60 L20 -115 M27 -88 L8 -96 M55 -62 L58 -118 M56 -88 L75 -98" stroke="#451A03" stroke-width="5" stroke-linecap="round"/>
    <circle cx="54" cy="-38" r="13" fill="#FFF"/><circle cx="58" cy="-38" r="6" fill="#111"/>
    <circle cx="84" cy="-26" r="11" fill="#DC2626"/>
    <path d="M-28 70 L-32 135 M-4 72 L-4 135 M22 72 L24 135 M44 68 L50 135" stroke="#292524" stroke-width="6" stroke-linecap="round"/>
  </g>
</svg>`;
}

function santaHandprintKraftSvg(): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 680" width="500" height="680">
  <rect width="500" height="680" fill="#CCA882"/>
  <g stroke="#FFFFFF" stroke-width="2.5" stroke-linecap="round" opacity="0.65">
    <path d="M72 185 v24 M60 197 h24 M64 189 l16 16 M80 189 l-16 16"/>
    <path d="M425 235 v26 M412 248 h26 M416 239 l18 18 M434 239 l-18 18"/>
  </g>
  <!-- Red Handprint Suit & Hat -->
  <g fill="#DC2626">
    <path d="M162 245 Q245 78 345 142 Q325 225 320 265 Z"/>
    <ellipse cx="248" cy="395" rx="102" ry="88"/>
    <rect x="132" y="425" width="38" height="145" rx="19" transform="rotate(14 151 497)"/>
    <rect x="195" y="445" width="40" height="155" rx="20"/>
    <rect x="258" y="448" width="40" height="155" rx="20"/>
    <rect x="318" y="428" width="38" height="142" rx="19" transform="rotate(-14 337 499)"/>
  </g>
  <!-- Hat Pom-Pom -->
  <circle cx="352" cy="145" r="28" fill="#FFFFFF"/>
  <!-- Face -->
  <ellipse cx="248" cy="296" rx="68" ry="52" fill="#FDE68A"/>
  <!-- Googly Eyes & Red Nose -->
  <circle cx="220" cy="285" r="16" fill="#FFF" stroke="#444" stroke-width="2"/>
  <circle cx="222" cy="287" r="7" fill="#111"/>
  <circle cx="276" cy="285" r="16" fill="#FFF" stroke="#444" stroke-width="2"/>
  <circle cx="274" cy="287" r="7" fill="#111"/>
  <circle cx="248" cy="316" r="16" fill="#EF4444"/>
  <!-- Cotton Trim & Fluffy Beard -->
  <g fill="#FFFFFF">
    <circle cx="168" cy="248" r="24"/><circle cx="204" cy="240" r="25"/><circle cx="248" cy="236" r="26"/>
    <circle cx="292" cy="240" r="25"/><circle cx="328" cy="248" r="24"/>
    <circle cx="152" cy="322" r="28"/><circle cx="176" cy="368" r="32"/><circle cx="212" cy="398" r="34"/>
    <circle cx="250" cy="408" r="36"/><circle cx="288" cy="398" r="34"/><circle cx="324" cy="368" r="32"/>
    <circle cx="346" cy="322" r="28"/><circle cx="218" cy="352" r="26"/><circle cx="278" cy="352" r="26"/>
  </g>
</svg>`;
}

function snowmanHandprintBlueSvg(): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 680" width="500" height="680">
  <rect width="500" height="680" fill="#7AA1C7"/>
  <g stroke="#FFFFFF" stroke-width="2.5" stroke-linecap="round" opacity="0.78">
    <path d="M85 110 v28 M71 124 h28 M75 114 l20 20 M95 114 l-20 20"/>
    <path d="M405 140 v32 M389 156 h32 M393 144 l24 24 M417 144 l-24 24"/>
    <path d="M412 410 v28 M398 424 h28 M402 414 l20 20 M422 414 l-20 20"/>
    <path d="M82 475 v26 M69 488 h26 M73 479 l18 18 M91 479 l-18 18"/>
  </g>
  <!-- White Handprint Body -->
  <g fill="#F8FAFC">
    <ellipse cx="250" cy="290" rx="82" ry="74"/>
    <ellipse cx="250" cy="400" rx="102" ry="88"/>
    <rect x="132" y="428" width="38" height="145" rx="19" transform="rotate(14 151 500)"/>
    <rect x="195" y="446" width="40" height="156" rx="20"/>
    <rect x="260" y="446" width="40" height="156" rx="20"/>
    <rect x="322" y="426" width="38" height="145" rx="19" transform="rotate(-14 341 498)"/>
  </g>
  <!-- Top Hat -->
  <rect x="164" y="198" width="172" height="26" rx="8" fill="#18181B"/>
  <rect x="190" y="96" width="120" height="110" rx="8" fill="#18181B"/>
  <rect x="190" y="176" width="120" height="22" fill="#DC2626"/>
  <!-- Eyes, Carrot Nose & Smile -->
  <circle cx="224" cy="264" r="15" fill="#FFF" stroke="#334155" stroke-width="2"/><circle cx="226" cy="266" r="7" fill="#111"/>
  <circle cx="276" cy="264" r="15" fill="#FFF" stroke="#334155" stroke-width="2"/><circle cx="274" cy="266" r="7" fill="#111"/>
  <polygon points="248,284 316,298 248,310" fill="#F97316"/>
  <g fill="#18181B">
    <circle cx="222" cy="322" r="4"/><circle cx="236" cy="330" r="4"/><circle cx="252" cy="332" r="4"/>
    <circle cx="268" cy="328" r="4"/><circle cx="280" cy="320" r="4"/>
  </g>
  <!-- Polka-Dot Red Scarf -->
  <path d="M168 348 Q250 374 334 348 L342 384 Q250 408 162 382 Z" fill="#DC2626"/>
  <path d="M292 368 L372 442 L346 462 L272 386 Z" fill="#DC2626"/>
  <g fill="#FFFFFF" opacity="0.88">
    <circle cx="195" cy="368" r="5"/><circle cx="232" cy="378" r="5"/><circle cx="272" cy="378" r="5"/><circle cx="312" cy="366" r="5"/>
  </g>
  <!-- Buttons -->
  <circle cx="250" cy="415" r="11" fill="#18181B"/>
  <circle cx="250" cy="450" r="11" fill="#18181B"/>
  <circle cx="250" cy="485" r="11" fill="#18181B"/>
</svg>`;
}

function penguinHandprintSvg(): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 680" width="500" height="680">
  <rect width="500" height="680" fill="#F9F8F5"/>
  <g stroke="#3B82F6" stroke-width="3" stroke-linecap="round" opacity="0.72">
    <path d="M78 240 v30 M63 255 h30 M68 245 l20 20 M88 245 l-20 20"/>
    <path d="M412 200 v30 M397 215 h30 M402 205 l20 20 M422 205 l-20 20"/>
    <path d="M84 480 v28 M70 494 h28 M74 484 l20 20 M94 484 l-20 20"/>
  </g>
  <!-- Orange Feet -->
  <ellipse cx="212" cy="566" rx="34" ry="18" fill="#F97316"/>
  <ellipse cx="290" cy="566" rx="34" ry="18" fill="#F97316"/>
  <!-- Black Handprint Body -->
  <g fill="#18181B">
    <ellipse cx="250" cy="375" rx="95" ry="118"/>
    <circle cx="250" cy="245" r="78"/>
    <rect x="96" y="345" width="38" height="142" rx="19" transform="rotate(26 115 416)"/>
    <rect x="366" y="345" width="38" height="142" rx="19" transform="rotate(-26 385 416)"/>
    <rect x="192" y="458" width="36" height="106" rx="18"/>
    <rect x="272" y="458" width="36" height="106" rx="18"/>
  </g>
  <!-- White Belly -->
  <ellipse cx="250" cy="395" rx="64" ry="86" fill="#FFFFFF"/>
  <!-- Red Knit Beanie -->
  <circle cx="250" cy="112" r="24" fill="#DC2626"/>
  <path d="M174 205 Q182 122 250 122 Q318 122 326 205 Z" fill="#DC2626"/>
  <rect x="166" y="188" width="168" height="28" rx="14" fill="#B91C1C"/>
  <!-- Eyes & Orange Beak -->
  <circle cx="222" cy="248" r="18" fill="#FFF"/><circle cx="224" cy="250" r="8" fill="#111"/>
  <circle cx="278" cy="248" r="18" fill="#FFF"/><circle cx="276" cy="250" r="8" fill="#111"/>
  <polygon points="228,274 272,274 250,316" fill="#F97316"/>
</svg>`;
}

// ---------------------------------------------------------------------------
// 2. Hand-Colored Festive Coloring Page SVGs (Inspired by Coloring Pin)
// ---------------------------------------------------------------------------

function santaColoringSheetSvg(): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 640" width="500" height="640">
  <rect width="500" height="640" fill="#FFFFFF"/>
  <!-- Stars & Trees Background -->
  <g stroke="#111113" stroke-width="3.5" fill="#FEF08A">
    <polygon points="90,85 98,105 118,107 102,120 107,140 90,128 73,140 78,120 62,107 82,105"/>
    <polygon points="415,110 422,126 438,128 426,138 430,154 415,144 400,154 404,138 392,128 408,126"/>
  </g>
  <g stroke="#111113" stroke-width="3" fill="none">
    <polygon points="70,380 110,290 150,380"/>
    <polygon points="360,360 405,270 450,360"/>
  </g>
  <!-- Santa Claus -->
  <g stroke="#111113" stroke-width="5" stroke-linejoin="round" stroke-linecap="round">
    <path d="M160 185 Q245 70 345 128 Q325 180 315 215 Z" fill="#EF4444"/>
    <circle cx="355" cy="135" r="22" fill="#FFFFFF"/>
    <rect x="165" y="192" width="165" height="32" rx="16" fill="#FFFFFF"/>
    <circle cx="248" cy="252" r="56" fill="#FDE68A"/>
    <path d="M190 268 Q180 345 248 355 Q316 345 306 268 Q278 292 248 292 Q218 292 190 268 Z" fill="#FFFFFF"/>
    <circle cx="228" cy="245" r="5" fill="#111113"/>
    <circle cx="268" cy="245" r="5" fill="#111113"/>
    <circle cx="248" cy="264" r="10" fill="#FCA5A5"/>
    <!-- Coat -->
    <path d="M150 330 L345 330 L372 495 L125 495 Z" fill="#EF4444"/>
    <rect x="142" y="425" width="212" height="30" fill="#27272A"/>
    <rect x="226" y="418" width="44" height="44" rx="6" fill="#FBBF24"/>
    <!-- Boots -->
    <rect x="168" y="495" width="56" height="65" rx="12" fill="#27272A"/>
    <rect x="274" y="495" width="56" height="65" rx="12" fill="#27272A"/>
    <!-- Gift Box -->
    <rect x="85" y="340" width="95" height="82" rx="6" fill="#22C55E"/>
    <rect x="122" y="340" width="20" height="82" fill="#EF4444"/>
    <rect x="85" y="370" width="95" height="20" fill="#EF4444"/>
  </g>
</svg>`;
}

function snowmanColoringSheetSvg(): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 640" width="500" height="640">
  <rect width="500" height="640" fill="#FFFFFF"/>
  <!-- Snowflakes -->
  <g stroke="#111113" stroke-width="3" stroke-linecap="round">
    <path d="M90 120 v40 M70 140 h40 M76 126 l28 28 M104 126 l-28 28"/>
    <path d="M400 115 v40 M380 135 h40 M386 121 l28 28 M414 121 l-28 28"/>
  </g>
  <g stroke="#111113" stroke-width="5" stroke-linejoin="round" stroke-linecap="round">
    <!-- Stick Arms -->
    <path d="M155 375 L72 325 M95 340 L76 310" fill="none"/>
    <path d="M345 375 L428 325 M405 340 L424 310" fill="none"/>
    <!-- Snowman Circles -->
    <circle cx="250" cy="468" r="118" fill="#FFFFFF"/>
    <circle cx="250" cy="318" r="88" fill="#FFFFFF"/>
    <circle cx="250" cy="196" r="66" fill="#FFFFFF"/>
    <!-- Hat -->
    <rect x="164" y="138" width="172" height="24" rx="8" fill="#3F3F46"/>
    <rect x="192" y="56" width="116" height="84" rx="6" fill="#3F3F46"/>
    <rect x="192" y="114" width="116" height="22" fill="#EF4444"/>
    <!-- Face -->
    <circle cx="228" cy="184" r="6" fill="#111113"/>
    <circle cx="272" cy="184" r="6" fill="#111113"/>
    <polygon points="248,198 312,210 248,220" fill="#F97316"/>
    <!-- Striped Scarf -->
    <path d="M175 244 Q250 268 325 244 L334 282 Q250 304 168 280 Z" fill="#16A34A"/>
    <path d="M278 272 L345 360 L306 376 L248 286 Z" fill="#EF4444"/>
    <circle cx="250" cy="340" r="8" fill="#111113"/>
    <circle cx="250" cy="378" r="8" fill="#111113"/>
    <circle cx="250" cy="450" r="8" fill="#111113"/>
  </g>
</svg>`;
}

function treeColoringSheetSvg(): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 640" width="500" height="640">
  <rect width="500" height="640" fill="#FFFFFF"/>
  <g stroke="#111113" stroke-width="5" stroke-linejoin="round" stroke-linecap="round">
    <rect x="218" y="455" width="64" height="65" fill="#92400E"/>
    <polygon points="85,465 250,260 415,465" fill="#22C55E"/>
    <polygon points="118,350 250,175 382,350" fill="#22C55E"/>
    <polygon points="155,235 250,100 345,235" fill="#22C55E"/>
    <polygon points="250,42 264,78 302,80 272,102 282,138 250,116 218,138 228,102 198,80 236,78" fill="#FACC15"/>
    <!-- Ornaments -->
    <circle cx="250" cy="185" r="14" fill="#EF4444"/>
    <circle cx="205" cy="278" r="15" fill="#38BDF8"/>
    <circle cx="296" cy="284" r="15" fill="#FACC15"/>
    <circle cx="170" cy="400" r="16" fill="#EF4444"/>
    <circle cx="252" cy="382" r="16" fill="#F472B6"/>
    <circle cx="334" cy="412" r="16" fill="#FACC15"/>
    <!-- Gifts -->
    <rect x="92" y="485" width="90" height="75" rx="6" fill="#EF4444"/>
    <rect x="128" y="485" width="18" height="75" fill="#FACC15"/>
    <rect x="315" y="476" width="95" height="84" rx="6" fill="#3B82F6"/>
    <rect x="352" y="476" width="18" height="84" fill="#EF4444"/>
  </g>
</svg>`;
}

function reindeerColoringSheetSvg(): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 640" width="500" height="640">
  <rect width="500" height="640" fill="#FFFFFF"/>
  <g stroke="#111113" stroke-width="5" stroke-linejoin="round" stroke-linecap="round">
    <!-- Antlers -->
    <path d="M196 168 L145 80 M170 124 L132 115 M182 145 L195 92" fill="none" stroke-width="8"/>
    <path d="M304 168 L355 80 M330 124 L368 115 M318 145 L305 92" fill="none" stroke-width="8"/>
    <!-- Body -->
    <ellipse cx="250" cy="442" rx="95" ry="110" fill="#D99B66"/>
    <ellipse cx="250" cy="455" rx="55" ry="72" fill="#FEF3C7"/>
    <!-- Scarf -->
    <path d="M175 322 Q250 352 325 322 L332 365 Q250 392 168 365 Z" fill="#16A34A"/>
    <rect x="195" y="332" width="24" height="38" fill="#EF4444"/>
    <rect x="275" y="332" width="24" height="38" fill="#EF4444"/>
    <!-- Head -->
    <ellipse cx="250" cy="242" rx="92" ry="82" fill="#D99B66"/>
    <ellipse cx="152" cy="198" rx="34" ry="16" transform="rotate(-24 152 198)" fill="#D99B66"/>
    <ellipse cx="348" cy="198" rx="34" ry="16" transform="rotate(24 348 198)" fill="#D99B66"/>
    <ellipse cx="250" cy="272" rx="52" ry="38" fill="#FEF3C7"/>
    <circle cx="212" cy="222" r="9" fill="#111113"/>
    <circle cx="288" cy="222" r="9" fill="#111113"/>
    <circle cx="250" cy="264" r="18" fill="#EF4444"/>
    <path d="M232 292 Q250 306 268 292" fill="none"/>
  </g>
</svg>`;
}

function gingerbreadColoringSheetSvg(): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 640" width="500" height="640">
  <rect width="500" height="640" fill="#FFFFFF"/>
  <g stroke="#111113" stroke-width="5" stroke-linejoin="round" stroke-linecap="round">
    <rect x="335" y="135" width="46" height="82" fill="#EF4444"/>
    <rect x="105" y="300" width="290" height="235" fill="#D99B66"/>
    <polygon points="65,315 250,150 435,315" fill="#FFFFFF"/>
    <path d="M85 315 Q125 348 165 315 Q205 348 250 315 Q295 348 335 315 Q375 348 415 315" fill="#FFFFFF"/>
    <!-- Round Candy Window -->
    <circle cx="250" cy="252" r="36" fill="#EF4444"/>
    <circle cx="250" cy="252" r="20" fill="#FFFFFF"/>
    <!-- Door -->
    <path d="M205 535 L205 405 Q250 365 295 405 L295 535 Z" fill="#92400E"/>
    <circle cx="276" cy="472" r="7" fill="#FACC15"/>
    <!-- Side Windows -->
    <rect x="132" y="395" width="52" height="52" rx="6" fill="#FEF08A"/>
    <rect x="316" y="395" width="52" height="52" rx="6" fill="#FEF08A"/>
    <!-- Gumdrops -->
    <circle cx="145" cy="525" r="18" fill="#22C55E"/>
    <circle cx="355" cy="525" r="18" fill="#EC4899"/>
    <circle cx="185" cy="340" r="14" fill="#EF4444"/>
    <circle cx="315" cy="340" r="14" fill="#38BDF8"/>
  </g>
</svg>`;
}

// ---------------------------------------------------------------------------
// 3. Cute Animal & Botanical Pack SVGs
// ---------------------------------------------------------------------------

function cuteAnimalCardSvg(kind: "dino" | "bunny" | "lion" | "whale" | "rainbow" | "butterfly"): string {
  switch (kind) {
    case "dino":
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 640" width="500" height="640">
        <rect width="500" height="640" fill="#ECFDF5"/>
        <g stroke="#14532D" stroke-width="5" stroke-linejoin="round" stroke-linecap="round">
          <path d="M165 210 L145 170 L195 190 L225 145 L250 185 L295 160 L300 205" fill="#FACC15"/>
          <ellipse cx="255" cy="375" rx="115" ry="95" fill="#22C55E"/>
          <circle cx="220" cy="230" r="72" fill="#22C55E"/>
          <rect x="175" y="438" width="42" height="82" rx="14" fill="#22C55E"/>
          <rect x="275" y="438" width="42" height="82" rx="14" fill="#22C55E"/>
          <ellipse cx="258" cy="395" rx="65" ry="58" fill="#BBF7D0"/>
          <circle cx="202" cy="218" r="8" fill="#111113"/>
          <path d="M185 252 Q212 272 242 252" fill="none"/>
        </g>
      </svg>`;
    case "bunny":
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 640" width="500" height="640">
        <rect width="500" height="640" fill="#FFF1F2"/>
        <g stroke="#4C0519" stroke-width="5" stroke-linejoin="round">
          <ellipse cx="195" cy="170" rx="28" ry="88" transform="rotate(-10 195 170)" fill="#FFFFFF"/>
          <ellipse cx="305" cy="170" rx="28" ry="88" transform="rotate(10 305 170)" fill="#FFFFFF"/>
          <ellipse cx="195" cy="178" rx="14" ry="56" transform="rotate(-10 195 178)" fill="#FDA4AF"/>
          <ellipse cx="305" cy="178" rx="14" ry="56" transform="rotate(10 305 178)" fill="#FDA4AF"/>
          <ellipse cx="250" cy="435" rx="88" ry="95" fill="#FFFFFF"/>
          <circle cx="250" cy="292" r="82" fill="#FFFFFF"/>
          <circle cx="220" cy="282" r="8" fill="#111113"/>
          <circle cx="280" cy="282" r="8" fill="#111113"/>
          <ellipse cx="250" cy="306" rx="12" ry="9" fill="#FB7185"/>
        </g>
      </svg>`;
    case "lion":
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 640" width="500" height="640">
        <rect width="500" height="640" fill="#FEFCE8"/>
        <g stroke="#451A03" stroke-width="5" stroke-linejoin="round">
          <circle cx="250" cy="278" r="128" fill="#EA580C"/>
          <ellipse cx="250" cy="462" rx="82" ry="88" fill="#FBBF24"/>
          <circle cx="250" cy="278" r="86" fill="#FBBF24"/>
          <circle cx="222" cy="264" r="8" fill="#111113"/>
          <circle cx="278" cy="264" r="8" fill="#111113"/>
          <polygon points="236,288 264,288 250,306" fill="#451A03"/>
        </g>
      </svg>`;
    case "whale":
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 640" width="500" height="640">
        <rect width="500" height="640" fill="#EFF6FF"/>
        <g stroke="#1E3A8A" stroke-width="5" stroke-linejoin="round" stroke-linecap="round">
          <path d="M250 185 Q225 110 185 130 M250 185 Q275 110 315 130" fill="none" stroke="#38BDF8" stroke-width="8"/>
          <ellipse cx="245" cy="335" rx="135" ry="92" fill="#38BDF8"/>
          <path d="M365 335 Q435 280 452 320 Q430 350 380 355 Q430 380 440 415 Q395 415 365 365 Z" fill="#38BDF8"/>
          <ellipse cx="235" cy="378" rx="95" ry="42" fill="#E0F2FE"/>
          <circle cx="178" cy="322" r="8" fill="#111113"/>
        </g>
      </svg>`;
    case "rainbow":
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 640" width="500" height="640">
        <rect width="500" height="640" fill="#F0F9FF"/>
        <g fill="none" stroke-width="26" stroke-linecap="round">
          <path d="M90 380 A160 160 0 0 1 410 380" stroke="#EF4444"/>
          <path d="M116 380 A134 134 0 0 1 384 380" stroke="#FBBF24"/>
          <path d="M142 380 A108 108 0 0 1 358 380" stroke="#22C55E"/>
          <path d="M168 380 A82 82 0 0 1 332 380" stroke="#3B82F6"/>
        </g>
        <g fill="#FFFFFF" stroke="#0284C7" stroke-width="4">
          <circle cx="115" cy="395" r="42"/><circle cx="155" cy="385" r="36"/><circle cx="78" cy="402" r="32"/>
          <circle cx="385" cy="395" r="42"/><circle cx="345" cy="385" r="36"/><circle cx="422" cy="402" r="32"/>
        </g>
      </svg>`;
    case "butterfly":
    default:
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 640" width="500" height="640">
        <rect width="500" height="640" fill="#FAF5FF"/>
        <g stroke="#581C87" stroke-width="5" stroke-linejoin="round">
          <ellipse cx="165" cy="255" rx="92" ry="72" transform="rotate(-18 165 255)" fill="#F472B6"/>
          <ellipse cx="335" cy="255" rx="92" ry="72" transform="rotate(18 335 255)" fill="#F472B6"/>
          <ellipse cx="180" cy="385" rx="70" ry="56" transform="rotate(16 180 385)" fill="#C084FC"/>
          <ellipse cx="320" cy="385" rx="70" ry="56" transform="rotate(-16 320 385)" fill="#C084FC"/>
          <circle cx="155" cy="245" r="26" fill="#FEF08A"/>
          <circle cx="345" cy="245" r="26" fill="#FEF08A"/>
          <ellipse cx="250" cy="330" rx="18" ry="96" fill="#4C1D95"/>
        </g>
      </svg>`;
  }
}

export const ART_CARD_PACKS: {
  id: string;
  label: string;
  cards: ShowcaseCardSlot[];
}[] = [
  {
    id: "christmas-handprints",
    label: "Christmas Handprint Crafts (6 Cards)",
    cards: [
      { id: "hp-1", label: "Reindeer Kraft", src: svgToDataUrl(reindeerKraftSvg()), paper: "kraft" },
      { id: "hp-2", label: "Handprint Tree", src: svgToDataUrl(treeHandprintWhiteSvg()), paper: "white" },
      { id: "hp-3", label: "Twin Reindeers", src: svgToDataUrl(twinReindeerSvg()), paper: "white" },
      { id: "hp-4", label: "Santa Handprint", src: svgToDataUrl(santaHandprintKraftSvg()), paper: "kraft" },
      { id: "hp-5", label: "Snowman Card", src: svgToDataUrl(snowmanHandprintBlueSvg()), paper: "pastel-blue" },
      { id: "hp-6", label: "Penguin Card", src: svgToDataUrl(penguinHandprintSvg()), paper: "white" },
    ],
  },
  {
    id: "christmas-coloring",
    label: "Festive Coloring Pages (5 Sheets)",
    cards: [
      { id: "cc-1", label: "Santa Gift", src: svgToDataUrl(santaColoringSheetSvg()), paper: "white" },
      { id: "cc-2", label: "Jolly Snowman", src: svgToDataUrl(snowmanColoringSheetSvg()), paper: "white" },
      { id: "cc-3", label: "Christmas Tree", src: svgToDataUrl(treeColoringSheetSvg()), paper: "white" },
      { id: "cc-4", label: "Cute Reindeer", src: svgToDataUrl(reindeerColoringSheetSvg()), paper: "white" },
      { id: "cc-5", label: "Gingerbread House", src: svgToDataUrl(gingerbreadColoringSheetSvg()), paper: "white" },
      { id: "cc-6", label: "Snowman Handprint", src: svgToDataUrl(snowmanHandprintBlueSvg()), paper: "white" },
    ],
  },
  {
    id: "kids-animals",
    label: "Cute Animals & Kids Fun (6 Cards)",
    cards: [
      { id: "ka-1", label: "Happy Dino", src: svgToDataUrl(cuteAnimalCardSvg("dino")), paper: "white" },
      { id: "ka-2", label: "Sweet Bunny", src: svgToDataUrl(cuteAnimalCardSvg("bunny")), paper: "white" },
      { id: "ka-3", label: "Friendly Lion", src: svgToDataUrl(cuteAnimalCardSvg("lion")), paper: "white" },
      { id: "ka-4", label: "Ocean Whale", src: svgToDataUrl(cuteAnimalCardSvg("whale")), paper: "white" },
      { id: "ka-5", label: "Rainbow Sky", src: svgToDataUrl(cuteAnimalCardSvg("rainbow")), paper: "white" },
      { id: "ka-6", label: "Butterfly", src: svgToDataUrl(cuteAnimalCardSvg("butterfly")), paper: "white" },
    ],
  },
];

export interface ShowcaseDesignPreset {
  id: string;
  label: string;
  badge: string;
  config: ShowcaseDesignConfig;
}

export const SHOWCASE_DESIGN_PRESETS: ShowcaseDesignPreset[] = [
  {
    id: "craft-plaque-25",
    label: "25 Keepsake Crafts (6-Card Plaque)",
    badge: "Craft Pin",
    config: {
      aspect: "9:16",
      layout: "center-plaque-6",
      backdrop: "craft-table-lights",
      plaqueStyle: "wood-plaque",
      accentBadge: "25",
      titleLine1: "Cutest",
      titleLine2Ribbon: "Christmas Handprint",
      titleLine3: "Crafts for Kids",
      subtitleText: "Easy Keepsakes",
      footerBrandText: "",
      primaryColor: "#DC2626",
      secondaryColor: "#14532D",
      ribbonColor: "#DC2626",
      subtitleBgColor: "#14532D",
      subtitleTextColor: "#FFFFFF",
      footerBgColor: "#DC2626",
      fontFamily: "'Fredoka', 'Padauk', sans-serif",
      decorTheme: "christmas",
      showCardCaptions: false,
      cards: ART_CARD_PACKS[0].cards,
    },
  },
  {
    id: "coloring-showcase-5",
    label: "Coloring Pages Showcase (Top Banner + 5 Fan)",
    badge: "Coloring Pin",
    config: {
      aspect: "9:16",
      layout: "top-banner-5",
      backdrop: "festive-pine-desk",
      plaqueStyle: "cloud-sticker",
      accentBadge: "",
      titleLine1: "Christmas",
      titleLine2Ribbon: "Coloring Pages",
      titleLine3: "for Kids",
      subtitleText: "Print, color, and celebrate!",
      footerBrandText: "LuminaStudio.com",
      primaryColor: "#DC2626",
      secondaryColor: "#15803D",
      ribbonColor: "#15803D",
      subtitleBgColor: "#FDE047",
      subtitleTextColor: "#1C1917",
      footerBgColor: "#DC2626",
      fontFamily: "'Fredoka', 'Padauk', sans-serif",
      decorTheme: "christmas",
      showCardCaptions: false,
      cards: ART_CARD_PACKS[1].cards,
    },
  },
  {
    id: "spring-animals-pack",
    label: "Kids Animal Coloring & Activity Pack",
    badge: "Spring Pack",
    config: {
      aspect: "9:16",
      layout: "top-banner-5",
      backdrop: "spring-botanical-oak",
      plaqueStyle: "cloud-sticker",
      accentBadge: "30",
      titleLine1: "Adorable",
      titleLine2Ribbon: "Animal Coloring",
      titleLine3: "Pages for Kids",
      subtitleText: "Bold & Easy Printables",
      footerBrandText: "LuminaStudio.com",
      primaryColor: "#0EA5E9",
      secondaryColor: "#15803D",
      ribbonColor: "#0284C7",
      subtitleBgColor: "#FACC15",
      subtitleTextColor: "#1E293B",
      footerBgColor: "#0F766E",
      fontFamily: "'Fredoka', 'Padauk', sans-serif",
      decorTheme: "botanical",
      showCardCaptions: false,
      cards: ART_CARD_PACKS[2].cards,
    },
  },
  {
    id: "myanmar-creative-bundle",
    label: "Myanmar Kids Coloring Showcase",
    badge: "Myanmar",
    config: {
      aspect: "2:3",
      layout: "center-plaque-6",
      backdrop: "pastel-kids-desk",
      plaqueStyle: "wood-plaque",
      accentBadge: "",
      titleLine1: "ကလေးများအတွက်",
      titleLine2Ribbon: "Coloring Book စုစည်းမှု",
      titleLine3: "ပုံဆွဲစာအုပ်ဒီဇိုင်း",
      subtitleText: "ပျော်ရွှင်စွာ ဆေးခြယ်ကြမယ်",
      footerBrandText: "Lumina Studio",
      primaryColor: "#E11D48",
      secondaryColor: "#1D4ED8",
      ribbonColor: "#2563EB",
      subtitleBgColor: "#F59E0B",
      subtitleTextColor: "#FFFFFF",
      footerBgColor: "#E11D48",
      fontFamily: "'Padauk', 'Noto Sans Myanmar', sans-serif",
      decorTheme: "stars",
      showCardCaptions: false,
      cards: ART_CARD_PACKS[2].cards,
    },
  },
];
