export type PageId = "home" | "create" | "ai-edit" | "book" | "text";

export type CreationMode = "coloring-book" | "standard";
export type BookPageSize = "us-letter" | "a4";
export type PrintDpi = 300 | 350;
export type ColoringColorMode = "bw" | "grayscale";

export type AspectRatio = "1:1" | "4:3" | "16:9" | "3:4" | "9:16";

export type MoodPreset =
  | "Editorial Film"
  | "Golden Hour"
  | "Cyber Noir"
  | "Watercolor Mist"
  | "Minimalist Arch";

export interface PhotoAdjustments {
  brightness: number; // 50 to 150 (100 default)
  contrast: number; // 50 to 150 (100 default)
  saturation: number; // 0 to 200 (100 default)
  warmth: number; // -50 to 50 (0 default)
  vignette: number; // 0 to 100 (0 default)
  filter: "original" | "warm-film" | "mono" | "vivid" | "noir" | "sunset";
  rotation: number; // 0, 90, 180, 270
  flipH: boolean;
}

export interface PhotoItem {
  id: string;
  title: string;
  prompt: string;
  dataUrl: string;
  width: number;
  height: number;
  aspectRatio: string;
  mood?: string;
  dpi?: number;
  pageSize?: BookPageSize;
  colorMode?: ColoringColorMode;
  isColoringPage?: boolean;
  kind: "coloring" | "generated" | "uploaded" | "edited" | "text-art" | "curated";
  createdAt: number;
  updatedAt: number;
}

export type TextStylePreset =
  | "clean"
  | "shadow"
  | "neon"
  | "outline"
  | "pill-box"
  | "block-3d"
  | "gradient"
  | "quote-bar"
  | "comic-3d"
  | "banner-pill"
  | "ribbon-scroll";

export type TextCanvasAspect = "auto" | "2:3" | "4:5" | "1:1" | "4:3" | "16:9";

export type TextImageFrameStyle = "plain" | "book-cover" | "tilt-card" | "circle-badge";

export interface FontOption {
  id: string;
  label: string;
  family: string;
  sample: string;
  tag: string;
}

export interface TextLayer {
  id: string;
  text: string;
  x: number; // 0 to 100 percentage
  y: number; // 0 to 100 percentage
  fontSize: number; // relative px on 1000 base
  fontFamily: string;
  fontWeight: "400" | "600" | "700";
  color: string;
  accentColor: string;
  bgColor: string;
  strokeColor?: string;
  strokeWidth?: number;
  curve?: number; // -30 to 30 arch curvature
  stylePreset: TextStylePreset;
  align: "left" | "center" | "right";
  rotation: number; // -45 to 45 deg
  letterSpacing: number; // -2 to 20
  opacity: number; // 0.1 to 1
}

export interface TextStudioImageLayer {
  id: string;
  label: string;
  src: string;
  x: number; // 0 to 100 percentage
  y: number; // 0 to 100 percentage
  widthPct: number; // 8 to 90 percentage of canvas width
  aspectRatio: number; // width / height
  rotation: number; // -45 to 45 deg
  opacity: number; // 0.1 to 1
  frameStyle: TextImageFrameStyle;
  caption?: string;
  badgeText?: string;
}

export interface AiEditRecolorRegion {
  label: string;
  shape: "ellipse" | "rect" | "polygon";
  cx?: number;
  cy?: number;
  rx?: number;
  ry?: number;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  points?: { x: number; y: number }[];
  targetColor: string;
  blendMode: "color" | "multiply" | "hue" | "soft-light" | "source-over";
  opacity: number;
  feather: number;
}

export interface AiEditSvgElement {
  type: "circle" | "ellipse" | "rect" | "line" | "path" | "polygon";
  cx?: number;
  cy?: number;
  r?: number;
  rx?: number;
  ry?: number;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  x1?: number;
  y1?: number;
  x2?: number;
  y2?: number;
  d?: string;
  points?: string;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
  opacity?: number;
  blendMode?: "source-over" | "multiply" | "screen" | "overlay" | "soft-light";
}

export interface AiEditColorGrading {
  brightness: number;
  contrast: number;
  saturation: number;
  warmth: number;
  vignette: number;
  tintColor?: string;
  tintOpacity?: number;
}

export interface AiEditEraseRegion {
  label: string;
  shape: "ellipse" | "rect" | "polygon";
  cx?: number;
  cy?: number;
  rx?: number;
  ry?: number;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  points?: { x: number; y: number }[];
  fillColor?: string;
  feather?: number;
}

export interface AiEditColoringConfig {
  enabled: boolean;
  pageSize: BookPageSize;
  dpi: PrintDpi;
  colorMode: ColoringColorMode;
}

export interface AiEditPlan {
  analysis: string;
  editSummary: string;
  preservedIntegrityNote: string;
  colorGrading: AiEditColorGrading;
  recolorRegions: AiEditRecolorRegion[];
  eraseRegions?: AiEditEraseRegion[];
  clothingSvg?: string | null;
  svgElements: AiEditSvgElement[];
}

export interface EditOverlayLayer {
  id: string;
  label: string;
  category: "ai-object" | "cartoon" | "emoji" | "sticker";
  src?: string;
  emoji?: string;
  x: number; // 0..100 percentage of canvas width
  y: number; // 0..100 percentage of canvas height
  widthPct: number; // base width % of canvas width
  aspectRatio: number; // width / height
  scale: number; // 0.25..2.5
  rotation: number; // -180..180
  flipH: boolean;
  opacity: number; // 0.1..1
}


