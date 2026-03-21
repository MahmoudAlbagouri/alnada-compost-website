<template>
  <div class="home-page-wrapper">
    <!-- =======================
         1. Hero Section
         ======================= -->
    <div class="hero-wrapper" @mousemove="handleGlobalParallax">
      <section class="hero-section">
        <div class="nature-bg-overlay"></div>
        <div class="gradient-overlay"></div>

        <div class="container hero-container">
          <div class="hero-content">
            <div class="badge-row animate-in" style="--delay: 0.1s">
              <span class="pill">🌿 عضوي 100٪</span>
              <span class="pill">🏆 +10 سنوات خبرة</span>
            </div>

            <h1 class="hero-title animate-in" style="--delay: 0.3s">
              <span class="title-line">شركة الندى</span>
              <span class="title-line accent-line">للأسمدة العضوية</span>
            </h1>

            <p class="hero-desc animate-in" style="--delay: 0.5s">
              نحوّل التربة إلى مصدر حياة. نقدم حلولاً زراعية مستدامة تعزز
              الإنتاجية وتحافظ على البيئة باستخدام أحدث تقنيات التصنيع العضوي.
            </p>

            <div class="hero-btns animate-in" style="--delay: 0.7s">
              <NuxtLink to="/products" class="btn-primary-custom">
                <span>استكشف منتجاتنا</span>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2.5"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </NuxtLink>
              <NuxtLink to="/about" class="btn-outline-custom">من نحن</NuxtLink>
            </div>

            <div class="hero-stats animate-in" style="--delay: 0.9s">
              <div class="stat-item">
                <strong>+١٠</strong><span>سنوات خبرة</span>
              </div>
              <div class="stat-divider"></div>
              <div class="stat-item">
                <strong>+٥٠</strong><span>مزارع شريك</span>
              </div>
              <div class="stat-divider"></div>
              <div class="stat-item">
                <strong>٣</strong><span>خطوط إنتاج</span>
              </div>
            </div>
          </div>

          <div class="hero-visual" :class="{ 'is-ready': isLoaded }">
            <div
              class="product-label-top"
              :class="{ visible: labelVisible && isLoaded }"
            >
              {{ baseProducts[activeIndex]?.label }}
            </div>

            <div class="swiper-container-wrapper">
              <div v-if="!isLoaded" class="slider-skeleton">
                <div class="skeleton-card main"></div>
              </div>
              <Swiper
                v-show="isLoaded"
                :modules="[SwiperAutoplay, SwiperEffectCoverflow]"
                :slides-per-view="1.2"
                :centered-slides="true"
                :loop="true"
                :looped-slides="3"
                :speed="1000"
                :grab-cursor="true"
                :autoplay="{
                  delay: 4000,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true,
                }"
                effect="coverflow"
                :coverflow-effect="{
                  rotate: 0,
                  stretch: 0,
                  depth: 150,
                  modifier: 1.5,
                  slideShadows: false,
                }"
                :breakpoints="{
                  '768': { slidesPerView: 1.8 },
                  '1024': { slidesPerView: 2 },
                }"
                class="product-slider"
                @slideChange="onSlideChange"
                @swiper="onSwiperInit"
              >
                <SwiperSlide
                  v-for="(item, index) in doubledProducts"
                  :key="index"
                >
                  <div class="product-card">
                    <div
                      class="img-wrapper"
                      :style="
                        activeIndex === index % baseProducts.length
                          ? parallaxStyle
                          : ''
                      "
                    >
                      <img :src="item.src" :alt="item.alt" class="slider-img" />
                    </div>
                  </div>
                </SwiperSlide>
              </Swiper>
            </div>

            <div class="dots-row" v-if="isLoaded">
              <span
                v-for="(item, i) in baseProducts"
                :key="i"
                class="dot"
                :class="{ active: activeIndex === i }"
                @click="goToSlide(i)"
              ></span>
            </div>
          </div>
        </div>
      </section>
    </div>

    <!-- =======================
         2. Static Marketing Banner Slider
         (تم إضافة كلاس scroll-reveal)
         ======================= -->
    <section class="banners-section scroll-reveal">
      <div class="container banners-container">
        <div class="marketing-header animate-in" style="--delay: 0.2s">
          <h2 class="marketing-title">شركاء النجاح في كل أرض زراعية</h2>
          <p class="marketing-subtitle">
            نقدم حلولاً مجربة ساهمت في زيادة إنتاجية مئات المزارع عبر الجمهورية
            المصرية
          </p>
        </div>

        <div class="banners-slider-wrapper">
          <div class="progress-bar-container">
            <div class="progress-bar-fill"></div>
          </div>

          <Swiper
            ref="bannerSwiperRef"
            :modules="[SwiperAutoplay, SwiperPagination, SwiperEffectFade]"
            :slides-per-view="1"
            :loop="true"
            :speed="800"
            :effect="'fade'"
            :fade-effect="{ crossFade: true }"
            :autoplay="{
              delay: 6000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }"
            :pagination="{
              clickable: true,
              el: '.custom-pagination',
              dynamicBullets: true,
            }"
            class="main-banners-swiper"
            @autoplay-time-left="handleAutoplayTime"
          >
            <SwiperSlide v-for="(img, idx) in bannerImages" :key="idx">
              <div class="banner-slide">
                <img
                  :src="img"
                  :alt="'بانر عرضي ' + (idx + 1)"
                  class="banner-image"
                />
                <div class="banner-overlay-subtle"></div>
              </div>
            </SwiperSlide>
          </Swiper>
          <div class="custom-pagination"></div>
        </div>
      </div>
    </section>

    <!-- =======================
         3. Events & Conferences Slider
         (تم إضافة كلاس scroll-reveal)
         ======================= -->
    <section class="events-section scroll-reveal">
      <div class="container events-container">
        <div class="section-header">
          <h2 class="section-title">فعالياتنا ومؤتمراتنا</h2>
          <p class="section-subtitle">
            نشارك باستمرار في أبرز المعارض الزراعية لنقدم خبرتنا ونستفيد من أحدث
            التقنيات العالمية
          </p>
        </div>

        <div class="events-slider-wrapper">
          <button class="nav-btn prev-btn" @click="eventsSwiper?.slidePrev()">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>

          <Swiper
            ref="eventsSwiperRef"
            :modules="[SwiperNavigation]"
            :slides-per-view="1"
            :space-between="30"
            :loop="true"
            :speed="800"
            :breakpoints="{
              '640': { slidesPerView: 2 },
              '1024': { slidesPerView: 3 },
            }"
            class="events-swiper"
            @swiper="setEventsSwiper"
          >
            <SwiperSlide>
              <div class="event-card">
                <div class="card-image-wrapper">
                  <img
                    src="/images/event1.png"
                    alt="معرض الزراعة"
                    class="event-img"
                  />
                  <div class="card-badge">مؤتمر ٢٠</div>
                </div>
                <div class="card-content">
                  <h3>معرض الزراعة الدولي</h3>
                  <p>مشاركتنا السنوية بعرض أحدث منتجات الكمبوست العضوي.</p>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div class="event-card">
                <div class="card-image-wrapper">
                  <img
                    src="/images/event2.png"
                    alt="ندوة علمية"
                    class="event-img"
                  />
                  <div class="card-badge">ندوة</div>
                </div>
                <div class="card-content">
                  <h3>ندوة التطوير الزراعي</h3>
                  <p>ورشة عمل حول أهمية التسميد العضوي في تحسين التربة.</p>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div class="event-card">
                <div class="card-image-wrapper">
                  <img
                    src="/images/event3.png"
                    alt="حفل تكريم"
                    class="event-img"
                  />
                  <div class="card-badge">تكريم</div>
                </div>
                <div class="card-content">
                  <h3>حفل شركاء النجاح</h3>
                  <p>تكريم أفضل المزارع المتعاونة معنا لهذا العام.</p>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div class="event-card">
                <div class="card-image-wrapper">
                  <img
                    src="/images/event4.png"
                    alt="زيارة ميدانية"
                    class="event-img"
                  />
                  <div class="card-badge">زيارة</div>
                </div>
                <div class="card-content">
                  <h3>زيارات ميدانية</h3>
                  <p>جولات تفقدية لمتابعة نتائج المنتجات في الحقول.</p>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>

          <button class="nav-btn next-btn" @click="eventsSwiper?.slideNext()">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>
      </div>
    </section>

    <!-- =======================
         4. Blog / News Section
         (تم إضافة كلاس scroll-reveal وتصحيح الرابط)
         ======================= -->
    <section class="blog-section scroll-reveal">
      <div class="container blog-container">
        <div class="section-header">
          <h2 class="section-title">الأخبار والمعلومات الزراعية</h2>
          <p class="section-subtitle">
            دليلك الشامل لزيادة إنتاجية محاصيلك باستخدام أحدث تقنيات التسميد
            العضوي والكمبوست
          </p>
        </div>

        <div class="blog-grid">
          <BlogCard
            image="/images/blog/blog.png"
            title="دليل الكمبوست النباتي: الحل الأمثل لاستصلاح الأراضي الصحراوية"
            excerpt="تعرف على دور الكمبوست في تحسين خواص التربة الرملية وقدرتها على الاحتفاظ بالمياه، وكيف يوفر عليك تكاليف الري والتسميد الكيميائي."
            link="/blog/compost-guide-2026"
          />

          <BlogCard
            image="/images/blog/blog2.png"
            title="كيف تضاعف إنتاجية فدان الموالح باستخدام التسميد العضوي؟"
            excerpt="نصائح خبراء شركة الندى لمزارعي البرتقال والليمون حول التوقيت الأمثل لإضافة السماد العضوي لضمان ثمار بجودة تصديرية عالية."
            link="/blog/citrus-fertilization-tips"
          />

          <BlogCard
            image="/images/blog/blog3.png"
            title="الفرق بين الكمبوست الناضج والسماد البلدي التقليدي"
            excerpt="لماذا يفضل المحترفون استخدام الكمبوست المعالج؟ قارن بين الأمان الحيوي، خلو المحصول من الحشائش، وسرعة امتصاص النبات للمغذيات."
            link="/blog/compost-vs-manure"
          />

          <BlogCard
            image="/images/blog/blog1.png"
            title="مستقبل الزراعة النظيفة: التوجه نحو الأسمدة الحيوية في مصر"
            excerpt="استعراض لأهمية تقليل الاعتماد على الكيماويات والتحول نحو الزراعة المستدامة لزيادة خصوبة التربة للأجيال القادمة."
            link="/blog/sustainable-farming-egypt"
          />
        </div>

        <div class="view-all-wrapper">
          <NuxtLink to="/blog" class="view-all-btn">
            تصفح مكتبة النصائح الزراعية
          </NuxtLink>
        </div>
      </div>
    </section>
    <!-- =======================
         5. Cinematic Video Section
         (تم إصلاح مشكلة Hydration وإضافة scroll-reveal)
         ======================= -->
    <section class="video-section scroll-reveal">
      <div class="container video-container">
        <div class="video-header">
          <h2 class="video-title">شاهد رحلة الإنتاج</h2>
          <p class="video-subtitle">
            جولة داخل مصانعنا للتعرف على معايير الجودة العالية
          </p>
        </div>

        <div class="video-wrapper">
          <button class="play-button" @click="forcePlay" v-if="!videoStarted">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="5 3 19 12 5 21 5 3"></polygon>
            </svg>
          </button>

          <iframe
            class="video-frame"
            src="https://www.youtube.com/embed/s_azmlBfAsA?autoplay=1&mute=1&controls=1&loop=1&playlist=s_azmlBfAsA&rel=0&modestbranding=1"
            title="El Nada Company Video"
            frameborder="0"
            :allow="iframeAllow"
            allowfullscreen
            @load="onVideoLoad"
          ></iframe>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import {
  Autoplay as SwiperAutoplay,
  EffectCoverflow as SwiperEffectCoverflow,
  Pagination as SwiperPagination,
  EffectFade as SwiperEffectFade,
  Navigation as SwiperNavigation,
} from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/autoplay";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
const iframeAllow =
  "accelerometer;autoplay;clipboard-write;encrypted-media;gyroscope;picture-in-picture";
// --- بيانات الصور ---
const bannerImages = [
  "/images/slider2.png",
  "/images/slider3.png",
  "/images/slider4.png",
  "/images/slider5.png",
  "/images/slider6.png",
  "/images/slider7.png",
  "/images/slider8.png",
  "/images/slider9.png",
];
useHead({
  title: "  الرئيسية | شركة الندى",
  meta: [
    { name: "description", content: "احصل على أفضل أسعار الأسمدة والكمبوست" },
  ],
});
// --- Hero Logic ---
const isLoaded = ref(false);
const swiperInstance = ref(null);
const activeIndex = ref(0);
const labelVisible = ref(true);
const tiltX = ref(0);
const tiltY = ref(0);
const bannerSwiperRef = ref(null);
const eventsSwiperRef = ref(null);
const eventsSwiper = ref(null);
const videoStarted = ref(false);

const baseProducts = [
  {
    src: "/images/products/product1.png",
    alt: "كمبوست الندى",
    label: "كمبوست عضوي",
  },
  {
    src: "/images/products/product2.png",
    alt: "جبس زراعي",
    label: "جبس زراعي",
  },
  {
    src: "/images/products/product3.png",
    alt: "كمبوست سائل",
    label: "تسميد سائل",
  },
];

const doubledProducts = computed(() => [
  ...baseProducts,
  ...baseProducts,
  ...baseProducts,
]);

onMounted(() => {
  setTimeout(() => {
    isLoaded.value = true;
  }, 400);

  // ==========================================
  // 🌟 Scroll Reveal Animation Logic
  // ==========================================
  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.15, // يبدأ التأثير عندما يظهر 15% من العنصر
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target); // إيقاف المراقبة بعد الظهور مرة واحدة
      }
    });
  }, observerOptions);

  const sections = document.querySelectorAll(".scroll-reveal");
  sections.forEach((section) => {
    observer.observe(section);
  });
});

const handleGlobalParallax = (e) => {
  if (window.innerWidth < 1024) return;
  const x = (window.innerWidth / 2 - e.pageX) / 45;
  const y = (window.innerHeight / 2 - e.pageY) / 45;
  tiltX.value = x;
  tiltY.value = y;
};

const parallaxStyle = computed(() => ({
  transform: `translate3d(${tiltX.value}px, ${tiltY.value}px, 0)`,
  transition: "transform 0.15s ease-out",
}));

const onSwiperInit = (swiper) => {
  swiperInstance.value = swiper;
};
const onSlideChange = (swiper) => {
  labelVisible.value = false;
  activeIndex.value = swiper.realIndex % baseProducts.length;
  setTimeout(() => {
    labelVisible.value = true;
  }, 250);
};
const goToSlide = (index) => {
  if (swiperInstance.value) swiperInstance.value.slideToLoop(index);
};

const handleAutoplayTime = (swiper, timeLeft) => {
  const progressBar = document.querySelector(".progress-bar-fill");
  if (progressBar) {
    const totalTime = 6000;
    const percentage = ((totalTime - timeLeft) / totalTime) * 100;
    progressBar.style.width = `${percentage}%`;
  }
};

const setEventsSwiper = (swiper) => {
  eventsSwiper.value = swiper;
};

const onVideoLoad = () => {
  setTimeout(() => {
    videoStarted.value = true;
  }, 800);
};

const forcePlay = () => {
  videoStarted.value = true;
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;900&display=swap");

.home-page-wrapper {
  --primary: #213428;
  --accent: #4e7c32;
  --bg-light: #f4f7f5;
  --text-muted: #5a7261;
  --ease-out: cubic-bezier(0.25, 1, 0.5, 1);
  font-family: "Cairo", sans-serif;
  direction: rtl;
  background-color: var(--bg-light);
  overflow-x: hidden;
}

.container {
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 24px;
}

/* =======================
   SCROLL REVEAL ANIMATION
   ======================= */
.scroll-reveal {
  opacity: 0;
  transform: translateY(40px);
  transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.scroll-reveal.visible {
  opacity: 1;
  transform: translateY(0);
}

/* =======================
   HERO SECTION STYLES
   ======================= */
.hero-wrapper {
  position: relative;
  width: 100%;
  overflow: hidden;
}
.hero-section {
  position: relative;
  min-height: calc(100vh - 80px);
  display: flex;
  align-items: center;
  padding: 50px 0;
}
.nature-bg-overlay {
  position: absolute;
  inset: 0;
  background-image: url("/images/banner1.png");
  background-size: cover;
  background-position: center;
  opacity: 0.8;
  z-index: 0;
}
.gradient-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, var(--bg-light) 5%, transparent 100%);
  z-index: 1;
}
.hero-container {
  position: relative;
  z-index: 10;
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  justify-content: space-between;
  gap: 60px;
}
.animate-in {
  opacity: 0;
  transform: translateY(30px);
  animation: slideInUp 0.8s var(--ease-out) forwards;
  animation-delay: var(--delay, 0s);
}
@keyframes slideInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.hero-content {
  flex: 1;
  max-width: 580px;
  text-align: right;
}
.badge-row {
  display: flex;
  gap: 12px;
  margin-bottom: 30px;
  flex-wrap: wrap;
}
.pill {
  background: white;
  padding: 8px 18px;
  border-radius: 50px;
  font-size: 0.9rem;
  font-weight: 700;
  color: var(--primary);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}
.hero-title {
  font-size: clamp(2.5rem, 5vw, 3.8rem);
  font-weight: 900;
  color: var(--primary);
  line-height: 1.1;
  margin-bottom: 25px;
}
.accent-line {
  color: var(--accent);
  display: block;
}
.hero-desc {
  font-size: 1.2rem;
  line-height: 1.8;
  color: var(--text-muted);
  margin-bottom: 40px;
}
.hero-btns {
  display: flex;
  gap: 20px;
  margin-bottom: 50px;
  flex-wrap: wrap;
}
.btn-primary-custom,
.btn-outline-custom {
  padding: 18px 36px;
  border-radius: 20px;
  text-decoration: none;
  font-weight: 700;
  transition: 0.3s var(--ease-out);
  display: inline-flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
}
.btn-primary-custom {
  background: var(--primary);
  color: white;
  border: 2px solid var(--primary);
}
.btn-primary-custom:hover {
  background: var(--accent);
  border-color: var(--accent);
  transform: translateY(-5px);
  box-shadow: 0 15px 30px rgba(78, 124, 50, 0.2);
}
.btn-outline-custom {
  border: 2.5px solid var(--primary);
  color: var(--primary);
  background: transparent;
}
.btn-outline-custom:hover {
  background: var(--primary);
  color: white;
}
.hero-stats {
  display: flex;
  gap: 40px;
  border-top: 1px solid rgba(0, 0, 0, 0.08);
  padding-top: 30px;
  flex-wrap: wrap;
}
.stat-item strong {
  display: block;
  font-size: 1.8rem;
  color: var(--accent);
  font-weight: 900;
}
.stat-item span {
  font-size: 0.95rem;
  color: var(--text-muted);
}
.stat-divider {
  width: 1px;
  height: 40px;
  background: rgba(0, 0, 0, 0.08);
  align-self: center;
}
.hero-visual {
  flex: 1.1;
  width: 100%;
  min-width: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  opacity: 0;
  transition: opacity 0.8s ease;
}
.hero-visual.is-ready {
  opacity: 1;
}
.swiper-container-wrapper {
  width: 100%;
  padding: 30px 0;
  perspective: 1000px;
}
.product-card {
  padding: 15px;
}
.img-wrapper {
  background: white;
  border-radius: 40px;
  padding: 50px;
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.06);
  transition: box-shadow 0.5s ease;
  will-change: transform;
}
.slider-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  filter: drop-shadow(0 15px 30px rgba(0, 0, 0, 0.1));
}
:deep(.swiper-slide-active) .img-wrapper {
  box-shadow: 0 35px 70px rgba(78, 124, 50, 0.15);
  border: 1px solid rgba(78, 124, 50, 0.1);
}
.product-label-top {
  background: var(--accent);
  color: white;
  padding: 8px 25px;
  border-radius: 50px;
  font-weight: 700;
  margin-bottom: 10px;
  opacity: 0;
  transform: translateY(10px);
  transition: 0.4s var(--ease-out);
}
.product-label-top.visible {
  opacity: 1;
  transform: translateY(0);
}
.dots-row {
  display: flex;
  gap: 12px;
  margin-top: 10px;
}
.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #d1d6d3;
  cursor: pointer;
  transition: 0.4s;
}
.dot.active {
  width: 35px;
  background: var(--accent);
  border-radius: 10px;
}
.slider-skeleton {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 350px;
}
.skeleton-card {
  width: 280px;
  height: 280px;
  background: #e6eee9;
  border-radius: 40px;
  animation: pulse 1.5s infinite ease-in-out;
}
@keyframes pulse {
  0%,
  100% {
    opacity: 0.6;
  }
  50% {
    opacity: 1;
  }
}

/* =======================
   MARKETING BANNER SECTION STYLES
   ======================= */
.banners-section {
  padding: 40px 0 80px 0;
  background: transparent;
  position: relative;
}
.marketing-header {
  text-align: center;
  margin-bottom: 40px;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
}
.marketing-title {
  font-size: clamp(2rem, 4vw, 2.8rem);
  font-weight: 900;
  color: var(--primary);
  margin-bottom: 15px;
  position: relative;
  display: inline-block;
}
.marketing-title::after {
  content: "";
  display: block;
  width: 80px;
  height: 4px;
  background: var(--accent);
  margin: 12px auto 0;
  border-radius: 2px;
}
.marketing-subtitle {
  font-size: 1.1rem;
  color: var(--text-muted);
  line-height: 1.6;
  margin-top: 15px;
}
.banners-slider-wrapper {
  position: relative;
  width: 100%;
}
.main-banners-swiper {
  width: 100%;
  border-radius: 30px;
  overflow: hidden;
  border: 8px solid #ffffff;
  box-shadow:
    0 20px 40px rgba(0, 0, 0, 0.1),
    0 10px 20px rgba(78, 124, 50, 0.15);
  background: #000;
}
.banner-slide {
  width: 100%;
  height: 100%;
  position: relative;
  background: #1a1a1a;
}
.banner-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  display: block;
}
.banner-overlay-subtle {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.05);
  pointer-events: none;
  z-index: 1;
}
.progress-bar-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background: rgba(255, 255, 255, 0.4);
  z-index: 10;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  overflow: hidden;
}
.progress-bar-fill {
  height: 100%;
  width: 0%;
  background: var(--accent);
  box-shadow: 0 0 10px var(--accent);
  transition: width 0.1s linear;
}
.custom-pagination {
  position: absolute;
  bottom: 25px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 20;
  display: flex;
  justify-content: center;
  gap: 10px;
  padding: 10px 20px;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-radius: 50px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}
:deep(.swiper-pagination-bullet) {
  background: #fff;
  opacity: 0.6;
  width: 8px;
  height: 8px;
  margin: 0 4px !important;
  transition: all 0.3s ease;
  border: none;
}
:deep(.swiper-pagination-bullet-active) {
  opacity: 1;
  background: var(--accent);
  width: 24px;
  border-radius: 4px;
  box-shadow: 0 0 8px rgba(78, 124, 50, 0.5);
}

/* =======================
   EVENTS SECTION STYLES
   ======================= */
.events-section {
  padding: 80px 0;
  background: white;
  position: relative;
  overflow: hidden;
}
.events-section::before {
  content: "";
  position: absolute;
  top: -100px;
  right: -100px;
  width: 400px;
  height: 400px;
  background: radial-gradient(
    circle,
    rgba(78, 124, 50, 0.05) 0%,
    transparent 70%
  );
  border-radius: 50%;
  z-index: 0;
}
.events-container {
  position: relative;
  z-index: 1;
}
.section-header {
  text-align: center;
  margin-bottom: 50px;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
}
.section-title {
  font-size: clamp(2rem, 4vw, 2.5rem);
  font-weight: 900;
  color: var(--primary);
  margin-bottom: 15px;
  position: relative;
  display: inline-block;
}
.section-title::after {
  content: "";
  display: block;
  width: 60px;
  height: 4px;
  background: var(--accent);
  margin: 12px auto 0;
  border-radius: 2px;
}
.section-subtitle {
  font-size: 1.1rem;
  color: var(--text-muted);
  line-height: 1.6;
}
.events-slider-wrapper {
  position: relative;
  padding: 20px 10px;
}
.events-swiper {
  width: 100%;
  padding-bottom: 20px;
}
.event-card {
  background: white;
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
  border: 1px solid rgba(0, 0, 0, 0.03);
}
.event-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 40px rgba(78, 124, 50, 0.15);
}
.card-image-wrapper {
  position: relative;
  height: 250px;
  overflow: hidden;
}
.event-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}
.event-card:hover .event-img {
  transform: scale(1.05);
}
.card-badge {
  position: absolute;
  top: 15px;
  right: 15px;
  background: var(--accent);
  color: white;
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 700;
  box-shadow: 0 4px 10px rgba(78, 124, 50, 0.3);
}
.card-content {
  padding: 25px;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.card-content h3 {
  font-size: 1.3rem;
  font-weight: 800;
  color: var(--primary);
  margin-bottom: 10px;
  line-height: 1.4;
}
.card-content p {
  font-size: 0.95rem;
  color: var(--text-muted);
  line-height: 1.6;
  margin: 0;
}
.nav-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: white;
  border: 2px solid var(--bg-light);
  color: var(--primary);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
}
.nav-btn:hover {
  background: var(--accent);
  color: white;
  border-color: var(--accent);
  box-shadow: 0 8px 25px rgba(78, 124, 50, 0.3);
  transform: translateY(-50%) scale(1.1);
}
.prev-btn {
  left: -25px;
}
.next-btn {
  right: -25px;
}

/* =======================
   BLOG SECTION STYLES
   ======================= */
.blog-section {
  padding: 80px 0;
  background: var(--bg-light);
  position: relative;
}
.blog-container {
  position: relative;
  z-index: 1;
}
.blog-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 30px;
  margin-bottom: 50px;
}
.view-all-wrapper {
  text-align: center;
  margin-top: 20px;
}
.view-all-btn {
  display: inline-block;
  background: white;
  color: var(--primary);
  padding: 14px 40px;
  border-radius: 50px;
  font-weight: 700;
  text-decoration: none;
  border: 2px solid rgba(0, 0, 0, 0.05);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}
.view-all-btn:hover {
  background: var(--primary);
  color: white;
  border-color: var(--primary);
  transform: translateY(-3px);
  box-shadow: 0 10px 25px rgba(33, 52, 40, 0.2);
}

/* =======================
   VIDEO SECTION STYLES
   ======================= */
.video-section {
  padding: 100px 0;
  background: #1a1a1a;
  position: relative;
  overflow: hidden;
}

.video-section::before {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
  height: 80%;
  background: radial-gradient(
    circle,
    rgba(78, 124, 50, 0.15) 0%,
    transparent 70%
  );
  pointer-events: none;
  z-index: 0;
}

.video-container {
  position: relative;
  z-index: 1;
  max-width: 1000px;
}

.video-header {
  text-align: center;
  margin-bottom: 40px;
  color: white;
}

.video-title {
  font-size: clamp(2rem, 4vw, 2.5rem);
  font-weight: 900;
  margin-bottom: 10px;
  color: white;
}

.video-subtitle {
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.7);
}

.video-wrapper {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 30px 60px rgba(0, 0, 0, 0.5);
  border: 8px solid rgba(255, 255, 255, 0.1);
  background: #000;
}

.video-frame {
  width: 100%;
  height: 100%;
  border: none;
  display: block;
}

.play-button {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  border: 2px solid rgba(255, 255, 255, 0.5);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 10;
}

.play-button:hover {
  background: var(--accent);
  border-color: var(--accent);
  transform: translate(-50%, -50%) scale(1.1);
  box-shadow: 0 0 30px rgba(78, 124, 50, 0.6);
}

/* =======================
   RESPONSIVE DESIGN
   ======================= */
@media (max-width: 1024px) {
  .hero-container {
    flex-direction: column;
    text-align: center;
    gap: 40px;
    padding-top: 50px;
  }
  .hero-content {
    order: 2;
    max-width: 100%;
  }
  .hero-visual {
    order: 1;
    margin-bottom: 20px;
  }
  .badge-row,
  .hero-btns,
  .hero-stats {
    justify-content: center;
  }
  .hero-title {
    font-size: 2.8rem;
  }
  .main-banners-swiper {
    border-width: 6px;
  }
  .prev-btn {
    left: 0;
  }
  .next-btn {
    right: 0;
  }
}

@media (max-width: 768px) {
  .hero-stats {
    justify-content: center;
    gap: 20px;
  }
  .stat-divider {
    display: none;
  }
  .marketing-title {
    font-size: 1.8rem;
  }
  .marketing-subtitle {
    font-size: 1rem;
  }
  .main-banners-swiper {
    border-width: 4px;
    border-radius: 20px;
  }
  .custom-pagination {
    bottom: 15px;
    padding: 8px 16px;
    gap: 8px;
  }
  .events-section {
    padding: 50px 0;
  }
  .section-title {
    font-size: 1.8rem;
  }
  .nav-btn {
    width: 40px;
    height: 40px;
    background: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(5px);
  }
  .prev-btn {
    left: 0;
  }
  .next-btn {
    right: 0;
  }
  .card-image-wrapper {
    height: 200px;
  }
  .blog-section {
    padding: 50px 0;
  }
  .blog-grid {
    grid-template-columns: 1fr;
    gap: 25px;
  }

  .video-section {
    padding: 60px 0;
  }
  .video-wrapper {
    border-width: 4px;
  }
  .play-button {
    width: 60px;
    height: 60px;
  }
}
</style>
