// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },

  // ✅ تفعيل SSR للأداء وتحسين الـ SEO
  ssr: true,

  // ✅ تفعيل Nitro Compression
  nitro: {
    compressPublicAssets: true,
    minify: true,
  },

  // إعدادات الموقع والـ SEO العام
  site: {
    url: "https://www.alnadacomp.com",
    name: "شركة الندى للتوريد الاسمدة العضوية",
    description:
      "شركة الندى - رائدة في صناعة الكمبوست والسماد العضوي عالي الجودة في مصر",
    defaultLocale: "ar",
  },

  // إعدادات الـ Head
  app: {
    head: {
      title: "شركة الندى للتوريد الاسمدة العضوية",
      htmlAttrs: {
        lang: "ar",
        dir: "rtl",
      },
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        // ✅ تحسين: منع الـ FOIT عن طريق preconnect للـ Google Fonts
      ],
      link: [
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
        // ✅ DNS Prefetch لتسريع تحميل Google Fonts
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
          crossorigin: "anonymous",
        },
        // ✅ Preconnect لـ YouTube لتسريع تحميل الـ iframe
        { rel: "preconnect", href: "https://www.youtube.com" },
        { rel: "dns-prefetch", href: "https://i.ytimg.com" },
      ],
      // ✅ Script لتحميل الخط بشكل غير متزامن (لو مش شغال @nuxt/fonts)
      // script: [],
    },
    // ✅ تقليل وقت الـ Page Transition
    pageTransition: { name: "page", mode: "out-in" },
  },

  // الملفات التنسيقية
  css: ["@/assets/css/main.css"],

  // الموديلات المفعلة
  modules: ["@nuxt/image", "nuxt-swiper", "@nuxtjs/seo", "@nuxt/fonts"],

  // ✅ إعدادات الخطوط المحسّنة
  fonts: {
    families: [
      {
        name: "Cairo",
        weights: [400, 600, 700, 900],
        subsets: ["arabic"],
      },
    ],
    // ✅ تقليل الـ weights غير الضرورية (حذف 500 و800 غير مستخدمَين كثيراً)
    defaults: {
      weights: [400, 700],
      styles: ["normal"],
    },
  },

  // ✅ إعدادات الصور المحسّنة
  image: {
    format: ["webp", "avif"], // ✅ إضافة avif للمتصفحات الحديثة
    quality: 75, // ✅ تقليل طفيف للجودة مقابل حجم أصغر
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1536,
    },
    // ✅ تفعيل الـ Lazy Loading تلقائياً
    densities: [1, 2],
  },

  // ✅ إعدادات خريطة الموقع
  sitemap: {
    enabled: true,
  },

  // ✅ تحسين الـ Vite Build
  vite: {
    build: {
      // ✅ تقسيم الـ chunks لتحسين الـ caching
      rollupOptions: {
        output: {
          manualChunks: {
            swiper: ["swiper"],
          },
        },
      },
      // ✅ ضغط CSS
      cssMinify: true,
    },
    // ✅ تحسين الـ CSS عبر LightningCSS
    css: {
      lightningcss: {
        targets: {
          chrome: 95,
          firefox: 90,
          safari: 15,
        },
      },
    },
  },

  // ✅ تحسين الـ Router
  router: {
    options: {
      // ✅ Scroll behavior أفضل
      scrollBehaviorType: "smooth",
    },
  },

  // ✅ تفعيل الـ Experimental Features المفيدة للأداء
  experimental: {
    // ✅ تحسين payload encoding
    renderJsonPayloads: true,
    // ✅ تقليل hydration overhead
    componentIslands: true,
    // ✅ lazy hydration للمكونات غير المرئية
    lazyHydration: true,
  },
});
