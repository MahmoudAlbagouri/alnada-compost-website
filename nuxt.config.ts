// nuxt.config.ts
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },

  // إعدادات الـ Head (العنوان والأيقونة)
  app: {
    head: {
      title: "شركة الندى للتنمية الزراعية", // العنوان اللي بيظهر في التاب
      htmlAttrs: {
        lang: "ar",
        dir: "rtl",
      },
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          name: "description",
          content:
            "شركة الندى - رائدة في صناعة الكمبوست والسماد العضوي عالي الجودة",
        },
      ],
      link: [
        // تأكد من وجود ملف favicon.ico داخل مجلد public
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      ],
    },
  },

  // تأكد أن المسار يبدأ بـ ~ وليس @ إذا لم يعمل
  css: ["@/assets/css/main.css"],

  modules: ["@nuxt/image", "nuxt-swiper"],

  image: {
    format: ["webp"],
    quality: 80,
  },
});
