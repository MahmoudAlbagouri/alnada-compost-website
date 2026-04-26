<template>
  <article class="blog-post-page">
    <!-- Hero Section with Featured Image -->
    <section class="post-hero">
      <div class="hero-image-wrapper">
        <!-- 
          تم تحديث مسار الصورة ليطابق المجلد الموجود في صورتك:
          public/images/blog/
          
          ملاحظة: يرجى التأكد من أن اسم الملف التالي موجود في مجلدك.
          لقد استخدمت اسمًا وصفيًا، قم بتغييره ليطابق أحد أسماء الملفات الطويلة التي لديك 
          مثل: 56b0f599-47e3-4ee4-bd00-d36d7715de2d.jfif
        -->
        <NuxtImg
          src="/images/blog/compost-product.jpg"
          :alt="post?.title"
          class="hero-img"
          width="1200"
          height="600"
          placeholder
        />
        <div class="hero-overlay"></div>
      </div>

      <div class="container hero-content animate-on-scroll">
        <!-- Breadcrumb -->
        <nav class="breadcrumb" aria-label="Breadcrumb">
          <NuxtLink to="/" class="breadcrumb-item">الرئيسية</NuxtLink>
          <span class="breadcrumb-separator">/</span>
          <NuxtLink to="/blog" class="breadcrumb-item">المدونة</NuxtLink>
          <span class="breadcrumb-separator">/</span>
          <span class="breadcrumb-current">{{ post?.title }}</span>
        </nav>

        <!-- Post Meta -->
        <div class="post-meta">
          <span
            class="meta-category"
            :style="{ backgroundColor: categoryColor }"
          >
            {{ post?.categoryName }}
          </span>
          <div class="meta-info">
            <span class="meta-item"
              ><Calendar :size="14" /> {{ post?.date }}</span
            >
            <span class="meta-item"
              ><Clock :size="14" /> {{ post?.readTime }}</span
            >
            <span class="meta-item"
              ><User :size="14" /> فريق الندى الزراعي</span
            >
          </div>
        </div>

        <!-- Post Title -->
        <h1 class="post-title">{{ post?.title }}</h1>
        <p class="post-excerpt">{{ post?.excerpt }}</p>

        <!-- Share Buttons -->
        <div class="share-buttons">
          <span class="share-label">شارك المقال:</span>
          <div class="share-icons">
            <a
              :href="`https://twitter.com/intent/tweet?text=${encodeURIComponent(post?.title)}&url=${encodeURIComponent(currentUrl)}`"
              target="_blank"
              class="share-icon twitter"
              aria-label="Twitter"
            >
              <Twitter :size="16" />
            </a>
            <a
              :href="`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`"
              target="_blank"
              class="share-icon facebook"
              aria-label="Facebook"
            >
              <Facebook :size="16" />
            </a>
            <a
              :href="`https://wa.me/?text=${encodeURIComponent(post?.title + ' ' + currentUrl)}`"
              target="_blank"
              class="share-icon whatsapp"
              aria-label="WhatsApp"
            >
              <MessageCircle :size="16" />
            </a>
            <button
              @click="copyLink"
              class="share-icon copy"
              aria-label="نسخ الرابط"
            >
              <Link :size="16" />
            </button>
          </div>
        </div>
      </div>

      <!-- Wave Divider -->
      <div class="wave-bottom">
        <svg viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path
            fill="#ffffff"
            fill-opacity="1"
            d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>
    </section>

    <!-- Main Content -->
    <main class="post-container container">
      <!-- Article Content -->
      <div class="content-wrapper">
        <div
          class="post-content animate-on-scroll"
          v-html="formattedContent"
        ></div>

        <!-- Author Box -->
        <div class="author-box animate-on-scroll">
          <div class="author-avatar">
            <!-- شعار الشركة أو صورة الكاتب -->
            <div
              style="
                width: 80px;
                height: 80px;
                background: #4e7c32;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
                font-weight: bold;
                font-size: 24px;
              "
            >
              ن
            </div>
          </div>
          <div class="author-info">
            <h4 class="author-name">فريق الندى الزراعي</h4>
            <p class="author-role">خبراء الأسمدة العضوية والكمبوست</p>
            <p class="author-bio">
              نحن في شركة الندى للاسمدة العضوية نقدم أفضل الحلول الزراعية لتحسين
              التربة وزيادة الإنتاجية بخبرة تمتد لسنوات في السوق المصري.
            </p>
            <div class="author-social">
              <a href="#" aria-label="Facebook"><Facebook :size="18" /></a>
              <a href="#" aria-label="WhatsApp"><MessageCircle :size="18" /></a>
            </div>
          </div>
        </div>

        <!-- Navigation Between Posts -->
        <div class="post-navigation animate-on-scroll">
          <NuxtLink
            v-if="prevPost"
            :to="`/blog/${prevPost.slug}`"
            class="nav-link prev"
          >
            <ChevronRight :size="20" />
            <div class="nav-info">
              <span class="nav-label">المقال السابق</span>
              <span class="nav-title">{{ prevPost.title }}</span>
            </div>
          </NuxtLink>

          <NuxtLink
            v-if="nextPost"
            :to="`/blog/${nextPost.slug}`"
            class="nav-link next"
          >
            <div class="nav-info">
              <span class="nav-label">المقال التالي</span>
              <span class="nav-title">{{ nextPost.title }}</span>
            </div>
            <ChevronLeft :size="20" />
          </NuxtLink>
        </div>
      </div>

      <!-- Sidebar -->
      <aside class="sidebar">
        <!-- Table of Contents (Sticky) -->
        <div class="toc-widget sticky-widget animate-on-scroll">
          <h4 class="widget-title">محتوى المقال</h4>
          <nav class="toc-list">
            <a
              v-for="(heading, index) in headings"
              :key="index"
              :href="`#heading-${index}`"
              class="toc-link"
              :class="{ active: activeHeading === index }"
            >
              {{ heading }}
            </a>
          </nav>
        </div>

        <!-- Related Posts -->
        <div class="related-posts-widget animate-on-scroll">
          <h4 class="widget-title">مقالات ذات صلة</h4>
          <div class="related-posts-list">
            <NuxtLink
              v-for="related in relatedPosts"
              :key="related.id"
              :to="`/blog/${related.slug}`"
              class="related-post-card"
            >
              <NuxtImg
                :src="related.image"
                :alt="related.title"
                width="80"
                height="60"
                class="related-img"
              />
              <div class="related-info">
                <h5 class="related-title">{{ related.title }}</h5>
                <span class="related-date"
                  ><Clock :size="12" /> {{ related.readTime }}</span
                >
              </div>
            </NuxtLink>
          </div>
        </div>

        <!-- Newsletter CTA -->
        <div class="newsletter-widget animate-on-scroll">
          <div class="newsletter-content">
            <Leaf :size="32" class="newsletter-icon" />
            <h4>تواصل معنا</h4>
            <p>احصل على استشارة مجانية لاختيار السماد المناسب لأرضك</p>
            <NuxtLink
              to="/contact"
              class="btn-subscribe"
              style="display: block; text-align: center; text-decoration: none"
            >
              تواصل الآن
            </NuxtLink>
          </div>
        </div>
      </aside>
    </main>
  </article>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useRoute } from "vue-router";
import {
  Calendar,
  Clock,
  User,
  Twitter,
  Facebook,
  MessageCircle,
  Link,
  ChevronRight,
  ChevronLeft,
  Leaf,
} from "lucide-vue-next";

const route = useRoute();
const currentUrl = ref("");

// --- بيانات المقال (تم تحديثها بالمقالة المطلوبة والصورة من مسارك) ---
const post = ref({
  id: 101,
  title: "الكمبوست البودر: الحل الذكي لزيادة خصوبة التربة وتحسين الإنتاج",
  excerpt:
    "في ظل التحديات التي تواجه الزراعة الحديثة، تعرف على كيف يعتبر الكمبوست البودر حلاً طبيعياً وآمناً لرفع كفاءة التربة وزيادة الإنتاج بأفضل جودة.",

  // تم تحويل المقالة إلى HTML لتناسب العرض في v-html
  content: `
    <p>في ظل التحديات اللي بتواجه الزراعة الحديثة، بقى من الضروري الاعتماد على حلول طبيعية وآمنة ترفع كفاءة التربة وتزود الإنتاج. وهنا بييجي دور <strong>الكمبوست البودر</strong> كواحد من أهم الأسمدة العضوية اللي أثبتت فعالية كبيرة في تحسين جودة الأراضي الزراعية.</p>

    <hr style="border: 0; border-top: 1px solid #eee; margin: 30px 0;">

    <h2 id="heading-0">✅ ما هو الكمبوست البودر؟</h2>
    <p>الكمبوست البودر هو سماد عضوي طبيعي ناتج عن تحلل المخلفات النباتية والحيوانية بطريقة علمية مدروسة، لحد ما يتحول لمادة غنية بالعناصر الغذائية في صورة بودرة سهلة الاستخدام وسريعة الامتصاص.</p>

    <h2 id="heading-1">🌿 فوائد الكمبوست البودر</h2>
    
    <h3>1. تحسين خواص التربة</h3>
    <p>يساعد في تفكيك التربة الثقيلة وتحسين التهوية، وده بيساعد الجذور تنمو بشكل أفضل.</p>

    <h3>2. زيادة خصوبة الأرض</h3>
    <p>بيمد التربة بالعناصر الأساسية زي:</p>
    <ul>
        <li>النيتروجين</li>
        <li>الفوسفور</li>
        <li>البوتاسيوم</li>
    </ul>
    <p>وده بيحسن نمو النبات بشكل طبيعي.</p>

    <h3>3. رفع كفاءة الاحتفاظ بالمياه</h3>
    <p>الكمبوست بيخلي التربة تحتفظ بالمياه لفترة أطول، وده مهم جداً خصوصًا في الأراضي الرملية.</p>

    <h3>4. تنشيط الكائنات الحية الدقيقة</h3>
    <p>بيساعد في زيادة النشاط الحيوي داخل التربة، وده بيحسن امتصاص العناصر الغذائية.</p>

    <h3>5. تحسين جودة المحصول</h3>
    <p>استخدامه بشكل منتظم بيؤدي إلى:</p>
    <ul>
        <li>زيادة الإنتاج</li>
        <li>تحسين حجم الثمار</li>
        <li>رفع جودة المنتج النهائي</li>
    </ul>

    <h2 id="heading-2">🌾 استخدامات الكمبوست البودر</h2>
    <p>الكمبوست البودر مناسب لمجموعة كبيرة من الزراعات، منها:</p>
    <ul>
        <li><strong>المحاصيل الحقلية:</strong> (قمح – ذرة)</li>
        <li><strong>الخضروات:</strong> (بطاطس – طماطم – بصل)</li>
        <li><strong>الفاكهة:</strong> (موالح – مانجو)</li>
        <li><strong>النباتات الزينة</strong></li>
    </ul>

    <h2 id="heading-3">⚙️ طريقة الاستخدام</h2>
    <ul>
        <li>يتم إضافته أثناء تجهيز الأرض قبل الزراعة.</li>
        <li>أو أثناء الخدمة مع الري.</li>
        <li>يمكن خلطه مع التربة مباشرة حول الجذور.</li>
    </ul>
    <blockquote>
        📌 الجرعة تختلف حسب نوع المحصول وحالة التربة.
    </blockquote>

    <h2 id="heading-4">💡 لماذا تختار الكمبوست البودر؟</h2>
    <ul>
        <li>حل طبيعي وآمن 100%</li>
        <li>بديل فعال للأسمدة الكيماوية</li>
        <li>يحسن التربة على المدى الطويل</li>
        <li>مناسب لجميع أنواع الأراضي</li>
    </ul>

    <div style="background-color: #f0fdf4; padding: 20px; border-right: 4px solid #4e7c32; border-radius: 8px; margin: 30px 0;">
        <h3 style="margin-top:0; color: #4e7c32;">🌟 نصيحة مهمة</h3>
        <p style="margin-bottom:0;">لأفضل نتيجة، يُفضل استخدام الكمبوست البودر ضمن برنامج تسميد متكامل، مع متابعة حالة التربة بشكل دوري.</p>
    </div>

    <h2 id="heading-5">📞 تواصل معنا</h2>
    <p>نحن في <strong>الندى للاسمده العضويه</strong> بنقدملك أفضل جودة من الكمبوست البودر، بخبرة حقيقية في السوق الزراعي، وحلول تناسب أرضك ومحصولك.</p>
    <p>📱 <strong>تواصل معنا الآن للحصول على استشارة مجانية واختيار المنتج المناسب لمزرعتك.</strong></p>
  `,

  // هنا نضع مسار الصورة بناءً على المجلد الذي أرسلته
  // يرجى تغيير 'compost-product.jpg' إلى الاسم الحقيقي لأحد الملفات الموجودة في المجلد
  // مثال: image: "/images/blog/56b0f599-47e3-4ee4-bd00-d36d7715de2d.jfif",
  image: "/images/blog/compost-product.jpg",

  slug: "compost-powder-benefits",
  category: "products",
  categoryName: "منتجاتنا",
  date: "26 أبريل 2026",
  readTime: "4 دقائق قراءة",
  author: "شركة الندى",
  tags: ["كمبوست", "سماد عضوي", "خصوبة التربة", "زراعة"],
});

// ألوان التصنيفات
const categoryColors = {
  products: "#4e7c32",
  soil: "#213428",
  farming: "#6b9a4a",
  news: "#8b7c32",
};
const categoryColor = computed(
  () => categoryColors[post.value?.category] || "#4e7c32",
);

// استخراج العناوين من المحتوى لجدول المحتويات
const headings = computed(() => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(post.value?.content || "", "text/html");
  const h2Elements = doc.querySelectorAll("h2");
  return Array.from(h2Elements).map((h2) =>
    h2.textContent.replace(/^[^\w\u0600-\u06FF]+/, ""),
  );
});

// تنسيق المحتوى وإضافة معرفات للعناوين
const formattedContent = computed(() => {
  if (!post.value?.content) return "";
  let content = post.value.content;
  headings.value.forEach((heading, index) => {
    const escapedHeading = heading.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    content = content.replace(
      new RegExp(`<h2>(\\s*)${escapedHeading}(\\s*)</h2>`, "g"),
      `<h2 id="heading-${index}">$1${heading}$2</h2>`,
    );
  });
  return content;
});

// مقالات سابقة وتالية (محاكاة)
const prevPost = ref({
  slug: "organic-fertilizer-guide",
  title: "دليلك الشامل للأسمدة العضوية",
});
const nextPost = ref({
  slug: "soil-salinity-treatment",
  title: "كيف تعالج ملوحة التربة بطرق طبيعية؟",
});

// مقالات ذات صلة
const relatedPosts = ref([
  {
    id: 2,
    title: "أهمية التسميد العضوي للحمضيات",
    excerpt: "تعرف على أفضل البرامج التسميدية لأشجار الموالح...",
    image: "/images/blog/77296426-e56f-45c3-a002-d9c438cc3e10.jfif",
    slug: "organic-citrus-fertilizer",
    readTime: "5 دقائق",
  },
  {
    id: 3,
    title: "الفرق بين الكمبوست والأسمدة الكيماوية",
    excerpt: "مقارنة شاملة من حيث التكلفة والعائد على المدى الطويل...",
    image: "/images/blog/a953d36b-7ff4-46d3-a910-aaba5709d645.jfif",
    slug: "compost-vs-chemical",
    readTime: "6 دقائق",
  },
  {
    id: 4,
    title: "تحسين إنتاجية القمح هذا الموسم",
    excerpt: "نصائح ذهبية لمزارعي القمح لزيادة المحصول...",
    image: "/images/blog/f0ef03dd-f4ea-4278-bd31-8ab806ea6d3e.jfif",
    slug: "wheat-productivity-tips",
    readTime: "4 دقائق",
  },
]);

// نسخ رابط المقال
const copyLink = async () => {
  try {
    await navigator.clipboard.writeText(currentUrl.value);
    alert("تم نسخ رابط المقال بنجاح!");
  } catch {
    alert("تعذر نسخ الرابط، يرجى نسخه يدوياً");
  }
};

// تتبع العناوين النشطة أثناء السكرول
const activeHeading = ref(-1);
const handleScroll = () => {
  headings.value.forEach((_, index) => {
    const element = document.getElementById(`heading-${index}`);
    if (element) {
      const rect = element.getBoundingClientRect();
      if (rect.top <= 150 && rect.bottom >= 150) {
        activeHeading.value = index;
      }
    }
  });
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
  currentUrl.value = window.location.href;
  initObserver();
  window.addEventListener("scroll", handleScroll);
});
onUnmounted(() => {
  if (observer) observer.disconnect();
  window.removeEventListener("scroll", handleScroll);
});
</script>

<style scoped>
/* --- نفس الـ Styles الموجودة في الملف الأصلي تماماً لضمان التناسق --- */

/* --- Hero Section --- */
.post-hero {
  position: relative;
  background: linear-gradient(
    135deg,
    var(--primary-color) 0%,
    var(--accent-color) 100%
  );
  color: var(--white);
  padding-bottom: 80px;
}

.hero-image-wrapper {
  position: absolute;
  inset: 0;
  overflow: hidden;
  z-index: 1;
}

.hero-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.4;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    rgba(33, 52, 40, 0.7),
    rgba(33, 52, 40, 0.9)
  );
}

.hero-content {
  position: relative;
  z-index: 2;
  padding-top: 80px;
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
}

/* Breadcrumb */
.breadcrumb {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-bottom: 25px;
  font-size: 0.9rem;
  flex-wrap: wrap;
}

.breadcrumb-item,
.breadcrumb-current {
  color: rgba(255, 255, 255, 0.9);
  text-decoration: none;
  transition: color 0.2s;
}

.breadcrumb-item:hover {
  color: var(--white);
  text-decoration: underline;
}

.breadcrumb-separator {
  color: rgba(255, 255, 255, 0.5);
}

.breadcrumb-current {
  color: var(--white);
  font-weight: 600;
}

/* Post Meta */
.post-meta {
  margin-bottom: 25px;
}

.meta-category {
  display: inline-block;
  padding: 6px 16px;
  border-radius: 50px;
  color: var(--white);
  font-size: 0.85rem;
  font-weight: 600;
  margin-bottom: 15px;
}

.meta-info {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
  font-size: 0.9rem;
  opacity: 0.95;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 6px;
}

/* Post Title */
.post-title {
  font-size: clamp(1.8rem, 4vw, 2.8rem);
  font-weight: 900;
  margin-bottom: 20px;
  line-height: 1.4;
}

.post-excerpt {
  font-size: 1.15rem;
  opacity: 0.95;
  margin-bottom: 30px;
  line-height: 1.7;
  max-width: 700px;
  margin-inline: auto;
}

/* Share Buttons */
.share-buttons {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
  flex-wrap: wrap;
  padding-top: 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
}

.share-label {
  font-size: 0.9rem;
  opacity: 0.9;
}

.share-icons {
  display: flex;
  gap: 10px;
}

.share-icon {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--white);
  transition: all 0.3s ease;
  text-decoration: none;
  background: rgba(255, 255, 255, 0.15);
  border: none;
  cursor: pointer;
}

.share-icon:hover {
  transform: translateY(-3px);
  background: var(--white);
}

.share-icon.twitter:hover {
  color: #1da1f2;
}
.share-icon.facebook:hover {
  color: #1877f2;
}
.share-icon.whatsapp:hover {
  color: #25d366;
}
.share-icon.copy:hover {
  color: var(--primary-color);
}

/* Wave Divider */
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

/* --- Main Layout --- */
.post-container {
  display: grid;
  grid-template-columns: 1fr 320px;
  gap: 50px;
  padding: 40px 20px 80px;
  align-items: start;
  max-width: 1200px;
  margin: 0 auto;
}

.content-wrapper {
  max-width: 800px;
  margin: 0 auto;
}

/* --- Post Content Styling --- */
.post-content {
  background: var(--white);
  padding: 40px;
  border-radius: 20px;
  box-shadow: var(--shadow-md);
  margin-bottom: 40px;
  font-size: 1.05rem;
  line-height: 1.9;
  color: #333;
}

.post-content :deep(p) {
  margin-bottom: 20px;
}

.post-content :deep(h2) {
  font-size: 1.6rem;
  font-weight: 800;
  color: var(--primary-color);
  margin: 40px 0 20px;
  padding-top: 20px;
  border-top: 3px solid var(--accent-color);
  scroll-margin-top: 100px;
}

.post-content :deep(h3) {
  font-size: 1.3rem;
  font-weight: 700;
  color: var(--primary-color);
  margin: 30px 0 15px;
}

.post-content :deep(ul),
.post-content :deep(ol) {
  margin: 20px 0;
  padding-right: 25px;
}

.post-content :deep(li) {
  margin-bottom: 10px;
  line-height: 1.8;
}

.post-content :deep(strong) {
  color: var(--primary-color);
  font-weight: 700;
}

.post-content :deep(blockquote) {
  margin: 30px 0;
  padding: 20px 25px;
  background: var(--bg-light);
  border-right: 4px solid var(--accent-color);
  border-radius: 0 12px 12px 0;
  font-style: italic;
  color: #555;
  font-size: 1.1rem;
}

.post-content :deep(img) {
  max-width: 100%;
  border-radius: 12px;
  margin: 25px 0;
  box-shadow: var(--shadow-sm);
}

/* Author Box */
.author-box {
  display: flex;
  gap: 25px;
  padding: 30px;
  background: var(--bg-light);
  border-radius: 16px;
  margin-bottom: 40px;
  align-items: center;
}

.author-avatar {
  flex-shrink: 0;
}

.avatar-img {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid var(--white);
  box-shadow: var(--shadow-sm);
}

.author-info {
  flex: 1;
}

.author-name {
  font-size: 1.3rem;
  font-weight: 800;
  color: var(--primary-color);
  margin-bottom: 4px;
}

.author-role {
  font-size: 0.9rem;
  color: var(--accent-color);
  font-weight: 600;
  margin-bottom: 12px;
}

.author-bio {
  font-size: 0.95rem;
  color: #555;
  line-height: 1.7;
  margin-bottom: 15px;
}

.author-social {
  display: flex;
  gap: 12px;
}

.author-social a {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: var(--white);
  color: var(--primary-color);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.author-social a:hover {
  background: var(--accent-color);
  color: var(--white);
  transform: translateY(-2px);
}

/* Post Navigation */
.post-navigation {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  padding: 30px;
  background: var(--white);
  border-radius: 16px;
  box-shadow: var(--shadow-sm);
  margin-bottom: 60px;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 15px;
  border-radius: 12px;
  transition: all 0.3s;
  text-decoration: none;
  color: inherit;
}

.nav-link.prev {
  justify-content: flex-start;
  text-align: right;
}
.nav-link.next {
  justify-content: flex-end;
  text-align: left;
  flex-direction: row-reverse;
}

.nav-link:hover {
  background: var(--bg-light);
  transform: translateY(-3px);
}

.nav-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.nav-label {
  font-size: 0.8rem;
  color: #888;
  font-weight: 500;
}

.nav-title {
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--primary-color);
  line-height: 1.4;
}

/* --- Sidebar --- */
.sidebar {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.sticky-widget {
  /* position: sticky; */
  top: 100px;
}

.widget-title {
  font-size: 1.2rem;
  font-weight: 800;
  color: var(--primary-color);
  margin-bottom: 20px;
  padding-bottom: 12px;
  border-bottom: 2px solid var(--bg-light);
}

/* Table of Contents */
.toc-widget {
  background: var(--white);
  padding: 25px;
  border-radius: 16px;
  box-shadow: var(--shadow-sm);
}

.toc-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.toc-link {
  font-size: 0.95rem;
  color: #555;
  text-decoration: none;
  padding: 8px 12px;
  border-radius: 8px;
  transition: all 0.2s;
  display: block;
  border-right: 3px solid transparent;
}

.toc-link:hover,
.toc-link.active {
  color: var(--accent-color);
  background: rgba(78, 124, 50, 0.08);
  border-right-color: var(--accent-color);
  font-weight: 600;
}

/* Related Posts Widget */
.related-posts-widget {
  background: var(--white);
  padding: 25px;
  border-radius: 16px;
  box-shadow: var(--shadow-sm);
}

.related-posts-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.related-post-card {
  display: flex;
  gap: 12px;
  padding: 12px;
  border-radius: 12px;
  transition: all 0.3s;
  text-decoration: none;
  color: inherit;
}

.related-post-card:hover {
  background: var(--bg-light);
  transform: translateX(-5px);
}

.related-img {
  width: 80px;
  height: 60px;
  border-radius: 8px;
  object-fit: cover;
  flex-shrink: 0;
}

.related-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.related-title {
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--primary-color);
  line-height: 1.4;
  margin-bottom: 6px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.related-date {
  font-size: 0.8rem;
  color: #888;
  display: flex;
  align-items: center;
  gap: 4px;
}

/* Newsletter Widget */
.newsletter-widget {
  background: linear-gradient(
    135deg,
    var(--primary-color),
    var(--accent-color)
  );
  padding: 30px;
  border-radius: 20px;
  color: var(--white);
  text-align: center;
}

.newsletter-icon {
  margin-bottom: 15px;
  opacity: 0.9;
}

.newsletter-content h4 {
  font-size: 1.3rem;
  font-weight: 800;
  margin-bottom: 10px;
}

.newsletter-content p {
  font-size: 0.95rem;
  opacity: 0.95;
  margin-bottom: 20px;
  line-height: 1.6;
}

.btn-subscribe {
  background: var(--white);
  color: var(--primary-color);
  border: none;
  padding: 12px;
  border-radius: 10px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s;
  font-family: "Cairo", sans-serif;
  text-decoration: none;
  display: inline-block;
}

.btn-subscribe:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
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
  .post-container {
    grid-template-columns: 1fr;
    padding: 30px 15px 60px;
  }

  .sidebar {
    flex-direction: row;
    flex-wrap: wrap;
    gap: 20px;
  }

  .sticky-widget,
  .related-posts-widget,
  .newsletter-widget {
    flex: 1 1 300px;
    position: static;
  }

  .post-content {
    padding: 30px 25px;
  }

  .author-box {
    flex-direction: column;
    text-align: center;
  }

  .author-social {
    justify-content: center;
  }

  .post-navigation {
    grid-template-columns: 1fr;
  }

  .nav-link.next {
    flex-direction: row;
    justify-content: flex-start;
    text-align: right;
  }
}

@media (max-width: 576px) {
  .hero-content {
    padding-top: 60px;
  }

  .post-title {
    font-size: 1.8rem;
  }

  .post-excerpt {
    font-size: 1rem;
  }

  .share-buttons {
    flex-direction: column;
    gap: 12px;
  }

  .wave-bottom svg {
    height: 60px;
  }

  .post-content {
    padding: 25px 20px;
  }

  .post-content :deep(h2) {
    font-size: 1.4rem;
  }

  .toc-widget,
  .related-posts-widget,
  .newsletter-widget {
    padding: 20px;
  }

  .sidebar {
    flex-direction: column;
  }
}
</style>
