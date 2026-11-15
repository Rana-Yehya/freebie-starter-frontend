import { Language, translations } from '../data/translations';
import {
  Product,
  STORE_DISCOUNT_PERCENT,
  GIFT_CARD_PRICE_EGP,
} from '../data/products';

export interface SelectedOrderItem {
  product: Product;
  quantity: number;
}

export interface OrderCostSummary {
  totalUnits: number;
  originalSubtotal: number;
  itemsSubtotal: number;
  discountPercent: number;
  discountSavings: number;
  includeGiftCard: boolean;
  giftCardCost: number;
  grandTotal: number;
}

/**
 * Normalizes a phone number into international digits without +, spaces, or 00.
 * Converts local Egyptian 01xxxxxxxxx numbers to 201xxxxxxxxx.
 */
export const cleanPhoneNumber = (phone: string): string => {
  let digits = phone.replace(/[^0-9]/g, '');
  if (!digits) return '';
  if (digits.startsWith('00')) {
    digits = digits.slice(2);
  }
  if (digits.startsWith('01') && digits.length === 11) {
    digits = `20${digits.slice(1)}`;
  }
  return digits;
};

/**
 * Builds a complete WhatsApp click-to-chat URL.
 * Omits phone parameter if no valid business phone number is configured so WhatsApp
 * opens the message composer without an "invalid phone number" error.
 */
export const buildWhatsAppUrl = (phone: string, message: string): string => {
  const cleanNumber = cleanPhoneNumber(phone);
  const encodedText = encodeURIComponent(message);
  if (cleanNumber && cleanNumber !== '201000000000') {
    return `https://api.whatsapp.com/send?phone=${cleanNumber}&text=${encodedText}`;
  }
  return `https://api.whatsapp.com/send?text=${encodedText}`;
};

/**
 * Opens WhatsApp in a new tab using a native anchor click (avoids iframe/popup blocking of window.open).
 */
export const openWhatsAppChat = (phone: string, message: string): void => {
  const url = buildWhatsAppUrl(phone, message);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.target = '_blank';
  anchor.rel = 'noopener noreferrer';
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
};

/**
 * Computes the final price given an original price and the unified store discount %.
 * Only applies a discount when discountPercent > 0.
 */
export const getDiscountedPrice = (
  originalPrice: number,
  discountPercent: number = STORE_DISCOUNT_PERCENT
): number => {
  if (discountPercent <= 0) return originalPrice;
  return Math.round(originalPrice * (1 - discountPercent / 100));
};

/**
 * Formats a numeric price cleanly in EGP (EN) or ج.م (AR).
 */
export const formatPrice = (
  amount: number,
  _lang: Language,
  currency: string
): string => {
  return `${amount} ${currency}`;
};

/**
 * Automatically calculates itemized and total costs for all selected items
 * plus the optional Official Freebie Gift Card (30 EGP).
 */
export const calculateOrderTotal = (
  items: SelectedOrderItem[],
  includeGiftCard: boolean
): OrderCostSummary => {
  const discountPercent = STORE_DISCOUNT_PERCENT;

  const { totalUnits, originalSubtotal, itemsSubtotal } = items.reduce(
    (acc, { product, quantity }) => {
      const qty = Math.max(0, quantity);
      const unitOriginal = product.originalPrice;
      const unitActive = getDiscountedPrice(unitOriginal, discountPercent);

      return {
        totalUnits: acc.totalUnits + qty,
        originalSubtotal: acc.originalSubtotal + unitOriginal * qty,
        itemsSubtotal: acc.itemsSubtotal + unitActive * qty,
      };
    },
    { totalUnits: 0, originalSubtotal: 0, itemsSubtotal: 0 }
  );

  const discountSavings = Math.max(0, originalSubtotal - itemsSubtotal);
  const giftCardCost =
    includeGiftCard && totalUnits > 0 ? GIFT_CARD_PRICE_EGP : 0;
  const grandTotal = itemsSubtotal + giftCardCost;

  return {
    totalUnits,
    originalSubtotal,
    itemsSubtotal,
    discountPercent,
    discountSavings,
    includeGiftCard: includeGiftCard && totalUnits > 0,
    giftCardCost,
    grandTotal,
  };
};

const getCategoryLabel = (
  category: Product['category'],
  lang: Language
): string => {
  const t = translations[lang];
  switch (category) {
    case 'sets':
      return t.catSets;
    case 'earrings':
      return t.catEarrings;
    case 'bracelets':
      return t.catBracelets;
    case 'necklaces':
      return t.catNecklaces;
  }
};

/**
 * Generates an itemized bilingual WhatsApp order message with automatically
 * calculated subtotals, store discount savings, gift card cost (+30 EGP), and grand total.
 */
export const buildWhatsAppOrderMessage = (
  items: SelectedOrderItem[],
  includeGiftCard: boolean,
  lang: Language
): string => {
  const t = translations[lang];
  const currency = t.priceCurrency;
  const summary = calculateOrderTotal(items, includeGiftCard);
  const hasDiscount = summary.discountPercent > 0;

  const itemLines = items
    .map(({ product, quantity }, index) => {
      const name = lang === 'ar' ? product.nameAr : product.nameEn;
      const category = getCategoryLabel(product.category, lang);
      const unitPrice = getDiscountedPrice(
        product.originalPrice,
        summary.discountPercent
      );
      const lineTotal = unitPrice * quantity;

      if (lang === 'ar') {
        const discountInfo = hasDiscount
          ? ` (بدلاً من ${product.originalPrice} ${currency} · خصم ${summary.discountPercent}%)`
          : '';
        return `${index + 1}. *${name}* (${category})\n   • الكمية: ${quantity} × ${unitPrice} ${currency}${discountInfo} = *${lineTotal} ${currency}*`;
      }

      const discountInfo = hasDiscount
        ? ` (was ${product.originalPrice} ${currency} · ${summary.discountPercent}% OFF)`
        : '';
      return `${index + 1}. *${name}* (${category})\n   • Qty: ${quantity} × ${unitPrice} ${currency}${discountInfo} = *${lineTotal} ${currency}*`;
    })
    .join('\n');

  if (lang === 'ar') {
    const discountRow =
      hasDiscount && summary.discountSavings > 0
        ? `🏷️ خصم المتجر (${summary.discountPercent}%): وفّرت ${summary.discountSavings} ${currency}\n`
        : '';

    const cardRow = summary.includeGiftCard
      ? `💌 كارت الإهداء الرسمي: نعم (+${summary.giftCardCost} ${currency})\n✍️ *رسالة كارت الإهداء:* (اكتب رسالتك هنا لنكتبها لك بخط اليد)`
      : `💌 كارت الإهداء الرسمي: غير مضاف (0 ${currency})`;

    return [
      `مرحباً فريبي! 👋`,
      summary.totalUnits > 1
        ? `أود تأكيد طلب هذه القطع (${summary.totalUnits}):`
        : `أود طلب هذه الهدية:`,
      ``,
      `🛍️ *القطع المختارة:*`,
      itemLines,
      ``,
      `━━━━━━━━━━━━━━━━━━`,
      `💎 الخامة: ستانلس ستيل 316L مقاوم للماء 100% ولا يتغير لونه`,
      `💰 إجمالي القطع: ${summary.itemsSubtotal} ${currency}`,
      `${discountRow}${cardRow}`,
      `━━━━━━━━━━━━━━━━━━`,
      `💵 *التكلفة الإجمالية: ${summary.grandTotal} ${currency}*`,
      ``,
      t.readyToSurpriseHer,
    ]
      .filter((line) => line !== undefined)
      .join('\n');
  }

  const discountRow =
    hasDiscount && summary.discountSavings > 0
      ? `🏷️ Store Discount (${summary.discountPercent}% OFF): -${summary.discountSavings} ${currency} saved\n`
      : '';

  const cardRow = summary.includeGiftCard
    ? `💌 Official Gift Card: Included (+${summary.giftCardCost} ${currency})\n✍️ *Gift Card Note:* (Reply with your message here for us to handwrite it on her card!)`
    : `💌 Official Gift Card: Not included (0 ${currency})`;

  return [
    `Hello Freebie Gifts! 👋`,
    summary.totalUnits > 1
      ? `I would like to order these selected items (${summary.totalUnits}):`
      : `I would like to order this gift:`,
    ``,
    `🛍️ *Selected Items:*`,
    itemLines,
    ``,
    `━━━━━━━━━━━━━━━━━━`,
    `💎 Material: 100% Waterproof 316L Stainless Steel (Tarnish Free)`,
    `💰 Items Subtotal: ${summary.itemsSubtotal} ${currency}`,
    `${discountRow}${cardRow}`,
    `━━━━━━━━━━━━━━━━━━`,
    `💵 *TOTAL COST: ${summary.grandTotal} ${currency}*`,
    ``,
    t.readyToSurpriseHer,
  ].join('\n');
};

