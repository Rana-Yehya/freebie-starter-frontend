/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Language } from "./data/translations";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { ProductCatalog } from "./components/ProductCatalog";
import { PackagingAndCardShowcase } from "./components/PackagingAndCardShowcase";
import { StainlessSteelPromise } from "./components/StainlessSteelPromise";
import { HappinessStories } from "./components/HappinessStories";
import { MoreGiftsComing } from "./components/MoreGiftsComing";
import { CustomerReviews } from "./components/CustomerReviews";
import { Footer } from "./components/Footer";
import { buildWhatsAppUrl } from "./utils/whatsapp";

export default function App() {
  const [lang, setLang] = useState<Language>("en");
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("freebie_theme") === "dark";
    }
    return false;
  });
  const [whatsappNumber] = useState<string>(
    () => (import.meta.env.VITE_WHATSAPP_NUMBER as string | undefined) || "",
  );
  const [showFloatingWA, setShowFloatingWA] = useState<boolean>(false);
  const [hasSelectedItems, setHasSelectedItems] = useState<boolean>(false);

  // Sync document direction and language attribute
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang]);

  // Sync dark class on <html>
  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add("dark");
      localStorage.setItem("freebie_theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("freebie_theme", "light");
    }
  }, [isDark]);

  // Show floating WhatsApp button after scrolling past hero
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowFloatingWA(true);
      } else {
        setShowFloatingWA(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleLanguage = () => {
    setLang((prev) => (prev === "en" ? "ar" : "en"));
  };

  const toggleDarkMode = () => {
    setIsDark((prev) => !prev);
  };

  const handleExploreScroll = () => {
    const el = document.getElementById("categories");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handlePackagingScroll = () => {
    const el = document.getElementById("packaging");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const floatingGreeting =
    lang === "ar"
      ? `مرحباً فريبي! 👋\nأود الاستفسار عن إكسسوارات وهدايا فريبي.`
      : `Hello Freebie! 👋\nI'd like to ask about Freebie gifts & accessories.`;
  const floatingWaHref = buildWhatsAppUrl(whatsappNumber, floatingGreeting);

  return (
    <div
      className={`min-h-screen flex flex-col bg-[#FAF8F5] dark:bg-stone-950 text-stone-900 dark:text-stone-100 selection:bg-amber-300 selection:text-stone-900 transition-colors ${
        lang === "ar" ? "font-arabic-heading" : ""
      }`}
    >
      {/* Navigation with Top-Right Language Switcher & Dark Mode Toggle */}
      <Navbar
        lang={lang}
        onToggleLang={toggleLanguage}
        isDark={isDark}
        onToggleDark={toggleDarkMode}
        whatsappNumber={whatsappNumber}
      />

      <main className="flex-1">
        {/* Hero & Coming Soon Notice */}
        <Hero
          lang={lang}
          onExploreClick={handleExploreScroll}
          onPackagingClick={handlePackagingScroll}
        />
        {/* Performance Promise: Stainless Steel 316L (positioned before HappinessStories) */}
        <StainlessSteelPromise lang={lang} />

        {/* 4 Product Categories (Sets, Earrings, Bracelets, Necklaces) with Pagination & WhatsApp ordering */}
        <ProductCatalog
          lang={lang}
          whatsappNumber={whatsappNumber}
          onOrderSelectionChange={setHasSelectedItems}
        />

        {/* Special Packaging & Included Gift Card Details */}
        <PackagingAndCardShowcase lang={lang} />

        {/* Happiness Stories — Rotating Customer Testimonials */}
        {/* <HappinessStories lang={lang} whatsappNumber={whatsappNumber} /> */}

        {/* Happiness & Cool Gifts Future Vision (Beyond Stainless Steel) */}
        <MoreGiftsComing lang={lang} />

        {/* Customer Reviews — Auto-Sliding Carousel at Bottom of Page */}
        {/* <CustomerReviews lang={lang} /> */}
      </main>

      {/* Footer with Clickable Social Icons (Facebook, Instagram, TikTok) */}
      <Footer lang={lang} whatsappNumber={whatsappNumber} />

      {/* Floating Animated WhatsApp Quick Action Button (hidden when multi-item OrderSummaryBar is active) */}
      <AnimatePresence>
        {showFloatingWA && !hasSelectedItems && (
          <motion.a
            href={floatingWaHref}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, scale: 0.6, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.6, y: 20 }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            className={`fixed bottom-6 ${
              lang === "ar" ? "left-6" : "right-6"
            } lg:hidden z-50 flex items-center gap-2.5 px-4 py-3 bg-[#25D366] text-white font-bold text-sm rounded-full shadow-lg hover:shadow-xl transition-shadow cursor-pointer`}
          >
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
            </span>
            <MessageCircle className="w-5 h-5 fill-white" />
            <span className="hidden sm:inline">
              {lang === "ar" ? "طلب فوري عبر واتساب" : "Quick Order"}
            </span>
          </motion.a>
        )}
      </AnimatePresence>
    </div>
  );
}
