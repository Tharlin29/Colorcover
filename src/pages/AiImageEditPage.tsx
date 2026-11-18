import {
  ArrowDown,
  ArrowLeft,
  ArrowUp,
  Check,
  Copy,
  Download,
  Eye,
  FileText,
  FlipHorizontal2,
  Layers,
  Loader2,
  Move,
  RotateCcw,
  ShieldCheck,
  Smile,
  Sparkles,
  Sticker,
  Trash2,
  Upload,
  Wand2,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import {
  AiEditColoringConfig,
  AiEditPlan,
  BookPageSize,
  ColoringColorMode,
  EditOverlayLayer,
  PhotoItem,
  PrintDpi,
} from "../types/studio";
import { exportSinglePhotoAsPdf } from "../utils/exportTools";
import {
  extractAiOverlayLayers,
  prepareImageForAiAnalysis,
  renderAiBaseStage,
  renderStageCompositeWithLayers,
} from "../utils/imageEditor";
import { getColoringDimensions } from "../utils/proceduralArt";
import { CARTOON_ASSETS, EMOJI_STICKERS, svgToDataUrl } from "../utils/stickerLibrary";
import { readFileAsDataUrl, triggerBlobDownload, triggerDownload } from "../utils/storage";

interface AiImageEditPageProps {
  photos: PhotoItem[];
  initialPhoto: PhotoItem | null;
  onSaveNewPhoto: (photo: PhotoItem) => Promise<void>;
  onBackHome: () => void;
}

const COLORING_EDIT_PRESETS = [
  "Change the shirt to Noah's traditional old Israel robe, tunic, and waist sash in clean coloring book line art",
  "Noah အတွက် အင်္ကျီကို ရှေးခေတ် Israel ဝတ်ရုံ (Old Israel dress & sash) ဖြင့် ပြောင်းလဲပေးပါ",
  "ယုန်တကောင်ထည့်မယ်",
  "baby elephant တကောင်ထည့်မယ်",
  "နောက်ခံရှုခင်းအပင်များထည့်မယ်",
  "လိပ်ပြာတကောင်ထည့်မယ်",
  "တိမ်တွေထည့်မယ်",
  "နေမင်း ထည့်မယ်",
  "ခရုတကောင်ထည့်မယ်",
  "အိမ်တစ်လုံးထည့်မယ်",
  "Change modern clothes into an ancient biblical shepherd tunic and draped mantle",
  "Add a small olive branch in the hand in crisp black ink line art",
  "Add a subtle rainbow arch and dove in the top sky area (line art only)",
  "Add a thin decorative border frame around the coloring page",
];

export function AiImageEditPage({
  photos,
  initialPhoto,
  onSaveNewPhoto,
  onBackHome,
}: AiImageEditPageProps) {
  const [sourcePhoto, setSourcePhoto] = useState<{
    id?: string;
    title: string;
    dataUrl: string;
    width: number;
    height: number;
    aspectRatio: string;
  } | null>(null);

  const [toolTab, setToolTab] = useState<"ai" | "stickers">("ai");
  const [stickerTab, setStickerTab] = useState<"cartoon" | "sticker" | "emoji">("cartoon");

  const [coloringEnabled, setColoringEnabled] = useState(true);
  const [pageSize, setPageSize] = useState<BookPageSize>("us-letter");
  const [dpi, setDpi] = useState<PrintDpi>(300);
  const [colorMode, setColorMode] = useState<ColoringColorMode>("bw");

  const [instruction, setInstruction] = useState("");
  const [processing, setProcessing] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [editPlan, setEditPlan] = useState<AiEditPlan | null>(null);

  const [baseStage, setBaseStage] = useState<{
    baseDataUrl: string;
    width: number;
    height: number;
  } | null>(null);

  const [layers, setLayers] = useState<EditOverlayLayer[]>([]);
  const [activeLayerId, setActiveLayerId] = useState<string | null>(null);
  const [showOriginalOnly, setShowOriginalOnly] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [noticeMsg, setNoticeMsg] = useState<string | null>(null);
  const [savedToast, setSavedToast] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef<{
    layerId: string;
    startClientX: number;
    startClientY: number;
    startX: number;
    startY: number;
  } | null>(null);

  const coloringDims = getColoringDimensions(pageSize, dpi);
  const coloringConfig: AiEditColoringConfig = {
    enabled: coloringEnabled,
    pageSize,
    dpi,
    colorMode,
  };

  const activeLayer = layers.find((l) => l.id === activeLayerId) || null;

  useEffect(() => {
    if (initialPhoto) {
      setSourcePhoto({
        id: initialPhoto.id,
        title: initialPhoto.title,
        dataUrl: initialPhoto.dataUrl,
        width: initialPhoto.width,
        height: initialPhoto.height,
        aspectRatio: initialPhoto.aspectRatio,
      });
      if (initialPhoto.pageSize) setPageSize(initialPhoto.pageSize);
      if (initialPhoto.dpi === 300 || initialPhoto.dpi === 350) setDpi(initialPhoto.dpi);
      if (initialPhoto.colorMode) setColorMode(initialPhoto.colorMode);
      setEditPlan(null);
      setLayers([]);
      setActiveLayerId(null);
      setErrorMsg(null);
      setNoticeMsg(null);
    }
  }, [initialPhoto]);

  // Render base stage whenever sourcePhoto, editPlan, or print format changes
  useEffect(() => {
    if (!sourcePhoto) {
      setBaseStage(null);
      return;
    }
    let active = true;
    const cfg: AiEditColoringConfig = {
      enabled: coloringEnabled,
      pageSize,
      dpi,
      colorMode,
    };
    renderAiBaseStage(sourcePhoto.dataUrl, editPlan, cfg)
      .then((res) => {
        if (active) {
          setBaseStage({
            baseDataUrl: res.baseDataUrl,
            width: res.width,
            height: res.height,
          });
        }
      })
      .catch(() => {
        // Keep previous base stage if transient error
      });
    return () => {
      active = false;
    };
  }, [sourcePhoto, editPlan, coloringEnabled, pageSize, dpi, colorMode]);

  const handleUploadFile = async (file: File) => {
    setErrorMsg(null);
    setNoticeMsg(null);
    try {
      const { dataUrl, width, height } = await readFileAsDataUrl(file);
      setSourcePhoto({
        title: file.name.replace(/\.[^.]+$/, "") || "Uploaded Photo",
        dataUrl,
        width,
        height,
        aspectRatio: `${width}:${height}`,
      });
      setEditPlan(null);
      setLayers([]);
      setActiveLayerId(null);
      setInstruction("");
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Unable to load selected image.");
    }
  };

  const handleSelectFromHall = (photo: PhotoItem) => {
    setSourcePhoto({
      id: photo.id,
      title: photo.title,
      dataUrl: photo.dataUrl,
      width: photo.width,
      height: photo.height,
      aspectRatio: photo.aspectRatio,
    });
    setEditPlan(null);
    setLayers([]);
    setActiveLayerId(null);
    setErrorMsg(null);
    setNoticeMsg(null);
  };

  const handleApplyAiEdit = async () => {
    if (!sourcePhoto) {
      setErrorMsg("Please upload an original image or pick one from Photo Hall first.");
      return;
    }
    if (!instruction.trim()) {
      setErrorMsg("Please enter a specific modification instruction.");
      return;
    }

    setProcessing(true);
    setErrorMsg(null);
    setNoticeMsg(null);
    setSavedToast(null);

    try {
      const analysisImageUrl = await prepareImageForAiAnalysis(sourcePhoto.dataUrl, 1280);
      const res = await fetch("/api/photo/ai-edit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          imageDataUrl: analysisImageUrl,
          instruction: instruction.trim(),
          coloringConfig,
        }),
      });

      const data = (await res.json()) as {
        plan?: AiEditPlan;
        notice?: string;
        error?: string;
      };

      if (!res.ok || !data.plan) {
        throw new Error(data.error || "Unable to generate precision edit plan.");
      }

      if (data.notice) {
        setNoticeMsg(data.notice);
      }

      const stage = await renderAiBaseStage(sourcePhoto.dataUrl, data.plan, coloringConfig);
      const extractedLayers = await extractAiOverlayLayers(
        data.plan,
        stage.width,
        stage.height,
        stage.imageRect,
        instruction.trim()
      );

      setEditPlan(data.plan);
      setBaseStage({
        baseDataUrl: stage.baseDataUrl,
        width: stage.width,
        height: stage.height,
      });

      if (extractedLayers.length > 0) {
        setLayers((prev) => [...prev, ...extractedLayers]);
        setActiveLayerId(extractedLayers[extractedLayers.length - 1].id);
      }
      setShowOriginalOnly(false);
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "AI image edit failed.");
    } finally {
      setProcessing(false);
    }
  };

  const handleAddCartoonOrSticker = (assetId: string) => {
    if (!sourcePhoto) {
      setErrorMsg("Please upload or select an image first.");
      return;
    }
    const asset = CARTOON_ASSETS.find((a) => a.id === assetId);
    if (!asset) return;

    const newLayer: EditOverlayLayer = {
      id: `layer-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      label: asset.label,
      category: asset.category,
      src: svgToDataUrl(asset.svg),
      x: 50 + (Math.random() * 14 - 7),
      y: 28 + (Math.random() * 14 - 7),
      widthPct: asset.defaultWidthPct,
      aspectRatio: asset.aspectRatio,
      scale: 1,
      rotation: 0,
      flipH: false,
      opacity: 1,
    };
    setLayers((prev) => [...prev, newLayer]);
    setActiveLayerId(newLayer.id);
    setShowOriginalOnly(false);
    setErrorMsg(null);
  };

  const handleAddEmoji = (emoji: string, label: string) => {
    if (!sourcePhoto) {
      setErrorMsg("Please upload or select an image first.");
      return;
    }
    const newLayer: EditOverlayLayer = {
      id: `emoji-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      label: `${emoji} ${label}`,
      category: "emoji",
      emoji,
      x: 50 + (Math.random() * 16 - 8),
      y: 28 + (Math.random() * 16 - 8),
      widthPct: 12,
      aspectRatio: 1,
      scale: 1,
      rotation: 0,
      flipH: false,
      opacity: 1,
    };
    setLayers((prev) => [...prev, newLayer]);
    setActiveLayerId(newLayer.id);
    setShowOriginalOnly(false);
    setErrorMsg(null);
  };

  const updateActiveLayer = (patch: Partial<EditOverlayLayer>) => {
    if (!activeLayerId) return;
    setLayers((prev) =>
      prev.map((l) => (l.id === activeLayerId ? { ...l, ...patch } : l))
    );
  };

  const handleDuplicateActiveLayer = () => {
    if (!activeLayer) return;
    const copy: EditOverlayLayer = {
      ...activeLayer,
      id: `layer-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      label: `${activeLayer.label} (Copy)`,
      x: Math.min(92, activeLayer.x + 6),
      y: Math.min(92, activeLayer.y + 6),
    };
    setLayers((prev) => [...prev, copy]);
    setActiveLayerId(copy.id);
  };

  const handleDeleteLayer = (id: string) => {
    setLayers((prev) => {
      const next = prev.filter((l) => l.id !== id);
      if (activeLayerId === id) {
        setActiveLayerId(next[next.length - 1]?.id || null);
      }
      return next;
    });
  };

  const handleMoveLayerOrder = (direction: "up" | "down") => {
    if (!activeLayerId) return;
    setLayers((prev) => {
      const idx = prev.findIndex((l) => l.id === activeLayerId);
      if (idx < 0) return prev;
      const targetIdx = direction === "up" ? idx + 1 : idx - 1;
      if (targetIdx < 0 || targetIdx >= prev.length) return prev;
      const copy = [...prev];
      const [moved] = copy.splice(idx, 1);
      copy.splice(targetIdx, 0, moved);
      return copy;
    });
  };

  const handlePointerDown = (
    e: React.PointerEvent<HTMLDivElement>,
    layer: EditOverlayLayer
  ) => {
    e.stopPropagation();
    e.currentTarget.setPointerCapture(e.pointerId);
    setActiveLayerId(layer.id);
    draggingRef.current = {
      layerId: layer.id,
      startClientX: e.clientX,
      startClientY: e.clientY,
      startX: layer.x,
      startY: layer.y,
    };
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const drag = draggingRef.current;
    const stage = stageRef.current;
    if (!drag || !stage) return;

    const rect = stage.getBoundingClientRect();
    const dxPct = ((e.clientX - drag.startClientX) / Math.max(1, rect.width)) * 100;
    const dyPct = ((e.clientY - drag.startClientY) / Math.max(1, rect.height)) * 100;

    let nx = Math.max(4, Math.min(96, drag.startX + dxPct));
    let ny = Math.max(4, Math.min(96, drag.startY + dyPct));

    if (Math.abs(nx - 50) < 1.5) nx = 50;
    if (Math.abs(ny - 50) < 1.5) ny = 50;

    setLayers((prev) =>
      prev.map((l) => (l.id === drag.layerId ? { ...l, x: nx, y: ny } : l))
    );
  };

  const handlePointerUp = () => {
    draggingRef.current = null;
  };

  const renderFinalComposite = async () => {
    if (!sourcePhoto || !baseStage) {
      throw new Error("No active image on stage.");
    }
    return renderStageCompositeWithLayers(
      baseStage.baseDataUrl,
      baseStage.width,
      baseStage.height,
      layers,
      coloringConfig
    );
  };

  const handleBakeAndContinue = async () => {
    if (!sourcePhoto || !baseStage) return;
    setExporting(true);
    try {
      const baked = await renderFinalComposite();
      setSourcePhoto({
        ...sourcePhoto,
        title: `${sourcePhoto.title} · Step`,
        dataUrl: baked.dataUrl,
        width: baked.width,
        height: baked.height,
        aspectRatio: coloringEnabled ? (pageSize === "a4" ? "A4" : "US Letter") : sourcePhoto.aspectRatio,
      });
      setEditPlan(null);
      setLayers([]);
      setActiveLayerId(null);
      setInstruction("");
      setSavedToast("Baked all layers into base image — ready for more edits!");
      setTimeout(() => setSavedToast(null), 3000);
    } finally {
      setExporting(false);
    }
  };

  const handleSaveToPhotoHall = async () => {
    if (!sourcePhoto || !baseStage) return;
    setExporting(true);
    try {
      const finalImg = await renderFinalComposite();
      const now = Date.now();
      const item: PhotoItem = {
        id: `photo-${now}-${Math.random().toString(36).slice(2, 7)}`,
        title: `${sourcePhoto.title} (Edited)`,
        prompt:
          instruction.trim() ||
          editPlan?.editSummary ||
          `Manual & Sticker Edit (${layers.length} layers)`,
        dataUrl: finalImg.dataUrl,
        width: finalImg.width,
        height: finalImg.height,
        aspectRatio: coloringEnabled
          ? pageSize === "a4"
            ? "A4"
            : "US Letter"
          : sourcePhoto.aspectRatio,
        mood: coloringEnabled
          ? colorMode === "bw"
            ? "B&W Line Art"
            : "Grayscale Line Art"
          : "AI & Sticker Edit",
        dpi: coloringEnabled ? dpi : undefined,
        pageSize: coloringEnabled ? pageSize : undefined,
        colorMode: coloringEnabled ? colorMode : undefined,
        isColoringPage: coloringEnabled,
        kind: coloringEnabled ? "coloring" : "edited",
        createdAt: now,
        updatedAt: now,
      };
      await onSaveNewPhoto(item);
      setSavedToast("Saved Coloring Book edited page to Photo Hall.");
      setTimeout(() => setSavedToast(null), 3000);
    } finally {
      setExporting(false);
    }
  };

  const handleDownloadPng = async () => {
    if (!sourcePhoto || !baseStage) return;
    setExporting(true);
    try {
      const finalImg = await renderFinalComposite();
      triggerDownload(
        finalImg.dataUrl,
        `${sourcePhoto.title || "lumina"}-${coloringEnabled ? `coloring-${dpi}dpi` : "edited"}.png`
      );
    } finally {
      setExporting(false);
    }
  };

  const handleDownloadPdf = async () => {
    if (!sourcePhoto || !baseStage) return;
    setExporting(true);
    try {
      const finalImg = await renderFinalComposite();
      const now = Date.now();
      const tempItem: PhotoItem = {
        id: `temp-${now}`,
        title: `${sourcePhoto.title} (Edited)`,
        prompt: instruction.trim(),
        dataUrl: finalImg.dataUrl,
        width: finalImg.width,
        height: finalImg.height,
        aspectRatio: coloringEnabled
          ? pageSize === "a4"
            ? "A4"
            : "US Letter"
          : sourcePhoto.aspectRatio,
        dpi: coloringEnabled ? dpi : undefined,
        pageSize: coloringEnabled ? pageSize : undefined,
        colorMode: coloringEnabled ? colorMode : undefined,
        isColoringPage: coloringEnabled,
        kind: coloringEnabled ? "coloring" : "edited",
        createdAt: now,
        updatedAt: now,
      };
      const blob = await exportSinglePhotoAsPdf(tempItem, pageSize);
      triggerBlobDownload(blob, `${sourcePhoto.title || "ai-coloring-edit"}.pdf`);
    } finally {
      setExporting(false);
    }
  };

  const filteredCartoonAssets = CARTOON_ASSETS.filter((a) => a.category === stickerTab);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-6 pb-24 md:pb-16 space-y-10">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-1">
          <button
            type="button"
            onClick={onBackHome}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-500 hover:text-zinc-950 cursor-pointer mb-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Main Grid</span>
          </button>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-950">
            04. AI Coloring Book Editor & Manual Studio
          </h1>
          <p className="text-sm text-zinc-600 max-w-2xl">
            AI ဖြင့်ထည့်သွင်းပေးသော အရာဝတ္ထုများ (ဥပမာ နေမင်း၊ ယုန်) ကို ပုံပေါ်တွင် ကိုယ်တိုင် Drag ဆွဲ၍ ဘယ်/ညာ ရွှေ့ပြောင်းခြင်း၊ Size/Rotate ချိန်ညှိခြင်းနှင့် Cartoon, Emoji, Sticker များ ထပ်ပေါင်းထည့်နိုင်ပါသည်။
          </p>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleUploadFile(file);
            e.target.value = "";
          }}
          className="hidden"
        />
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="min-h-[44px] inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-zinc-950 rounded-lg hover:bg-zinc-800 cursor-pointer whitespace-nowrap"
        >
          <Upload className="w-4 h-4" />
          <span>Upload Original Image</span>
        </button>
      </div>

      {/* Main Workspace */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Panel: AI Edit + Cartoon/Emoji/Sticker Drawer */}
        <div className="lg:col-span-5 bg-white border border-zinc-200 rounded-2xl p-5 sm:p-6 space-y-5">
          {/* Quick Select from Photo Hall */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-zinc-700">
                Source Image ({sourcePhoto ? `${sourcePhoto.width}×${sourcePhoto.height}` : "None selected"})
              </span>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="text-xs font-medium text-blue-600 hover:text-blue-700 cursor-pointer"
              >
                Choose File
              </button>
            </div>
            {photos.length > 0 && (
              <div className="flex gap-2 overflow-x-auto pb-1">
                {photos.slice(0, 8).map((p) => {
                  const selected = sourcePhoto?.dataUrl === p.dataUrl;
                  return (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => handleSelectFromHall(p)}
                      title={p.title}
                      className={`shrink-0 w-16 h-12 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                        selected ? "border-blue-600 ring-2 ring-blue-600/20" : "border-zinc-200 hover:border-zinc-400"
                      }`}
                    >
                      <img
                        src={p.dataUrl}
                        alt={p.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Primary Tool Tabs: AI Edit vs Cartoon / Emoji / Sticker */}
          <div className="grid grid-cols-2 gap-1.5 p-1 bg-zinc-100 rounded-xl">
            <button
              type="button"
              onClick={() => setToolTab("ai")}
              className={`min-h-[40px] inline-flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                toolTab === "ai"
                  ? "bg-zinc-950 text-white shadow-sm"
                  : "text-zinc-600 hover:text-zinc-950"
              }`}
            >
              <Wand2 className="w-3.5 h-3.5" />
              <span>AI Prompt Edit</span>
            </button>
            <button
              type="button"
              onClick={() => setToolTab("stickers")}
              className={`min-h-[40px] inline-flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                toolTab === "stickers"
                  ? "bg-zinc-950 text-white shadow-sm"
                  : "text-zinc-600 hover:text-zinc-950"
              }`}
            >
              <Sticker className="w-3.5 h-3.5" />
              <span>Cartoon / Emoji / Sticker</span>
            </button>
          </div>

          {toolTab === "ai" ? (
            <div className="space-y-4">
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-zinc-50 border border-zinc-200/80">
                <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <p className="text-xs text-zinc-600 leading-relaxed">
                  AI ဖြင့် ထည့်ပေးသော အရာဝတ္ထုများ (ဥပမာ နေမင်း၊ ယုန်) သည် Movable Layer အဖြစ် ပေါ်လာမည်ဖြစ်၍ ညာဘက်ပုံပေါ်တွင် Drag ဆွဲပြီး နေရာရွှေ့ပြင်နိုင်ပါသည်။
                </p>
              </div>

              <div className="space-y-2">
                <label htmlFor="ai-edit-instruction" className="text-sm font-semibold text-zinc-950 block">
                  Edit Instruction (English / မြန်မာ)
                </label>
                <textarea
                  id="ai-edit-instruction"
                  rows={3}
                  value={instruction}
                  onChange={(e) => setInstruction(e.target.value)}
                  placeholder="ဥပမာ — နေမင်း ထည့်မယ်... ယုန်တကောင်ထည့်မယ်... Noah အတွက် Old Israel dress ပြောင်းပေးပါ..."
                  className="w-full p-3.5 text-sm rounded-xl border border-zinc-200 bg-zinc-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 resize-none leading-relaxed"
                />
              </div>

              <div className="space-y-2">
                <span className="text-xs font-medium text-zinc-500 block">Quick Coloring Edits</span>
                <div className="flex flex-wrap gap-1.5">
                  {COLORING_EDIT_PRESETS.map((sample) => (
                    <button
                      key={sample}
                      type="button"
                      onClick={() => setInstruction(sample)}
                      className="px-2.5 py-1.5 text-xs text-zinc-700 bg-zinc-100 hover:bg-zinc-200 rounded-md transition-colors cursor-pointer text-left truncate max-w-full"
                    >
                      {sample}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="button"
                disabled={processing || !sourcePhoto}
                onClick={handleApplyAiEdit}
                className="w-full min-h-[46px] inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-zinc-950 rounded-xl hover:bg-zinc-800 active:scale-[0.99] disabled:opacity-50 transition-all cursor-pointer whitespace-nowrap"
              >
                {processing ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Generating Movable Object...</span>
                  </>
                ) : (
                  <>
                    <Wand2 className="w-4 h-4" />
                    <span>Apply AI Edit</span>
                  </>
                )}
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-1.5 p-1 bg-zinc-100 rounded-xl">
                <button
                  type="button"
                  onClick={() => setStickerTab("cartoon")}
                  className={`min-h-[36px] text-xs font-semibold rounded-lg cursor-pointer ${
                    stickerTab === "cartoon" ? "bg-white text-zinc-950 shadow-sm" : "text-zinc-600"
                  }`}
                >
                  Cartoon
                </button>
                <button
                  type="button"
                  onClick={() => setStickerTab("sticker")}
                  className={`min-h-[36px] text-xs font-semibold rounded-lg cursor-pointer ${
                    stickerTab === "sticker" ? "bg-white text-zinc-950 shadow-sm" : "text-zinc-600"
                  }`}
                >
                  Stickers
                </button>
                <button
                  type="button"
                  onClick={() => setStickerTab("emoji")}
                  className={`min-h-[36px] inline-flex items-center justify-center gap-1 text-xs font-semibold rounded-lg cursor-pointer ${
                    stickerTab === "emoji" ? "bg-white text-zinc-950 shadow-sm" : "text-zinc-600"
                  }`}
                >
                  <Smile className="w-3.5 h-3.5" />
                  <span>Emoji</span>
                </button>
              </div>

              {stickerTab === "emoji" ? (
                <div className="grid grid-cols-6 gap-2 max-h-64 overflow-y-auto pr-1">
                  {EMOJI_STICKERS.map((item) => (
                    <button
                      key={item.emoji}
                      type="button"
                      onClick={() => handleAddEmoji(item.emoji, item.label)}
                      title={item.label}
                      className="aspect-square flex items-center justify-center text-2xl rounded-xl border border-zinc-200 bg-zinc-50 hover:bg-zinc-100 hover:border-zinc-400 transition-colors cursor-pointer"
                    >
                      {item.emoji}
                    </button>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-3 gap-2.5 max-h-72 overflow-y-auto pr-1">
                  {filteredCartoonAssets.map((asset) => (
                    <button
                      key={asset.id}
                      type="button"
                      onClick={() => handleAddCartoonOrSticker(asset.id)}
                      className="p-2.5 rounded-xl border border-zinc-200 bg-zinc-50 hover:bg-white hover:border-zinc-950 transition-all cursor-pointer flex flex-col items-center gap-1.5"
                    >
                      <img
                        src={svgToDataUrl(asset.svg)}
                        alt={asset.label}
                        className="w-12 h-12 object-contain"
                      />
                      <span className="text-[11px] font-medium text-zinc-700 text-center leading-tight line-clamp-2">
                        {asset.label}
                      </span>
                    </button>
                  ))}
                </div>
              )}

              <p className="text-[11px] text-zinc-500">
                Tip: Tap any cartoon, sticker, or emoji above to place it onto the canvas, then drag it to move anywhere.
              </p>
            </div>
          )}

          {/* Coloring Book Print Settings */}
          <div className="space-y-3 pt-4 border-t border-zinc-100">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-zinc-800">Coloring Book Output</span>
              <div className="flex gap-1 p-0.5 bg-zinc-100 rounded-lg">
                <button
                  type="button"
                  onClick={() => setColoringEnabled(true)}
                  className={`px-2.5 py-1 text-[11px] font-semibold rounded-md cursor-pointer ${
                    coloringEnabled ? "bg-zinc-950 text-white" : "text-zinc-600"
                  }`}
                >
                  300+ DPI ON
                </button>
                <button
                  type="button"
                  onClick={() => setColoringEnabled(false)}
                  className={`px-2.5 py-1 text-[11px] font-semibold rounded-md cursor-pointer ${
                    !coloringEnabled ? "bg-zinc-950 text-white" : "text-zinc-600"
                  }`}
                >
                  Photo Mode
                </button>
              </div>
            </div>

            {coloringEnabled && (
              <div className="space-y-2.5">
                <div className="grid grid-cols-3 gap-1.5">
                  <select
                    value={pageSize}
                    onChange={(e) => setPageSize(e.target.value as BookPageSize)}
                    aria-label="Page size"
                    className="px-2 py-2 text-xs font-medium rounded-lg border border-zinc-200 bg-zinc-50 text-zinc-900"
                  >
                    <option value="us-letter">US Letter</option>
                    <option value="a4">A4 Size</option>
                  </select>
                  <select
                    value={dpi}
                    onChange={(e) => setDpi(Number(e.target.value) as PrintDpi)}
                    aria-label="Print resolution"
                    className="px-2 py-2 text-xs font-medium rounded-lg border border-zinc-200 bg-zinc-50 text-zinc-900"
                  >
                    <option value={300}>300 DPI</option>
                    <option value={350}>350 DPI</option>
                  </select>
                  <select
                    value={colorMode}
                    onChange={(e) => setColorMode(e.target.value as ColoringColorMode)}
                    aria-label="Color mode"
                    className="px-2 py-2 text-xs font-medium rounded-lg border border-zinc-200 bg-zinc-50 text-zinc-900"
                  >
                    <option value="bw">Black & White</option>
                    <option value="grayscale">Grayscale</option>
                  </select>
                </div>
                <div className="text-[11px] text-zinc-500 tabular-nums">
                  Print Canvas: {coloringDims.width} × {coloringDims.height} px · {coloringDims.physicalLabel}
                </div>
              </div>
            )}
          </div>

          {errorMsg && (
            <p className="text-xs font-medium text-red-600 bg-red-50 px-3 py-2 rounded-lg">
              {errorMsg}
            </p>
          )}

          {noticeMsg && (
            <p className="text-xs font-medium text-amber-800 bg-amber-50 border border-amber-200 px-3 py-2 rounded-lg">
              {noticeMsg}
            </p>
          )}

          {savedToast && (
            <p className="text-xs font-medium text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-2 rounded-lg inline-flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5" />
              <span>{savedToast}</span>
            </p>
          )}
        </div>

        {/* Right Panel: Interactive Drag-and-Move Stage + Manual Layer Inspector */}
        <div className="lg:col-span-7 space-y-5">
          <div className="bg-white border border-zinc-200 rounded-2xl p-5 sm:p-6 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm font-semibold text-zinc-950">
                  Interactive Edit Stage
                </span>
                <span className="text-xs text-zinc-500 tabular-nums">
                  {layers.length} {layers.length === 1 ? "object" : "objects"} · Drag to move
                </span>
              </div>

              {sourcePhoto && (
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setShowOriginalOnly((v) => !v)}
                    className={`min-h-[34px] inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-lg border cursor-pointer ${
                      showOriginalOnly
                        ? "bg-zinc-950 text-white border-zinc-950"
                        : "bg-white text-zinc-700 border-zinc-200 hover:border-zinc-400"
                    }`}
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>{showOriginalOnly ? "Viewing Original" : "Compare Original"}</span>
                  </button>
                  {(layers.length > 0 || editPlan) && (
                    <button
                      type="button"
                      onClick={() => {
                        setEditPlan(null);
                        setLayers([]);
                        setActiveLayerId(null);
                      }}
                      className="min-h-[34px] inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium text-zinc-600 hover:text-zinc-950 rounded-lg border border-zinc-200 hover:border-zinc-400 cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Reset Edits</span>
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Interactive Stage Surface */}
            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                const file = e.dataTransfer.files?.[0];
                if (file && file.type.startsWith("image/")) {
                  handleUploadFile(file);
                }
              }}
              className="min-h-[380px] bg-[#141416] rounded-xl flex items-center justify-center p-4 overflow-hidden"
            >
              {processing ? (
                <div className="text-center space-y-3 text-zinc-300">
                  <Loader2 className="w-8 h-8 animate-spin mx-auto text-blue-400" />
                  <p className="text-sm font-medium">
                    Analyzing image & generating movable coloring object...
                  </p>
                </div>
              ) : !sourcePhoto || !baseStage ? (
                <div className="text-center space-y-3 max-w-sm text-zinc-400 px-4">
                  <Upload className="w-8 h-8 mx-auto opacity-60" />
                  <p className="text-sm font-medium text-zinc-200">
                    Upload an Original Image
                  </p>
                  <p className="text-xs leading-relaxed">
                    Drag and drop a photo here, click Upload Original Image, or pick one from the top strip. Add AI objects, cartoons, emojis, or stickers and drag them anywhere.
                  </p>
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="min-h-[40px] px-4 py-2 text-xs font-semibold text-zinc-950 bg-white rounded-lg hover:bg-zinc-200 cursor-pointer"
                  >
                    Select Photo from Device
                  </button>
                </div>
              ) : (
                <div
                  ref={stageRef}
                  onPointerMove={handlePointerMove}
                  onPointerUp={handlePointerUp}
                  onPointerCancel={handlePointerUp}
                  onClick={() => setActiveLayerId(null)}
                  className="relative max-h-[480px] w-full max-w-[440px] mx-auto bg-white rounded shadow-xl overflow-hidden select-none touch-none"
                  style={{
                    aspectRatio: `${baseStage.width} / ${baseStage.height}`,
                  }}
                >
                  <img
                    src={showOriginalOnly ? sourcePhoto.dataUrl : baseStage.baseDataUrl}
                    alt={sourcePhoto.title}
                    referrerPolicy="no-referrer"
                    draggable={false}
                    className="w-full h-full object-contain pointer-events-none"
                    style={{
                      filter:
                        !showOriginalOnly && coloringEnabled
                          ? colorMode === "bw"
                            ? "grayscale(100%) contrast(165%)"
                            : "grayscale(100%)"
                          : undefined,
                    }}
                  />

                  {/* Interactive Movable Layers */}
                  {!showOriginalOnly &&
                    layers.map((layer) => {
                      const isSelected = layer.id === activeLayerId;
                      return (
                        <div
                          key={layer.id}
                          onPointerDown={(e) => handlePointerDown(e, layer)}
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveLayerId(layer.id);
                          }}
                          style={{
                            left: `${layer.x}%`,
                            top: `${layer.y}%`,
                            width: `${layer.widthPct * layer.scale}%`,
                            aspectRatio: `${layer.aspectRatio}`,
                            opacity: layer.opacity,
                            transform: `translate(-50%, -50%) rotate(${layer.rotation}deg) scaleX(${
                              layer.flipH ? -1 : 1
                            })`,
                          }}
                          className={`absolute cursor-grab active:cursor-grabbing transition-shadow ${
                            isSelected
                              ? "ring-2 ring-blue-600 ring-offset-2 rounded bg-blue-500/5"
                              : "hover:ring-1 hover:ring-blue-400/70 rounded"
                          }`}
                        >
                          {layer.src ? (
                            <img
                              src={layer.src}
                              alt={layer.label}
                              draggable={false}
                              className="w-full h-full object-contain pointer-events-none"
                              style={{
                                filter:
                                  coloringEnabled && colorMode === "bw"
                                    ? "grayscale(100%) contrast(150%)"
                                    : coloringEnabled
                                    ? "grayscale(100%)"
                                    : undefined,
                              }}
                            />
                          ) : (
                            <div
                              className="w-full h-full flex items-center justify-center pointer-events-none leading-none"
                              style={{
                                fontSize: "clamp(20px, 6vw, 56px)",
                                filter: coloringEnabled ? "grayscale(100%)" : undefined,
                              }}
                            >
                              {layer.emoji}
                            </div>
                          )}
                        </div>
                      );
                    })}
                </div>
              )}
            </div>

            {/* Added Objects Layer Strip */}
            {layers.length > 0 && (
              <div className="space-y-2 pt-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-zinc-700">
                    Added Objects & Stickers (Tap to Select & Move)
                  </span>
                  <span className="text-zinc-500">
                    {activeLayer ? `Selected: ${activeLayer.label}` : "Tap an item on stage"}
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {layers.map((l) => {
                    const selected = l.id === activeLayerId;
                    return (
                      <div
                        key={l.id}
                        className={`inline-flex items-center gap-1.5 pl-2.5 pr-1 py-1 rounded-lg border text-xs font-medium transition-colors ${
                          selected
                            ? "bg-zinc-950 text-white border-zinc-950"
                            : "bg-zinc-50 text-zinc-800 border-zinc-200 hover:border-zinc-400"
                        }`}
                      >
                        <button
                          type="button"
                          onClick={() => setActiveLayerId(l.id)}
                          className="cursor-pointer truncate max-w-[140px]"
                        >
                          {l.label}
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteLayer(l.id)}
                          aria-label={`Remove ${l.label}`}
                          className={`p-0.5 rounded cursor-pointer ${
                            selected ? "hover:bg-white/20 text-zinc-300" : "hover:bg-zinc-200 text-zinc-500"
                          }`}
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Selected Layer Manual Controls */}
            {activeLayer && (
              <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2 text-xs font-semibold text-zinc-900">
                    <Move className="w-3.5 h-3.5 text-blue-600" />
                    <span>Manual Edit: {activeLayer.label}</span>
                  </div>
                  <div className="flex flex-wrap items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => updateActiveLayer({ x: 18 })}
                      className="px-2 py-1 text-[11px] font-medium bg-white border border-zinc-200 rounded hover:border-zinc-400 cursor-pointer"
                    >
                      Left
                    </button>
                    <button
                      type="button"
                      onClick={() => updateActiveLayer({ x: 50 })}
                      className="px-2 py-1 text-[11px] font-medium bg-white border border-zinc-200 rounded hover:border-zinc-400 cursor-pointer"
                    >
                      Center
                    </button>
                    <button
                      type="button"
                      onClick={() => updateActiveLayer({ x: 82 })}
                      className="px-2 py-1 text-[11px] font-medium bg-white border border-zinc-200 rounded hover:border-zinc-400 cursor-pointer"
                    >
                      Right
                    </button>
                    <button
                      type="button"
                      onClick={() => updateActiveLayer({ flipH: !activeLayer.flipH })}
                      title="Flip Horizontal"
                      className={`p-1.5 rounded border cursor-pointer ${
                        activeLayer.flipH
                          ? "bg-zinc-950 text-white border-zinc-950"
                          : "bg-white text-zinc-700 border-zinc-200 hover:border-zinc-400"
                      }`}
                    >
                      <FlipHorizontal2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={handleDuplicateActiveLayer}
                      title="Duplicate"
                      className="p-1.5 rounded bg-white text-zinc-700 border border-zinc-200 hover:border-zinc-400 cursor-pointer"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleMoveLayerOrder("up")}
                      title="Bring Forward"
                      className="p-1.5 rounded bg-white text-zinc-700 border border-zinc-200 hover:border-zinc-400 cursor-pointer"
                    >
                      <ArrowUp className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleMoveLayerOrder("down")}
                      title="Send Backward"
                      className="p-1.5 rounded bg-white text-zinc-700 border border-zinc-200 hover:border-zinc-400 cursor-pointer"
                    >
                      <ArrowDown className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteLayer(activeLayer.id)}
                      title="Delete Object"
                      className="p-1.5 rounded bg-white text-red-600 border border-zinc-200 hover:bg-red-50 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px]">
                      <span className="text-zinc-600 font-medium">Horizontal (Left ↔ Right)</span>
                      <span className="tabular-nums text-zinc-500">{Math.round(activeLayer.x)}%</span>
                    </div>
                    <input
                      type="range"
                      min={4}
                      max={96}
                      value={activeLayer.x}
                      onChange={(e) => updateActiveLayer({ x: Number(e.target.value) })}
                      className="w-full accent-zinc-950 cursor-pointer"
                    />
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px]">
                      <span className="text-zinc-600 font-medium">Vertical (Top ↕ Bottom)</span>
                      <span className="tabular-nums text-zinc-500">{Math.round(activeLayer.y)}%</span>
                    </div>
                    <input
                      type="range"
                      min={4}
                      max={96}
                      value={activeLayer.y}
                      onChange={(e) => updateActiveLayer({ y: Number(e.target.value) })}
                      className="w-full accent-zinc-950 cursor-pointer"
                    />
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px]">
                      <span className="text-zinc-600 font-medium">Size / Scale</span>
                      <span className="tabular-nums text-zinc-500">{Math.round(activeLayer.scale * 100)}%</span>
                    </div>
                    <input
                      type="range"
                      min={25}
                      max={250}
                      value={Math.round(activeLayer.scale * 100)}
                      onChange={(e) => updateActiveLayer({ scale: Number(e.target.value) / 100 })}
                      className="w-full accent-zinc-950 cursor-pointer"
                    />
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px]">
                      <span className="text-zinc-600 font-medium">Rotation</span>
                      <span className="tabular-nums text-zinc-500">{activeLayer.rotation}°</span>
                    </div>
                    <input
                      type="range"
                      min={-180}
                      max={180}
                      value={activeLayer.rotation}
                      onChange={(e) => updateActiveLayer({ rotation: Number(e.target.value) })}
                      className="w-full accent-zinc-950 cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Action Bar */}
            {sourcePhoto && baseStage && (
              <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-zinc-100">
                <button
                  type="button"
                  disabled={exporting}
                  onClick={handleBakeAndContinue}
                  className="min-h-[40px] inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-zinc-900 bg-zinc-100 hover:bg-zinc-200 rounded-lg cursor-pointer whitespace-nowrap disabled:opacity-50"
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>Bake & Continue Editing</span>
                </button>

                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    disabled={exporting}
                    onClick={handleSaveToPhotoHall}
                    className="min-h-[40px] inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-zinc-900 bg-white border border-zinc-300 hover:bg-zinc-50 rounded-lg cursor-pointer whitespace-nowrap disabled:opacity-50"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                    <span>Save to Photo Hall</span>
                  </button>
                  <button
                    type="button"
                    disabled={exporting}
                    onClick={handleDownloadPdf}
                    className="min-h-[40px] inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg cursor-pointer whitespace-nowrap disabled:opacity-50"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>{exporting ? "Exporting..." : "Download PDF"}</span>
                  </button>
                  <button
                    type="button"
                    disabled={exporting}
                    onClick={handleDownloadPng}
                    className="min-h-[40px] inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-zinc-950 hover:bg-zinc-800 rounded-lg cursor-pointer whitespace-nowrap disabled:opacity-50"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download PNG</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* AI Workflow Audit Trail */}
          {editPlan && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white border border-zinc-200 rounded-2xl p-4 space-y-1">
                <div className="text-[11px] font-semibold text-zinc-500 uppercase tracking-wider">
                  Step 1 · Image Analysis
                </div>
                <p className="text-xs text-zinc-800 leading-relaxed">{editPlan.analysis}</p>
              </div>
              <div className="bg-white border border-zinc-200 rounded-2xl p-4 space-y-1">
                <div className="text-[11px] font-semibold text-blue-600 uppercase tracking-wider">
                  Step 2 · Object Added
                </div>
                <p className="text-xs text-zinc-800 leading-relaxed">{editPlan.editSummary}</p>
              </div>
              <div className="bg-white border border-zinc-200 rounded-2xl p-4 space-y-1">
                <div className="text-[11px] font-semibold text-emerald-700 uppercase tracking-wider">
                  Step 3 · Integrity Preserved
                </div>
                <p className="text-xs text-zinc-800 leading-relaxed">
                  {editPlan.preservedIntegrityNote}
                </p>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
