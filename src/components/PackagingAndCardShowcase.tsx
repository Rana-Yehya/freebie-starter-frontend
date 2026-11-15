import React, { useState } from 'react';
import {
  Gift,
  Heart,
  Sparkles,
  MessageCircle,
  Camera,
} from 'lucide-react';
import { motion } from 'motion/react';
import { Language, translations } from '../data/translations';
import { PACKAGING_ASSETS, GIFT_CARD_PRICE_EGP } from '../data/products';
import { ImageWithLoader } from './ui/ImageWithLoader';
import { SectionHeader } from './ui/SectionHeader';

interface PackagingAndCardShowcaseProps {
  lang: Language;
}

export const PackagingAndCardShowcase: React.FC<
  PackagingAndCardShowcaseProps
> = ({ lang }) => {
  const t = translations[lang];
  const [useOriginalBoxPhoto, setUseOriginalBoxPhoto] =
    useState<boolean>(false);
  const [cardImageView, setCardImageView] = useState<'fancy' | 'panels'>(
    'fancy'
  );

  const activeBoxImage = useOriginalBoxPhoto
    ? PACKAGING_ASSETS.packagingOriginalPhoto
    : PACKAGING_ASSETS.packagingImage;

  const activeCardImage =
    cardImageView === 'fancy'
      ? PACKAGING_ASSETS.giftCardImage
      : PACKAGING_ASSETS.giftCardFullPanels;

  return (
    <section
      id="packaging"
      className="py-16 sm:py-20 bg-gradient-to-b from-[#FAF8F5] via-amber-50/30 to-[#FAF8F5] dark:from-stone-950 dark:via-stone-900/50 dark:to-stone-950 relative transition-colors"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow={lang === 'ar' ? 'جاهزة للإهداء دائماً' : 'Ready to Gift'}
          icon={<Gift className="w-3.5 h-3.5 text-amber-700 dark:text-amber-400" />}
          title={t.giftPackagingTitle}
          subtitle={t.giftPackagingSubtitle}
          className="mb-12"
        />

        {/* 2 Focused Cards: 1. Honeycomb Box | 2. Official Brand Gift Card */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {/* 1. Signature Honeycomb Packaging Feature */}
          <motion.div
            whileHover={{ y: -4 }}
            className="bg-white dark:bg-stone-900 rounded-3xl border border-amber-200/90 dark:border-stone-800 p-6 sm:p-8 shadow-xs flex flex-col justify-between space-y-6 transition-colors"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-3">
                <div className="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-500/15 flex items-center justify-center text-amber-800 dark:text-amber-400">
                  <Gift className="w-6 h-6" />
                </div>
                {/* Switch between Studio view and Real photo */}
                <button
                  onClick={() => setUseOriginalBoxPhoto(!useOriginalBoxPhoto)}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold bg-amber-50 dark:bg-stone-800 text-amber-800 dark:text-amber-300 border border-amber-200/80 dark:border-stone-700 hover:bg-amber-100 dark:hover:bg-stone-700 transition-colors cursor-pointer"
                >
                  <Camera className="w-3.5 h-3.5" />
                  <span>
                    {useOriginalBoxPhoto
                      ? lang === 'ar'
                        ? 'عرض استوديو فخم'
                        : 'View Studio Edit'
                      : lang === 'ar'
                        ? 'صورة العلبة الواقعية'
                        : 'View Real Box Photo'}
                  </span>
                </button>
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-wide text-amber-700 dark:text-amber-400">
                  {lang === 'ar'
                    ? 'تغليف البراند الرسمي'
                    : 'Official Brand Presentation'}
                </span>
                <h3 className="text-xl font-bold text-stone-900 dark:text-stone-100 font-serif-luxury mt-1">
                  {t.boxFeatureTitle}
                </h3>
              </div>

              <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
                {t.boxFeatureDesc}
              </p>

              {/* Box Photo with Image Loading UI */}
              <div className="relative aspect-[16/10] rounded-2xl overflow-hidden border border-amber-100 dark:border-stone-800 bg-stone-50 dark:bg-stone-800 group">
                <ImageWithLoader
                  src={activeBoxImage}
                  alt="Freebie Gifts signature honeycomb packaging"
                  lang={lang}
                  className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-500"
                />
                <div className="absolute bottom-3 left-3 z-20 bg-white/90 dark:bg-stone-900/90 backdrop-blur-xs text-[11px] font-bold text-stone-800 dark:text-stone-100 px-2.5 py-1 rounded-md shadow-xs pointer-events-none">
                  {lang === 'ar'
                    ? 'مجاناً مع كل قطعة'
                    : 'Free with Every Order'}
                </div>
                <div className="absolute top-3 right-3 z-20 bg-amber-400 text-stone-900 text-[10px] font-bold px-2 py-0.5 rounded-full shadow-xs pointer-events-none">
                  {useOriginalBoxPhoto
                    ? lang === 'ar'
                      ? 'الصورة الحقيقية'
                      : 'Real Photo'
                    : lang === 'ar'
                      ? 'تصوير استوديو'
                      : 'Studio Showcase'}
                </div>
              </div>

              {/* Detailed specs of the box */}
              <div className="pt-2 space-y-2.5 bg-amber-50/50 dark:bg-stone-800/60 rounded-2xl p-4 border border-amber-200/60 dark:border-stone-700">
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-300 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                  <span>{t.boxSpecsTitle}</span>
                </h4>
                <div className="grid grid-cols-1 gap-2 text-xs">
                  {t.boxSpecs.map((spec, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                      <div>
                        <strong className="text-stone-800 dark:text-stone-100 font-semibold">
                          {spec.label}:{' '}
                        </strong>
                        <span className="text-stone-600 dark:text-stone-300 leading-relaxed">
                          {spec.desc}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="text-xs text-amber-900 dark:text-amber-200 bg-amber-100/60 dark:bg-amber-950/40 border border-transparent dark:border-amber-800/40 rounded-xl p-3 font-medium flex items-center gap-1.5">
              <span>✨</span>
              <span>
                {lang === 'ar'
                  ? 'لا داعي للتغليف الخارجي، تصل الهدية في أبهى صورة لمفاجأتها فوراً.'
                  : 'No extra gift wrapping needed—arrives in prime condition ready to delight.'}
              </span>
            </div>
          </motion.div>

          {/* 2. Official Brand Gift Card Feature (30 EGP Add-on) */}
          <motion.div
            whileHover={{ y: -4 }}
            className="bg-white dark:bg-stone-900 rounded-3xl border border-amber-200/90 dark:border-stone-800 p-6 sm:p-8 shadow-xs flex flex-col justify-between space-y-6 transition-colors"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-3">
                <div className="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-500/15 flex items-center justify-center text-amber-800 dark:text-amber-400">
                  <Heart className="w-6 h-6" />
                </div>
                {/* Switch between Fancy Studio Card and 4-Panel Graphic */}
                <button
                  onClick={() =>
                    setCardImageView(
                      cardImageView === 'fancy' ? 'panels' : 'fancy'
                    )
                  }
                  className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold bg-amber-50 dark:bg-stone-800 text-amber-800 dark:text-amber-300 border border-amber-200/80 dark:border-stone-700 hover:bg-amber-100 dark:hover:bg-stone-700 transition-colors cursor-pointer"
                >
                  <Camera className="w-3.5 h-3.5" />
                  <span>
                    {cardImageView === 'fancy'
                      ? lang === 'ar'
                        ? 'عرض تفاصيل الأوجه الأربعة'
                        : 'View 4-Panel Graphic'
                      : lang === 'ar'
                        ? 'عرض تصوير استوديو'
                        : 'View Studio Edit'}
                  </span>
                </button>
              </div>

              <div className="flex items-start justify-between gap-3 flex-wrap">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wide text-amber-700 dark:text-amber-400">
                    {lang === 'ar'
                      ? 'كارت فريبي الرسمي'
                      : 'Official Freebie Gifts Card'}
                  </span>
                  <h3 className="text-xl font-bold text-stone-900 dark:text-stone-100 font-serif-luxury mt-1">
                    {t.cardFeatureTitle}
                  </h3>
                </div>
                <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-amber-400 text-stone-900 font-mono shadow-2xs">
                  {lang === 'ar'
                    ? `${GIFT_CARD_PRICE_EGP} ج.م`
                    : `${GIFT_CARD_PRICE_EGP} EGP`}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
                {t.cardFeatureDesc}
              </p>

              {/* Card Photo with Image Loading UI */}
              <div className="relative aspect-[16/10] rounded-2xl overflow-hidden border border-amber-100 dark:border-stone-800 bg-stone-50 dark:bg-stone-800 group">
                <ImageWithLoader
                  src={activeCardImage}
                  alt="Official Freebie Gifts gift card"
                  lang={lang}
                  className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-500"
                />
                <div className="absolute bottom-3 left-3 z-20 bg-white/90 dark:bg-stone-900/90 backdrop-blur-xs text-[11px] font-bold text-stone-800 dark:text-stone-100 px-2.5 py-1 rounded-md shadow-xs pointer-events-none">
                  {lang === 'ar'
                    ? `إضافة اختيارية · ${GIFT_CARD_PRICE_EGP} ج.م`
                    : `Add-On · ${GIFT_CARD_PRICE_EGP} EGP`}
                </div>
                <div className="absolute top-3 right-3 z-20 bg-amber-400 text-stone-900 text-[10px] font-bold px-2 py-0.5 rounded-full shadow-xs pointer-events-none">
                  {cardImageView === 'fancy'
                    ? lang === 'ar'
                      ? 'تصوير استوديو'
                      : 'Studio Edit'
                    : lang === 'ar'
                      ? 'الأوجه الكاملة'
                      : 'Full Panels'}
                </div>
              </div>

              {/* Detailed Specs of the Card (Honey Drips, Hexagons, Note Space, Brand Feelings Message) */}
              <div className="pt-2 space-y-2.5 bg-amber-50/50 dark:bg-stone-800/60 rounded-2xl p-4 border border-amber-200/60 dark:border-stone-700">
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-300 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                  <span>{t.cardSpecsTitle}</span>
                </h4>
                <div className="grid grid-cols-1 gap-2.5 text-xs">
                  {t.cardSpecs.map((spec, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                      <div>
                        <strong className="text-stone-800 dark:text-stone-100 font-semibold">
                          {spec.title}:{' '}
                        </strong>
                        <span className="text-stone-600 dark:text-stone-300 leading-relaxed">
                          {spec.desc}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Clear WhatsApp Note Instruction Banner */}
            <div className="bg-gradient-to-r from-amber-100 via-amber-50 to-amber-100 dark:from-amber-950/50 dark:via-stone-800 dark:to-amber-950/50 border border-amber-300/80 dark:border-amber-700/50 rounded-2xl p-4 flex items-center gap-3 shadow-2xs">
              <div className="w-9 h-9 rounded-xl bg-[#25D366] flex items-center justify-center text-white shrink-0 shadow-xs">
                <MessageCircle className="w-5 h-5 fill-white" />
              </div>
              <p className="text-xs text-stone-800 dark:text-stone-200 font-semibold leading-relaxed">
                {t.whatsappCardNotice}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
