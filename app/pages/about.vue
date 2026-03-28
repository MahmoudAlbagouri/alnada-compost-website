<template>
  <div class="about-page">
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="container hero-container">
        <div class="hero-content animate-on-scroll">
          <h1 class="hero-title">من نحن</h1>
          <p class="hero-subtitle">
            نحن في <span class="highlight">الندى</span> نصنع الفرق في كل فدان.
            بخبرة عملية ومنتجات عضوية موثوقة، نساعدك على تحسين التربة وزيادة
            الإنتاج لتحقيق أعلى عائد من أرضك.
          </p>
          <NuxtLink to="/products" class="btn-primary hero-btn">
            اكتشف منتجاتنا
          </NuxtLink>
        </div>
        <div class="hero-image-wrapper animate-on-scroll" style="--delay: 0.2s">
          <!-- صورة تعبيرية عن الزراعة أو السماد -->
          <div class="image-card">
            <NuxtImg
              src="/images/event1.png"
              alt="زراعة مستدامة"
              width="600"
              height="400"
              class="hero-img"
              placeholder
            />
            <div class="image-overlay"></div>
          </div>
        </div>
      </div>

      <!-- عنصر زخرفي سفلي (موجة) -->
      <div class="wave-divider">
        <svg viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path
            fill="#e6ede8"
            fill-opacity="1"
            d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>
    </section>

    <!-- Story Section -->
    <section class="story-section container">
      <div class="story-grid">
        <div class="story-text animate-on-scroll">
          <h2 class="section-title">قصتنا ورؤيتنا</h2>
          <p class="story-desc">
            بدأنا رحلتنا بشغف بسيط: الحفاظ على تربتنا الخصبة. أدركنا أن التحدي
            البيئي الأكبر يكمن في إدارة المخلفات الزراعية، لذا قررنا ابتكار حلول
            ذكية تحول هذه المخلفات إلى <strong>كمبوست عالي الجودة</strong>.
          </p>
          <p class="story-desc">
            نحن لا نبيع مجرد أسمدة؛ نحن نقدم حلاً متكاملاً للمزارعين ومحبّي
            الطبيعة لضمان غلة أفضل وتربة أكثر صحة للأجيال القادمة.
          </p>

          <div class="stats-row">
            <div class="stat-item">
              <span class="stat-number">+500</span>
              <span class="stat-label">مزارع سعيدة</span>
            </div>
            <div class="stat-item">
              <span class="stat-number">100%</span>
              <span class="stat-label">عضوي وطبيعي</span>
            </div>
          </div>
        </div>
        <div class="story-visual animate-on-scroll" style="--delay: 0.2s">
          <div class="visual-card">
            <NuxtImg
              src="/images/event4.png"
              alt="عملية إنتاج الكمبوست"
              width="500"
              height="500"
              class="visual-img"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Why Us Section (Features) -->
    <section class="features-section">
      <div class="container">
        <div class="section-header animate-on-scroll">
          <h2 class="section-title">لماذا تختار الندى؟</h2>
          <p class="section-subtitle">نجمع بين العلم والطبيعة لنقدم الأفضل</p>
        </div>

        <div class="features-grid">
          <div
            v-for="(feature, index) in features"
            :key="index"
            class="feature-card animate-on-scroll"
            :style="{ '--delay': index * 0.1 + 's' }"
          >
            <div class="icon-box">
              <component :is="feature.icon" :size="32" />
            </div>
            <h3>{{ feature.title }}</h3>
            <p>{{ feature.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="cta-section container animate-on-scroll">
      <div class="cta-content">
        <h2>جاهز لتحسين جودة محاصيلك؟</h2>
        <p>انضم إلى مئات المزارعين الذين وثقوا في حلول الندى الزراعية.</p>
        <NuxtLink to="/contact" class="btn-primary btn-large"
          >تواصل معنا الآن</NuxtLink
        >
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import {
  Leaf,
  Droplets,
  Recycle,
  Award,
  Sprout,
  ShieldCheck,
} from "lucide-vue-next";
useHead({
  title: "   عن الشركة | شركة الندى",
  meta: [
    { name: "description", content: "احصل على أفضل أسعار الأسمدة والكمبوست" },
  ],
});
// بيانات المزايا
const features = [
  {
    title: "صديق للبيئة",
    desc: "منتجاتنا قابلة للتحلل بالكامل وتساهم في تقليل الانبعاثات الكربونية.",
    icon: Leaf,
  },
  {
    title: "جودة عالية",
    desc: "نخضع منتجاتنا لاختبارات دقيقة لضمان أعلى معايير الجودة الزراعية.",
    icon: Award,
  },
  {
    title: "استدامة الموارد",
    desc: "نعيد تدوير المخلفات العضوية لتحويلها إلى موارد قيمة للتربة.",
    icon: Recycle,
  },
  {
    title: "تحسين التربة",
    desc: "يعزز خصوبة التربة ويحتفظ بالرطوبة لفترات أطول.",
    icon: Droplets,
  },
  {
    title: "نمو أسرع",
    desc: "يوفر العناصر الغذائية الأساسية لنمو صحي وسريع للنباتات.",
    icon: Sprout,
  },
  {
    title: "آمن تماماً",
    desc: "خالٍ من المواد الكيميائية الضارة، آمن للإنسان والحيوان.",
    icon: ShieldCheck,
  },
];

// منطق الأنيميشن عند السكرول
onMounted(() => {
  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target); // تشغيل الأنيميشن مرة واحدة فقط
      }
    });
  }, observerOptions);

  const elements = document.querySelectorAll(".animate-on-scroll");
  elements.forEach((el) => observer.observe(el));
});
</script>

<style scoped>
/* استخدام المتغيرات العامة من main.css */
.about-page {
  overflow-x: hidden;
}

/* --- Hero Section --- */
.hero-section {
  position: relative;
  background: linear-gradient(135deg, var(--bg-light) 0%, #dcefe4 100%);
  padding-top: 60px;
  padding-bottom: 100px; /* مساحة للموجة السفلية */
  min-height: 80vh;
  display: flex;
  align-items: center;
}

.hero-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  align-items: center;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 900;
  color: var(--primary-color);
  margin-bottom: 20px;
  line-height: 1.2;
}

.hero-subtitle {
  font-size: 1.2rem;
  color: #555;
  margin-bottom: 30px;
  max-width: 500px;
  line-height: 1.8;
}

.highlight {
  color: var(--accent-color);
  font-weight: 800;
}

.hero-btn {
  display: inline-block;
  padding: 14px 32px;
  font-size: 1.1rem;
}

.image-card {
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: var(--shadow-lg);
  transform: rotate(2deg);
  transition: transform 0.5s ease;
}

.image-card:hover {
  transform: rotate(0deg) scale(1.02);
}

.hero-img {
  width: 100%;
  height: auto;
  display: block;
  object-fit: cover;
}

/* الموجة الفاصلة */
.wave-divider {
  position: absolute;
  bottom: -1px;
  left: 0;
  width: 100%;
  line-height: 0;
  z-index: 2;
}

.wave-divider svg {
  width: 100%;
  height: 80px;
}

/* --- Story Section --- */
.story-section {
  padding: 80px 20px;
}

.story-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: center;
}

.section-title {
  font-size: 2.5rem;
  color: var(--primary-color);
  margin-bottom: 25px;
  font-weight: 800;
  position: relative;
  display: inline-block;
}

.section-title::after {
  content: "";
  position: absolute;
  bottom: -10px;
  right: 0;
  width: 60px;
  height: 4px;
  background-color: var(--accent-color);
  border-radius: 2px;
}

.story-desc {
  font-size: 1.1rem;
  color: #444;
  margin-bottom: 20px;
  line-height: 1.8;
}

.stats-row {
  display: flex;
  gap: 40px;
  margin-top: 40px;
  padding-top: 30px;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
}

.stat-item {
  display: flex;
  flex-direction: column;
}

.stat-number {
  font-size: 2.5rem;
  font-weight: 900;
  color: var(--accent-color);
}

.stat-label {
  font-size: 1rem;
  color: #666;
  font-weight: 600;
}

.visual-card {
  position: relative;
}

.visual-img {
  border-radius: 20px;
  box-shadow: var(--shadow-md);
  width: 100%;
}

/* --- Features Section --- */
.features-section {
  background-color: #fff;
  padding: 100px 0;
  margin-top: 50px;
}

.section-header {
  text-align: center;
  margin-bottom: 60px;
}

.section-subtitle {
  color: #777;
  font-size: 1.2rem;
  margin-top: 10px;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
}

.feature-card {
  background: var(--bg-light);
  padding: 40px 30px;
  border-radius: 16px;
  text-align: center;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid transparent;
}

.feature-card:hover {
  transform: translateY(-10px);
  background: #fff;
  box-shadow: var(--shadow-lg);
  border-color: rgba(78, 124, 50, 0.1);
}

.icon-box {
  width: 70px;
  height: 70px;
  background: rgba(78, 124, 50, 0.1);
  color: var(--accent-color);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 25px;
  transition: all 0.3s ease;
}

.feature-card:hover .icon-box {
  background: var(--accent-color);
  color: #fff;
  transform: rotate(10deg);
}

.feature-card h3 {
  font-size: 1.4rem;
  color: var(--primary-color);
  margin-bottom: 15px;
  font-weight: 700;
}

.feature-card p {
  color: #666;
  line-height: 1.7;
  font-size: 0.95rem;
}

/* --- CTA Section --- */
.cta-section {
  margin: 80px auto 100px;
  background: linear-gradient(135deg, var(--primary-color), #1a2a20);
  border-radius: 24px;
  padding: 60px 40px;
  text-align: center;
  color: #fff;
  box-shadow: var(--shadow-lg);
  position: relative;
  overflow: hidden;
}

.cta-content h2 {
  font-size: 2.5rem;
  margin-bottom: 15px;
}

.cta-content p {
  font-size: 1.2rem;
  opacity: 0.9;
  margin-bottom: 30px;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.btn-large {
  background-color: var(--accent-color);
  color: #fff;
  padding: 16px 40px;
  font-size: 1.2rem;
  border-radius: 50px;
  transition: all 0.3s ease;
  display: inline-block;
}

.btn-large:hover {
  background-color: #fff;
  color: var(--primary-color);
  transform: translateY(-3px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}

/* --- Animations Classes --- */
.animate-on-scroll {
  opacity: 0;
  transform: translateY(40px);
  transition:
    opacity 0.8s ease-out,
    transform 0.8s ease-out;
  transition-delay: var(--delay, 0s);
}

.animate-on-scroll.is-visible {
  opacity: 1;
  transform: translateY(0);
}

/* --- Responsive Design --- */
@media (max-width: 992px) {
  .hero-container,
  .story-grid {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 40px;
  }

  .hero-title {
    font-size: 2.8rem;
  }

  .section-title::after {
    right: 50%;
    transform: translateX(50%);
  }

  .stats-row {
    justify-content: center;
  }

  .image-card {
    transform: rotate(0);
    max-width: 500px;
    margin: 0 auto;
  }

  .hero-section {
    padding-top: 40px;
  }
}

@media (max-width: 576px) {
  .hero-title {
    font-size: 2.2rem;
  }

  .section-title {
    font-size: 2rem;
  }

  .cta-content h2 {
    font-size: 1.8rem;
  }

  .stats-row {
    flex-direction: column;
    gap: 20px;
  }

  .features-grid {
    grid-template-columns: 1fr;
  }
}
</style>
