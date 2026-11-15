import React from 'react';
import { ArrowDown, Heart, ShieldCheck, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { Language, translations } from '../data/translations';

interface HeroProps {
  lang: Language;
  onExploreClick: () => void;
  onPackagingClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ lang, onExploreClick, onPackagingClick }) => {
  const t = translations[lang];

  return (
    <section className="relative overflow-hidden pt-10 pb-16 lg:pt-16 lg:pb-20 bg-gradient-to-b from-[#FAF8F5] via-[#FFFDF9] to-[#FAF8F5] dark:from-stone-950 dark:via-stone-900 dark:to-stone-950 transition-colors">
      {/* Animated delicate background warm glow */}
      <motion.div
        animate={{
          scale: [1, 1.08, 1],
          opacity: [0.35, 0.55, 0.35],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-r from-amber-200/30 via-yellow-200/20 to-amber-100/30 dark:from-amber-500/15 dark:via-yellow-500/10 dark:to-amber-600/15 blur-3xl pointer-events-none -z-10 rounded-full"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center space-y-6"
        >
          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-stone-900 dark:text-stone-100 leading-[1.18] font-serif-luxury"
          >
            {t.heroTitle}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-lg text-stone-600 dark:text-stone-400 leading-relaxed max-w-2xl mx-auto"
          >
            {t.heroSubtitle}
          </motion.p>

          {/* Coming Soon Notice Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="w-full max-w-2xl bg-amber-50/80 dark:bg-stone-900/90 border border-amber-200/90 dark:border-amber-500/30 rounded-2xl p-5 text-start shadow-2xs"
          >
            <div className="flex items-start gap-3.5">
              <div className="w-9 h-9 rounded-xl bg-amber-500/20 flex items-center justify-center shrink-0 mt-0.5 text-amber-800 dark:text-amber-400">
                <Sparkles className="w-5 h-5 animate-pulse" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-sm font-bold text-stone-900 dark:text-stone-100 uppercase tracking-wide">
                    {t.comingSoonNoticeTitle}
                  </h3>
                  <motion.span
                    animate={{ opacity: [0.8, 1, 0.8] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-amber-300 dark:bg-amber-400 text-stone-900 shadow-xs"
                  >
                    {t.comingSoonBadge}
                  </motion.span>
                </div>
                <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed">
                  {t.comingSoonNoticeDesc}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-4 pt-2"
          >
            <motion.button
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={onExploreClick}
              className="flex items-center gap-2 px-7 py-3.5 text-sm font-bold text-stone-900 bg-amber-400 hover:bg-amber-300 rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer"
            >
              <span>{t.exploreCollection}</span>
              <ArrowDown className="w-4 h-4" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={onPackagingClick}
              className="flex items-center gap-2 px-7 py-3.5 text-sm font-semibold text-stone-800 dark:text-stone-100 bg-white dark:bg-stone-900 hover:bg-amber-50 dark:hover:bg-stone-800 border border-amber-200 dark:border-stone-700 rounded-xl shadow-xs transition-all cursor-pointer"
            >
              <Heart className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              <span>{lang === 'ar' ? 'التغليف وكارت الإهداء' : 'Packaging & Gift Card'}</span>
            </motion.button>
          </motion.div>

          {/* Quick Trust Highlights */}
          <div className="flex flex-wrap items-center justify-center gap-y-2 gap-x-6 text-xs text-stone-500 dark:text-stone-400 pt-2">
            <div className="flex items-center gap-1.5 font-medium">
              <ShieldCheck className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              <span>{lang === 'ar' ? 'ستانلس ستيل 316L لا يتغير لونه' : '316L Stainless Steel (Tarnish Free)'}</span>
            </div>
            <div className="flex items-center gap-1.5 font-medium">
              <Sparkles className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              <span>{lang === 'ar' ? 'علبة فري بي الفاخرة مع كل طلب وكارت إهداء بـ 30 ج.م' : 'Signature Box Included · Gift Card 30 EGP'}</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
