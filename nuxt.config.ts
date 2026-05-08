// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },

  // إعدادات الموقع والـ SEO العام
  site: {
    url: "https://www.alnadacomp.com",
    name: "شركة الندى للتنمية الزراعية",
    description:
      "شركة الندى - رائدة في صناعة الكمبوست والسماد العضوي عالي الجودة في مصر",
    defaultLocale: "ar",
  },

  // إعدادات الـ Head (العنوان والأيقونة)
  app: {
    head: {
      title: "شركة الندى للتنمية الزراعية",
      htmlAttrs: {
        lang: "ar",
        dir: "rtl",
      },
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        // سطر التحقق من جوجل (اختياري: ضيف الكود لو جوجل طلب منك إثبات ملكية يدوي)
        // { name: "google-site-verification", content: "كود_التحقق_هنا" }
      ],
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    },
  },

  // الملفات التنسيقية
  css: ["@/assets/css/main.css"],

  // الموديلات المفعلة
  modules: [
    "@nuxt/image",
    "nuxt-swiper",
    "@nuxtjs/seo", // الموديل الجديد اللي هيعملك الـ Sitemap والـ Robots تلقائياً
    "@nuxt/fonts", // أضف هذا السطر هنا
  ],
  fonts: {
    families: [
      {
        name: "Cairo",
        weights: [400, 500, 600, 700, 800],
        subsets: ["arabic"],
      },
    ],
  },

  // إعدادات الصور
  image: {
    format: ["webp"],
    quality: 80,
  },

  // إعدادات خريطة الموقع
  sitemap: {
    enabled: true,
    // أي صفحة مش عايزها تظهر في جوجل ممكن تضيفها في الـ exclude
  },
});
