import React from "react";
import {
  Gift,
  Sparkles,
  Check,
  Tag,
  Heart,
  Plus,
  Minus,
  ShoppingBag,
} from "lucide-react";
import { motion } from "motion/react";
import { Language, translations } from "../data/translations";
import {
  Product,
  STORE_DISCOUNT_PERCENT,
  GIFT_CARD_PRICE_EGP,
} from "../data/products";
import { ImageWithLoader } from "./ui/ImageWithLoader";
import { WhatsAppButton } from "./ui/WhatsAppButton";
import { getDiscountedPrice, formatPrice } from "../utils/whatsapp";

interface ProductCardProps {
  product: Product;
  lang: Language;
  selectedQuantity: number;
  includeGiftCard: boolean;
  onToggleSelect: (productId: string) => void;
  onUpdateQuantity: (productId: string, delta: number) => void;
  onToggleGiftCard: (productId: string) => void;
  orderHref: string;
}

export const ProductCardSkeleton: React.FC = () => {
  return (
    <div className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200/80 dark:border-stone-800 shadow-xs overflow-hidden flex flex-col animate-pulse">
      {/* Image Skeleton */}
      <div className="relative aspect-[4/3] bg-stone-200/70 dark:bg-stone-800 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 dark:via-white/5 to-transparent -translate-x-full animate-[shimmer_1.5s_infinite]" />
        <div className="absolute top-3 left-3 w-20 h-6 bg-stone-300/60 dark:bg-stone-700 rounded-md" />
        <div className="absolute top-3 right-3 w-16 h-6 bg-stone-300/60 dark:bg-stone-700 rounded-md" />
        <div className="absolute bottom-3 left-3 w-28 h-5 bg-white/60 dark:bg-stone-700/70 rounded-full" />
      </div>

      {/* Info Body Skeleton */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-3">
          {/* Title & Price Skeleton */}
          <div className="flex items-start justify-between gap-3">
            <div className="h-5 bg-stone-200 dark:bg-stone-800 rounded-md w-3/4" />
            <div className="h-6 bg-amber-100 dark:bg-amber-950/60 rounded-md w-16" />
          </div>

          {/* Subtitle / Description Skeleton */}
          <div className="space-y-1.5 pt-1">
            <div className="h-3 bg-stone-100 dark:bg-stone-800 rounded w-full" />
            <div className="h-3 bg-stone-100 dark:bg-stone-800 rounded w-4/5" />
          </div>

          {/* Material Note Skeleton */}
          <div className="h-7 bg-amber-50 dark:bg-amber-950/30 rounded-lg w-full" />

          {/* Checkbox Skeleton */}
          <div className="h-12 bg-stone-100 dark:bg-stone-800/80 rounded-xl w-full" />
        </div>

        {/* Action Button Skeleton */}
        <div className="pt-3 border-t border-stone-100 dark:border-stone-800 space-y-2">
          <div className="h-9 bg-stone-100 dark:bg-stone-800 rounded-xl w-full" />
          <div className="h-11 bg-stone-200 dark:bg-stone-800 rounded-xl w-full" />
        </div>
      </div>
    </div>
  );
};

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  lang,
  selectedQuantity,
  includeGiftCard,
  onToggleSelect,
  onUpdateQuantity,
  onToggleGiftCard,
  orderHref,
}) => {
  const t = translations[lang];
  const productName = lang === "ar" ? product.nameAr : product.nameEn;
  const productSubtitle =
    lang === "ar" ? product.subtitleAr : product.subtitleEn;
  const productMaterial =
    lang === "ar" ? product.materialAr : product.materialEn;
  const productInclusions =
    lang === "ar" ? product.inclusionsAr : product.inclusionsEn;
  const badge = lang === "ar" ? product.badgeAr : product.badgeEn;

  const isSelected = selectedQuantity > 0;
  const activeQty = isSelected ? selectedQuantity : 1;
  const hasDiscount = STORE_DISCOUNT_PERCENT > 0;
  const activePiecePrice = getDiscountedPrice(
    product.originalPrice,
    STORE_DISCOUNT_PERCENT,
  );
  const totalWithCard =
    activePiecePrice * activeQty + (includeGiftCard ? GIFT_CARD_PRICE_EGP : 0);

  const categoryLabel =
    product.category === "sets"
      ? t.catSets
      : product.category === "earrings"
        ? t.catEarrings
        : product.category === "bracelets"
          ? t.catBracelets
          : t.catNecklaces;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.94, y: 15 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.94, y: 10 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      className={`bg-white dark:bg-stone-900 rounded-2xl border shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden group ${
        isSelected
          ? "border-amber-400 dark:border-amber-500 ring-2 ring-amber-400/35"
          : "border-stone-200/80 dark:border-stone-800 hover:border-amber-300 dark:hover:border-amber-500/70"
      }`}
    >
      {/* Product Image Container with Built-In Loading UI */}
      <div className="relative aspect-[4/3] bg-stone-100 dark:bg-stone-800 overflow-hidden">
        <ImageWithLoader
          src={product.image}
          alt={productName}
          lang={lang}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-600 ease-out"
        />

        {/* Top Badges & Unified Store Discount Overlay */}
        <div className="absolute top-3 left-3 right-3 z-20 flex items-start justify-between gap-2 pointer-events-none">
          <div className="flex flex-col items-start gap-1.5">
            {hasDiscount && (
              <span className="inline-flex items-center gap-1 text-[11px] font-extrabold tracking-wide px-2.5 py-1 rounded-md bg-rose-600 text-white shadow-sm">
                <Tag className="w-3 h-3" />
                <span>
                  {lang === "ar"
                    ? `${t.discountOff} ${STORE_DISCOUNT_PERCENT}%`
                    : `-${STORE_DISCOUNT_PERCENT}% ${t.discountOff}`}
                </span>
              </span>
            )}
            {badge && (
              <span className="text-[11px] font-bold tracking-wide uppercase px-2.5 py-1 rounded-md bg-stone-900/85 dark:bg-stone-950/90 text-amber-300 backdrop-blur-xs">
                {badge}
              </span>
            )}
          </div>

          <div className="flex flex-col items-end gap-1.5">
            <span className="text-[11px] font-bold tracking-wide uppercase px-2.5 py-1 rounded-md bg-white/90 dark:bg-stone-900/90 text-stone-800 dark:text-stone-100 backdrop-blur-xs shadow-xs">
              {categoryLabel}
            </span>
            {isSelected && (
              <span className="inline-flex items-center gap-1 text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-amber-400 text-stone-900 shadow-xs">
                <Check className="w-3 h-3 stroke-[3]" />
                <span>
                  {t.selectedInOrder} ({selectedQuantity})
                </span>
              </span>
            )}
          </div>
        </div>

        {/* Stainless Steel Watermark Guarantee */}
        {/* <div className="absolute bottom-3 left-3 z-20 bg-white/90 dark:bg-stone-900/90 backdrop-blur-xs text-[10px] font-semibold text-stone-800 dark:text-stone-200 px-2.5 py-0.5 rounded-full shadow-xs flex items-center gap-1 pointer-events-none">
          <Sparkles className="w-3 h-3 text-amber-600 dark:text-amber-400" />
          <span>316L Stainless Steel</span>
        </div> */}
      </div>

      {/* Product Info Body */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2.5">
          {/* Title and EGP Pricing */}
          <div className="flex items-start justify-between gap-3">
            <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100 leading-snug font-serif-luxury group-hover:text-amber-700 dark:group-hover:text-amber-400 transition-colors">
              {productName}
            </h3>
            <div className="text-end shrink-0 flex flex-col items-end">
              <span className="text-lg font-extrabold text-amber-700 dark:text-amber-400 font-mono tabular-nums leading-none whitespace-nowrap">
                {formatPrice(activePiecePrice, lang, t.priceCurrency)}
              </span>
              {hasDiscount && (
                <span className="text-xs text-stone-400 dark:text-stone-500 line-through font-mono tabular-nums mt-1 whitespace-nowrap">
                  {formatPrice(product.originalPrice, lang, t.priceCurrency)}
                </span>
              )}
            </div>
          </div>

          <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
            {productSubtitle}
          </p>

          {/* Material note */}
          <div className="text-[11px] text-amber-800 dark:text-amber-300 bg-amber-50/80 dark:bg-amber-950/40 border border-transparent dark:border-amber-800/40 rounded-lg p-2 font-medium">
            🛡️ {productMaterial}
          </div>

          {/* Packaging inclusion note */}
          <p className="text-[11px] text-stone-500 dark:text-stone-400 flex items-center gap-1.5">
            <Gift className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0" />
            <span>{productInclusions}</span>
          </p>

          {/* Interactive Official Gift Card Checkbox (+30 EGP) */}
          <label
            className={`mt-2 flex items-start gap-2.5 p-2.5 rounded-xl border transition-all cursor-pointer select-none ${
              includeGiftCard
                ? "bg-amber-50/90 dark:bg-amber-950/40 border-amber-400 dark:border-amber-500 shadow-2xs"
                : "bg-stone-50/70 dark:bg-stone-800/60 border-stone-200 dark:border-stone-700 hover:border-amber-300 dark:hover:border-amber-500/70 hover:bg-amber-50/40 dark:hover:bg-stone-800"
            }`}
          >
            <input
              type="checkbox"
              checked={includeGiftCard}
              onChange={() => onToggleGiftCard(product.id)}
              className="sr-only"
            />
            <span
              className={`mt-0.5 w-4.5 h-4.5 rounded-md border flex items-center justify-center shrink-0 transition-colors ${
                includeGiftCard
                  ? "bg-amber-500 border-amber-600 text-white"
                  : "bg-white dark:bg-stone-900 border-stone-300 dark:border-stone-600"
              }`}
            >
              {includeGiftCard && <Check className="w-3 h-3 stroke-[3]" />}
            </span>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <span className="text-xs font-bold text-stone-800 dark:text-stone-100 flex items-center gap-1">
                  <Heart
                    className={`w-3 h-3 ${
                      includeGiftCard
                        ? "text-amber-600 dark:text-amber-400 fill-amber-500"
                        : "text-amber-600 dark:text-amber-400"
                    }`}
                  />
                  <span>{t.addGiftCardLabel}</span>
                </span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-200/80 dark:bg-amber-500/25 text-amber-900 dark:text-amber-200 font-mono">
                  {t.giftCardPriceTag}
                </span>
              </div>
              <p className="text-[10px] text-stone-500 dark:text-stone-400 mt-0.5 leading-snug">
                {includeGiftCard
                  ? t.giftCardCheckedHint
                  : t.giftCardUncheckedHint}
              </p>
              {includeGiftCard && (
                <p className="text-[11px] font-bold text-amber-800 dark:text-amber-300 mt-1 font-mono">
                  {t.totalWithCardLabel}:{" "}
                  {formatPrice(totalWithCard, lang, t.priceCurrency)}
                </p>
              )}
            </div>
          </label>
        </div>

        {/* Ordering Section with Multi-Item Selector + Direct WhatsApp Button */}
        <div className="pt-3 border-t border-stone-100 dark:border-stone-800 space-y-2.5">
          {/* Multi-Item Select / Quantity Stepper */}
          {isSelected ? (
            <div className="flex items-center justify-between gap-2 px-3 py-2 rounded-xl bg-amber-100/90 dark:bg-amber-950/50 border border-amber-300 dark:border-amber-600/60">
              <button
                type="button"
                onClick={() => onToggleSelect(product.id)}
                className="flex items-center gap-1.5 text-xs font-bold text-amber-900 dark:text-amber-200 cursor-pointer"
              >
                <Check className="w-3.5 h-3.5 stroke-[3]" />
                <span>{t.selectedInOrder}</span>
              </button>
              <div className="inline-flex items-center rounded-lg bg-white dark:bg-stone-900 border border-amber-300 dark:border-stone-700 shadow-2xs">
                <button
                  type="button"
                  onClick={() => onUpdateQuantity(product.id, -1)}
                  aria-label="Decrease quantity"
                  className="p-1.5 text-stone-700 dark:text-stone-300 hover:text-stone-950 dark:hover:text-white cursor-pointer"
                >
                  <Minus className="w-3 h-3" />
                </button>
                <span className="px-2.5 text-xs font-extrabold font-mono text-stone-900 dark:text-stone-100">
                  {selectedQuantity}
                </span>
                <button
                  type="button"
                  onClick={() => onUpdateQuantity(product.id, 1)}
                  aria-label="Increase quantity"
                  className="p-1.5 text-stone-700 dark:text-stone-300 hover:text-stone-950 dark:hover:text-white cursor-pointer"
                >
                  <Plus className="w-3 h-3" />
                </button>
              </div>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => onToggleSelect(product.id)}
              className="w-full py-2 px-3 rounded-xl border border-amber-300 dark:border-stone-700 bg-amber-50/70 dark:bg-stone-800/70 hover:bg-amber-100 dark:hover:bg-stone-800 text-amber-900 dark:text-amber-300 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>{t.addToOrder}</span>
            </button>
          )}

          <p className="text-xs font-semibold text-amber-800 dark:text-amber-300 text-center flex items-center justify-center gap-1">
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              ✨
            </motion.span>
            <span className="italic">{t.readyToSurpriseHer}</span>
          </p>

          <WhatsAppButton
            href={orderHref}
            label={t.orderNow}
            subLabel={t.orderViaWhatsApp}
          />

          <p className="text-[10px] text-stone-500 dark:text-stone-400 text-center italic">
            {includeGiftCard
              ? lang === "ar"
                ? `✓ يشمل علبة قرص العسل + كارت الإهداء (+${GIFT_CARD_PRICE_EGP} ج.م)`
                : `✓ Includes signature honeycomb box + gift card (+${GIFT_CARD_PRICE_EGP} EGP)`
              : lang === "ar"
                ? "✓ يشمل علبة قرص العسل الفاخرة مجاناً"
                : "✓ Includes signature honeycomb gift box"}
          </p>
        </div>
      </div>
    </motion.div>
  );
};
