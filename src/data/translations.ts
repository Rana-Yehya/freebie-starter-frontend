export type Language = 'en' | 'ar';

export const translations = {
  en: {
    brandName: 'Freebie',
    slogan: 'Happiness... Always here',
    comingSoonBadge: 'Full Experience Coming Soon',
    comingSoonNoticeTitle: 'We are crafting something joyful',
    comingSoonNoticeDesc: 'Our complete digital storefront and expanded gift collections are coming soon! In the meantime, our signature stainless steel collection is ready for immediate order via WhatsApp.',
    heroTitle: 'Spreading Happiness, One Beautiful Gift at a Time',
    heroSubtitle: 'Thoughtful, affordable, and elegant gifts crafted to surprise the one you cherish. All our jewelry is made from premium 316L stainless steel that never fades.',
    exploreCollection: 'Explore Pieces',
    
    // Stainless Steel Promise
    promiseEyebrow: 'The Freebie Permanence Promise',
    promiseTitle: 'It lasts with her forever so she can remember you whenever she wears them',
    promiseDesc: 'Unlike ordinary fashion jewelry that tarnishes or turns green after a few weeks, Freebie pieces are forged from medical-grade 316L stainless steel with waterproof 18K gold PVD vacuum coating. She can wear it in the shower, to the gym, and through every daily moment without worry.',
    promiseFeatures: [
      {
        title: '100% Waterproof & Shower-Safe',
        desc: 'Wear it swimming, showering, or working out. Never needs to be removed.'
      },
      {
        title: 'Lasting Memory Keepsake',
        desc: 'Designed to stay by her side for years, keeping your memory alive every day.'
      },
      {
        title: 'Anti-Tarnish & Never Turns Green',
        desc: 'Resists corrosion, sweat, perfume, and daily wear without discoloration.'
      },
      {
        title: 'Hypoallergenic & Sensitive-Skin Safe',
        desc: '100% nickel-free and lead-free. Zero skin irritation, guaranteed.'
      }
    ],

    // Categories
    categoriesTitle: 'Explore Our Pieces',
    categoriesSubtitle: 'Browse our 4 jewelry gift categories. Every order includes our signature luxury packaging and official gift card.',
    catAll: 'All Pieces',
    catSets: 'Sets',
    catEarrings: 'Earrings',
    catBracelets: 'Bracelets',
    catNecklaces: 'Necklaces',
    searchPlaceholder: 'Search pieces, sets, moon, sun, bangles...',
    clearSearch: 'Clear search',
    noResultsTitle: 'No matching pieces found',
    noResultsDesc: 'Try another keyword like "moon", "hoops", "cuff", or switch to All Pieces.',
    resetFilters: 'Show All Pieces',

    // Pagination
    pagePrev: 'Previous',
    pageNext: 'Next',
    pageOf: 'Page',
    showingPieces: 'Showing',
    ofTotal: 'of',
    pieces: 'pieces',

    // Product Card
    readyToSurpriseHer: 'Ready to surprise her?',
    orderNow: 'Order Now',
    freePackagingIncluded: 'Special Freebie Packaging Included',
    orderViaWhatsApp: 'Order via WhatsApp',
    inStock: 'Available Now',
    priceCurrency: 'EGP',
    discountOff: 'OFF',
    getSpecialOfferRibbon: (percent: number) =>
      `Special Launch Offer · ${percent}% OFF All Pieces`,
    addGiftCardLabel: 'Add Official Freebie Gift Card',
    giftCardPriceTag: '+30 EGP',
    giftCardCheckedHint: 'Added (+30 EGP)! Share your custom note in WhatsApp chat.',
    giftCardUncheckedHint: 'Optional (30 EGP) — add our honey-drip card for your feelings',
    selectAllGiftCards: 'Add gift card (+30 EGP) to all items',
    loadingImage: 'Loading photo...',
    totalWithCardLabel: 'Total with card',
    addToOrder: 'Select for Order',
    selectedInOrder: 'Selected',
    removeFromOrder: 'Remove',
    orderSummaryTitle: 'Your WhatsApp Order',
    selectedItemsCount: (count: number) =>
      `${count} ${count === 1 ? 'item' : 'items'} selected`,
    orderAllViaWhatsApp: 'Order All via WhatsApp',
    reviewOrder: 'Order Details',
    hideOrder: 'Hide',
    clearOrder: 'Clear All',
    itemsSubtotalLabel: 'Items Subtotal',
    discountSavedLabel: 'Discount Saved',
    giftCardAddonLabel: 'Official Freebie Gift Card',
    grandTotalLabel: 'Total Cost',
    giftCardIncludedBadge: '+Gift Card (30 EGP)',

    // Packaging & Gift Card
    giftPackagingTitle: 'Special Packaging & Official Gift Card Included',
    giftPackagingSubtitle: 'Every Freebie gift arrives ready to surprise her, featuring our signature brand packaging and our official gift card with space to leave a heartfelt note.',
    boxFeatureTitle: 'Signature Honeycomb Gift Box',
    boxFeatureDesc: 'Each Freebie treasure arrives in our custom honeycomb-patterned gift box. It opens gracefully like a book with a small satin ribbon tie that keeps it firmly and securely closed, revealing her piece nestled inside alongside a special sentiment card.',
    boxSpecialCardQuoteTitle: 'Special Card Inside the Box',
    boxSpecialCardQuote: '«زي قطرات العسل... هديتك هنا عشان نضيف حلاوة ليومك»',
    boxSpecialCardQuoteEn: 'Like drops of honey... your gift is here to add sweetness to your day',
    boxSpecsTitle: 'Unboxing Experience & Craftsmanship',
    boxSpecs: [
      {
        label: 'Opens Like a Book with Satin Tie',
        desc: 'Crafted to open smoothly like a book, secured with a delicate white satin ribbon tie that keeps it firm and elegant.'
      },
      {
        label: 'Special Card Inside',
        desc: 'Contains a special card inside that says: "زي قطرات العسل... هديتك هنا عشان نضيف حلاوة ليومك" (Like drops of honey... your gift is here to add sweetness to your day).'
      },
      {
        label: 'Honeycomb Yellow Motif',
        desc: 'Inspired by the cheerful sweetness of the bee, radiating warmth and playful elegance.'
      },
      {
        label: '100% Gift-Ready',
        desc: 'Arrives complete and pristine—ready to hand to her immediately without any extra wrapping paper needed.'
      }
    ],
    cardFeatureTitle: 'The Official Freebie Gift Card',
    cardFeatureDesc: 'Our card is thoughtfully designed with cheerful honeycomb accents and sweet honey drips, created to turn your heartfelt emotions into a tangible keepsake.',
    cardSpecsTitle: 'Thoughtful Design in Every Detail',
    cardSpecs: [
      {
        title: 'Golden Honey Drips & Hexagons',
        desc: 'Framed with rich golden honey drips and delicate honeycomb hexagons, carrying the joyful vibe of the Freebie bee.'
      },
      {
        title: 'Your Space for Personal Feelings',
        desc: 'A dedicated blank note cloud where you can express your love. You can simply tell us what you want written on WhatsApp when you order, and we will handwrite it for you with care!'
      },
      {
        title: 'Where We Expressed Our Feelings',
        desc: 'Embossed with our signature brand dedication: "أحلى هدية لأحلى يوم ليك — تفضل تفكّرك بفرحة أحلى مناسبة وتعيش معاك أحلى الذكريات" (The sweetest gift for your sweetest day, keeping the memory alive forever).'
      },
      {
        title: 'Honeycomb Hexagon Back Cover',
        desc: 'Finished with a full golden honeycomb pattern, the Freebie bee emblem, and our timeless slogan: Happiness... Always Here.'
      }
    ],
    whatsappCardNotice: 'Add the official gift card to your order for 30 EGP and tell us your custom note on WhatsApp — we will handwrite it for her!',

    // Happiness Stories Testimonials
    happinessStoriesTitle: 'Happiness Stories',
    happinessStoriesSubtitle: 'Real moments of joy, heartfelt surprises, and enduring keepsakes shared by our cherished community.',
    stories: [
      {
        id: 'story-1',
        name: 'Nour & Karim',
        location: 'Cairo, Egypt',
        occasion: 'Anniversary Surprise · Celestial Moon Set',
        quote: 'I was looking for an anniversary gift that wouldn\'t lose its shine after a few weeks. Seeing her eyes light up when she opened the honey-ribbon box was priceless. She hasn\'t taken the necklace off in 3 months—showers, workouts and all!',
        tag: 'Keepsake That Lasts'
      },
      {
        id: 'story-2',
        name: 'Tarek & Salma',
        location: 'Alexandria, Egypt',
        occasion: 'Birthday Gift · Bond Cuff & Handwritten Card',
        quote: 'The handwritten card service is pure magic. Freebie wrote my exact words on their card with such care, and the packaging was immaculate. She told me it was the most heartfelt surprise she had ever unwrapped.',
        tag: 'Thoughtful Packaging'
      },
      {
        id: 'story-3',
        name: 'Farida Mansour',
        location: 'Giza, Egypt',
        occasion: 'Self-Care Treat · Aura Huggie Hoops',
        quote: 'As someone with very sensitive ears, finding elegant jewelry that is genuinely hypoallergenic used to be frustrating. Freebie proved that affordable luxury, lasting stainless steel, and happiness can come together seamlessly.',
        tag: '100% Hypoallergenic'
      },
      {
        id: 'story-4',
        name: 'Omar A.',
        location: 'Dubai, UAE',
        occasion: 'Surprise Delivery · Solstice Sun Necklace',
        quote: 'Ordered through WhatsApp in under two minutes. Fast communication, effortless ordering, and the gift brought a genuine smile that made my entire week. Truly lived up to their slogan!',
        tag: 'Smooth Ordering'
      }
    ],

    // Customer Reviews Auto-Sliding Carousel
    reviewsEyebrow: 'Customer Reviews',
    reviewsTitle: 'Loved by Gift Givers Everywhere',
    reviewsSubtitle: 'Real feedback pulled from verified Freebie orders across Egypt and the region.',
    verifiedGiftLabel: 'Verified Gift',
    reviewsRatingLabel: '4.9 / 5 Average Rating',

    // Vision Beyond Stainless Steel
    futureGiftsTitle: 'Happiness Does Not Stop at Jewelry',
    futureGiftsSubtitle: 'Freebie is born to spread happiness and positive vibes through gifts. While we are starting with eternal stainless steel jewelry, a whole world of cool, creative, and heartwarming surprise gifts is coming soon!',
    futureItems: [
      {
        title: 'Aroma & Relaxation Gifts',
        desc: 'Curated soothing reed diffusers and luxury comfort sets.'
      },
      {
        title: 'Custom Memory Keepsakes',
        desc: 'Personalized illustration prints and sentimental surprise boxes.'
      },
      {
        title: 'Celebration Surprise Kits',
        desc: 'All-in-one birthday, anniversary, and congratulations celebration bundles.'
      }
    ],

    // WhatsApp Direct
    whatsappOrderGreeting: 'Hello Freebie! I would like to order:',
    whatsappSendNote: 'Card message:',
    whatsappReadyPrompt: 'Ready to surprise her with Freebie!',
    contactUs: 'Chat on WhatsApp',

    // Socials
    followUs: 'Connect with Us',

    // Footer
    footerRights: 'All rights reserved. Spreading happiness one gift at a time.',
    footerTagline: 'Freebie — Happiness... Always here'
  },
  ar: {
    brandName: 'فري بي',
    slogan: 'السعادة... دايما هنا',
    comingSoonBadge: 'التجربة الكاملة قريباً',
    comingSoonNoticeTitle: 'نحن نجهز لكم شيئاً ينبض بالبهجة',
    comingSoonNoticeDesc: 'متجرنا الإلكتروني المتكامل ومجموعات الهدايا الجديدة قادمة قريباً جداً! في هذه الأثناء، تشكيلتنا المميزة من إكسسوارات الستانلس ستيل متاحة للطلب الفوري عبر الواتساب.',
    heroTitle: 'ننشر السعادة، هدية تلو الأخرى لتصنع أجمل اللحظات',
    heroSubtitle: 'هدايا مدروسة، راقية وبأسعار مناسبة صُممت لتفاجئ من تحب. جميع إكسسواراتنا مصنوعة من الستانلس ستيل الفاخر المقاوم للصدأ والتلف.',
    exploreCollection: 'استكشف القطع',

    // Stainless Steel Promise
    promiseEyebrow: 'وعد فري بي بالبقاء الدائم',
    promiseTitle: 'تدوم معها للأبد لتتذكرك دائمًا في كل مرة ترتديها',
    promiseDesc: 'على عكس الإكسسوارات التقليدية التي يتغير لونها أو تصدأ بعد أسابيع قليلة، قِطع فري بي مصنوعة من الستانلس ستيل الطبي (درجة 316L) مع طلاء ذهب عيار 18 بتقنية PVD المقاومة للماء. يمكنها ارتداؤها أثناء الاستحمام والرياضة وفي تفاصيل يومها دون أي قلق.',
    promiseFeatures: [
      {
        title: 'مقاومة تامة للماء بنسبة 100%',
        desc: 'ترتديها أثناء الاستحمام أو السباحة دون الحاجة لخلعها نهائياً.'
      },
      {
        title: 'ذكرى خالدة تدوم معها',
        desc: 'صُممت لتبقى معها لسنوات طويلة، لتتذكر مشاعرك في كل لحظة.'
      },
      {
        title: 'لا يتغير لونها ولا تصدأ أبدًا',
        desc: 'تقاوم العطور، العرق، وعوامل الاستخدام اليومي وتحافظ على بريقها الذهبي.'
      },
      {
        title: 'آمنة تماماً على البشرة الحساسة',
        desc: 'خالية 100% من النيكل والرصاص ولا تسبب أي حساسية أو احمرار.'
      }
    ],

    // Categories
    categoriesTitle: 'استكشف تشكيلاتنا',
    categoriesSubtitle: 'تصفح قطعنا عبر 4 تصنيفات رئيسية. تشمل كل هدية علبتنا الخاصة وكارت فري بي لكتابة رسالتك.',
    catAll: 'جميع القطع',
    catSets: 'مجموعات وأطقم',
    catEarrings: 'أقراط',
    catBracelets: 'أساور',
    catNecklaces: 'قلادات وسلاسل',
    searchPlaceholder: 'ابحث عن طقم، أقراط، سوار، هلال، شمس...',
    clearSearch: 'مسح البحث',
    noResultsTitle: 'لا توجد قطع مطابقة لبحثك',
    noResultsDesc: 'جرّب كلمة أخرى مثل "قمر"، "شمس"، "أقراط" أو اعرض جميع القطع.',
    resetFilters: 'عرض جميع القطع',

    // Pagination
    pagePrev: 'السابق',
    pageNext: 'التالي',
    pageOf: 'صفحة',
    showingPieces: 'عرض',
    ofTotal: 'من أصل',
    pieces: 'قطع',

    // Product Card
    readyToSurpriseHer: 'جاهز لمفاجأتها؟',
    orderNow: 'اطلب الآن',
    freePackagingIncluded: 'شامل التغليف الخاص من فري بي',
    orderViaWhatsApp: 'اطلب عبر واتساب',
    inStock: 'متوفر الآن',
    priceCurrency: 'ج.م',
    discountOff: 'خصم',
    getSpecialOfferRibbon: (percent: number) =>
      `عرض خاص لفترة محدودة · خصم ${percent}% على جميع القطع`,
    addGiftCardLabel: 'إضافة كارت الإهداء الرسمي من فريبي',
    giftCardPriceTag: '+30 ج.م',
    giftCardCheckedHint: 'تمت الإضافة (+30 ج.م)! أخبرنا برسالتك في محادثة واتساب.',
    giftCardUncheckedHint: 'إضافة اختيارية (30 ج.م) — كارت العسل المخصص لكتابة مشاعرك',
    selectAllGiftCards: 'إضافة كارت الإهداء (+30 ج.م) لكل القطع',
    loadingImage: 'جاري تحميل الصورة...',
    totalWithCardLabel: 'الإجمالي بالكارت',
    addToOrder: 'اختر للطلب',
    selectedInOrder: 'تم الاختيار',
    removeFromOrder: 'إزالة',
    orderSummaryTitle: 'ملخص طلب واتساب',
    selectedItemsCount: (count: number) =>
      count === 1 ? 'قطعة واحدة مختارة' : `${count} قطع مختارة`,
    orderAllViaWhatsApp: 'اطلب الكل عبر واتساب',
    reviewOrder: 'تفاصيل الطلب',
    hideOrder: 'إخفاء',
    clearOrder: 'مسح الكل',
    itemsSubtotalLabel: 'إجمالي القطع',
    discountSavedLabel: 'إجمالي التوفير',
    giftCardAddonLabel: 'كارت الإهداء الرسمي من فريبي',
    grandTotalLabel: 'الإجمالي النهائي',
    giftCardIncludedBadge: '+كارت إهداء (30 ج.م)',

    // Packaging & Gift Card
    giftPackagingTitle: 'تغليف خاص وكارت إهداء رسمي مع كل هدية',
    giftPackagingSubtitle: 'كل هدية من فري بي تأتي مجهزة بالكامل لمفاجأتها، مع صندوق فري بي الفاخر وكارت البراند المخصص لكتابة رسالة دافئة لمن تحب.',
    boxFeatureTitle: 'علبة قرص العسل الخاصة بالبراند',
    boxFeatureDesc: 'تصل كل هدية داخل علبة قرص العسل الفاخرة الخاصة بـ فري بي، حيث تفتح بانسيابية مثل الكتاب مع شريط ستان رقيق يمسكها ويحكم إغلاقها برقي، لتكشف عن مجوهراتها مع كارت خاص يبهج القلب.',
    boxSpecialCardQuoteTitle: 'كارت خاص داخل العلبة',
    boxSpecialCardQuote: '«زي قطرات العسل... هديتك هنا عشان نضيف حلاوة ليومك»',
    boxSpecialCardQuoteEn: 'زي قطرات العسل... هديتك هنا عشان نضيف حلاوة ليومك',
    boxSpecsTitle: 'تفاصيل تجربة فتح علبة قرص العسل',
    boxSpecs: [
      {
        label: 'تفتح مثل الكتاب مع شريط ستان',
        desc: 'صُممت لتفتح بانسيابية مثل الكتاب مع شريط ستان رقيق يمسكها ويحكم إغلاقها برقي وثبات.'
      },
      {
        label: 'كارت خاص بداخل العلبة',
        desc: 'تحتوي في داخلها على كارت مخصص يحمل عبارة: «زي قطرات العسل... هديتك هنا عشان نضيف حلاوة ليومك» ليضفي حلاوة وابتسامة على يومها.'
      },
      {
        label: 'نقشة قرص العسل الصفراء',
        desc: 'مستوحاة من رقة النحلة وعالم العسل، لنشر الدفء والبهجة والمشاعر الإيجابية.'
      },
      {
        label: 'جاهزة للإهداء 100%',
        desc: 'مكتملة ومثالية للإهداء مباشرة لحظة وصولها دون الحاجة لأي تغليف إضافي.'
      }
    ],
    cardFeatureTitle: 'كارت فري بي الرسمي للإهداء',
    cardFeatureDesc: 'صُمم كارتنا بعناية فائقة ليعبر عن أصدق المشاعر مع تفاصيل قطرات العسل ونقشة سداسيات قرص العسل ورسالة خاصة تخلّد الذكريات.',
    cardSpecsTitle: 'تفاصيل تصميم الكارت الأيقوني',
    cardSpecs: [
      {
        title: 'قطرات العسل وسداسيات الخلية',
        desc: 'إطار ناعم منسدل بقطرات العسل الذهبية مع خلايا سداسية أنيقة تنبض بروح وبهجة نحلة فري بي.'
      },
      {
        title: 'مساحة مخصصة لكتابة مشاعرك',
        desc: 'مكان مخصص داخل إطار العسل لتكتب فيه كلمات حبك لها. ما عليك سوى إخبارنا بما تريد كتابته عند الطلب عبر الواتساب، وسنقوم بكتابته لك بخط اليد بكل حب!'
      },
      {
        title: 'المكان الذي عبّرنا فيه عن مشاعرنا',
        desc: 'يتوسط الكارت إهداء البراند النابع من القلب: "أحلى هدية لأحلى يوم ليك — تفضل تفكّرك بفرحة أحلى مناسبة وتعيش معاك أحلى الذكريات".'
      },
      {
        title: 'الغلاف الخلفي بخلايا العسل الكاملة',
        desc: 'يكتمل الكارت بظهر كامل بنقشة قرص العسل مع شعار نحلة فري بي وشعارنا: السعادة... دايما هنا.'
      }
    ],
    whatsappCardNotice: 'أضف كارت الإهداء الرسمي مقابل 30 ج.م وأخبرنا برسالتك عبر الواتساب عند إتمام طلبك وسنقوم بكتابتها بخط اليد!',

    // Happiness Stories Testimonials
    happinessStoriesTitle: 'قصص السعادة',
    happinessStoriesSubtitle: 'لحظات حقيقية من الفرح، ومفاجآت نابعة من القلب، وذكريات تدوم شاركتها معنا عائلة فري بي.',
    stories: [
      {
        id: 'story-1',
        name: 'نور وكريم',
        location: 'القاهرة، مصر',
        occasion: 'مفاجأة ذكرى الزواج · طقم هلال القمر',
        quote: 'كنت بدور على هدية لذكرى زواجنا تفضل محتفظة ببريقها وما يتغيرش لونها. فرحتها لما فتحت العلبة بالشريط الذهبي كانت لا تقدر بثمن. لابسة السلسلة من ٣ شهور حتى في الاستحمام وبتلمع كأنها لسه جديدة!',
        tag: 'ذكرى تدوم للأبد'
      },
      {
        id: 'story-2',
        name: 'طارق وسلمى',
        location: 'الإسكندرية، مصر',
        occasion: 'هدية عيد ميلاد · سوار بوند وكارت بخط اليد',
        quote: 'خدمة كتابة الكارت بخط الإيد لمسة فخمة جداً ومؤثرة. فري بي كتبوا رسالتي بالظبط على كارت الإهداء والتغليف شيك وراقي جداً. قالتلي إنها أصدق وأجمل مفاجأة وصلتها في عيد ميلادها.',
        tag: 'تغليف راقٍ ولمسة خاصة'
      },
      {
        id: 'story-3',
        name: 'فريدة منصور',
        location: 'الجيزة، مصر',
        occasion: 'إهداء للنفس · أقراط أورا الذهبية',
        quote: 'بشرتي حساسة جداً وكنت دايماً بعاني مع الإكسسوارات العادية. أقراط فري بي خفيفة جداً ومريحة ومسببتش أي حساسية نهائياً، ده غير إن التغليف بيفتح النفس ويبهج القلب بجد!',
        tag: 'طبية وآمنة على البشرة'
      },
      {
        id: 'story-4',
        name: 'عمر عبد الرحمن',
        location: 'دبي، الإمارات',
        occasion: 'طلب فوري · قلادة قرص الشمس',
        quote: 'طلبت من الواتساب في أقل من دقيقتين وكان التعامل راقي وسريع جداً. الهدية وصلت في ميعادها ونشرت بهجة حقيقية وابتسامة صادقة. فعلاً اسم على مسمى: السعادة دايما هنا!',
        tag: 'طلب سهل وسريع'
      }
    ],

    // Customer Reviews Auto-Sliding Carousel
    reviewsEyebrow: 'آراء عملائنا',
    reviewsTitle: 'محبوبة من الجميع في كل مناسبة',
    reviewsSubtitle: 'تقييمات حقيقية من عملاء فري بي وتجاربهم مع إكسسواراتنا وهدايانا.',
    verifiedGiftLabel: 'طلب موثق',
    reviewsRatingLabel: 'تقييم 4.9 / 5 من عملائنا',

    // Vision Beyond Stainless Steel
    futureGiftsTitle: 'السعادة لا تتوقف عند الإكسسوارات فقط',
    futureGiftsSubtitle: 'رؤية فري بي قائمة على نشر البهجة وروح السعادة عبر الهدايا. بدأنا بالإكسسوارات الفاخرة التي تدوم للأبد، ولكن قريباً جداً سنطلق عالماً متكاملاً من الهدايا المبتكرة والممتعة!',
    futureItems: [
      {
        title: 'هدايا العطور والاسترخاء',
        desc: 'معطرات جو فاخرة ومجموعات عناية مصممة للراحة ونشر الطاقة الإيجابية.'
      },
      {
        title: 'تذكارات مخصصة بالحب',
        desc: 'مطبوعات فنية وصناديق هدايا مفاجئة مصممة لحفظ اللحظات السعيدة.'
      },
      {
        title: 'باقات المناسبات والاحتالات',
        desc: 'مجموعات متكاملة لأعياد الميلاد، التخرج، والذكرى السنوية.'
      }
    ],

    // WhatsApp Direct
    whatsappOrderGreeting: 'أهلاً فري بي! أود طلب هذه الهدية:',
    whatsappSendNote: 'رسالة الكارت:',
    whatsappReadyPrompt: 'جاهز لمفاجأتها مع فري بي!',
    contactUs: 'تواصل عبر واتساب',

    // Socials
    followUs: 'تابعونا على منصاتنا',

    // Footer
    footerRights: 'جميع الحقوق محفوظة. ننشر السعادة هدية تلو الأخرى.',
    footerTagline: 'فري بي — السعادة... دايما هنا'
  }
};
