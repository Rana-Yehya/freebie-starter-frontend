import React, { useState, useEffect, useCallback } from 'react';
import { Heart, ChevronLeft, ChevronRight, Quote, Sparkles, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Language, translations } from '../data/translations';
import { SectionHeader } from './ui/SectionHeader';
import { buildWhatsAppUrl } from '../utils/whatsapp';

interface HappinessStoriesProps {
  lang: Language;
  whatsappNumber: string;
}

// Reusable Skeleton Component for Testimonial Carousel
const HappinessStoriesSkeleton: React.FC = () => {
  return (
    <div className="relative bg-white dark:bg-stone-900 rounded-3xl border border-amber-200/90 dark:border-stone-800 shadow-sm p-6 sm:p-12 md:p-16 animate-pulse">
      {/* Subtle Top Quote Watermark */}
      <div className="absolute top-6 left-6 text-stone-200 dark:text-stone-800 select-none pointer-events-none">
        <Quote className="w-16 h-16 sm:w-24 sm:h-24 rotate-180 opacity-40" />
      </div>

      <div className="min-h-[220px] sm:min-h-[190px] flex items-center justify-center">
        <div className="w-full text-center space-y-6">
          {/* Skeleton Tag */}
          <div className="h-4 bg-amber-100/70 dark:bg-amber-950/50 rounded-full w-48 mx-auto" />

          {/* Skeleton Quote Lines */}
          <div className="space-y-3 max-w-3xl mx-auto pt-2">
            <div className="h-6 sm:h-7 bg-stone-200/70 dark:bg-stone-800 rounded-lg w-11/12 mx-auto" />
            <div className="h-6 sm:h-7 bg-stone-200/70 dark:bg-stone-800 rounded-lg w-4/5 mx-auto" />
          </div>

          {/* Skeleton Attribution */}
          <div className="pt-2 space-y-2">
            <div className="h-5 bg-stone-200 dark:bg-stone-800 rounded w-36 mx-auto" />
            <div className="h-3.5 bg-stone-100 dark:bg-stone-800/70 rounded w-24 mx-auto" />
          </div>
        </div>
      </div>

      {/* Skeleton Controls Bar */}
      <div className="mt-8 pt-6 border-t border-amber-100 dark:border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Skeleton Dots */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-2.5 bg-amber-300 dark:bg-amber-500/60 rounded-full" />
          <div className="w-2.5 h-2.5 bg-stone-200 dark:bg-stone-700 rounded-full" />
          <div className="w-2.5 h-2.5 bg-stone-200 dark:bg-stone-700 rounded-full" />
          <div className="w-2.5 h-2.5 bg-stone-200 dark:bg-stone-700 rounded-full" />
        </div>

        {/* Skeleton CTA */}
        <div className="h-4 bg-stone-100 dark:bg-stone-800 rounded w-44" />

        {/* Skeleton Nav Buttons */}
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-stone-100 dark:bg-stone-800" />
          <div className="w-10 h-10 rounded-full bg-stone-100 dark:bg-stone-800" />
        </div>
      </div>
    </div>
  );
};

export const HappinessStories: React.FC<HappinessStoriesProps> = ({
  lang,
  whatsappNumber,
}) => {
  const t = translations[lang];
  const stories = t.stories;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [direction, setDirection] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Initial skeleton load for smooth visual initialization
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  const nextStory = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % stories.length);
  }, [stories.length]);

  const prevStory = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + stories.length) % stories.length);
  }, [stories.length]);

  // Auto-rotate every 6.5 seconds unless user hovers or is loading
  useEffect(() => {
    if (isPaused || isLoading) return;
    const timer = setInterval(() => {
      nextStory();
    }, 6500);
    return () => clearInterval(timer);
  }, [isPaused, isLoading, nextStory]);

  const currentStory = stories[currentIndex];

  const storyGreeting =
    lang === 'ar'
      ? `مرحباً فريبي! 👋\nقرأت قصص السعادة وأود طلب هدية مميزة لمفاجأة من أحب.`
      : `Hello Freebie! 👋\nI just read your Happiness Stories and would like to order a special gift surprise.`;
  const storyWhatsappHref = buildWhatsAppUrl(whatsappNumber, storyGreeting);

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? (lang === 'ar' ? -40 : 40) : (lang === 'ar' ? 40 : -40),
      opacity: 0,
      scale: 0.96,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: { duration: 0.45, ease: 'easeOut' as const },
    },
    exit: (dir: number) => ({
      x: dir > 0 ? (lang === 'ar' ? 40 : -40) : (lang === 'ar' ? -40 : 40),
      opacity: 0,
      scale: 0.96,
      transition: { duration: 0.35, ease: 'easeIn' as const },
    }),
  };

  return (
    <section
      id="stories"
      className="py-16 sm:py-24 bg-gradient-to-b from-white via-[#FAF8F5] to-white dark:from-stone-950 dark:via-stone-900 dark:to-stone-950 relative overflow-hidden transition-colors"
    >
      {/* Delicate warm ambient lighting in the background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gradient-to-r from-amber-100/40 via-yellow-100/30 to-amber-100/40 dark:from-amber-500/10 dark:via-yellow-500/5 dark:to-amber-500/10 rounded-full blur-3xl pointer-events-none -z-0" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          eyebrow={lang === 'ar' ? 'فرحة حقيقية' : 'Real Customer Joy'}
          icon={<Heart className="w-3.5 h-3.5 text-amber-700 dark:text-amber-400 animate-pulse" />}
          title={t.happinessStoriesTitle}
          subtitle={t.happinessStoriesSubtitle}
          className="mb-12 sm:mb-16"
        />

        {/* Carousel Container or Skeleton State */}
        {isLoading ? (
          <HappinessStoriesSkeleton />
        ) : (
          <div
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            className="relative bg-white dark:bg-stone-900 rounded-3xl border border-amber-200/90 dark:border-stone-800 shadow-sm p-6 sm:p-12 md:p-16 transition-all"
          >
            {/* Subtle Top Quote Watermark */}
            <div className="absolute top-6 left-6 text-amber-400/20 dark:text-amber-500/15 select-none pointer-events-none">
              <Quote className="w-16 h-16 sm:w-24 sm:h-24 rotate-180" />
            </div>

            <div className="min-h-[220px] sm:min-h-[190px] flex items-center justify-center">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={currentStory.id}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="w-full text-center space-y-6"
                >
                  {/* Story Tag (Clean unboxed metadata) */}
                  <div className="inline-flex items-center gap-2 text-xs font-bold tracking-wider uppercase text-amber-800 dark:text-amber-400">
                    <Sparkles className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                    <span>{currentStory.tag}</span>
                    <span className="text-amber-300 dark:text-amber-700">·</span>
                    <span className="text-stone-500 dark:text-stone-400 font-medium normal-case">
                      {currentStory.occasion}
                    </span>
                  </div>

                  {/* Main Testimonial Quote */}
                  <blockquote className="text-lg sm:text-2xl md:text-2xl font-serif-luxury text-stone-900 dark:text-stone-100 leading-relaxed font-medium italic max-w-3xl mx-auto px-2">
                    "{currentStory.quote}"
                  </blockquote>

                  {/* Attribution Info */}
                  <div className="pt-2">
                    <p className="text-base font-bold text-stone-900 dark:text-stone-100">
                      {currentStory.name}
                    </p>
                    <p className="text-xs text-stone-500 dark:text-stone-400">
                      {currentStory.location}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Carousel Controls: Arrows & Indicators */}
            <div className="mt-8 pt-6 border-t border-amber-100 dark:border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              
              {/* Story Dot Indicators */}
              <div className="flex items-center gap-2">
                {stories.map((story, idx) => (
                  <button
                    key={story.id}
                    onClick={() => {
                      setDirection(idx > currentIndex ? 1 : -1);
                      setCurrentIndex(idx);
                    }}
                    aria-label={`Go to story ${idx + 1}`}
                    className={`h-2.5 rounded-full transition-all cursor-pointer ${
                      currentIndex === idx
                        ? 'w-8 bg-amber-500'
                        : 'w-2.5 bg-stone-200 dark:bg-stone-700 hover:bg-amber-200 dark:hover:bg-amber-700'
                    }`}
                  />
                ))}
              </div>

              {/* Quick Surprise CTA */}
              <a
                href={storyWhatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-bold text-stone-800 dark:text-stone-200 hover:text-amber-700 dark:hover:text-amber-400 transition-colors cursor-pointer group"
              >
                <MessageCircle className="w-4 h-4 text-[#25D366]" />
                <span>{t.readyToSurpriseHer}</span>
                <span className="text-amber-700 dark:text-amber-400 underline group-hover:text-amber-900 dark:group-hover:text-amber-300">
                  {t.orderViaWhatsApp}
                </span>
              </a>

              {/* Arrow Nav Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={prevStory}
                  aria-label="Previous Story"
                  className="w-10 h-10 rounded-full border border-stone-200 dark:border-stone-700 hover:border-amber-400 dark:hover:border-amber-500 hover:bg-amber-50 dark:hover:bg-stone-800 flex items-center justify-center text-stone-700 dark:text-stone-200 transition-colors cursor-pointer shadow-2xs"
                >
                  {lang === 'ar' ? (
                    <ChevronRight className="w-5 h-5" />
                  ) : (
                    <ChevronLeft className="w-5 h-5" />
                  )}
                </button>
                <button
                  onClick={nextStory}
                  aria-label="Next Story"
                  className="w-10 h-10 rounded-full border border-stone-200 dark:border-stone-700 hover:border-amber-400 dark:hover:border-amber-500 hover:bg-amber-50 dark:hover:bg-stone-800 flex items-center justify-center text-stone-700 dark:text-stone-200 transition-colors cursor-pointer shadow-2xs"
                >
                  {lang === 'ar' ? (
                    <ChevronLeft className="w-5 h-5" />
                  ) : (
                    <ChevronRight className="w-5 h-5" />
                  )}
                </button>
              </div>

            </div>

          </div>
        )}

      </div>
    </section>
  );
};
