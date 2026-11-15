export interface Product {
  id: string;
  category: 'sets' | 'earrings' | 'bracelets' | 'necklaces';
  nameEn: string;
  nameAr: string;
  subtitleEn: string;
  subtitleAr: string;
  originalPrice: number; // Base price in EGP before discount
  materialEn: string;
  materialAr: string;
  image: string;
  badgeEn?: string;
  badgeAr?: string;
  inclusionsEn: string;
  inclusionsAr: string;
}

/**
 * Single store-wide discount percentage.
 * When > 0, all pieces display their discounted EGP price and savings badge.
 */
export const STORE_DISCOUNT_PERCENT = 20;

/**
 * Optional Official Freebie Gifts Card add-on price in EGP.
 */
export const GIFT_CARD_PRICE_EGP = 30;

export const PRODUCTS: Product[] = [
  // 1. Sets (مجموعات وأطقم)
  {
    id: 'set-celestial-moon',
    category: 'sets',
    nameEn: 'Celestial Moon & Stars Gift Set',
    nameAr: 'طقم هلال القمر والنجوم السماوي',
    subtitleEn: '18K Gold Plated Pendant Necklace & Matching Huggie Earrings',
    subtitleAr: 'قلادة بدلاية هلال القمر وأقراط متناسقة مطلية بذهب عيار 18',
    originalPrice: 600,
    materialEn: '316L Stainless Steel ·· Waterproof',
    materialAr: 'ستانلس ستيل 316L · طلاء ذهب عيار 18 PVD · مقاوم للماء',
    image: '/assets/images/product_sets_gift_1794341553768.jpg',
    badgeEn: 'Best Seller Gift Set',
    badgeAr: 'طقم الأكثر طلباً',
    inclusionsEn: 'Includes Necklace, Earrings & Signature Freebie Gifts Box',
    inclusionsAr: 'يشمل القلادة والأقراط وعلبة فريبي الفاخرة'
  },
  {
    id: 'set-golden-harmony',
    category: 'sets',
    nameEn: 'Golden Harmony Duo Set',
    nameAr: 'طقم التناغم الذهبي الفاخر',
    subtitleEn: 'Minimalist Sunburst Choker & Dainty Twist Stud Earrings',
    subtitleAr: 'شوكير قرص الشمس وأقراط تويست ناعمة متناسقة',
    originalPrice: 550,
    materialEn: '316L Stainless Steel · Anti-Tarnish & Hypoallergenic',
    materialAr: 'ستانلس ستيل 316L · مقاوم لتغير اللون ومضاد للحساسية',
    image: '/assets/images/freebie_hero_gifts_1794341551743.jpg',
    badgeEn: 'Curated Pairing',
    badgeAr: 'تنسيق متناغم',
    inclusionsEn: 'Includes Choker, Studs & Signature Freebie Gifts Box',
    inclusionsAr: 'يشمل الشوكير والأقراط وعلبة فريبي الفاخرة'
  },
  {
    id: 'set-solstice-duo',
    category: 'sets',
    nameEn: 'Solstice Sun & Bangle Gift Set',
    nameAr: 'طقم شمس الصيف والبانجل الفاخر',
    subtitleEn: 'Sun Medallion Pendant paired with Sleek Gold Cuff Bangle',
    subtitleAr: 'قلادة قرص الشمس مع سوار بانجل ذهبي أنيق متناسق',
    originalPrice: 650,
    materialEn: '316L Stainless Steel · Shower Safe & Waterproof',
    materialAr: 'ستانلس ستيل 316L · آمن بالاستحمام ومقاوم للماء',
    image: '/assets/images/product_necklaces_pendant_1794341566792.jpg',
    inclusionsEn: 'Includes Necklace, Bangle & Signature Freebie Gifts Box',
    inclusionsAr: 'يشمل القلادة والبانجل وعلبة فريبي الفاخرة'
  },
  {
    id: 'set-honey-drop',
    category: 'sets',
    nameEn: 'Honey Drop Minimalist Suite',
    nameAr: 'مجموعة قطرة العسل الذهبية',
    subtitleEn: 'Flat Snake Chain paired with Sculpted Huggie Earrings',
    subtitleAr: 'سلسلة الحية المسطحة مع أقراط هوبي منحوتة',
    originalPrice: 580,
    materialEn: '316L Stainless Steel · 18K Gold Vacuum Plating',
    materialAr: 'ستانلس ستيل 316L · طلاء ذهبي فاخر عالي الثبات',
    image: '/assets/images/product_earrings_gold_1794341553040.jpg',
    inclusionsEn: 'Includes Chain, Earrings & Signature Freebie Gifts Box',
    inclusionsAr: 'يشمل السلسلة والأقراط وعلبة فريبي الفاخرة'
  },

  // 2. Earrings (أقراط)
  {
    id: 'earrings-aura-hoops',
    category: 'earrings',
    nameEn: 'Aura Sculpted Huggie Hoops',
    nameAr: 'أقراط أورا الذهبية المصقولة',
    subtitleEn: 'Chunky Lightweight Water-Resistant Everyday Hoops',
    subtitleAr: 'أقراط هوب عصرية خفيفة ومقاومة للماء للاستخدام اليومي',
    originalPrice: 280,
    materialEn: '316L Surgical Stainless Steel · Ultra-lightweight',
    materialAr: 'ستانلس ستيل طبي 316L · خفيفة الوزن ومريحة جدًا',
    image: '/assets/images/product_earrings_gold_1794341553040.jpg',
    badgeEn: 'Everyday Essential',
    badgeAr: 'مثالية لكل يوم',
    inclusionsEn: 'Includes Signature Freebie Gifts Box',
    inclusionsAr: 'تشمل علبة فريبي الفاخرة'
  },
  {
    id: 'earrings-twist-french',
    category: 'earrings',
    nameEn: 'Twisted French Braid Hoops',
    nameAr: 'أقراط الضفيرة الملتوية الفرنسية',
    subtitleEn: 'Elegant braided texture with luminous high-polish finish',
    subtitleAr: 'تصميم ملتوي أنيق مع بريق ذهبي مشرق ولمعة تدوم',
    originalPrice: 300,
    materialEn: '316L Stainless Steel · 18K Gold Plated · Never Turns Green',
    materialAr: 'ستانلس ستيل 316L · طلاء ذهب 18 · لا يتغير لونها أبدًا',
    image: '/assets/images/product_earrings_gold_1794341553040.jpg',
    inclusionsEn: 'Includes Signature Freebie Gifts Box',
    inclusionsAr: 'تشمل علبة فريبي الفاخرة'
  },
  {
    id: 'earrings-celestial-drops',
    category: 'earrings',
    nameEn: 'Celestial Crescent Moon Huggies',
    nameAr: 'أقراط هلال القمر المرصعة بنعومة',
    subtitleEn: 'Dainty micro-crystal encrusted crescent charms',
    subtitleAr: 'أقراط رقيقة بتعليقة هلال مرصع بالكريستال الناعم',
    originalPrice: 320,
    materialEn: '316L Stainless Steel · Hypoallergenic & Nickel-Free',
    materialAr: 'ستانلس ستيل 316L · خالية تماماً من النيكل ومضادة للحساسية',
    image: '/assets/images/product_sets_gift_1794341553768.jpg',
    badgeEn: 'Romantic Pick',
    badgeAr: 'خيار رومانسي',
    inclusionsEn: 'Includes Signature Freebie Gifts Box',
    inclusionsAr: 'تشمل علبة فريبي الفاخرة'
  },
  {
    id: 'earrings-bold-dome',
    category: 'earrings',
    nameEn: 'Chic Parisian Dome Studs',
    nameAr: 'أقراط القبة الباريسية البسيطة',
    subtitleEn: 'High-shine smooth metallic dome with secure push back',
    subtitleAr: 'تصميم قبة معدنية فائقة اللمعان مريحة وأنيقة',
    originalPrice: 250,
    materialEn: '316L Surgical Stainless Steel · Sweat & Water Resistant',
    materialAr: 'ستانلس ستيل 316L · مقاوم للعرق والماء 100%',
    image: '/assets/images/freebie_hero_gifts_1794341551743.jpg',
    inclusionsEn: 'Includes Signature Freebie Gifts Box',
    inclusionsAr: 'تشمل علبة فريبي الفاخرة'
  },

  // 3. Bracelets (أساور)
  {
    id: 'bracelet-bond-cuff',
    category: 'bracelets',
    nameEn: 'Eternal Bond Cuff & Chain Duo',
    nameAr: 'سوار الرابطة الأبدية وسلسلة كليب',
    subtitleEn: 'Polished open bangle paired with modern paperclip links',
    subtitleAr: 'بانجل مصقول مفتوح مع سلسلة بيبركليب بتصميم عصري',
    originalPrice: 380,
    materialEn: 'Solid 316L Stainless Steel · Tarnish Proof · Shower Safe',
    materialAr: 'ستانلس ستيل 316L صلب · مقاوم للصدأ وآمن بالاستحمام',
    image: '/assets/images/product_bracelets_gold_1794341566930.jpg',
    badgeEn: 'Timeless Keepsake',
    badgeAr: 'ذكرى تدوم للأبد',
    inclusionsEn: 'Includes Size Extender & Freebie Gifts Box',
    inclusionsAr: 'يشمل وصلة المقاس وعلبة فريبي الفاخرة'
  },
  {
    id: 'bracelet-medallion-charm',
    category: 'bracelets',
    nameEn: 'Dainty Medallion Coin Bracelet',
    nameAr: 'سوار الميدالية الذهبية الرقيقة',
    subtitleEn: 'Delicate engraved coin charm that catches the light gently',
    subtitleAr: 'ميدالية ذهبية ناعمة تعكس الضوء برقة وأناقة بالغة',
    originalPrice: 340,
    materialEn: '316L Stainless Steel · 18K Gold PVD · Hypoallergenic',
    materialAr: 'ستانلس ستيل 316L · طلاء ذهب 18 · خالٍ من النيكل',
    image: '/assets/images/product_bracelets_gold_1794341566930.jpg',
    inclusionsEn: 'Includes Size Extender & Freebie Gifts Box',
    inclusionsAr: 'يشمل وصلة المقاس وعلبة فريبي الفاخرة'
  },
  {
    id: 'bracelet-minimal-bangle',
    category: 'bracelets',
    nameEn: 'Classic Sleek Oval Bangle',
    nameAr: 'بانجل بيضاوي انسيابي ناعم',
    subtitleEn: 'Click-closure oval bracelet that glides comfortably on wrist',
    subtitleAr: 'سوار بيضاوي بقفل كليك مريح ينساب بنعومة على المعصم',
    originalPrice: 400,
    materialEn: '316L Stainless Steel · 100% Waterproof & Durable',
    materialAr: 'ستانلس ستيل 316L · مقاوم تام للماء ومتين للغاية',
    image: '/assets/images/product_bracelets_gold_1794341566930.jpg',
    inclusionsEn: 'Includes Freebie Gifts Luxury Box',
    inclusionsAr: 'يشمل علبة فريبي الفاخرة'
  },
  {
    id: 'bracelet-snake-chain',
    category: 'bracelets',
    nameEn: 'Liquid Gold Herringbone Wristlet',
    nameAr: 'سلسلة المعصم الذهبية المسطحة',
    subtitleEn: 'Fluid flat link bracelet with silky mirror shine',
    subtitleAr: 'سوار مسطح بلمعة مرآة حريرية أنيقة على اليد',
    originalPrice: 320,
    materialEn: '316L Surgical Stainless Steel · Perfume Resistant',
    materialAr: 'ستانلس ستيل طبي 316L · مقاوم للعطور والماء',
    image: '/assets/images/freebie_hero_gifts_1794341551743.jpg',
    inclusionsEn: 'Includes Size Extender & Freebie Gifts Box',
    inclusionsAr: 'يشمل وصلة المقاس وعلبة فريبي الفاخرة'
  },

  // 4. Necklaces (قلادات وسلاسل)
  {
    id: 'necklace-sunburst-medallion',
    category: 'necklaces',
    nameEn: 'Solstice Sunburst Medallion Necklace',
    nameAr: 'قلادة قرص الشمس المنقوشة برقي',
    subtitleEn: 'Intricately engraved radiant sun symbol on vintage coin',
    subtitleAr: 'نقش قرص الشمس المشع بتفاصيل بارزة مستوحاة من التراث',
    originalPrice: 420,
    materialEn: '316L Stainless Steel · 18K Gold Plated · 100% Waterproof',
    materialAr: 'ستانلس ستيل 316L · طلاء ذهب عيار 18 · مقاوم للماء 100%',
    image: '/assets/images/product_necklaces_pendant_1794341566792.jpg',
    badgeEn: 'Loved by Her',
    badgeAr: 'الأكثر إعجاباً',
    inclusionsEn: 'Adjustable 45+5cm Chain & Freebie Gifts Box',
    inclusionsAr: 'سلسلة 45+5 سم وعلبة فريبي الفاخرة'
  },
  {
    id: 'necklace-golden-herringbone',
    category: 'necklaces',
    nameEn: 'Golden Glow Herringbone Chain',
    nameAr: 'سلسلة الهيرينغبون الذهبية اللامعة',
    subtitleEn: 'Silky smooth flat snake chain that drapes seamlessly on skin',
    subtitleAr: 'سلسلة الثعبان المسطحة الحريرية التي تنساب على الرقبة بنعومة',
    originalPrice: 360,
    materialEn: '316L Surgical Stainless Steel · Sweat & Perfume Resistant',
    materialAr: 'ستانلس ستيل 316L · مقاوم للعطور والتعرق بنسبة 100%',
    image: '/assets/images/product_necklaces_pendant_1794341566792.jpg',
    inclusionsEn: 'Includes Signature Freebie Gifts Box',
    inclusionsAr: 'تشمل علبة فريبي الفاخرة'
  },
  {
    id: 'necklace-celestial-crescent',
    category: 'necklaces',
    nameEn: 'Twinkling Moon Pendant Necklace',
    nameAr: 'سلسلة هلال القمر المتلألئة',
    subtitleEn: 'Graceful micro-crystal crescent suspended on fine gold link',
    subtitleAr: 'هلال رقيق مرصع يتدلى من سلسلة ذهبية ناعمة وأنيقة',
    originalPrice: 390,
    materialEn: '316L Stainless Steel · Tarnish Proof · Hypoallergenic',
    materialAr: 'ستانلس ستيل 316L · مقاوم لتغير اللون ومضاد للحساسية',
    image: '/assets/images/product_sets_gift_1794341553768.jpg',
    inclusionsEn: 'Includes Signature Freebie Gifts Box',
    inclusionsAr: 'تشمل علبة فريبي الفاخرة'
  },
  {
    id: 'necklace-bar-initial',
    category: 'necklaces',
    nameEn: 'Minimalist Sleek Gold Bar Pendant',
    nameAr: 'قلادة البار الذهبي النقي البسيطة',
    subtitleEn: 'Vertical polished geometric bar for subtle modern grace',
    subtitleAr: 'دلاية عامودية مصقولة بتصميم هندسي راقٍ ولمسة عصرية',
    originalPrice: 350,
    materialEn: '316L Stainless Steel · 18K Gold Vacuum Coated',
    materialAr: 'ستانلس ستيل 316L · طلاء ذهبي متين لا يبهت',
    image: '/assets/images/freebie_hero_gifts_1794341551743.jpg',
    inclusionsEn: 'Includes Signature Freebie Gifts Box',
    inclusionsAr: 'تشمل علبة فريبي الفاخرة'
  }
];

export const PACKAGING_ASSETS = {
  packagingImage: '/assets/images/freebie_real_packaging_luxury_1794344650224.jpg',
  packagingOriginalPhoto: '/assets/aistudio/image_d044b007.png',
  giftCardImage: '/assets/images/freebie_gift_card_fancy_1794345532488.jpg',
  giftCardOriginalGraphic: '/assets/aistudio/image_375a190c.png',
  giftCardFullPanels: '/assets/aistudio/image_8f19d9f5.png',
  giftCardRealPhoto: '/assets/aistudio/image_8d16d2db.png',
  logoImage: '/assets/aistudio/Profile-round_c27c7c58.png',
  heroImage: '/assets/images/freebie_hero_gifts_1794341551743.jpg'
};
