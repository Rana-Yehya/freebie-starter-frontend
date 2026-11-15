import React from 'react';
import { motion } from 'motion/react';

interface SectionHeaderProps {
  eyebrow: string;
  icon?: React.ReactNode;
  title: string;
  subtitle?: string;
  dark?: boolean;
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  eyebrow,
  icon,
  title,
  subtitle,
  dark = false,
  className = 'mb-10 sm:mb-14',
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5 }}
      className={`text-center max-w-3xl mx-auto space-y-3 ${className}`}
    >
      <div
        className={`inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider px-3.5 py-1 rounded-full shadow-2xs ${
          dark
            ? 'text-amber-400 bg-amber-500/15 border border-amber-400/30'
            : 'text-amber-800 dark:text-amber-300 bg-amber-100/80 dark:bg-amber-500/15 dark:border dark:border-amber-500/30'
        }`}
      >
        {icon}
        <span>{eyebrow}</span>
      </div>

      <h2
        className={`text-3xl sm:text-4xl font-bold tracking-tight font-serif-luxury leading-tight ${
          dark ? 'text-white lg:text-5xl' : 'text-stone-900 dark:text-stone-100'
        }`}
      >
        {title}
      </h2>

      {subtitle && (
        <p
          className={`text-sm sm:text-base leading-relaxed ${
            dark ? 'text-stone-300 pt-1' : 'text-stone-600 dark:text-stone-400'
          }`}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  );
};
