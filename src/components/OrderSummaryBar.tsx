import React, { useState } from 'react';
import {
  ShoppingBag,
  ChevronUp,
  ChevronDown,
  Plus,
  Minus,
  Trash2,
  Check,
  Heart,
  Tag,
  X,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Language, translations } from '../data/translations';
import { GIFT_CARD_PRICE_EGP } from '../data/products';
import {
  SelectedOrderItem,
  calculateOrderTotal,
  getDiscountedPrice,
  formatPrice,
} from '../utils/whatsapp';
import { ImageWithLoader } from './ui/ImageWithLoader';
import { WhatsAppButton } from './ui/WhatsAppButton';

interface OrderSummaryBarProps {
  lang: Language;
  selectedItems: SelectedOrderItem[];
  includeGiftCard: boolean;
  onToggleGiftCard: () => void;
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearAll: () => void;
  orderAllHref: string;
}

export const OrderSummaryBar: React.FC<OrderSummaryBarProps> = ({
  lang,
  selectedItems,
  includeGiftCard,
  onToggleGiftCard,
  onUpdateQuantity,
  onRemoveItem,
  onClearAll,
  orderAllHref,
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const t = translations[lang];

  const summary = calculateOrderTotal(selectedItems, includeGiftCard);
  const hasDiscount = summary.discountPercent > 0;

  return (
    <AnimatePresence>
      {selectedItems.length > 0 && (
        <motion.div
          initial={{ y: 120, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 120, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 320, damping: 28 }}
          className="fixed bottom-4 inset-x-0 z-50 px-3 sm:px-6 pointer-events-none"
        >
          <div className="max-w-4xl mx-auto pointer-events-auto">
            {/* Expandable Order Details Drawer */}
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, y: 16, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 16, scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                  className="mb-3 bg-white dark:bg-stone-900 rounded-3xl border border-amber-300/90 dark:border-stone-700 shadow-2xl overflow-hidden"
                >
                  {/* Drawer Header */}
                  <div className="px-5 py-3.5 bg-amber-50/90 dark:bg-stone-800/90 border-b border-amber-200/70 dark:border-stone-700 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <ShoppingBag className="w-4 h-4 text-amber-700 dark:text-amber-400" />
                      <h3 className="text-sm font-bold text-stone-900 dark:text-stone-100">
                        {t.orderSummaryTitle}
                      </h3>
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-amber-400 text-stone-900 font-mono">
                        {summary.totalUnits}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={onClearAll}
                        className="text-xs font-semibold text-stone-500 dark:text-stone-400 hover:text-rose-600 dark:hover:text-rose-400 transition-colors cursor-pointer"
                      >
                        {t.clearOrder}
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsExpanded(false)}
                        aria-label={t.hideOrder}
                        className="w-7 h-7 rounded-full bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 flex items-center justify-center text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white cursor-pointer"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Selected Items Scrollable List */}
                  <div className="max-h-60 overflow-y-auto divide-y divide-stone-100 dark:divide-stone-800 px-5">
                    {selectedItems.map(({ product, quantity }) => {
                      const name =
                        lang === 'ar' ? product.nameAr : product.nameEn;
                      const unitPrice = getDiscountedPrice(
                        product.originalPrice,
                        summary.discountPercent
                      );
                      const lineTotal = unitPrice * quantity;

                      return (
                        <div
                          key={product.id}
                          className="py-3 flex items-center justify-between gap-3"
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <div className="w-12 h-12 rounded-xl overflow-hidden bg-stone-100 dark:bg-stone-800 shrink-0 border border-stone-200 dark:border-stone-700">
                              <ImageWithLoader
                                src={product.image}
                                alt={name}
                                lang={lang}
                                loaderSize="sm"
                                showLoadingText={false}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="min-w-0">
                              <p className="text-xs sm:text-sm font-bold text-stone-900 dark:text-stone-100 truncate">
                                {name}
                              </p>
                              <div className="flex items-center gap-2 text-[11px] font-mono">
                                <span className="font-bold text-amber-700 dark:text-amber-400">
                                  {formatPrice(unitPrice, lang, t.priceCurrency)}
                                </span>
                                {hasDiscount && (
                                  <span className="line-through text-stone-400 dark:text-stone-500">
                                    {formatPrice(
                                      product.originalPrice,
                                      lang,
                                      t.priceCurrency
                                    )}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                            {/* Stepper */}
                            <div className="inline-flex items-center rounded-lg border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800">
                              <button
                                type="button"
                                onClick={() => onUpdateQuantity(product.id, -1)}
                                aria-label="Decrease quantity"
                                className="p-1.5 text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white cursor-pointer"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="px-2 text-xs font-bold font-mono text-stone-900 dark:text-stone-100">
                                {quantity}
                              </span>
                              <button
                                type="button"
                                onClick={() => onUpdateQuantity(product.id, 1)}
                                aria-label="Increase quantity"
                                className="p-1.5 text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white cursor-pointer"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>

                            {/* Line Subtotal */}
                            <span className="text-xs font-extrabold font-mono text-stone-800 dark:text-stone-100 min-w-[60px] text-end">
                              {formatPrice(lineTotal, lang, t.priceCurrency)}
                            </span>

                            <button
                              type="button"
                              onClick={() => onRemoveItem(product.id)}
                              aria-label={t.removeFromOrder}
                              className="p-1.5 text-stone-400 hover:text-rose-600 dark:hover:text-rose-400 transition-colors cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Gift Card Add-On & Automatic Total Breakdown */}
                  <div className="p-5 bg-stone-50/90 dark:bg-stone-950/60 border-t border-stone-200/80 dark:border-stone-800 space-y-3">
                    {/* Official Gift Card Toggle (+30 EGP) */}
                    <label
                      className={`flex items-center justify-between gap-3 p-3 rounded-xl border transition-all cursor-pointer select-none ${
                        includeGiftCard
                          ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-400 dark:border-amber-500'
                          : 'bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-700 hover:border-amber-300'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={includeGiftCard}
                        onChange={onToggleGiftCard}
                        className="sr-only"
                      />
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span
                          className={`w-4.5 h-4.5 rounded-md border flex items-center justify-center shrink-0 transition-colors ${
                            includeGiftCard
                              ? 'bg-amber-500 border-amber-600 text-white'
                              : 'bg-white dark:bg-stone-800 border-stone-300 dark:border-stone-600'
                          }`}
                        >
                          {includeGiftCard && (
                            <Check className="w-3 h-3 stroke-[3]" />
                          )}
                        </span>
                        <div className="min-w-0">
                          <span className="text-xs font-bold text-stone-900 dark:text-stone-100 flex items-center gap-1.5">
                            <Heart
                              className={`w-3.5 h-3.5 shrink-0 ${
                                includeGiftCard
                                  ? 'text-amber-600 dark:text-amber-400 fill-amber-500'
                                  : 'text-amber-600 dark:text-amber-400'
                              }`}
                            />
                            <span className="truncate">{t.giftCardAddonLabel}</span>
                          </span>
                          <span className="text-[10px] text-stone-500 dark:text-stone-400 block">
                            {includeGiftCard
                              ? t.giftCardCheckedHint
                              : t.giftCardUncheckedHint}
                          </span>
                        </div>
                      </div>
                      <span className="text-xs font-bold px-2 py-0.5 rounded bg-amber-200/80 dark:bg-amber-500/25 text-amber-900 dark:text-amber-200 font-mono shrink-0">
                        {t.giftCardPriceTag}
                      </span>
                    </label>

                    {/* Cost Summary Rows */}
                    <div className="space-y-1.5 text-xs pt-1">
                      <div className="flex items-center justify-between text-stone-700 dark:text-stone-300">
                        <span>{t.itemsSubtotalLabel}</span>
                        <span className="font-bold font-mono">
                          {formatPrice(
                            summary.itemsSubtotal,
                            lang,
                            t.priceCurrency
                          )}
                        </span>
                      </div>

                      {hasDiscount && summary.discountSavings > 0 && (
                        <div className="flex items-center justify-between text-rose-600 dark:text-rose-400">
                          <span className="flex items-center gap-1">
                            <Tag className="w-3 h-3" />
                            <span>
                              {t.discountSavedLabel} ({summary.discountPercent}%)
                            </span>
                          </span>
                          <span className="font-bold font-mono">
                            -
                            {formatPrice(
                              summary.discountSavings,
                              lang,
                              t.priceCurrency
                            )}
                          </span>
                        </div>
                      )}

                      <div className="flex items-center justify-between text-stone-700 dark:text-stone-300">
                        <span>{t.giftCardAddonLabel}</span>
                        <span className="font-bold font-mono">
                          {summary.includeGiftCard
                            ? `+${formatPrice(
                                GIFT_CARD_PRICE_EGP,
                                lang,
                                t.priceCurrency
                              )}`
                            : formatPrice(0, lang, t.priceCurrency)}
                        </span>
                      </div>

                      <div className="pt-2 border-t border-stone-200 dark:border-stone-800 flex items-center justify-between text-sm sm:text-base font-extrabold text-stone-900 dark:text-white">
                        <span>{t.grandTotalLabel}</span>
                        <span className="text-amber-700 dark:text-amber-400 font-mono">
                          {formatPrice(
                            summary.grandTotal,
                            lang,
                            t.priceCurrency
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Compact Sticky Bottom Order Bar */}
            <div className="bg-stone-900/95 dark:bg-stone-900/98 backdrop-blur-md text-white rounded-2xl border border-amber-400/50 shadow-2xl px-4 py-3 flex flex-wrap items-center justify-between gap-3">
              {/* Left: Selection count, Gift Card pill & Grand Total */}
              <div className="flex items-center gap-3 min-w-0">
                <button
                  type="button"
                  onClick={() => setIsExpanded((prev) => !prev)}
                  className="flex items-center gap-2.5 text-start group cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-xl bg-amber-400 text-stone-900 flex items-center justify-center font-extrabold text-sm font-mono shrink-0 shadow-xs">
                    {summary.totalUnits}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-xs font-bold text-stone-100">
                        {t.selectedItemsCount(summary.totalUnits)}
                      </span>
                      {summary.includeGiftCard && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/40 font-mono">
                          {t.giftCardIncludedBadge}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-1.5 text-sm font-extrabold text-amber-400 font-mono">
                      <span>
                        {t.grandTotalLabel}:{' '}
                        {formatPrice(summary.grandTotal, lang, t.priceCurrency)}
                      </span>
                      {isExpanded ? (
                        <ChevronDown className="w-4 h-4 text-stone-300" />
                      ) : (
                        <ChevronUp className="w-4 h-4 text-stone-300" />
                      )}
                    </div>
                  </div>
                </button>
              </div>

              {/* Right: Toggle Details + Order All via WhatsApp */}
              <div className="flex items-center gap-2 ms-auto">
                <button
                  type="button"
                  onClick={() => setIsExpanded((prev) => !prev)}
                  className="px-3 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-xs font-semibold text-stone-200 border border-stone-700 transition-colors cursor-pointer"
                >
                  {isExpanded ? t.hideOrder : t.reviewOrder}
                </button>

                <WhatsAppButton
                  variant="compact"
                  href={orderAllHref}
                  label={t.orderAllViaWhatsApp}
                />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
