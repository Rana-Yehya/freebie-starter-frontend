import React, { useState, useEffect, useMemo } from 'react';
import { Gift, Tag, Check, Search, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Language, translations } from '../data/translations';
import {
  PRODUCTS,
  STORE_DISCOUNT_PERCENT,
} from '../data/products';
import { SectionHeader } from './ui/SectionHeader';
import { Pagination } from './ui/Pagination';
import { ProductCard, ProductCardSkeleton } from './ProductCard';
import { OrderSummaryBar } from './OrderSummaryBar';
import {
  SelectedOrderItem,
  buildWhatsAppOrderMessage,
  buildWhatsAppUrl,
} from '../utils/whatsapp';

interface ProductCatalogProps {
  lang: Language;
  whatsappNumber: string;
  onOrderSelectionChange?: (hasSelectedItems: boolean) => void;
}

const ITEMS_PER_PAGE = 6;

export const ProductCatalog: React.FC<ProductCatalogProps> = ({
  lang,
  whatsappNumber,
  onOrderSelectionChange,
}) => {
  const t = translations[lang];
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedGiftCards, setSelectedGiftCards] = useState<
    Record<string, boolean>
  >({});
  const [selectedQuantities, setSelectedQuantities] = useState<
    Record<string, number>
  >({});
  const [orderGiftCard, setOrderGiftCard] = useState<boolean>(false);

  const hasDiscount = STORE_DISCOUNT_PERCENT > 0;

  // Initial skeleton load for smooth visual initialization
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 450);
    return () => clearTimeout(timer);
  }, []);

  const selectedOrderItems: SelectedOrderItem[] = useMemo(() => {
    return PRODUCTS.filter((p) => (selectedQuantities[p.id] || 0) > 0).map(
      (product) => ({
        product,
        quantity: selectedQuantities[product.id],
      })
    );
  }, [selectedQuantities]);

  useEffect(() => {
    onOrderSelectionChange?.(selectedOrderItems.length > 0);
  }, [selectedOrderItems.length, onOrderSelectionChange]);

  const normalizedQuery = searchQuery.trim().toLowerCase();

  // Products matching current search query (across both EN & AR fields)
  const searchedProducts = useMemo(() => {
    if (!normalizedQuery) return PRODUCTS;
    return PRODUCTS.filter((p) => {
      const searchable = [
        p.nameEn,
        p.nameAr,
        p.subtitleEn,
        p.subtitleAr,
        p.materialEn,
        p.materialAr,
        p.inclusionsEn,
        p.inclusionsAr,
        p.badgeEn || '',
        p.badgeAr || '',
        p.category,
      ]
        .join(' ')
        .toLowerCase();
      return searchable.includes(normalizedQuery);
    });
  }, [normalizedQuery]);

  const categoryCounts = useMemo(() => {
    return {
      all: searchedProducts.length,
      sets: searchedProducts.filter((p) => p.category === 'sets').length,
      earrings: searchedProducts.filter((p) => p.category === 'earrings').length,
      bracelets: searchedProducts.filter((p) => p.category === 'bracelets').length,
      necklaces: searchedProducts.filter((p) => p.category === 'necklaces').length,
    } as Record<string, number>;
  }, [searchedProducts]);

  const categories = [
    { id: 'all', label: t.catAll },
    { id: 'sets', label: t.catSets },
    { id: 'earrings', label: t.catEarrings },
    { id: 'bracelets', label: t.catBracelets },
    { id: 'necklaces', label: t.catNecklaces },
  ];

  const handleCategoryChange = (catId: string) => {
    if (catId === selectedCategory) return;
    setIsLoading(true);
    setSelectedCategory(catId);
    setCurrentPage(1);
    setTimeout(() => {
      setIsLoading(false);
    }, 280);
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setCurrentPage(1);
  };

  const filteredProducts = useMemo(() => {
    if (selectedCategory === 'all') return searchedProducts;
    return searchedProducts.filter((p) => p.category === selectedCategory);
  }, [searchedProducts, selectedCategory]);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedProducts = filteredProducts.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setIsLoading(true);
      setCurrentPage(newPage);
      setTimeout(() => {
        setIsLoading(false);
      }, 240);
      const catalogEl = document.getElementById('categories');
      if (catalogEl) {
        catalogEl.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleToggleSelect = (productId: string) => {
    setSelectedQuantities((prev) => {
      const currentQty = prev[productId] || 0;
      if (currentQty > 0) {
        const updated = { ...prev };
        delete updated[productId];
        return updated;
      }
      if (selectedGiftCards[productId]) {
        setOrderGiftCard(true);
      }
      return { ...prev, [productId]: 1 };
    });
  };

  const handleUpdateQuantity = (productId: string, delta: number) => {
    setSelectedQuantities((prev) => {
      const nextQty = (prev[productId] || 0) + delta;
      if (nextQty <= 0) {
        const updated = { ...prev };
        delete updated[productId];
        return updated;
      }
      return { ...prev, [productId]: nextQty };
    });
  };

  const handleRemoveItem = (productId: string) => {
    setSelectedQuantities((prev) => {
      const updated = { ...prev };
      delete updated[productId];
      return updated;
    });
  };

  const handleClearAll = () => {
    setSelectedQuantities({});
    setOrderGiftCard(false);
  };

  const handleToggleGiftCard = (productId: string) => {
    const nextValue = !selectedGiftCards[productId];
    const updatedMap = {
      ...selectedGiftCards,
      [productId]: nextValue,
    };
    setSelectedGiftCards(updatedMap);

    if ((selectedQuantities[productId] || 0) > 0) {
      if (nextValue) {
        setOrderGiftCard(true);
      } else {
        const anyOtherSelectedHasCard = Object.keys(selectedQuantities).some(
          (id) => selectedQuantities[id] > 0 && updatedMap[id]
        );
        if (!anyOtherSelectedHasCard) {
          setOrderGiftCard(false);
        }
      }
    }
  };

  const allVisibleHaveCard =
    paginatedProducts.length > 0 &&
    paginatedProducts.every((p) => Boolean(selectedGiftCards[p.id]));

  const handleToggleAllVisibleGiftCards = () => {
    const nextValue = !allVisibleHaveCard;
    const updatedMap = { ...selectedGiftCards };
    paginatedProducts.forEach((p) => {
      updatedMap[p.id] = nextValue;
    });
    setSelectedGiftCards(updatedMap);

    if (selectedOrderItems.length > 0) {
      if (nextValue) {
        setOrderGiftCard(true);
      } else {
        const anySelectedHasCard = Object.keys(selectedQuantities).some(
          (id) => selectedQuantities[id] > 0 && updatedMap[id]
        );
        if (!anySelectedHasCard) {
          setOrderGiftCard(false);
        }
      }
    }
  };

  const orderAllHref = useMemo(() => {
    if (selectedOrderItems.length === 0) return '';
    return buildWhatsAppUrl(
      whatsappNumber,
      buildWhatsAppOrderMessage(selectedOrderItems, orderGiftCard, lang)
    );
  }, [whatsappNumber, selectedOrderItems, orderGiftCard, lang]);

  return (
    <section
      id="categories"
      className="py-16 sm:py-24 bg-[#FAF8F5] dark:bg-stone-950 transition-colors"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow={t.categoriesTitle}
          icon={<Gift className="w-3.5 h-3.5" />}
          title={
            lang === 'ar'
              ? 'تشكيلة الإكسسوارات وهدايا المفاجأة'
              : 'Signature Gifts for Her'
          }
          subtitle={t.categoriesSubtitle}
          className="mb-8 sm:mb-10"
        />

        {/* Special All-Items Discount Banner (shown whenever discount > 0) */}
        {hasDiscount && (
          <div className="flex justify-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800/70 text-rose-700 dark:text-rose-300 text-xs font-bold shadow-2xs">
              <Tag className="w-3.5 h-3.5" />
              <span>{t.getSpecialOfferRibbon(STORE_DISCOUNT_PERCENT)}</span>
            </div>
          </div>
        )}

        {/* Search Bar + Category Filter Tabs */}
        <div className="max-w-3xl mx-auto mb-8 space-y-5">
          {/* Search Input */}
          <div className="relative">
            <Search className="w-4 h-4 text-stone-400 dark:text-stone-500 absolute start-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder={t.searchPlaceholder}
              aria-label={t.searchPlaceholder}
              className="w-full ps-11 pe-10 py-3 rounded-2xl bg-white dark:bg-stone-900 text-sm text-stone-900 dark:text-stone-100 placeholder:text-stone-400 dark:placeholder:text-stone-500 border border-stone-200 dark:border-stone-700 focus:border-amber-400 dark:focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-400/25 shadow-2xs transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => handleSearchChange('')}
                aria-label={t.clearSearch}
                className="w-7 h-7 rounded-full bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-500 dark:text-stone-300 flex items-center justify-center absolute end-2.5 top-1/2 -translate-y-1/2 transition-colors cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* 5 Category Filter Tabs with Match Counts */}
          <div
            role="tablist"
            aria-label={t.categoriesTitle}
            className="flex items-center justify-center flex-wrap gap-2"
          >
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.id;
              const count = categoryCounts[cat.id] ?? 0;
              return (
                <motion.button
                  key={cat.id}
                  role="tab"
                  aria-selected={isActive}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => handleCategoryChange(cat.id)}
                  className={`relative px-4 sm:px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-colors cursor-pointer inline-flex items-center gap-1.5 ${
                    isActive
                      ? 'text-stone-900 font-bold'
                      : 'bg-white dark:bg-stone-900 text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-700 hover:border-amber-300 dark:hover:border-amber-500 hover:bg-amber-50/50 dark:hover:bg-stone-800'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeCategoryPill"
                      className="absolute inset-0 bg-amber-400 rounded-full shadow-xs -z-0"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{cat.label}</span>
                  <span
                    className={`relative z-10 text-[10px] font-mono px-1.5 py-0.5 rounded-full ${
                      isActive
                        ? 'bg-stone-900/15 text-stone-900 font-bold'
                        : 'bg-stone-100 dark:bg-stone-800 text-stone-500 dark:text-stone-400'
                    }`}
                  >
                    {count}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Collection stats summary & quick gift card toggle */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-stone-500 dark:text-stone-400 mb-6 px-1">
          <span>
            {t.showingPieces}{' '}
            <strong className="text-stone-800 dark:text-stone-200 font-mono">
              {filteredProducts.length === 0 ? 0 : startIndex + 1}
            </strong>
            –
            <strong className="text-stone-800 dark:text-stone-200 font-mono">
              {Math.min(startIndex + ITEMS_PER_PAGE, filteredProducts.length)}
            </strong>{' '}
            {t.ofTotal}{' '}
            <strong className="text-stone-800 dark:text-stone-200 font-mono">
              {filteredProducts.length}
            </strong>{' '}
            {t.pieces}
          </span>

          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={handleToggleAllVisibleGiftCards}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-800 dark:text-amber-300 hover:text-amber-950 dark:hover:text-amber-200 transition-colors cursor-pointer"
            >
              <span
                className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                  allVisibleHaveCard
                    ? 'bg-amber-500 border-amber-600 text-white'
                    : 'bg-white dark:bg-stone-900 border-amber-400 dark:border-amber-500'
                }`}
              >
                {allVisibleHaveCard && <Check className="w-3 h-3 stroke-[3]" />}
              </span>
              <span>{t.selectAllGiftCards}</span>
            </button>

            {totalPages > 1 && (
              <span>
                {t.pageOf}{' '}
                <strong className="text-stone-800 dark:text-stone-200 font-mono">
                  {currentPage}
                </strong>{' '}
                /{' '}
                <strong className="text-stone-800 dark:text-stone-200 font-mono">
                  {totalPages}
                </strong>
              </span>
            )}
          </div>
        </div>

        {/* Skeleton Grid, Empty Search State, or Product Cards Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, idx) => (
              <ProductCardSkeleton key={idx} />
            ))}
          </div>
        ) : paginatedProducts.length === 0 ? (
          <div className="max-w-md mx-auto my-8 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl p-8 text-center space-y-4 shadow-xs">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-500/15 text-amber-700 dark:text-amber-400 flex items-center justify-center mx-auto">
              <Search className="w-6 h-6" />
            </div>
            <div className="space-y-1.5">
              <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100 font-serif-luxury">
                {t.noResultsTitle}
              </h3>
              <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 leading-relaxed">
                {t.noResultsDesc}
              </p>
            </div>
            <button
              type="button"
              onClick={handleResetFilters}
              className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-500 text-stone-900 text-xs font-bold transition-colors cursor-pointer"
            >
              {t.resetFilters}
            </button>
          </div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence mode="popLayout">
              {paginatedProducts.map((product) => {
                const includeCard = Boolean(selectedGiftCards[product.id]);
                const itemQty = selectedQuantities[product.id] || 1;
                const productOrderHref = buildWhatsAppUrl(
                  whatsappNumber,
                  buildWhatsAppOrderMessage(
                    [{ product, quantity: itemQty }],
                    includeCard,
                    lang
                  )
                );

                return (
                  <ProductCard
                    key={product.id}
                    product={product}
                    lang={lang}
                    selectedQuantity={selectedQuantities[product.id] || 0}
                    includeGiftCard={includeCard}
                    onToggleSelect={handleToggleSelect}
                    onUpdateQuantity={handleUpdateQuantity}
                    onToggleGiftCard={handleToggleGiftCard}
                    orderHref={productOrderHref}
                  />
                );
              })}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Reusable Pagination Navigation */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          disabled={isLoading}
          lang={lang}
          prevLabel={t.pagePrev}
          nextLabel={t.pageNext}
        />
      </div>

      {/* Floating Multi-Item Order Summary Bar & Drawer */}
      <OrderSummaryBar
        lang={lang}
        selectedItems={selectedOrderItems}
        includeGiftCard={orderGiftCard}
        onToggleGiftCard={() => setOrderGiftCard((prev) => !prev)}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearAll={handleClearAll}
        orderAllHref={orderAllHref}
      />
    </section>
  );
};

