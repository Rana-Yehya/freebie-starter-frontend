import React from 'react';
import { Droplets, HeartHandshake, Sparkles, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';
import { Language, translations } from '../data/translations';
import { SectionHeader } from './ui/SectionHeader';

interface StainlessSteelPromiseProps {
  lang: Language;
}

export const StainlessSteelPromise: React.FC<StainlessSteelPromiseProps> = ({ lang }) => {
  const t = translations[lang];

  const icons = [
    <Droplets className="w-6 h-6 text-amber-400" />,
    <HeartHandshake className="w-6 h-6 text-amber-400" />,
    <Sparkles className="w-6 h-6 text-amber-400" />,
    <ShieldCheck className="w-6 h-6 text-amber-400" />,
  ];

  return (
    <section id="promise" className="py-16 sm:py-20 bg-stone-900 dark:bg-stone-900/95 dark:border-y dark:border-stone-800 text-white relative overflow-hidden transition-colors">
      {/* Decorative warm ambient lights */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          eyebrow={t.promiseEyebrow}
          title={`"${t.promiseTitle}"`}
          subtitle={t.promiseDesc}
          dark
          className="mb-12 sm:mb-16"
        />

        {/* 4 Superpowers Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {t.promiseFeatures.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="bg-stone-800/80 border border-stone-700/80 hover:border-amber-400/50 rounded-2xl p-6 transition-colors shadow-lg group"
            >
              <div className="w-12 h-12 rounded-xl bg-amber-500/15 group-hover:bg-amber-500/25 flex items-center justify-center mb-4 transition-colors">
                {icons[idx]}
              </div>
              <h3 className="text-base font-bold text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-xs sm:text-sm text-stone-400 leading-relaxed">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Emotional Callout Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 bg-gradient-to-r from-amber-950/60 via-stone-800/80 to-amber-950/60 border border-amber-500/30 rounded-2xl p-6 text-center max-w-2xl mx-auto shadow-md"
        >
          <p className="text-sm sm:text-base font-medium text-amber-200">
            {lang === 'ar'
              ? '✨ كل إكسسوار نختاره يروي قصة حب تدوم للأبد. لا يصدأ، لا يتغير لونه، ولا تفارقها ذكراك أبداً.'
              : '✨ Every piece we craft is a pledge of eternal affection. It will not fade, it will not rust, and your memory will never leave her side.'}
          </p>
        </motion.div>
      </div>
    </section>
  );
};
