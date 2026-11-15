import React from "react";
import { Heart, Sparkles } from "lucide-react";
import { Language, translations } from "../data/translations";
import { PACKAGING_ASSETS } from "../data/products";
import { ImageWithLoader } from "./ui/ImageWithLoader";
import { WhatsAppButton } from "./ui/WhatsAppButton";
import { buildWhatsAppUrl } from "../utils/whatsapp";

interface FooterProps {
  lang: Language;
  whatsappNumber: string;
}

export const Footer: React.FC<FooterProps> = ({ lang, whatsappNumber }) => {
  const t = translations[lang];

  const greeting =
    lang === "ar"
      ? `مرحباً فريبي! 👋\nأود الاستفسار عن الهدايا والإكسسوارات.`
      : `Hello Freebie! 👋\nI'd like to ask about gifts and accessories.`;
  const whatsappHref = buildWhatsAppUrl(whatsappNumber, greeting);

  return (
    <footer className="bg-stone-900 text-white pt-16 pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-stone-800">
          {/* Brand Col & Clickable Socials */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-white p-0.5 border border-amber-400">
                <ImageWithLoader
                  src={PACKAGING_ASSETS.logoImage}
                  alt="Freebie logo"
                  lang={lang}
                  loaderSize="sm"
                  showLoadingText={false}
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <span className="text-2xl font-bold font-serif-luxury tracking-tight text-white block">
                  {lang === "ar" ? " فري بي" : "Freebie"}
                </span>
                <span className="text-xs text-amber-400 italic font-medium">
                  "{t.slogan}"
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-stone-400 leading-relaxed max-w-sm">
              {lang === "ar"
                ? "علامة تجارية متخصصة في نشر السعادة بالهدايا الأنيقة والستانلس ستيل الدائم، لتكون كل مفاجأة ذكرى خالدة لا تنتهي."
                : "A boutique brand dedicated to spreading happiness through elegant, affordable gifts and timeless stainless steel jewelry designed to last forever."}
            </p>

            {/* Clickable Social Media Links: Instagram, Facebook, TikTok */}
            <div className="pt-2 space-y-2">
              <span className="text-xs font-semibold text-stone-300 block">
                {t.followUs}:
              </span>
              <div className="flex items-center gap-3">
                {/* Instagram */}
                <a
                  href="https://www.instagram.com/freebie.gifts/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="w-10 h-10 rounded-xl bg-stone-800 hover:bg-gradient-to-tr hover:from-amber-600 hover:via-pink-600 hover:to-purple-600 flex items-center justify-center text-stone-300 hover:text-white transition-all transform hover:scale-110 shadow-sm"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>

                {/* Facebook */}
                <a
                  href="https://www.facebook.com/freebiegifts.official"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="w-10 h-10 rounded-xl bg-stone-800 hover:bg-[#1877F2] flex items-center justify-center text-stone-300 hover:text-white transition-all transform hover:scale-110 shadow-sm"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.5 5H18V0h-3.808C10.595 0 9 1.583 9 4.615V8z" />
                  </svg>
                </a>

                {/* TikTok */}
                <a
                  href="https://www.tiktok.com/@freebie.gifts"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="TikTok"
                  className="w-10 h-10 rounded-xl bg-stone-800 hover:bg-black flex items-center justify-center text-stone-300 hover:text-red-400 transition-all transform hover:scale-110 shadow-sm border border-transparent hover:border-pink-500"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
                  </svg>
                </a>
              </div>
            </div>

            <div className="pt-2">
              <WhatsAppButton
                variant="compact"
                href={whatsappHref}
                label={t.contactUs}
              />
            </div>
          </div>

          {/* Quick Links: Categories */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400">
              {t.categoriesTitle}
            </h4>
            <ul className="text-xs sm:text-sm text-stone-400 space-y-2">
              <li>
                <a
                  href="#categories"
                  className="hover:text-amber-300 transition-colors"
                >
                  {t.catSets} ({lang === "ar" ? "طقم هدية متكامل" : "Gift Sets"}
                  )
                </a>
              </li>
              <li>
                <a
                  href="#categories"
                  className="hover:text-amber-300 transition-colors"
                >
                  {t.catEarrings} (
                  {lang === "ar" ? "أقراط ستانلس ستيل" : "Earrings"})
                </a>
              </li>
              <li>
                <a
                  href="#categories"
                  className="hover:text-amber-300 transition-colors"
                >
                  {t.catBracelets} (
                  {lang === "ar" ? "أساور مقاومة للماء" : "Bracelets"})
                </a>
              </li>
              <li>
                <a
                  href="#categories"
                  className="hover:text-amber-300 transition-colors"
                >
                  {t.catNecklaces} (
                  {lang === "ar" ? "قلادات وسلاسل خالدة" : "Necklaces"})
                </a>
              </li>
            </ul>
          </div>

          {/* Special Packaging & Promise */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400">
              {lang === "ar" ? "مميزات فري بي" : "Freebie Values"}
            </h4>
            <ul className="text-xs sm:text-sm text-stone-400 space-y-2">
              <li className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>
                  {lang === "ar"
                    ? "ستانلس ستيل 316L لا يتغير لونه"
                    : "316L Stainless Steel"}
                </span>
              </li>
              <li className="flex items-center gap-1.5">
                <Heart className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>
                  {lang === "ar"
                    ? "تغليف خاص مع كل هدية"
                    : "Signature Packaging Included"}
                </span>
              </li>
              <li className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>
                  {lang === "ar"
                    ? "كارت إهداء رسمي (+30 ج.م)"
                    : "Official Gift Card (+30 EGP)"}
                </span>
              </li>
              <li className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>
                  {lang === "ar"
                    ? "طلب فوري ومباشر عبر واتساب"
                    : "Direct WhatsApp Orders"}
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>
            © {new Date().getFullYear()} Freebie. {t.footerRights}
          </p>
          <p className="flex items-center gap-1 text-amber-400/90 font-medium">
            <span>{t.slogan}</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
