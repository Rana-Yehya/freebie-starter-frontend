import React from "react";
import { Globe, Sparkles, Moon, Sun } from "lucide-react";
import { Language, translations } from "../data/translations";
import { PACKAGING_ASSETS, STORE_DISCOUNT_PERCENT } from "../data/products";
import { ImageWithLoader } from "./ui/ImageWithLoader";
import { WhatsAppButton } from "./ui/WhatsAppButton";
import { buildWhatsAppUrl } from "../utils/whatsapp";

interface NavbarProps {
  lang: Language;
  onToggleLang: () => void;
  isDark: boolean;
  onToggleDark: () => void;
  whatsappNumber: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  lang,
  onToggleLang,
  isDark,
  onToggleDark,
  whatsappNumber,
}) => {
  const t = translations[lang];
  const hasDiscount = STORE_DISCOUNT_PERCENT > 0;

  const generalGreeting =
    lang === "ar"
      ? `مرحباً فريبي! 👋\nأود الاستفسار عن هدايا فريبي وإكسسوارات الستانلس ستيل.`
      : `Hello Freebie! 👋\nI'd like to ask about Freebie gifts and stainless steel accessories.`;
  const whatsappHref = buildWhatsAppUrl(whatsappNumber, generalGreeting);

  return (
    <header className="sticky top-0 z-50 bg-[#FAF8F5]/95 dark:bg-stone-950/95 backdrop-blur-md border-b border-[#EAE3D2]/70 dark:border-stone-800 transition-colors">
      {/* Top micro-announcement bar featuring unified store discount % */}
      <div className="bg-amber-500 dark:bg-amber-500 text-stone-900 text-xs py-1.5 px-4 font-medium text-center flex items-center justify-center gap-2 flex-wrap">
        <Sparkles className="w-3.5 h-3.5 text-stone-900 shrink-0" />
        {hasDiscount ? (
          <>
            <span className="font-extrabold uppercase tracking-wide bg-stone-900 text-amber-300 px-2 py-0.5 rounded text-[10px]">
              {lang === "ar"
                ? `خصم ${STORE_DISCOUNT_PERCENT}%`
                : `${STORE_DISCOUNT_PERCENT}% OFF`}
            </span>
            <span className="hidden sm:inline font-semibold">
              {lang === "ar"
                ? `عرض خاص: خصم ${STORE_DISCOUNT_PERCENT}% على جميع القطع · المتجر قيد التجهيز والطلبات متاحة عبر واتساب`
                : `Special Offer: ${STORE_DISCOUNT_PERCENT}% OFF all pieces · Orders open via WhatsApp (${t.comingSoonBadge})`}
            </span>
            <span className="sm:hidden font-semibold">
              {lang === "ar"
                ? `خصم ${STORE_DISCOUNT_PERCENT}% على جميع القطع · اطلب عبر واتساب`
                : `${STORE_DISCOUNT_PERCENT}% OFF all pieces · Order via WhatsApp`}
            </span>
          </>
        ) : (
          <>
            <span className="font-semibold">{t.comingSoonBadge}:</span>
            <span className="hidden sm:inline">
              {lang === "ar"
                ? "المتجر قيد التجهيز · الطلبات المباشرة متاحة عبر واتساب مع تغليف خاص"
                : "Full store launching soon · Orders open via WhatsApp with signature gift packaging"}
            </span>
            <span className="sm:hidden">
              {lang === "ar"
                ? "الطلبات متاحة عبر الواتساب"
                : "Orders open via WhatsApp"}
            </span>
          </>
        )}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Zone 1: Logo & Slogan */}
        <a href="#" className="flex items-center gap-3 group shrink-0">
          <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-amber-300 dark:border-amber-500 shadow-sm bg-white p-0.5 group-hover:scale-105 transition-transform">
            <ImageWithLoader
              src={PACKAGING_ASSETS.logoImage}
              alt="Freebie Logo"
              lang={lang}
              loaderSize="sm"
              showLoadingText={false}
              className="w-full h-full object-contain"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-bold tracking-tight text-stone-900 dark:text-stone-100 font-serif-luxury group-hover:text-amber-700 dark:group-hover:text-amber-400 transition-colors">
              {lang === "ar" ? "Freebie · فري بي" : "Freebie"}
            </span>
            {/* <span className="text-xs text-amber-700 dark:text-amber-400 font-medium italic -mt-0.5 tracking-wide">
              {t.slogan}
            </span> */}
          </div>
        </a>

        {/* Zone 2: Navigation Links */}
        {/* <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-stone-700 dark:text-stone-300">
          <a
            href="#categories"
            className="hover:text-amber-700 dark:hover:text-amber-400 transition-colors whitespace-nowrap"
          >
            {t.categoriesTitle}
          </a>
          <a
            href="#packaging"
            className="hover:text-amber-700 dark:hover:text-amber-400 transition-colors whitespace-nowrap"
          >
            {lang === 'ar' ? 'التغليف وكارت الإهداء' : 'Packaging & Gift Card'}
          </a>
          <a
            href="#promise"
            className="hover:text-amber-700 dark:hover:text-amber-400 transition-colors whitespace-nowrap"
          >
            {lang === 'ar' ? 'وعد الستانلس ستيل' : 'Stainless Steel Promise'}
          </a>
          <a
            href="#stories"
            className="hover:text-amber-700 dark:hover:text-amber-400 transition-colors whitespace-nowrap"
          >
            {lang === 'ar' ? 'قصص السعادة' : 'Happiness Stories'}
          </a>
          <a
            href="#future"
            className="hover:text-amber-700 dark:hover:text-amber-400 transition-colors whitespace-nowrap"
          >
            {lang === 'ar' ? 'هدايا قادمة' : 'More Gifts Soon'}
          </a>
        </nav> */}

        {/* Zone 3: Top-Right Actions: WhatsApp Direct + Dark Mode Toggle + Language Switcher */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          <WhatsAppButton
            variant="pill"
            href={whatsappHref}
            label={t.contactUs}
            className="hidden lg:flex"
            title={lang === "ar" ? "محادثة عبر واتساب" : "Chat on WhatsApp"}
          />

          {/* Dark Mode Toggle */}
          <button
            onClick={onToggleDark}
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            title={
              isDark
                ? lang === "ar"
                  ? "الوضع النهاري"
                  : "Light Mode"
                : lang === "ar"
                  ? "الوضع الليلي"
                  : "Dark Mode"
            }
            className="w-9 h-9 flex items-center justify-center rounded-full bg-white dark:bg-stone-900 text-stone-800 dark:text-amber-400 border border-amber-300 dark:border-stone-700 hover:bg-amber-50 dark:hover:bg-stone-800 transition-colors shadow-xs cursor-pointer"
          >
            {isDark ? (
              <Sun className="w-4 h-4" />
            ) : (
              <Moon className="w-4 h-4" />
            )}
          </button>

          {/* Top-Right Language Switcher */}
          <button
            onClick={onToggleLang}
            aria-label="Toggle language between English and Arabic"
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs sm:text-sm font-bold bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 border border-amber-300 dark:border-stone-700 rounded-full hover:bg-amber-50 dark:hover:bg-stone-800 hover:border-amber-400 transition-colors shadow-xs cursor-pointer"
          >
            <Globe className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            <span className="hidden sm:flex">
              {lang === "en" ? "العربية" : "English"}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
