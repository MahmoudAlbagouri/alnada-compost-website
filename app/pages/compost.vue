<template>
  <div class="compost-page">
    <!-- Hero Section -->
    <section class="compost-hero">
      <div class="container hero-content animate-on-scroll">
        <h1 class="hero-title">ما هو الكمبوست؟</h1>
        <p class="hero-subtitle">
          بداية الزراعة الناجحة تبدأ من تربة صحية والكمبوست هو الأساس لتحسين
          التربة وزيادة الإنتاج بجودة عالية. تحت ماهو الكمبوست نكتب الجمله دى
          اقوى
        </p>
        <div class="hero-stats">
          <div class="stat-item">
            <span class="stat-number">100%</span>
            <span class="stat-label">عضوي وطبيعي</span>
          </div>
          <div class="stat-item">
            <span class="stat-number">صديق</span>
            <span class="stat-label">للبيئة والتربة</span>
          </div>
          <div class="stat-item">
            <span class="stat-number">اقتصادي</span>
            <span class="stat-label">في التكلفة والعائد</span>
          </div>
        </div>
      </div>
      <div class="wave-bottom">
        <svg viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path
            fill="#e6ede8"
            fill-opacity="1"
            d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>
    </section>

    <!-- What is Compost Section -->
    <section class="what-is-section container">
      <div class="section-header animate-on-scroll">
        <h2 class="section-title">ما هو الكمبوست بالضبط؟</h2>
        <p class="section-subtitle">
          تعريف مبسط لأهم سماد عضوي في الزراعة المستدامة
        </p>
      </div>

      <div class="content-grid">
        <div class="text-content animate-on-scroll">
          <p class="intro-text">
            <strong>الكمبوست</strong> هو سماد عضوي طبيعي ناتج عن تحلل المواد
            العضوية مثل بقايا النباتات، والأوراق الجافة، ومخلفات الطعام، والروث
            الحيواني، عبر عملية بيولوجية تسمى <em>"التسميد"</em>.
          </p>
          <p>
            تُدار هذه العملية بواسطة كائنات دقيقة (بكتيريا، فطريات) ودود الأرض،
            التي تحول المواد العضوية إلى مادة داكنة غنية بالمغذيات تشبه التربة
            السوداء الخصبة، وتُعرف بـ <strong>"الذهب الأسود"</strong> في عالم
            الزراعة.
          </p>

          <div class="key-points">
            <div class="point-item">
              <CheckCircle class="point-icon" :size="20" />
              <span>خالي من المواد الكيميائية الضارة</span>
            </div>
            <div class="point-item">
              <CheckCircle class="point-icon" :size="20" />
              <span>غني بالميكروبات النافعة للتربة</span>
            </div>
            <div class="point-item">
              <CheckCircle class="point-icon" :size="20" />
              <span>يحسن بنية التربة وخصوبتها</span>
            </div>
            <div class="point-item">
              <CheckCircle class="point-icon" :size="20" />
              <span>صديق للبيئة ويساعد في تدوير المخلفات</span>
            </div>
          </div>

          <NuxtLink to="/products" class="btn-primary">
            استكشف منتجات الكمبوست لدينا
          </NuxtLink>
        </div>

        <div class="visual-content animate-on-scroll" style="--delay: 0.2s">
          <div class="process-diagram">
            <div class="process-step">
              <div class="step-icon"><Leaf :size="24" /></div>
              <span class="step-label">مخلفات عضوية</span>
            </div>
            <div class="process-arrow">↓</div>
            <div class="process-step">
              <div class="step-icon"><Recycle :size="24" /></div>
              <span class="step-label">عملية التحلل</span>
            </div>
            <div class="process-arrow">↓</div>
            <div class="process-step highlight">
              <div class="step-icon"><Sprout :size="24" /></div>
              <span class="step-label">كمبوست جاهز</span>
            </div>
          </div>
          <div class="diagram-note">
            <Info :size="16" />
            <span>تستغرق عملية التسميد الطبيعية من 2-6 أشهر حسب الظروف</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Benefits Section -->
    <section class="benefits-section">
      <div class="container">
        <div class="section-header animate-on-scroll">
          <h2 class="section-title">فوائد الكمبوست للتربة والنبات</h2>
          <p class="section-subtitle">
            لماذا يعتبر الكمبوست اختيار المزارعين الأذكياء؟
          </p>
        </div>

        <div class="benefits-grid">
          <div
            v-for="(benefit, index) in benefits"
            :key="index"
            class="benefit-card animate-on-scroll"
            :style="{ '--delay': index * 0.1 + 's' }"
          >
            <div class="benefit-icon">
              <component :is="benefit.icon" :size="32" />
            </div>
            <h3>{{ benefit.title }}</h3>
            <p>{{ benefit.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Types Section -->
    <section class="types-section container">
      <div class="section-header animate-on-scroll">
        <h2 class="section-title">أنواع الكمبوست التي نقدمها</h2>
        <p class="section-subtitle">اختر النوع الأنسب لاحتياجات مزرعتك</p>
      </div>

      <div class="types-grid">
        <!-- Powder Compost -->
        <div class="type-card animate-on-scroll">
          <div class="type-header">
            <div class="type-icon powder">
              <Package :size="40" />
            </div>
            <h3>كمبوست بودر</h3>
            <span class="type-badge">الأكثر مبيعاً</span>
          </div>
          <div class="type-body">
            <p class="type-desc">
              مسحوق ناعم غني بالمغذيات، مثالي للخلط مع التربة قبل الزراعة أو
              كغطاء سطحي.
            </p>
            <ul class="type-features">
              <li><Check :size="16" /> سهل الاستخدام والتوزيع</li>
              <li><Check :size="16" /> يمتص الرطوبة ويحتفظ بها</li>
              <li><Check :size="16" /> مثالي للتربة الرملية</li>
              <li><Check :size="16" /> يطلق المغذيات ببطء</li>
            </ul>
            <NuxtLink to="/products/powder" class="btn-type">
              تفاصيل المنتج
            </NuxtLink>
          </div>
        </div>

        <!-- Liquid Compost -->
        <div class="type-card animate-on-scroll" style="--delay: 0.1s">
          <div class="type-header">
            <div class="type-icon liquid">
              <Droplet :size="40" />
            </div>
            <h3>كمبوست سائل</h3>
            <span class="type-badge">امتصاص فوري</span>
          </div>
          <div class="type-body">
            <p class="type-desc">
              مستخلص سائل مركز من الكمبوست، يُستخدم مع مياه الري أو للرش الورقي
              لامتصاص سريع.
            </p>
            <ul class="type-features">
              <li><Check :size="16" /> امتصاص سريع من الجذور والأوراق</li>
              <li><Check :size="16" /> مثالي للتسميد أثناء النمو</li>
              <li><Check :size="16" /> سهل الخلط مع أنظمة الري</li>
              <li><Check :size="16" /> يعزز مقاومة النبات للإجهاد</li>
            </ul>
            <NuxtLink to="/products/liquid" class="btn-type">
              تفاصيل المنتج
            </NuxtLink>
          </div>
        </div>

        <!-- Gypsum -->
        <div class="type-card animate-on-scroll" style="--delay: 0.2s">
          <div class="type-header">
            <div class="type-icon gypsum">
              <Box :size="40" />
            </div>
            <h3>جبس زراعي</h3>
            <span class="type-badge">لمعالجة الملوحة</span>
          </div>
          <div class="type-body">
            <p class="type-desc">
              جبس طبيعي نقي يُستخدم لتحسين التربة المالحة والقلوية وزيادة
              نفاذيتها للماء.
            </p>
            <ul class="type-features">
              <li><Check :size="16" /> يحل مشكلة ملوحة التربة</li>
              <li><Check :size="16" /> يحسن تهوية التربة الطينية</li>
              <li><Check :size="16" /> يوفر الكالسيوم والكبريت</li>
              <li><Check :size="16" /> يعزز فعالية الأسمدة الأخرى</li>
            </ul>
            <NuxtLink to="/products/gypsum" class="btn-type">
              تفاصيل المنتج
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <!-- How to Use Section -->
    <section class="how-to-section">
      <div class="container">
        <div class="section-header animate-on-scroll">
          <h2 class="section-title">كيفية استخدام الكمبوست</h2>
          <p class="section-subtitle">خطوات بسيطة للحصول على أفضل النتائج</p>
        </div>

        <div class="steps-timeline">
          <div
            v-for="(step, index) in usageSteps"
            :key="index"
            class="step-item animate-on-scroll"
            :style="{ '--delay': index * 0.15 + 's' }"
          >
            <div class="step-number">{{ index + 1 }}</div>
            <div class="step-content">
              <h4>{{ step.title }}</h4>
              <p>{{ step.desc }}</p>
              <div class="step-tip" v-if="step.tip">
                <Lightbulb :size="14" />
                <span>{{ step.tip }}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="usage-note animate-on-scroll">
          <AlertCircle :size="20" />
          <p>
            <strong>ملاحظة هامة:</strong> تختلف جرعات الاستخدام حسب نوع التربة
            والمحصول. يُفضل استشارة خبير زراعي أو التواصل معنا للحصول على توصيات
            مخصصة لمزرعتك.
          </p>
        </div>
      </div>
    </section>

    <!-- FAQ Section (Accordion) - FIXED -->
    <section class="faq-section container">
      <div class="section-header animate-on-scroll">
        <h2 class="section-title">الأسئلة الشائعة</h2>
        <p class="section-subtitle">إجابات على أكثر الاستفسارات شيوعاً</p>
      </div>

      <div class="faq-list">
        <div
          v-for="(faq, index) in faqs"
          :key="index"
          class="faq-item"
          :class="{ 'is-open': openFaq === index }"
        >
          <button class="faq-question" @click="toggleFaq(index)" type="button">
            <span>{{ faq.question }}</span>
            <ChevronDown
              class="faq-icon"
              :class="{ rotated: openFaq === index }"
              :size="20"
            />
          </button>

          <div class="faq-answer">
            <div class="faq-answer-content">
              <p>{{ faq.answer }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="cta-section container animate-on-scroll">
      <div class="cta-content">
        <Leaf :size="48" class="cta-icon" />
        <h2>جاهز لتحويل تربتك إلى تربة خصبة؟</h2>
        <p>ابدأ رحلة الزراعة المستدامة اليوم مع منتجات الندى عالية الجودة</p>
        <div class="cta-buttons">
          <NuxtLink to="/products" class="btn-primary btn-large">
            تصفح المنتجات
          </NuxtLink>
          <NuxtLink to="/contact" class="btn-outline btn-large">
            استشر خبيراً
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import {
  Leaf,
  Recycle,
  Sprout,
  CheckCircle,
  Package,
  Droplet,
  Box,
  Check,
  Info,
  Lightbulb,
  AlertCircle,
  ChevronDown,
  Sprout as Seedling,
  Wheat,
  Droplets,
  Shield,
  Target,
} from "lucide-vue-next";

useHead({
  title: "  ماهو الكمبوست | شركة الندى",
  meta: [
    { name: "description", content: "احصل على أفضل أسعار الأسمدة والكمبوست" },
  ],
});
// فوائد الكمبوست
const benefits = [
  {
    title: "تحسين بنية التربة",
    desc: "يربط حبيبات التربة الرملية ويفكك التربة الطينية، مما يحسن التهوية والصرف والجذور.",
    icon: Seedling,
  },
  {
    title: "زيادة خصوبة التربة",
    desc: "يوفر مغذيات أساسية (نيتروجين، فوسفور، بوتاسيوم) وعناصر نادرة بشكل متوازن ومستدام.",
    icon: Wheat,
  },
  {
    title: "زيادة كفاءة احتفاظ التربة بالمياه",
    desc: "يعمل كمادة عضوية تحسن قدرة التربة على الاحتفاظ بالرطوبة، مما يقلل من احتياج الري ويوفر في استهلاك المياه.",
    icon: Droplets,
  },
  {
    title: "تعزيز مقاومة النبات للأمراض",
    desc: "يدعم الكائنات الحية الدقيقة المفيدة، مما يعزز مناعة النبات ويقلل من الإصابة بالأمراض والآفات بشكل طبيعي.",
    icon: Shield,
  },
  {
    title: "توفير في التكاليف",
    desc: "يقلل الاعتماد على الأسمدة الكيميائية والمبيدات، مما يوفر مالاً على المدى الطويل.",
    icon: Target,
  },
  {
    title: "صديق للبيئة",
    desc: "يساعد في تدوير المخلفات العضوية ويقلل الانبعاثات الكربونية وتلوث المياه الجوفية.",
    icon: Leaf,
  },
];

// خطوات الاستخدام
const usageSteps = [
  {
    title: "تحضير التربة",
    desc: "قم بحراثة التربة وإزالة الأعشاب الضارة والحجارة الكبيرة لضمان سطح ناعم.",
    tip: "يفضل الحراثة عندما تكون التربة رطبة قليلاً لسهولة العمل",
  },
  {
    title: "تحديد الجرعة المناسبة",
    desc: "للتربة الجديدة: 3-5 كجم/م². للتربة المستنزفة: 5-8 كجم/م². للزراعة في أصص: 30% من حجم التربة.",
    tip: "استخدم مقياساً أو دلوًا معيارياً لضبط الجرعات بدقة",
  },
  {
    title: "خلط الكمبوست مع التربة",
    desc: "وزع الكمبوست بشكل متساوٍ واخلطه مع الطبقة العليا من التربة (15-20 سم) باستخدام مجرفة أو محراث.",
    tip: "تجنب الخلط العميق جداً لحماية الكائنات الحية الدقيقة النافعة",
  },
  {
    title: "الري والتثبيت",
    desc: "اروِ التربة جيداً بعد الإضافة لتفعيل عملية التحلل ومساعدة المغذيات على الذوبان والانتشار.",
    tip: "استخدم ريًا خفيفًا ومتكررًا في الأيام الأولى لضمان التشبع الجيد",
  },
  {
    title: "المتابعة والتكرار",
    desc: "كرر إضافة الكمبوست مرتين سنوياً (ربيعاً وخريفاً) للحفاظ على خصوبة التربة على المدى الطويل.",
    tip: "راقب نمو النبات وقم بتعديل الجرعات حسب الحاجة والمحصول",
  },
];

// الأسئلة الشائعة
const faqs = [
  {
    question: "هل الكمبوست آمن للاستخدام مع جميع أنواع النباتات؟",
    answer:
      'نعم، الكمبوست آمن تماماً لجميع أنواع النباتات بما في ذلك الخضروات، الفواكه، الأشجار، والزهور. فهو سماد متوازن لا يسبب "حرق" الجذور مثل بعض الأسمدة الكيميائية.',
  },
  {
    question: "كم مرة يجب إضافة الكمبوست للتربة؟",
    answer:
      "يُفضل إضافة الكمبوست مرتين في السنة: مرة في بداية موسم الربيع قبل الزراعة، ومرة في الخريف بعد الحصاد لتحضير التربة للموسم التالي. في حالة التربة المستنزفة جداً، يمكن الإضافة كل 3 أشهر.",
  },
  {
    question: "ما الفرق بين الكمبوست والأسمدة الكيميائية؟",
    answer:
      "الكمبوست يحسن بنية التربة على المدى الطويل ويغذي الحياة البيولوجية فيها، بينما الأسمدة الكيميائية توفر مغذيات فورية لكنها قد تضر بالتربة مع الاستخدام المتكرر. الأفضل هو الجمع بينهما بنسب مدروسة.",
  },
  {
    question: "هل يمكن صنع الكمبوست في المنزل؟",
    answer:
      'نعم، يمكن صنع كمبوست منزلي بسيط من بقايا الخضار والفواكه وأوراق الشجر. لكن كمبوست "الندى" يتم إنتاجه تحت ظروف مُتحكم بها لضمان النضج الكامل، خلوّه من الممرضات، وتركيزه العالي من المغذيات.',
  },
  {
    question: "كم يستغرق الكمبوست ليظهر تأثيره على النباتات؟",
    answer:
      "يبدأ تأثير الكمبوست في الظهور خلال 2-4 أسابيع من إضافته، لكن التحسن الحقيقي في بنية التربة وخصوبتها يظهر على مدى موسم زراعي كامل (3-6 أشهر). الصبر والمداومة هما المفتاح!",
  },
];

const openFaq = ref(null);

const toggleFaq = (index) => {
  openFaq.value = openFaq.value === index ? null : index;
};

// أنيميشن السكرول
let observer;
const initObserver = () => {
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 },
  );
  setTimeout(() => {
    document
      .querySelectorAll(".animate-on-scroll")
      .forEach((el) => observer.observe(el));
  }, 100);
};

onMounted(() => {
  initObserver();
});
onUnmounted(() => {
  if (observer) observer.disconnect();
});
</script>

<style scoped>
/* --- Hero Section --- */
.compost-hero {
  background: linear-gradient(
    135deg,
    var(--primary-color) 0%,
    var(--accent-color) 100%
  );
  color: var(--white);
  padding: 80px 0 140px;
  text-align: center;
  position: relative;
}
.hero-title {
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 900;
  margin-bottom: 20px;
  line-height: 1.3;
}
.hero-subtitle {
  font-size: clamp(1rem, 2.5vw, 1.3rem);
  opacity: 0.95;
  margin-bottom: 40px;
  max-width: 700px;
  margin-inline: auto;
  line-height: 1.7;
}
.hero-stats {
  display: flex;
  justify-content: center;
  gap: 30px;
  flex-wrap: wrap;
  padding-top: 30px;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
}
.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}
.stat-number {
  font-size: 1.5rem;
  font-weight: 800;
  color: var(--white);
}
.stat-label {
  font-size: 0.9rem;
  opacity: 0.9;
}
.wave-bottom {
  position: absolute;
  bottom: -1px;
  left: 0;
  width: 100%;
  line-height: 0;
}
.wave-bottom svg {
  width: 100%;
  height: 100px;
  display: block;
}

/* --- What is Section --- */
.what-is-section {
  padding: 80px 20px;
}
.section-header {
  text-align: center;
  margin-bottom: 50px;
  max-width: 700px;
  margin-inline: auto;
}
.section-title {
  font-size: clamp(1.8rem, 4vw, 2.5rem);
  font-weight: 900;
  color: var(--primary-color);
  margin-bottom: 15px;
}
.section-subtitle {
  font-size: 1.1rem;
  color: #666;
  line-height: 1.6;
}
.content-grid {
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 50px;
  align-items: center;
}
.text-content .intro-text {
  font-size: 1.15rem;
  line-height: 1.9;
  color: #333;
  margin-bottom: 25px;
}
.text-content p {
  font-size: 1.05rem;
  line-height: 1.8;
  color: #444;
  margin-bottom: 20px;
}
.text-content strong {
  color: var(--primary-color);
  font-weight: 700;
}
.text-content em {
  color: var(--accent-color);
  font-style: normal;
  font-weight: 600;
}
.key-points {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px 25px;
  margin: 30px 0 35px;
}
.point-item {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 1rem;
  color: #444;
  font-weight: 500;
}
.point-icon {
  color: var(--accent-color);
  flex-shrink: 0;
}
.visual-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}
.process-diagram {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  padding: 30px;
  background: var(--white);
  border-radius: 20px;
  box-shadow: var(--shadow-md);
  width: 100%;
  max-width: 350px;
}
.process-step {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 15px 20px;
  border-radius: 12px;
  background: var(--bg-light);
  width: 100%;
  text-align: center;
  transition: all 0.3s;
}
.process-step.highlight {
  background: linear-gradient(
    135deg,
    var(--primary-color),
    var(--accent-color)
  );
  color: var(--white);
}
.step-icon {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: var(--white);
  color: var(--accent-color);
  display: flex;
  align-items: center;
  justify-content: center;
}
.process-step.highlight .step-icon {
  background: rgba(255, 255, 255, 0.2);
  color: var(--white);
}
.step-label {
  font-weight: 600;
  font-size: 0.95rem;
}
.process-arrow {
  font-size: 1.5rem;
  color: var(--accent-color);
  font-weight: bold;
}
.diagram-note {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.9rem;
  color: #666;
  background: #f5f5f5;
  padding: 10px 15px;
  border-radius: 10px;
}

/* --- Benefits Section --- */
.benefits-section {
  background: var(--white);
  padding: 80px 0;
}
.benefits-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 25px;
}
.benefit-card {
  background: var(--bg-light);
  padding: 30px 25px;
  border-radius: 16px;
  text-align: center;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  border: 2px solid transparent;
}
.benefit-card:hover {
  transform: translateY(-8px);
  background: var(--white);
  border-color: var(--accent-color);
  box-shadow: var(--shadow-lg);
}
.benefit-icon {
  width: 70px;
  height: 70px;
  margin: 0 auto 20px;
  background: rgba(78, 124, 50, 0.1);
  color: var(--accent-color);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;
}
.benefit-card:hover .benefit-icon {
  background: var(--accent-color);
  color: var(--white);
  transform: rotate(10deg) scale(1.1);
}
.benefit-card h3 {
  font-size: 1.3rem;
  font-weight: 800;
  color: var(--primary-color);
  margin-bottom: 12px;
}
.benefit-card p {
  font-size: 0.95rem;
  color: #555;
  line-height: 1.7;
}

/* --- Types Section --- */
.types-section {
  padding: 80px 20px;
}
.types-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
}
.type-card {
  background: var(--white);
  border-radius: 20px;
  overflow: hidden;
  box-shadow: var(--shadow-md);
  transition: all 0.4s ease;
  border: 1px solid #eee;
  display: flex;
  flex-direction: column;
}
.type-card:hover {
  transform: translateY(-10px);
  box-shadow: var(--shadow-lg);
  border-color: var(--accent-color);
}
.type-header {
  padding: 25px;
  background: linear-gradient(135deg, var(--bg-light), #f0f5f1);
  text-align: center;
  border-bottom: 1px solid #eee;
}
.type-icon {
  width: 80px;
  height: 80px;
  margin: 0 auto 15px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--white);
}
.type-icon.powder {
  background: linear-gradient(135deg, #8b7355, #a0826d);
}
.type-icon.liquid {
  background: linear-gradient(135deg, #4a90a4, #6ba3b8);
}
.type-icon.gypsum {
  background: linear-gradient(135deg, #d4c5b0, #e8ddd0);
}
.type-header h3 {
  font-size: 1.4rem;
  font-weight: 800;
  color: var(--primary-color);
  margin-bottom: 8px;
}
.type-badge {
  display: inline-block;
  padding: 4px 12px;
  background: var(--accent-color);
  color: var(--white);
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
}
.type-body {
  padding: 25px;
  flex: 1;
  display: flex;
  flex-direction: column;
}
.type-desc {
  font-size: 1rem;
  color: #444;
  line-height: 1.7;
  margin-bottom: 20px;
  flex: 1;
}
.type-features {
  list-style: none;
  padding: 0;
  margin: 0 0 25px 0;
}
.type-features li {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.95rem;
  color: #555;
  margin-bottom: 10px;
}
.type-features li svg {
  color: var(--accent-color);
  flex-shrink: 0;
}
.btn-type {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 12px 24px;
  background: var(--primary-color);
  color: var(--white);
  border-radius: 12px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s;
  font-family: "Cairo", sans-serif;
}
.btn-type:hover {
  background: var(--accent-color);
  transform: translateY(-2px);
}

/* --- How to Use Section --- */
.how-to-section {
  background: var(--white);
  padding: 80px 0;
}
.steps-timeline {
  display: flex;
  flex-direction: column;
  gap: 25px;
  max-width: 800px;
  margin: 0 auto 40px;
  position: relative;
}
.steps-timeline::before {
  content: "";
  position: absolute;
  right: 24px;
  top: 10px;
  bottom: 10px;
  width: 3px;
  background: linear-gradient(
    to bottom,
    var(--accent-color),
    var(--primary-color)
  );
  border-radius: 3px;
}
.step-item {
  display: flex;
  gap: 20px;
  align-items: flex-start;
  position: relative;
  z-index: 1;
}
.step-number {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: var(--primary-color);
  color: var(--white);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.3rem;
  font-weight: 800;
  flex-shrink: 0;
  box-shadow: 0 4px 12px rgba(33, 52, 40, 0.3);
}
.step-content {
  flex: 1;
  background: var(--bg-light);
  padding: 20px 25px;
  border-radius: 16px;
  border-right: 4px solid var(--accent-color);
}
.step-content h4 {
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--primary-color);
  margin-bottom: 10px;
}
.step-content p {
  font-size: 1rem;
  color: #444;
  line-height: 1.7;
  margin-bottom: 12px;
}
.step-tip {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.9rem;
  color: var(--accent-color);
  font-weight: 500;
  background: rgba(78, 124, 50, 0.1);
  padding: 8px 12px;
  border-radius: 8px;
  margin-top: 10px;
}
.usage-note {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 20px 25px;
  background: #fff8e6;
  border: 1px solid #ffeaa7;
  border-radius: 12px;
  color: #856404;
  max-width: 800px;
  margin: 0 auto;
}
.usage-note svg {
  flex-shrink: 0;
  margin-top: 3px;
}
.usage-note p {
  font-size: 0.95rem;
  line-height: 1.6;
  margin: 0;
}

/* --- FAQ Section (FIXED) --- */
.faq-section {
  padding: 80px 20px;
}

.faq-list {
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.faq-item {
  background: #ffffff;
  border-radius: 16px;
  border: 1px solid #eee;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
}

.faq-item:hover {
  border-color: #4e7c32; /* استبدله بـ var(--accent-color) إذا كانت معرفة */
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05);
}

.faq-item.is-open {
  border-color: #4e7c32;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.08);
}

.faq-question {
  width: 100%;
  padding: 22px 25px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: none;
  border: none;
  text-align: right;
  cursor: pointer;
  font-family: "Cairo", sans-serif;
  font-size: 1.1rem;
  font-weight: 700;
  color: #1a202c;
  transition: background 0.2s;
}

.faq-icon {
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  color: #4e7c32;
  flex-shrink: 0;
}

.faq-icon.rotated {
  transform: rotate(180deg);
}

/* الحل السحري لمشكلة الاختفاء: CSS Grid */
.faq-answer {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 0.4s ease-out;
}

.faq-item.is-open .faq-answer {
  grid-template-rows: 1fr;
}

.faq-answer-content {
  overflow: hidden;
  padding: 0 25px;
  opacity: 0;
  transition:
    opacity 0.3s,
    padding 0.4s;
}

.faq-item.is-open .faq-answer-content {
  opacity: 1;
  padding: 0 25px 25px; /* Padding يظهر فقط عند الفتح */
}

.faq-answer p {
  font-size: 1rem;
  color: #4a5568;
  line-height: 1.8;
  padding-top: 15px;
  border-top: 1px dashed #e2e8f0;
  margin: 0;
}
/* --- CTA Section --- */
.cta-section {
  margin: 40px auto 80px;
  background: linear-gradient(
    135deg,
    var(--primary-color),
    var(--accent-color)
  );
  border-radius: 24px;
  padding: 60px 40px;
  text-align: center;
  color: var(--white);
  box-shadow: var(--shadow-lg);
  max-width: 900px;
}
.cta-icon {
  margin-bottom: 25px;
  opacity: 0.95;
}
.cta-content h2 {
  font-size: clamp(1.5rem, 4vw, 2.2rem);
  font-weight: 800;
  margin-bottom: 15px;
}
.cta-content p {
  font-size: 1.15rem;
  opacity: 0.95;
  margin-bottom: 30px;
  max-width: 600px;
  margin-inline: auto;
}
.cta-buttons {
  display: flex;
  justify-content: center;
  gap: 15px;
  flex-wrap: wrap;
}
.btn-large {
  padding: 14px 32px;
  font-size: 1.05rem;
  min-width: 160px;
}
.btn-outline {
  background: transparent;
  border: 2px solid var(--white);
  color: var(--white);
}
.btn-outline:hover {
  background: var(--white);
  color: var(--primary-color);
}

/* --- Animations --- */
.animate-on-scroll {
  opacity: 0;
  transform: translateY(25px);
  transition:
    opacity 0.6s ease-out,
    transform 0.6s ease-out;
  transition-delay: var(--delay, 0s);
}
.animate-on-scroll.is-visible {
  opacity: 1;
  transform: translateY(0);
}

/* --- Responsive Design --- */
@media (max-width: 992px) {
  .content-grid {
    grid-template-columns: 1fr;
    gap: 40px;
  }
  .visual-content {
    order: -1;
  }
  .key-points {
    grid-template-columns: 1fr;
  }
  .steps-timeline::before {
    right: 20px;
  }
  .step-number {
    width: 45px;
    height: 45px;
    font-size: 1.1rem;
  }
}
@media (max-width: 576px) {
  .hero-stats {
    gap: 20px;
  }
  .stat-number {
    font-size: 1.3rem;
  }
  .section-title {
    font-size: 1.8rem;
  }
  .process-diagram {
    padding: 20px;
  }
  .step-item {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
  .steps-timeline::before {
    display: none;
  }
  .step-number {
    margin-bottom: 10px;
  }
  .step-content {
    border-right: none;
    border-top: 4px solid var(--accent-color);
    width: 100%;
  }
  .usage-note {
    flex-direction: column;
    text-align: center;
    align-items: center;
  }
  .cta-buttons {
    flex-direction: column;
    align-items: center;
  }
  .btn-large {
    width: 100%;
    max-width: 280px;
  }
  .faq-question {
    font-size: 1rem;
    padding: 18px 20px;
  }
  .faq-answer p {
    font-size: 0.95rem;
  }
}
</style>
