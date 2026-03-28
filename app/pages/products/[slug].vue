<template>
  <article class="product-page">
    <div v-if="product">
      <nav class="breadcrumb-nav container">
        <NuxtLink to="/">الرئيسية</NuxtLink>
        <ClientOnly><ChevronLeft :size="14" /></ClientOnly>
        <NuxtLink to="/products">المنتجات</NuxtLink>
        <ClientOnly><ChevronLeft :size="14" /></ClientOnly>
        <span class="current">{{ product.title }}</span>
      </nav>

      <div class="container main-layout">
        <section class="gallery-section">
          <div class="sticky-gallery">
            <Swiper
              :modules="[SwiperThumbs, SwiperZoom, SwiperNavigation]"
              :thumbs="{ swiper: thumbsSwiperInstance }"
              :zoom="true"
              :navigation="{ nextEl: '.nav-next', prevEl: '.nav-prev' }"
              class="main-slider"
            >
              <SwiperSlide v-for="(img, i) in productImages" :key="i">
                <div class="swiper-zoom-container">
                  <NuxtImg :src="img" :alt="product.title" class="hero-image" />
                </div>
              </SwiperSlide>

              <div class="custom-nav">
                <button class="nav-btn nav-prev">
                  <ClientOnly><ChevronRight /></ClientOnly>
                </button>
                <button class="nav-btn nav-next">
                  <ClientOnly><ChevronLeft /></ClientOnly>
                </button>
              </div>

              <div class="product-tag" v-if="product.badge">
                {{ product.badge }}
              </div>
            </Swiper>

            <Swiper
              @swiper="onThumbsSwiperReady"
              :slides-per-view="4"
              :space-between="12"
              class="thumbs-slider"
            >
              <SwiperSlide v-for="(img, i) in productImages" :key="i">
                <div class="thumb-card">
                  <NuxtImg :src="img" />
                </div>
              </SwiperSlide>
            </Swiper>
          </div>
        </section>

        <section class="details-section">
          <div class="header-meta">
            <span class="category-tag">{{ product.categoryName }}</span>
            <div class="rating-box">
              <ClientOnly>
                <Star
                  v-for="s in 5"
                  :key="s"
                  :size="16"
                  :fill="s <= 4 ? '#f1c40f' : 'none'"
                  color="#f1c40f"
                />
              </ClientOnly>
              <span>(4.8)</span>
            </div>
          </div>

          <h1 class="title">{{ product.title }}</h1>
          <p class="sku">
            كود المنتج: <span>{{ product.sku }}</span>
          </p>
          <section class="details-section">
            <div class="description-wrapper">
              <h3 class="section-subtitle">عن المنتج:</h3>
              <div class="full-description">
                {{ product.description || product.excerpt }}
              </div>
            </div>
          </section>
          <div class="price-card">
            <div class="price-row">
              <span class="main-price">{{ product.price }}</span>
              <span class="old-price" v-if="product.oldPrice">{{
                product.oldPrice
              }}</span>
            </div>
            <div class="save-tag" v-if="product.discount">
              وفرت {{ product.discount }}%
            </div>
          </div>

          <p class="description">{{ product.excerpt }}</p>

          <div class="features-grid">
            <div class="feature-item">
              <div class="icon-wrap">
                <ClientOnly><ShieldCheck /></ClientOnly>
              </div>
              <span>جودة معتمدة</span>
            </div>
            <div class="feature-item">
              <div class="icon-wrap">
                <ClientOnly><Truck /></ClientOnly>
              </div>
              <span>شحن سريع</span>
            </div>
          </div>

          <div class="booking-card">
            <div class="qnt-section">
              <div class="qnt-header">
                <span class="qnt-label">الكمية المطلوبة</span>
                <span class="stock-status">متوفر في المخزن</span>
              </div>
              <div class="qnt-ctrl-modern">
                <button
                  class="ctrl-btn minus"
                  @click="quantity > 1 && quantity--"
                  :disabled="quantity <= 1"
                >
                  <span>−</span>
                </button>
                <div class="input-wrapper">
                  <input type="number" v-model="quantity" readonly />
                  <span class="unit">قطعة</span>
                </div>
                <button class="ctrl-btn plus" @click="quantity++">
                  <span>+</span>
                </button>
              </div>
            </div>

            <div class="btns-group-modern">
              <a :href="whatsappUrl" target="_blank" class="btn-whatsapp-order">
                <div class="icon-circle">
                  <ClientOnly><MessageCircle :size="22" /></ClientOnly>
                </div>
                <div class="btn-text">
                  <span class="top-txt">إتمام الطلب سريعاً</span>
                  <span class="main-txt">اطلب عبر واتساب</span>
                </div>
              </a>
            </div>
          </div>

          <div class="share-section">
            <span class="share-label">مشاركة عبر:</span>
            <div class="social-links">
              <ClientOnly>
                <a href="#" class="social-icon fb"><Facebook :size="18" /></a>
                <a href="#" class="social-icon wa"
                  ><MessageCircle :size="18"
                /></a>
                <a href="#" class="social-icon tw"><Twitter :size="18" /></a>
                <a href="#" class="social-icon link" @click.prevent="copyLink"
                  ><LinkIcon :size="18"
                /></a>
              </ClientOnly>
            </div>
          </div>

          <div class="trust-footer">
            <div class="trust-node">
              <ClientOnly><Package :size="18" /></ClientOnly> تغليف آمن
            </div>
            <div class="trust-node">
              <ClientOnly><RotateCcw :size="18" /></ClientOnly> إرجاع خلال 14
              يوم
            </div>
          </div>
        </section>
      </div>
    </div>
  </article>
</template>

<script setup>
import { ref, onMounted, computed, watch } from "vue";
import { useRoute } from "vue-router";
// --- استيراد البيانات من الملف الخارجي ---
import { allProducts } from "@/pages/products/data/products";

import { Swiper, SwiperSlide } from "swiper/vue";
import {
  Thumbs as SwiperThumbs,
  Zoom as SwiperZoom,
  Navigation as SwiperNavigation,
} from "swiper/modules";
import {
  ChevronLeft,
  ChevronRight,
  Star,
  ShieldCheck,
  Truck,
  Package,
  RotateCcw,
  Facebook,
  MessageCircle,
  Twitter,
  Link as LinkIcon,
} from "lucide-vue-next";

// Swiper styles
import "swiper/css";
import "swiper/css/thumbs";
import "swiper/css/zoom";
import "swiper/css/navigation";

const route = useRoute();
const quantity = ref(1);
const thumbsSwiperInstance = ref(null);
const product = ref(null);
const productImages = ref([]);

const onThumbsSwiperReady = (swiper) => {
  thumbsSwiperInstance.value = swiper;
};

const loadProduct = () => {
  const slug = route.params.slug;
  const selected = allProducts[slug];

  if (selected) {
    product.value = selected;
    productImages.value = selected.images;
  } else {
    // اختياري: توجيه المستخدم لصفحة 404 إذا لم يجد المنتج
    // throw createError({ statusCode: 404, statusMessage: 'Product Not Found' })
    product.value = allProducts["compost-powder"];
    productImages.value = allProducts["compost-powder"].images;
  }
};

onMounted(() => {
  loadProduct();
});

watch(
  () => route.params.slug,
  () => {
    loadProduct();
    quantity.value = 1; // إعادة تعيين الكمية عند تغيير المنتج
  },
);

const whatsappUrl = computed(() => {
  const phone = "201110022133";
  const message = `طلب منتج: ${product.value?.title}%0Aالكمية: ${quantity.value}%0Aالكود: ${product.value?.sku}`;
  return `https://wa.me/${phone}?text=${message}`;
});

const copyLink = () => {
  navigator.clipboard.writeText(window.location.href);
  alert("تم نسخ الرابط!");
};
</script>
<style scoped>
:root {
  --primary: #1a4d2e;
  --primary-hover: #143d24;
  --accent: #d4a373;
  --text-main: #2c3e50;
  --bg-light: #f8fafc;
  --radius: 16px;
  --transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
/* تنسيقات الوصف الجديد */
.description-wrapper {
  margin-top: 10px;
}

.section-subtitle {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--primary);
  margin-bottom: 12px;
  border-right: 4px solid var(--primary);
  padding-right: 12px;
}

.full-description {
  font-size: 1.05rem;
  line-height: 1.8;
  color: #4a5568;
  /* السحر هنا: هذا السطر يحافظ على نزول الأسطر والمسافات */
  white-space: pre-line;
  background: #ffffff;
  padding: 20px;
  border-radius: 12px;
  border: 1px dashed #e2e8f0;
}

/* تحسين شكل الرموز التعبيرية (Emojis) */
.full-description span {
  display: inline-block;
  margin-left: 5px;
}
.product-page {
  background: var(--bg-light);
  min-height: 100vh;
  padding-bottom: 80px;
  direction: rtl;
  font-family: "Cairo", sans-serif;
}

.container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 20px;
}

/* Breadcrumb */
.breadcrumb-nav {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 25px 0;
  font-size: 0.85rem;
  color: #7f8c8d;
}
.breadcrumb-nav .current {
  color: var(--primary);
  font-weight: 700;
}

/* Main Layout Grid */
.main-layout {
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 60px;
  align-items: start;
}

@media (max-width: 1024px) {
  .main-layout {
    grid-template-columns: 1fr;
    gap: 40px;
  }
}

/* Gallery Section */
.gallery-section {
  min-width: 0;
}
.sticky-gallery {
  position: sticky;
  top: 20px;
}

.main-slider {
  border-radius: var(--radius);
  background: #fff;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.05);
  overflow: hidden;
}

.hero-image {
  width: 100%;
  aspect-ratio: 1/1;
  object-fit: cover;
}

.custom-nav {
  position: absolute;
  top: 50%;
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 0 15px;
  z-index: 10;
  pointer-events: none;
}
.nav-btn {
  pointer-events: auto;
  width: 42px;
  height: 42px;
  background: white;
  border: none;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  cursor: pointer;
}

.thumbs-slider {
  margin-top: 15px;
}
.thumb-card {
  border-radius: 10px;
  overflow: hidden;
  border: 2px solid transparent;
  cursor: pointer;
  transition: 0.3s;
  background: #fff;
}
.swiper-slide-thumb-active .thumb-card {
  border-color: var(--primary);
  transform: translateY(-3px);
}
.thumb-card img {
  width: 100%;
  height: 80px;
  object-fit: cover;
}

/* Info & Price */
.details-section {
  display: flex;
  flex-direction: column;
  gap: 24px;
}
.title {
  font-size: 2.5rem;
  color: var(--text-main);
  font-weight: 800;
  line-height: 1.2;
}

.price-card {
  background: #fff;
  padding: 24px;
  border-radius: var(--radius);
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #edf2f7;
}
.main-price {
  font-size: 2.2rem;
  font-weight: 900;
  color: var(--primary);
}
.old-price {
  text-decoration: line-through;
  color: #a0aec0;
  margin-right: 12px;
}
.save-tag {
  background: #fed7d7;
  color: #c53030;
  padding: 4px 12px;
  border-radius: 6px;
  font-weight: 700;
}

/* Features */
.features-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}
.feature-item {
  display: flex;
  align-items: center;
  gap: 10px;
  background: white;
  padding: 12px;
  border-radius: 12px;
  font-size: 0.9rem;
}
.icon-wrap {
  color: var(--primary);
}

/* Booking Card & Buttons */
/* حاوية الحجز */
.booking-card {
  background: #ffffff;
  padding: 24px;
  border-radius: 20px;
  border: 1px solid #f0f0f0;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.03);
}

/* جزء اختيار الكمية */
.qnt-section {
  margin-bottom: 25px;
}

.qnt-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.qnt-label {
  font-weight: 700;
  color: #2c3e50;
  font-size: 0.95rem;
}

.stock-status {
  font-size: 0.75rem;
  color: #27ae60;
  background: #ebf9f1;
  padding: 4px 10px;
  border-radius: 20px;
}

.qnt-ctrl-modern {
  display: grid;
  grid-template-columns: 50px 1fr 50px;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  overflow: hidden;
  padding: 4px;
}

.ctrl-btn {
  width: 100%;
  height: 46px;
  border: none;
  background: #ffffff;
  color: #1a4d2e;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.02);
}

.ctrl-btn:hover:not(:disabled) {
  background: #1a4d2e;
  color: #fff;
}

.ctrl-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
.ctrl-btn span {
  font-size: 1.5rem;
  font-weight: 400;
  line-height: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.ctrl-btn.minus span {
  margin-top: -4px; /* لضبط محاذاة علامة الناقص */
}

.input-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
}

.input-wrapper input {
  width: 40px;
  border: none;
  background: transparent;
  text-align: center;
  font-size: 1.2rem;
  font-weight: 800;
  color: #1a4d2e;
  outline: none;
}

.input-wrapper .unit {
  font-size: 0.8rem;
  color: #94a3b8;
  font-weight: 600;
}

/* زر الواتساب المطور */
.btn-whatsapp-order {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
  background: linear-gradient(135deg, #25d366 0%, #128c7e 100%);
  color: white;
  text-decoration: none;
  padding: 14px 20px;
  border-radius: 14px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.icon-circle {
  background: rgba(255, 255, 255, 0.2);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn-text {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.top-txt {
  font-size: 0.7rem;
  opacity: 0.9;
  font-weight: 400;
  margin-bottom: -2px;
}

.main-txt {
  font-size: 1.1rem;
  font-weight: 800;
}

.btn-whatsapp-order:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 24px rgba(18, 140, 126, 0.3);
}

/* إخفاء أسهم الـ Number التقليدية */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.btns-group {
  display: grid;
  grid-template-columns: 1.5fr 1fr 56px;
  gap: 12px;
  margin-top: 20px;
}

.btn-buy-now {
  background: #c53030;
  color: white;
  border: none;
  border-radius: 12px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  cursor: pointer;
  transition: var(--transition);
}
.btn-buy-now:hover {
  background: #a52828;
  transform: translateY(-2px);
}

.btn-primary {
  background: var(--primary);
  color: white;
  border: none;
  border-radius: 12px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  cursor: pointer;
  transition: var(--transition);
}
.btn-primary:hover {
  background: var(--primary-hover);
  transform: translateY(-2px);
}

.btn-wish {
  height: 56px;
  background: #fff;
  border: 2px solid #edf2f7;
  border-radius: 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.3s;
}
.btn-wish.active {
  border-color: #e74c3c;
}

/* Social Share */
.share-section {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 10px 0;
}
.share-label {
  font-size: 0.9rem;
  font-weight: 700;
  color: #718096;
}
.social-links {
  display: flex;
  gap: 10px;
}
.social-icon {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  transition: var(--transition);
}
.social-icon.fb {
  background: #1877f2;
}
.social-icon.wa {
  background: #25d366;
}
.social-icon.tw {
  background: #1da1f2;
}
.social-icon.link {
  background: #718096;
}
.social-icon:hover {
  transform: translateY(-3px);
  filter: brightness(1.1);
}

.trust-footer {
  display: flex;
  gap: 20px;
  justify-content: center;
  border-top: 1px solid #edf2f7;
  padding-top: 20px;
  color: #718096;
  font-size: 0.85rem;
}

/* Mobile Optimizations */
@media (max-width: 640px) {
  .btns-group {
    grid-template-columns: 1fr;
  }
  .btn-buy-now,
  .btn-primary {
    padding: 16px;
  }
  .title {
    font-size: 1.8rem;
  }
}
/* تنسيق زر الواتساب الجديد */
.btn-whatsapp-order {
  grid-column: span 3; /* ليأخذ مساحة الأزرار الثلاثة القديمة */
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  background: linear-gradient(135deg, #25d366 0%, #128c7e 100%);
  color: white;
  text-decoration: none;
  padding: 16px;
  border-radius: 12px;
  font-weight: 800;
  font-size: 1.2rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 8px 15px rgba(37, 211, 102, 0.2);
}

.btn-whatsapp-order:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 25px rgba(37, 211, 102, 0.3);
  filter: brightness(1.1);
}

/* تأثيرات الأنيميشن لعناصر الصفحة */
.gallery-section,
.details-section {
  animation: fadeInMove 0.8s ease-out both;
}

.details-section {
  animation-delay: 0.2s;
}

@keyframes fadeInMove {
  from {
    opacity: 0;
    transform: translateY(15px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* حركة إضافية عند تمرير الماوس على الصورة */
.hero-image {
  transition: transform 0.5s ease;
}
.hero-image:hover {
  transform: scale(1.03);
}
</style>
