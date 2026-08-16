<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup>
// ✅ تعريف الـ SEO الأساسي على مستوى التطبيق كله
useSeoMeta({
  ogSiteName: "شركة الندى للتوريد الاسمدة العضوية",
  ogLocale: "ar_EG",
  twitterCard: "summary_large_image",
});
</script>

<style>
/* ✅ تحسين: Page Transition سلس وخفيف */
.page-enter-active,
.page-leave-active {
  transition: opacity 0.05s ease;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
}
</style>
