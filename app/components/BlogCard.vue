<template>
  <article class="blog-card">
    <div class="blog-image-wrapper">
      <img :src="image" :alt="title" class="blog-img" />
    </div>
    <div class="blog-content">
      <h3 class="blog-title">{{ title }}</h3>
      <p class="blog-excerpt">{{ excerpt }}</p>
      <NuxtLink :to="link" class="read-more-link">
        قراءة المزيد
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
      </NuxtLink>
    </div>
  </article>
</template>

<script setup>
defineProps({
  image: {
    type: String,
    required: true,
    default: "/images/blog/default.jpg",
  },
  title: {
    type: String,
    required: true,
  },
  excerpt: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
    default: "/blog",
  },
});
</script>

<style scoped>
/* تم نقل تنسيقات البطاقة فقط هنا */
.blog-card {
  background: white;
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
  height: 100%;
  border: 1px solid rgba(0, 0, 0, 0.03);
}

.blog-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(78, 124, 50, 0.15);
}

.blog-image-wrapper {
  height: 220px;
  overflow: hidden;
  position: relative;
}

.blog-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.blog-card:hover .blog-img {
  transform: scale(1.08);
}

.blog-content {
  padding: 25px;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.blog-title {
  font-size: 1.25rem;
  font-weight: 800;
  color: var(--primary);
  margin-bottom: 12px;
  line-height: 1.4;
}

.blog-excerpt {
  font-size: 0.95rem;
  color: var(--text-muted);
  line-height: 1.6;
  margin-bottom: 20px;
  flex-grow: 1;
}

.read-more-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: var(--accent);
  font-weight: 700;
  font-size: 0.95rem;
  text-decoration: none;
  transition: gap 0.3s ease;
  margin-top: auto;
}

.read-more-link:hover {
  gap: 12px;
  color: var(--primary);
}

/* ملاحظة: المتغيرات (--primary, --accent, --text-muted) 
   سيتم ورثتها من العنصر الأب (home-page-wrapper) */
</style>
