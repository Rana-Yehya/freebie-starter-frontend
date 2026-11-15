import React, { useState, useEffect, useCallback } from 'react';
import {
  Star,
  ChevronLeft,
  ChevronRight,
  BadgeCheck,
  MapPin,
  Quote,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Language, translations } from '../data/translations';
import { SectionHeader } from './ui/SectionHeader';

interface CustomerReviewsProps {
  lang: Language;
}

const AUTO_SLIDE_MS = 4500;

const getInitials = (name: string): string => {
  const parts = name
    .replace(/&/g, ' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean);
  if (parts.length === 0) return 'F';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
};

export const CustomerReviews: React.FC<CustomerReviewsProps> = ({ lang }) => {
  const t = translations[lang];
  // Pull testimonials directly from the central translations testimonial list
  const testimonials = t.stories;

  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [visibleCount, setVisibleCount] = useState<number>(3);

  // Responsive card count (1 on mobile, 2 on tablet, 3 on desktop)
  useEffect(() => {
    const updateCount = () => {
      if (window.innerWidth >= 1024) {
        setVisibleCount(3);
      } else if (window.innerWidth >= 768) {
        setVisibleCount(2);
      } else {
        setVisibleCount(1);
      }
    };
    updateCount();
    window.addEventListener('resize', updateCount);
    return () => window.removeEventListener('resize', updateCount);
  }, []);

  const nextSlide = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  const prevSlide = useCallback(() => {
    setActiveIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  }, [testimonials.length]);

  useEffect(() => {
    if (isPaused || testimonials.length <= 1) return;
    const timer = setInterval(nextSlide, AUTO_SLIDE_MS);
    return () => clearInterval(timer);
  }, [isPaused, nextSlide, testimonials.length]);

  // Build ordered window of visible cards starting from activeIndex
  const visibleReviews = Array.from(
    { length: Math.min(visibleCount, testimonials.length) },
    (_, offset) => {
      const idx = (activeIndex + offset) % testimonials.length;
      return {
        review: testimonials[idx],
        sourceIndex: idx,
        slot: offset,
      };
    }
  );

  return (
    <section
      id="reviews"
      className="py-16 sm:py-20 bg-gradient-to-b from-[#FAF8F5] to-amber-50/40 dark:from-stone-950 dark:to-stone-900/80 border-t border-stone-200/70 dark:border-stone-800/80 relative overflow-hidden transition-colors"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow={t.reviewsEyebrow}
          icon={<Star className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 fill-amber-500" />}
          title={t.reviewsTitle}
          subtitle={t.reviewsSubtitle}
          className="mb-8"
        />

        {/* Compact Rating Trust Pill */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white dark:bg-stone-900 border border-amber-200 dark:border-stone-700 shadow-2xs">
            <div className="flex items-center gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className="w-3.5 h-3.5 text-amber-500 fill-amber-400"
                />
              ))}
            </div>
            <span className="text-xs font-bold text-stone-800 dark:text-stone-100">
              {t.reviewsRatingLabel}
            </span>
          </div>
        </div>

        {/* Auto-Sliding Multi-Card Carousel */}
        <div
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="relative"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout" initial={false}>
              {visibleReviews.map(({ review, sourceIndex, slot }) => (
                <motion.article
                  key={`${review.id}-${sourceIndex}`}
                  layout
                  initial={{ opacity: 0, x: lang === 'ar' ? -36 : 36, scale: 0.96 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: lang === 'ar' ? 36 : -36, scale: 0.96 }}
                  transition={{
                    duration: 0.45,
                    delay: slot * 0.04,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200/90 dark:border-stone-800 hover:border-amber-300 dark:hover:border-amber-500/60 shadow-xs hover:shadow-lg p-6 flex flex-col justify-between space-y-5 transition-colors relative overflow-hidden"
                >
                  {/* Subtle Corner Quote Watermark */}
                  <Quote className="w-10 h-10 text-amber-400/15 dark:text-amber-500/10 absolute top-4 end-4 pointer-events-none" />

                  <div className="space-y-4">
                    {/* Stars & Verified Badge */}
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-0.5">
                        {Array.from({ length: 5 }).map((_, idx) => (
                          <Star
                            key={idx}
                            className="w-4 h-4 text-amber-500 fill-amber-400"
                          />
                        ))}
                      </div>
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200/70 dark:border-emerald-800/50 px-2.5 py-0.5 rounded-full">
                        <BadgeCheck className="w-3.5 h-3.5" />
                        <span>{t.verifiedGiftLabel}</span>
                      </span>
                    </div>

                    {/* Review Quote */}
                    <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed font-medium">
                      "{review.quote}"
                    </p>
                  </div>

                  {/* Author & Occasion Footer */}
                  <div className="pt-4 border-t border-stone-100 dark:border-stone-800 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-300 to-amber-500 text-stone-900 font-extrabold text-xs flex items-center justify-center shrink-0 shadow-2xs">
                      {getInitials(review.name)}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <h4 className="text-sm font-bold text-stone-900 dark:text-stone-100 truncate">
                          {review.name}
                        </h4>
                        <span className="text-[10px] font-semibold text-stone-400 dark:text-stone-500 flex items-center gap-0.5 shrink-0">
                          <MapPin className="w-3 h-3" />
                          <span>{review.location}</span>
                        </span>
                      </div>
                      <p className="text-[11px] text-amber-700 dark:text-amber-400 font-semibold truncate mt-0.5">
                        {review.occasion}
                      </p>
                    </div>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </div>

          {/* Progress Bar + Dots & Prev/Next Controls */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Clickable Dot Indicators */}
            <div className="flex items-center gap-2">
              {testimonials.map((item, idx) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveIndex(idx)}
                  aria-label={`View review ${idx + 1}`}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    activeIndex === idx
                      ? 'w-8 bg-amber-500'
                      : 'w-2.5 bg-stone-300 dark:bg-stone-700 hover:bg-amber-300 dark:hover:bg-amber-600'
                  }`}
                />
              ))}
            </div>

            {/* Subtle Auto-Slide Progress Indicator */}
            <div className="hidden md:flex items-center gap-2 flex-1 max-w-xs mx-4">
              <div className="h-1 w-full bg-stone-200 dark:bg-stone-800 rounded-full overflow-hidden">
                <motion.div
                  key={`${activeIndex}-${isPaused}`}
                  initial={{ width: '0%' }}
                  animate={{ width: isPaused ? '0%' : '100%' }}
                  transition={{
                    duration: isPaused ? 0 : AUTO_SLIDE_MS / 1000,
                    ease: 'linear',
                  }}
                  className="h-full bg-amber-500 rounded-full"
                />
              </div>
            </div>

            {/* Navigation Arrows */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={prevSlide}
                aria-label="Previous review"
                className="w-10 h-10 rounded-full bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 hover:border-amber-400 dark:hover:border-amber-500 hover:bg-amber-50 dark:hover:bg-stone-800 flex items-center justify-center text-stone-700 dark:text-stone-200 transition-colors cursor-pointer shadow-2xs"
              >
                {lang === 'ar' ? (
                  <ChevronRight className="w-5 h-5" />
                ) : (
                  <ChevronLeft className="w-5 h-5" />
                )}
              </button>
              <button
                type="button"
                onClick={nextSlide}
                aria-label="Next review"
                className="w-10 h-10 rounded-full bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 hover:border-amber-400 dark:hover:border-amber-500 hover:bg-amber-50 dark:hover:bg-stone-800 flex items-center justify-center text-stone-700 dark:text-stone-200 transition-colors cursor-pointer shadow-2xs"
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
      </div>
    </section>
  );
};
