import React from 'react';
import { Sparkles, Sun, Smile, PackagePlus, HeartHandshake } from 'lucide-react';
import { Language, translations } from '../data/translations';
import { PACKAGING_ASSETS } from '../data/products';
import { ImageWithLoader } from './ui/ImageWithLoader';

interface MoreGiftsComingProps {
  lang: Language;
}

export const MoreGiftsComing: React.FC<MoreGiftsComingProps> = ({ lang }) => {
  const t = translations[lang];

  const icons = [
    <Sun className="w-6 h-6 text-amber-600 dark:text-amber-400" />,
    <Smile className="w-6 h-6 text-amber-600 dark:text-amber-400" />,
    <PackagePlus className="w-6 h-6 text-amber-600 dark:text-amber-400" />,
  ];

  return (
    <section
      id="future"
      className="py-16 sm:py-24 bg-white dark:bg-stone-950 relative overflow-hidden transition-colors"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Brand Vibe Banner */}
        <div className="bg-gradient-to-r from-amber-50 via-yellow-50 to-amber-100/70 dark:from-stone-900 dark:via-stone-900 dark:to-amber-950/30 border border-amber-200 dark:border-amber-800/40 rounded-3xl p-8 sm:p-12 relative overflow-hidden">
          {/* Decorative bee watermark */}
          <div className="absolute -bottom-8 -right-8 w-48 h-48 opacity-10 pointer-events-none">
            <ImageWithLoader
              src={PACKAGING_ASSETS.logoImage}
              alt=""
              lang={lang}
              loaderSize="sm"
              showLoadingText={false}
              className="w-full h-full object-contain"
            />
          </div>

          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-400 text-stone-900 rounded-full text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t.slogan}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-stone-900 dark:text-stone-100 font-serif-luxury">
              {t.futureGiftsTitle}
            </h2>

            <p className="text-sm sm:text-base text-stone-700 dark:text-stone-300 leading-relaxed">
              {t.futureGiftsSubtitle}
            </p>
          </div>

          {/* 3 Upcoming Gift Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
            {t.futureItems.map((item, idx) => (
              <div
                key={idx}
                className="bg-white/90 dark:bg-stone-900/90 backdrop-blur-xs rounded-2xl p-6 border border-amber-200/90 dark:border-stone-800 shadow-xs hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 rounded-xl bg-amber-100 dark:bg-amber-500/15 flex items-center justify-center mb-4">
                  {icons[idx]}
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-base font-bold text-stone-900 dark:text-stone-100">
                      {item.title}
                    </h3>
                    <span className="text-[10px] font-semibold uppercase tracking-wide bg-amber-100 dark:bg-amber-500/20 text-amber-800 dark:text-amber-300 px-2 py-0.5 rounded-md">
                      {lang === 'ar' ? 'قريباً' : 'Soon'}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Cheerful Vibe Statement */}
          <div className="mt-8 pt-6 border-t border-amber-200/80 dark:border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-amber-900 dark:text-amber-300 font-medium">
            <div className="flex items-center gap-2">
              <HeartHandshake className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              <span>
                {lang === 'ar'
                  ? 'هدفنا في فري بي: رسم الابتسامة على وجه من تحب بهدايا راقية وفي متناول الجميع.'
                  : 'Our goal at Freebie: Putting genuine smiles on faces with accessible, high-elegance gifts.'}
              </span>
            </div>
            <span className="font-bold font-serif-luxury text-sm text-stone-800 dark:text-stone-200">
              Freebie · {t.slogan}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
