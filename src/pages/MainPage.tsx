import { ArrowRight, BookOpen, ImagePlus, Pencil, Trash2, Type, Wand2 } from "lucide-react";
import { useState } from "react";
import { PageId, PhotoItem } from "../types/studio";
import { STUDIO_ASSETS } from "../utils/storage";

interface MainPageProps {
  photos: PhotoItem[];
  onNavigate: (page: PageId) => void;
  onEditPhoto: (photo: PhotoItem) => void;
  onDeletePhoto: (id: string) => Promise<void>;
  onSendToPage: (page: PageId, photo: PhotoItem) => void;
  onOpenPhotoHall: () => void;
}

const STUDIO_CARDS: {
  id: PageId;
  index: string;
  kicker: string;
  title: string;
  burmeseTitle: string;
  description: string;
  image: string;
  icon: typeof ImagePlus;
  cta: string;
}[] = [
  {
    id: "create",
    index: "01",
    kicker: "Coloring Book (300+ DPI) · Photo Hall",
    title: "Photo & Coloring Create",
    burmeseTitle: "Coloring Book နှင့် ဓာတ်ပုံဖန်တီးရန်",
    description:
      "Create 300+ DPI Black & White / Grayscale coloring pages (US Letter or A4) or artwork, save to Photo Hall, edit & download PDF/PNG.",
    image: STUDIO_ASSETS.photoCreate,
    icon: ImagePlus,
    cta: "Open Photo Create",
  },
  {
    id: "book",
    index: "02",
    kicker: "20–35 Pages · Full Resolution PDF & ZIP",
    title: "Coloring Book Builder",
    burmeseTitle: "ပုံ ၂၀ မှ ၃၅ ပုံစုပေါင်းပြီး PDF / ZIP ထုတ်ရန်",
    description:
      "Custom-select 20 to 35 created images, arrange page order, and export a full-resolution book as PDF or ZIP with zero quality loss.",
    image: STUDIO_ASSETS.bookBuilder,
    icon: BookOpen,
    cta: "Open Book Builder",
  },
  {
    id: "text",
    index: "03",
    kicker: "Promo Posters · 3D Book Mockups · Typography",
    title: "Text & Poster Studio",
    burmeseTitle: "စာသား၊ Promo Poster နှင့် Image များဖန်တီးရန်",
    description:
      "Create book promo posters with 3D covers, tilted coloring cards, comic 3D text, ribbons, and AI-generated scenes.",
    image: STUDIO_ASSETS.textStudio,
    icon: Type,
    cta: "Open Text Studio",
  },
  {
    id: "ai-edit",
    index: "04",
    kicker: "Non-Destructive · Original Integrity",
    title: "AI Precision Image Edit",
    burmeseTitle: "မူရင်းပုံမပျက် စိတ်ကြိုက်အသေးစိတ်ပြင်ဆင်ရန်",
    description:
      "Upload any image and apply minor targeted edits—attire color, subtle details, lines/dots, or grading—without altering faces or layout.",
    image: STUDIO_ASSETS.baganDawn,
    icon: Wand2,
    cta: "Open AI Image Edit",
  },
];

export function MainPage({
  photos,
  onNavigate,
  onEditPhoto,
  onDeletePhoto,
  onSendToPage,
  onOpenPhotoHall,
}: MainPageProps) {
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-8 pb-24 md:pb-16 space-y-14">
      {/* Hero Intro */}
      <section className="max-w-3xl space-y-3">
        <p className="text-xs font-medium text-zinc-500 tracking-wide">
          Lumina Creative Suite · Coloring Book, Print Export & Typography
        </p>
        <h1
          className="text-3xl sm:text-5xl font-bold tracking-tight text-zinc-950 leading-[1.12]"
          style={{ textWrap: "balance" }}
        >
          Create 300+ DPI Coloring Pages & Publish Books
        </h1>
        <p className="text-base text-zinc-600 leading-relaxed max-w-2xl">
          Coloring Book မျဉ်းကြောင်းပုံများ (US Letter / A4 · 300+ DPI · Black & White / Grayscale) ဖန်တီးခြင်း၊ ပုံ ၂၀–၃၅ ပုံ စုစည်း၍ PDF / ZIP ထုတ်ခြင်း နှင့် စိတ်ကြိုက်စာသားဒီဇိုင်းထည့်သွင်းခြင်းတို့ကို ပြုလုပ်နိုင်ပါသည်။
        </p>
      </section>

      {/* 3-Card Grid View */}
      <section aria-label="Studio Workspaces">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {STUDIO_CARDS.map((card) => {
            const Icon = card.icon;
            return (
              <button
                key={card.id}
                type="button"
                onClick={() => onNavigate(card.id)}
                className="group text-left bg-white border border-zinc-200 rounded-2xl overflow-hidden hover:border-zinc-400 transition-all duration-200 flex flex-col cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
              >
                <div className="aspect-[4/3] w-full bg-zinc-900 overflow-hidden relative">
                  <img
                    src={card.image}
                    alt={card.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white">
                    <span className="text-xs font-semibold tracking-wide tabular-nums">
                      {card.index}. {card.title}
                    </span>
                    <Icon className="w-4 h-4 opacity-90" />
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between gap-4">
                  <div className="space-y-1.5">
                    <div className="text-xs text-zinc-500">{card.kicker}</div>
                    <h2 className="text-xl font-semibold tracking-tight text-zinc-950">
                      {card.title}
                    </h2>
                    <p className="text-xs font-medium text-blue-700">{card.burmeseTitle}</p>
                    <p className="text-sm text-zinc-600 leading-relaxed pt-1">
                      {card.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-zinc-100 flex items-center justify-between text-sm font-semibold text-zinc-950">
                    <span className="whitespace-nowrap">{card.cta}</span>
                    <ArrowRight className="w-4 h-4 text-zinc-500 group-hover:translate-x-1 group-hover:text-zinc-950 transition-all" />
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* Photo Hall Preview Strip */}
      <section className="space-y-5 pt-2 border-t border-zinc-200/80">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold tracking-tight text-zinc-950">
              Photo Hall
            </h2>
            <p className="text-sm text-zinc-500">
              သိမ်းဆည်းထားသော ပုံများ ({photos.length}) · Edit, Delete, Add to Book or Add Text
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onOpenPhotoHall}
              className="min-h-[40px] px-4 py-2 text-xs font-semibold text-zinc-900 bg-white border border-zinc-200 rounded-lg hover:border-zinc-400 cursor-pointer whitespace-nowrap"
            >
              View All ({photos.length})
            </button>
            <button
              type="button"
              onClick={() => onNavigate("create")}
              className="min-h-[40px] px-4 py-2 text-xs font-semibold text-white bg-zinc-950 rounded-lg hover:bg-zinc-800 cursor-pointer whitespace-nowrap"
            >
              Create New Page
            </button>
          </div>
        </div>

        {photos.length === 0 ? (
          <div className="bg-white border border-zinc-200 rounded-2xl p-10 text-center space-y-3">
            <p className="text-sm font-medium text-zinc-900">No photos in Photo Hall yet.</p>
            <button
              type="button"
              onClick={() => onNavigate("create")}
              className="min-h-[42px] px-5 py-2 text-xs font-semibold text-white bg-zinc-950 rounded-lg hover:bg-zinc-800 cursor-pointer"
            >
              Create First Coloring Page
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {photos.slice(0, 4).map((photo) => (
              <div
                key={photo.id}
                className="bg-white border border-zinc-200 rounded-xl overflow-hidden flex flex-col"
              >
                <div className="aspect-[4/3] bg-zinc-100 overflow-hidden">
                  <img
                    src={photo.dataUrl}
                    alt={photo.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-contain bg-white"
                  />
                </div>
                <div className="p-3.5 space-y-2.5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="text-[11px] text-zinc-500 tabular-nums">
                      {photo.width}×{photo.height}
                      {photo.dpi ? ` · ${photo.dpi} DPI` : ""} · {photo.kind}
                    </div>
                    <h3 className="text-sm font-semibold text-zinc-950 truncate mt-0.5">
                      {photo.title}
                    </h3>
                  </div>

                  <div className="flex items-center gap-1 pt-2 border-t border-zinc-100">
                    <button
                      type="button"
                      onClick={() => onEditPhoto(photo)}
                      title="Edit photo"
                      className="min-h-[36px] flex-1 inline-flex items-center justify-center gap-1 px-2 text-xs font-medium text-zinc-700 bg-zinc-100 hover:bg-zinc-200 rounded-md cursor-pointer"
                    >
                      <Pencil className="w-3.5 h-3.5" />
                      <span>Edit</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => onSendToPage("book", photo)}
                      title="Open in Book Builder"
                      className="min-h-[36px] min-w-[36px] inline-flex items-center justify-center text-zinc-700 hover:bg-zinc-100 rounded-md cursor-pointer"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => onSendToPage("text", photo)}
                      title="Add Text"
                      className="min-h-[36px] min-w-[36px] inline-flex items-center justify-center text-zinc-700 hover:bg-zinc-100 rounded-md cursor-pointer"
                    >
                      <Type className="w-3.5 h-3.5" />
                    </button>
                    {confirmDeleteId === photo.id ? (
                      <button
                        type="button"
                        onClick={async () => {
                          await onDeletePhoto(photo.id);
                          setConfirmDeleteId(null);
                        }}
                        className="min-h-[36px] px-2 text-xs font-semibold text-white bg-red-600 rounded-md cursor-pointer"
                      >
                        Del
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setConfirmDeleteId(photo.id)}
                        title="Delete photo"
                        className="min-h-[36px] min-w-[36px] inline-flex items-center justify-center text-zinc-500 hover:text-red-600 hover:bg-red-50 rounded-md cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
