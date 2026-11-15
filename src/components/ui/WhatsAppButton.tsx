import React from "react";
import { MessageCircle } from "lucide-react";
import { motion } from "motion/react";

interface WhatsAppButtonProps {
  onClick?: () => void;
  href?: string;
  label: string;
  subLabel?: string;
  variant?: "primary" | "pill" | "compact";
  title?: string;
  className?: string;
}

export const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({
  onClick,
  href,
  label,
  subLabel,
  variant = "primary",
  title,
  className = "",
}) => {
  if (variant === "pill") {
    const pillClass = `flex items-center gap-1.5 px-3 sm:px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-[#25D366] hover:bg-[#20bd5a] rounded-full shadow-sm hover:shadow transition-all whitespace-nowrap cursor-pointer ${className}`;
    if (href) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          title={title}
          className={pillClass}
        >
          <MessageCircle className="w-4 h-4 fill-white text-white shrink-0" />
          <span className="hidden sm:inline">{label}</span>
        </a>
      );
    }
    return (
      <button onClick={onClick} title={title} className={pillClass}>
        <MessageCircle className="w-4 h-4 fill-white text-white shrink-0" />
        <span className="hidden sm:inline">{label}</span>
      </button>
    );
  }

  if (variant === "compact") {
    const compactClass = `inline-flex items-center gap-2 px-4 py-2 bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer ${className}`;
    if (href) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          title={title}
          className={compactClass}
        >
          <MessageCircle className="w-4 h-4 fill-white text-white shrink-0" />
          <span>{label}</span>
        </a>
      );
    }
    return (
      <button onClick={onClick} title={title} className={compactClass}>
        <MessageCircle className="w-4 h-4 fill-white text-white shrink-0" />
        <span>{label}</span>
      </button>
    );
  }

  const primaryClass = `w-full flex items-center justify-center gap-2 py-3 px-4 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-sm rounded-xl shadow-xs hover:shadow-md transition-colors cursor-pointer ${className}`;

  if (href) {
    return (
      <motion.a
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        title={title}
        className={primaryClass}
      >
        <MessageCircle className="w-5 h-5 fill-white text-white shrink-0" />
        <span className="text-sm">{label}</span>
        {subLabel && (
          <span className="text-xs font-normal opacity-90">({subLabel})</span>
        )}
      </motion.a>
    );
  }

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      title={title}
      className={primaryClass}
    >
      <MessageCircle className="w-5 h-5 fill-white text-white shrink-0" />
      <span className="text-sm">{label}</span>
      {subLabel && (
        <span className="text-xs font-normal opacity-90">({subLabel})</span>
      )}
    </motion.button>
  );
};
