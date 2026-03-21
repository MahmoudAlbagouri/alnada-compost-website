<template>
  <article class="blog-post-page">
    <!-- Hero Section with Featured Image -->
    <section class="post-hero">
      <div class="hero-image-wrapper">
        <NuxtImg
          :src="post?.image || '/images/blog/default.jpg'"
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
              ><User :size="14" /> {{ post?.author }}</span
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

        <!-- Tags -->
        <!-- <div class="post-tags animate-on-scroll">
          <span class="tags-label">الكلمات المفتاحية:</span>
          <div class="tags-list">
            <NuxtLink
              v-for="tag in post?.tags"
              :key="tag"
              :to="`/blog?search=${tag}`"
              class="tag-item"
            >
              #{{ tag }}
            </NuxtLink>
          </div>
        </div> -->

        <!-- Author Box -->
        <div class="author-box animate-on-scroll">
          <div class="author-avatar">
            <NuxtImg
              src="/images/author-avatar.jpg"
              alt="صورة الكاتب"
              width="80"
              height="80"
              class="avatar-img"
            />
          </div>
          <div class="author-info">
            <h4 class="author-name">{{ post?.author }}</h4>
            <p class="author-role">خبير زراعة عضوية</p>
            <p class="author-bio">
              كاتب ومتخصص في مجال الزراعة المستدامة، لديه خبرة أكثر من 15 عاماً
              في تحسين جودة التربة وزيادة الإنتاج الزراعي بطرق صديقة للبيئة.
            </p>
            <div class="author-social">
              <a href="#" aria-label="Twitter"><Twitter :size="18" /></a>
              <a href="#" aria-label="LinkedIn"><Linkedin :size="18" /></a>
              <a href="#" aria-label="Email"><Mail :size="18" /></a>
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

        <!-- Comments Section -->
        <!-- <section class="comments-section animate-on-scroll">
          <h3 class="section-title">التعليقات ({{ comments.length }})</h3>

          <form @submit.prevent="submitComment" class="comment-form">
            <h4>أضف تعليقك</h4>
            <div class="form-grid">
              <div class="form-group">
                <label for="name">الاسم</label>
                <input
                  type="text"
                  id="name"
                  v-model="commentForm.name"
                  required
                  placeholder="اسمك الكريم"
                />
              </div>
              <div class="form-group">
                <label for="email">البريد الإلكتروني</label>
                <input
                  type="email"
                  id="email"
                  v-model="commentForm.email"
                  required
                  placeholder="example@email.com"
                />
              </div>
            </div>
            <div class="form-group">
              <label for="comment">التعليق</label>
              <textarea
                id="comment"
                v-model="commentForm.content"
                required
                rows="4"
                placeholder="اكتب تعليقك هنا..."
              ></textarea>
            </div>
            <button type="submit" class="btn-submit" :disabled="submitting">
              {{ submitting ? "جاري الإرسال..." : "نشر التعليق" }}
            </button>
          </form>

          <div class="comments-list">
            <div
              v-for="comment in comments"
              :key="comment.id"
              class="comment-item"
            >
              <div class="comment-avatar">
                <span>{{ comment.author.charAt(0) }}</span>
              </div>
              <div class="comment-content">
                <div class="comment-header">
                  <span class="comment-author">{{ comment.author }}</span>
                  <span class="comment-date">{{ comment.date }}</span>
                </div>
                <p class="comment-text">{{ comment.content }}</p>
                <button class="comment-reply">رد</button>
              </div>
            </div>
          </div>
        </section> -->
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
            <h4>اشترك في نشرتنا</h4>
            <p>
              احصل على أحدث مقالات الزراعة والنصائح الحصرية مباشرة إلى بريدك
            </p>
            <form @submit.prevent="subscribeNewsletter" class="newsletter-form">
              <input type="email" placeholder="بريدك الإلكتروني" required />
              <button type="submit" class="btn-subscribe">اشتراك</button>
            </form>
          </div>
        </div>
      </aside>
    </main>

    <!-- Related Posts Full Section (Mobile) -->
    <!-- <section class="related-section-mobile container animate-on-scroll">
      <h3 class="section-title">قد يعجبك أيضاً</h3>
      <div class="related-grid-mobile">
        <BlogCard
          v-for="related in relatedPosts.slice(0, 3)"
          :key="related.id"
          :image="related.image"
          :title="related.title"
          :excerpt="related.excerpt"
          :link="`/blog/${related.slug}`"
        />
      </div>
    </section> -->
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
  Linkedin,
  Mail,
} from "lucide-vue-next";
import BlogCard from "@/components/BlogCard.vue";

const route = useRoute();
const currentUrl = ref("");

// --- Mock Post Data (استبدل هذا بـ API Call لاحقاً) ---
const post = ref({
  id: 1,
  title: "كيف يحسن الكمبوست من جودة التربة الرملية؟",
  excerpt:
    "اكتشف الأسرار العلمية وراء استخدام الكمبوست في تحسين بنية التربة الرملية وزيادة قدرتها على الاحتفاظ بالمياه والعناصر الغذائية.",
  content: `
    <p>تعتبر التربة الرملية من التحديات الكبيرة التي تواجه المزارعين في العديد من المناطق، نظراً لقدرتها المحدودة على الاحتفاظ بالمياه والعناصر الغذائية. لكن هل تعلم أن <strong>الكمبوست</strong> يمكن أن يكون الحل السحري لهذه المشكلة؟</p>
    
    <h2 id="heading-0">ما هو الكمبوست ولماذا هو مهم؟</h2>
    <p>الكمبوست هو سماد عضوي ناتج عن تحلل المواد العضوية مثل بقايا النباتات والأطعمة. يتميز بغناه بالميكروبات النافعة والعناصر الغذائية الأساسية التي تحتاجها التربة والنباتات.</p>
    
    <blockquote>
      "التربة الصحية هي أساس الزراعة الناجحة، والكمبوست هو المفتاح لصحة التربة"
    </blockquote>
    
    <h2 id="heading-1">فوائد الكمبوست للتربة الرملية</h2>
    <ul>
      <li><strong>تحسين بنية التربة:</strong> يساعد الكمبوست على ربط حبيبات الرمل معاً، مما يحسن تهوية التربة ويقلل من انجرافها.</li>
      <li><strong>زيادة قدرة الاحتفاظ بالمياه:</strong> تعمل المادة العضوية في الكمبوست مثل الإسفنج، مما يسمح للتربة الرملية بالاحتفاظ بالرطوبة لفترات أطول.</li>
      <li><strong>توفير العناصر الغذائية:</strong> يطلق الكمبوست العناصر الغذائية ببطء، مما يضمن تغذية مستدامة للنباتات دون خطر الحرق الكيميائي.</li>
      <li><strong>تعزيز الحياة البيولوجية:</strong> يجذب الكمبوست الكائنات الحية الدقيقة النافعة التي تحلل العناصر وتسهل امتصاصها.</li>
    </ul>
    
    <h2 id="heading-2">كيفية استخدام الكمبوست في التربة الرملية</h2>
    <p>للاستفادة القصوى من الكمبوست في تحسين التربة الرملية، اتبع الخطوات التالية:</p>
    <ol>
      <li>اختر كمبوست ناضجاً عالي الجودة، خالٍ من الشوائب والروائح الكريهة.</li>
      <li>اخلط الكمبوست مع الطبقة العليا من التربة (أول 20-30 سم) بمعدل 3-5 كجم لكل متر مربع.</li>
      <li>كرر العملية مرتين سنوياً، في بداية موسم الربيع والخريف.</li>
      <li>اروِ التربة جيداً بعد إضافة الكمبوست لتفعيل عملية التحلل والامتصاص.</li>
    </ol>
    
    <p>باستخدام الكمبوست بانتظام، ستلاحظ تحسناً ملحوظاً في خصوبة تربتك الرملية، وزيادة في إنتاجية محاصيلك، وتقليلاً في استهلاك المياه والأسمدة الكيميائية.</p>
  `,
  image: "/images/blog/blog3.png",
  slug: "compost-sandy-soil",
  category: "soil",
  categoryName: "صحة التربة",
  date: "10 مارس 2024",
  readTime: "5 دقائق قراءة",
  author: "د. أحمد الزراعي",
  tags: ["كمبوست", "تربة رملية", "زراعة عضوية", "تحسين التربة"],
  authorBio: "خبير في الزراعة المستدامة",
});

// ألوان التصنيفات
const categoryColors = {
  soil: "#4e7c32",
  compost: "#213428",
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
  return Array.from(h2Elements).map((h2) => h2.textContent);
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
  slug: "organic-fertilizer-mistakes",
  title: "5 أخطاء شائعة عند استخدام الأسمدة العضوية",
});
const nextPost = ref({
  slug: "sustainable-dry-farming",
  title: "دليلك للزراعة المستدامة في المواسم الجافة",
});

// مقالات ذات صلة
const relatedPosts = ref([
  {
    id: 2,
    title: "5 أخطاء شائعة عند استخدام الأسمدة العضوية",
    excerpt: "تجنب هذه الأخطاء لضمان حصول نباتاتك على أقصى فائدة...",
    image: "/images/blog/fertilizer-mistakes.jpg",
    slug: "organic-fertilizer-mistakes",
    readTime: "7 دقائق",
  },
  {
    id: 3,
    title: "دليلك للزراعة المستدامة في المواسم الجافة",
    excerpt: "استراتيجيات عملية لتقليل استهلاك المياه...",
    image: "/images/blog/sustainable-farming.jpg",
    slug: "sustainable-dry-farming",
    readTime: "6 دقائق",
  },
  {
    id: 4,
    title: "معالجة ملوحة التربة بطرق طبيعية",
    excerpt: "حلول عملية وفعالة باستخدام الجبس الزراعي...",
    image: "/images/blog/salinity-treatment.jpg",
    slug: "natural-salinity-treatment",
    readTime: "5 دقائق",
  },
]);

// التعليقات
const comments = ref([
  {
    id: 1,
    author: "محمد علي",
    date: "12 مارس 2024",
    content:
      "مقال ممتاز ومفيد جداً، جربت تطبيق هذه النصائح في مزرعتي والنتائج مذهلة!",
  },
  {
    id: 2,
    author: "فاطمة أحمد",
    date: "11 مارس 2024",
    content:
      "شكراً على المعلومات القيمة، هل يمكن استخدام الكمبوست مع التربة الطينية أيضاً؟",
  },
]);

// نموذج التعليق
const commentForm = ref({ name: "", email: "", content: "" });
const submitting = ref(false);

const submitComment = async () => {
  submitting.value = true;
  // محاكاة إرسال التعليق
  await new Promise((resolve) => setTimeout(resolve, 1000));

  comments.value.unshift({
    id: Date.now(),
    author: commentForm.value.name,
    date: new Date().toLocaleDateString("ar-EG"),
    content: commentForm.value.content,
  });

  commentForm.value = { name: "", email: "", content: "" };
  submitting.value = false;
};

// الاشتراك في النشرة
const subscribeNewsletter = async () => {
  alert("شكراً لاشتراكك في نشرتنا الإخبارية! 🌱");
};

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

/* Post Tags */
.post-tags {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
  padding: 20px 0;
  border-bottom: 1px solid #eee;
  margin-bottom: 40px;
}

.tags-label {
  font-weight: 600;
  color: var(--primary-color);
}

.tags-list {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.tag-item {
  padding: 6px 14px;
  background: var(--bg-light);
  color: var(--primary-color);
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.2s;
}

.tag-item:hover {
  background: var(--accent-color);
  color: var(--white);
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

/* Comments Section */
.comments-section {
  padding: 40px;
  background: var(--white);
  border-radius: 20px;
  box-shadow: var(--shadow-md);
}

.section-title {
  font-size: 1.5rem;
  font-weight: 800;
  color: var(--primary-color);
  margin-bottom: 30px;
  padding-bottom: 15px;
  border-bottom: 2px solid var(--bg-light);
}

.comment-form {
  margin-bottom: 40px;
}

.comment-form h4 {
  font-size: 1.2rem;
  color: var(--primary-color);
  margin-bottom: 20px;
  font-weight: 700;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-group label {
  font-weight: 600;
  color: var(--primary-color);
  font-size: 0.95rem;
}

.form-group input,
.form-group textarea {
  padding: 12px 16px;
  border: 2px solid #eee;
  border-radius: 10px;
  font-size: 1rem;
  font-family: "Cairo", sans-serif;
  transition: all 0.3s;
  background: #fafafa;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: var(--accent-color);
  background: var(--white);
  box-shadow: 0 0 0 4px rgba(78, 124, 50, 0.1);
}

.btn-submit {
  background: var(--primary-color);
  color: var(--white);
  border: none;
  padding: 14px 32px;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s;
  font-family: "Cairo", sans-serif;
  margin-top: 10px;
}

.btn-submit:hover:not(:disabled) {
  background: var(--accent-color);
  transform: translateY(-2px);
}

.btn-submit:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

/* Comments List */
.comments-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.comment-item {
  display: flex;
  gap: 15px;
  padding: 20px;
  background: var(--bg-light);
  border-radius: 12px;
}

.comment-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: var(--accent-color);
  color: var(--white);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1.1rem;
  flex-shrink: 0;
}

.comment-content {
  flex: 1;
}

.comment-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 10px;
  flex-wrap: wrap;
}

.comment-author {
  font-weight: 700;
  color: var(--primary-color);
}

.comment-date {
  font-size: 0.85rem;
  color: #888;
}

.comment-text {
  color: #444;
  line-height: 1.7;
  margin-bottom: 12px;
}

.comment-reply {
  background: none;
  border: none;
  color: var(--accent-color);
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  padding: 0;
  transition: color 0.2s;
}

.comment-reply:hover {
  color: var(--primary-color);
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

.newsletter-form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.newsletter-form input {
  padding: 12px 16px;
  border-radius: 10px;
  border: none;
  font-size: 0.95rem;
  font-family: "Cairo", sans-serif;
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
}

.btn-subscribe:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
}

/* --- Mobile Related Section --- */
.related-section-mobile {
  padding: 0 20px 60px;
  display: none;
}

.related-grid-mobile {
  display: grid;
  grid-template-columns: 1fr;
  gap: 25px;
  margin-top: 30px;
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

  .form-grid {
    grid-template-columns: 1fr;
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

  .comments-section,
  .toc-widget,
  .related-posts-widget,
  .newsletter-widget {
    padding: 20px;
  }

  .comment-item {
    flex-direction: column;
    text-align: center;
  }

  .comment-header {
    justify-content: center;
  }

  .sidebar {
    flex-direction: column;
  }

  /* Show mobile related section */
  .related-section-mobile {
    display: block;
  }

  /* Hide desktop related widget on mobile */
  .related-posts-widget {
    display: none;
  }
}
</style>
