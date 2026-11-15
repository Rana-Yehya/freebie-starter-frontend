import React, { useState, useEffect, useRef } from 'react';
import { Loader2, Image as ImageIcon } from 'lucide-react';
import { Language, translations } from '../../data/translations';

interface ImageWithLoaderProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  lang?: Language;
  fallbackSrc?: string;
  containerClassName?: string;
  loaderSize?: 'sm' | 'md';
  showLoadingText?: boolean;
}

const DEFAULT_FALLBACK = '/assets/images/freebie_hero_gifts_1794341551743.jpg';

export const ImageWithLoader: React.FC<ImageWithLoaderProps> = ({
  src,
  alt,
  lang = 'en',
  fallbackSrc = DEFAULT_FALLBACK,
  containerClassName = '',
  className = '',
  loaderSize = 'md',
  showLoadingText = true,
  ...rest
}) => {
  const [status, setStatus] = useState<'loading' | 'loaded' | 'error'>('loading');
  const [activeSrc, setActiveSrc] = useState<string>(src);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const t = translations[lang];

  // Reset state whenever src prop changes and immediately check cache
  useEffect(() => {
    setActiveSrc(src);
    setStatus('loading');

    const imgEl = imgRef.current;
    if (imgEl && imgEl.complete && imgEl.naturalWidth > 0) {
      setStatus('loaded');
    }
  }, [src]);

  const handleLoad = () => {
    setStatus('loaded');
  };

  const handleError = () => {
    if (activeSrc !== fallbackSrc) {
      setActiveSrc(fallbackSrc);
      setStatus('loading');
    } else {
      setStatus('error');
    }
  };

  const iconSizeClass = loaderSize === 'sm' ? 'w-4 h-4' : 'w-6 h-6';

  return (
    <div className={`relative w-full h-full overflow-hidden ${containerClassName}`}>
      {/* Loading UI Overlay */}
      {status === 'loading' && (
        <div
          aria-busy="true"
          aria-label={t.loadingImage}
          className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-gradient-to-br from-amber-50/90 via-stone-100 to-amber-100/70 dark:from-stone-900 dark:via-stone-800 dark:to-amber-950/40"
        >
          {/* Shimmer sweep */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/55 dark:via-amber-200/10 to-transparent -translate-x-full animate-[shimmer_1.4s_infinite]" />

          <div className="relative flex flex-col items-center gap-2 px-3 py-2 rounded-xl">
            <div className="relative flex items-center justify-center">
              <Loader2 className={`${iconSizeClass} text-amber-600 dark:text-amber-400 animate-spin`} />
            </div>
            {showLoadingText && loaderSize !== 'sm' && (
              <span className="text-[11px] font-semibold text-amber-900/75 dark:text-amber-200/80 tracking-wide">
                {t.loadingImage}
              </span>
            )}
          </div>
        </div>
      )}

      {/* Error Fallback UI if even fallback image failed */}
      {status === 'error' ? (
        <div className="w-full h-full flex flex-col items-center justify-center bg-amber-50 dark:bg-stone-800 text-amber-700/70 dark:text-amber-400/70 p-4 text-center">
          <ImageIcon className={iconSizeClass} />
        </div>
      ) : (
        <img
          ref={imgRef}
          src={activeSrc}
          alt={alt}
          onLoad={handleLoad}
          onError={handleError}
          className={`${className} transition-opacity duration-500 ${
            status === 'loaded' ? 'opacity-100' : 'opacity-0'
          }`}
          referrerPolicy="no-referrer"
          {...rest}
        />
      )}
    </div>
  );
};
