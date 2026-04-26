<template>
  <div class="blog-page">
    <!-- Hero Section -->
    <section class="blog-hero">
      <div class="container hero-content animate-on-scroll">
        <h1 class="hero-title">مدونة الندى</h1>
        <p class="hero-subtitle">
          مقالات ونصائح خبراء الزراعة لتعزيز إنتاجيتك والحفاظ على تربتك
        </p>

        <!-- Search Bar -->
        <div class="search-wrapper">
          <input
            type="text"
            v-model="searchQuery"
            placeholder="ابحث عن موضوع (مثال: سماد، تربة، مياه...)"
            class="search-input"
            @input="currentPage = 1"
          />
          <Search class="search-icon" :size="20" />
        </div>
      </div>
      <div class="wave-bottom">
        <svg viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path
            fill="#e6ede8"
            fill-opacity="1"
            d="M0,128L48,144C96,160,192,192,288,186.7C384,181,480,139,576,138.7C672,139,768,181,864,208C960,235,1056,245,1152,229.3C1248,213,1344,171,1392,149.3L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>
    </section>

    <!-- Main Content -->
    <section class="blog-container container">
      <!-- Mobile Filter Toggle Button (يظهر فقط في الموبايل) -->
      <!-- <button
        class="mobile-filter-toggle"
        @click="isFilterOpen = true"
        :class="{ 'has-active': activeCategory !== 'all' || searchQuery }"
      >
        <Filter :size="18" />
        <span>تصفية النتائج</span>
        <span v-if="activeCategory !== 'all'" class="active-dot"></span>
      </button> -->

      <!-- Filters Sidebar (Desktop Only) -->
      <!-- <aside class="filters-section animate-on-scroll desktop-only">
        <div class="filter-header">
          <h3>تصفح حسب الموضوع</h3>
          <button
            class="clear-filter"
            @click="resetFilters"
            v-if="activeCategory !== 'all' || searchQuery"
          >
            مسح الكل
          </button>
        </div>

        <ul class="filter-list">
          <li
            v-for="cat in categories"
            :key="cat.id"
            @click="
              activeCategory = cat.id;
              currentPage = 1;
            "
            :class="{ active: activeCategory === cat.id }"
          >
            <span>{{ cat.name }}</span>
            <span class="count">{{ cat.count }}</span>
          </li>
        </ul>

        <div class="tags-cloud">
          <h4>كلمات مفتاحية</h4>
          <div class="tags-list">
            <span
              v-for="tag in popularTags"
              :key="tag"
              class="tag-item"
              @click="
                searchQuery = tag;
                currentPage = 1;
              "
            >
              {{ tag }}
            </span>
          </div>
        </div>
      </aside> -->

      <!-- Blog Grid Wrapper -->
      <main class="blog-grid-wrapper">
        <!-- Empty State -->
        <div
          v-if="filteredPosts.length === 0"
          class="empty-state animate-on-scroll"
        >
          <div class="empty-icon">🌱</div>
          <h3>لا توجد نتائج</h3>
          <p>جرب تغيير كلمات البحث أو اختيار تصنيف آخر</p>
          <button class="btn-reset" @click="resetFilters">
            إعادة تعيين الفلتر
          </button>
        </div>

        <!-- Posts Grid -->
        <div v-else class="blog-grid">
          <BlogCard
            v-for="(post, index) in filteredPosts"
            :key="post.id"
            :image="post.image"
            :title="post.title"
            :excerpt="post.excerpt"
            :link="`/blog/${post.slug}`"
            class="animate-on-scroll"
            :style="{ '--delay': (index % 3) * 0.1 + 's' }"
          />
        </div>

        <!-- Pagination / Load More -->
        <div
          v-if="filteredPosts.length > 0"
          class="pagination animate-on-scroll"
        >
          <button
            class="btn-load-more"
            @click="loadMore"
            :disabled="currentPage >= totalPages || loading"
          >
            <span v-if="loading" class="loader"></span>
            <span v-else>{{
              currentPage >= totalPages ? "عرضت جميع المقالات" : "تحميل المزيد"
            }}</span>
          </button>
        </div>
      </main>
    </section>

    <!-- Mobile Filter Modal/Drawer -->
    <!-- <Teleport to="body">
      <Transition name="modal">
        <div
          v-if="isFilterOpen"
          class="mobile-filter-modal"
          @click.self="isFilterOpen = false"
        >
          <div class="modal-content">
            <div class="modal-header">
              <h3>تصفية النتائج</h3>
              <button class="close-btn" @click="isFilterOpen = false">
                <X :size="24" />
              </button>
            </div>

            <div class="modal-body">
              <div class="filter-group">
                <label>التصنيفات</label>
                <div class="filter-options">
                  <button
                    v-for="cat in categories"
                    :key="cat.id"
                    @click="activeCategory = cat.id"
                    :class="[
                      'filter-option',
                      { active: activeCategory === cat.id },
                    ]"
                  >
                    {{ cat.name }}
                    <span class="count">{{ cat.count }}</span>
                  </button>
                </div>
              </div>

              <div class="filter-group">
                <label>كلمات مفتاحية</label>
                <div class="tags-list mobile">
                  <span
                    v-for="tag in popularTags"
                    :key="tag"
                    class="tag-item"
                    @click="searchQuery = tag"
                  >
                    {{ tag }}
                  </span>
                </div>
              </div>

              <button
                class="btn-reset-mobile"
                @click="
                  resetFilters;
                  isFilterOpen = false;
                "
              >
                مسح جميع الفلاتر
              </button>
            </div>

            <div class="modal-footer">
              <button class="btn-apply" @click="isFilterOpen = false">
                عرض النتائج ({{ filteredPosts.length }})
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport> -->
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from "vue";
import { Search, Filter, X } from "lucide-vue-next";
import BlogCard from "@/components/BlogCard.vue";

// --- State Management ---
const searchQuery = ref("");
const activeCategory = ref("all");
const currentPage = ref(1);
const postsPerPage = 6;
const loading = ref(false);
const isFilterOpen = ref(false);
useHead({
  title: "  اهم المقالات | شركة الندى",
  meta: [
    { name: "description", content: "احصل على أفضل أسعار الأسمدة والكمبوست" },
  ],
});
// منع السكرول عند فتح المودال
watch(isFilterOpen, (newVal) => {
  document.body.style.overflow = newVal ? "hidden" : "";
});

// --- Mock Data ---
const categories = [
  { id: "all", name: "جميع المقالات", count: 12 },
  { id: "compost", name: "الكمبوست والأسمدة", count: 5 },
  { id: "farming", name: "تقنيات الزراعة", count: 4 },
  { id: "soil", name: "صحة التربة", count: 3 },
  { id: "news", name: "أخبار الندى", count: 2 },
];

const popularTags = [
  "زراعة عضوية",
  "ترشيد المياه",
  "موسم الحصاد",
  "مكافحة الآفات",
  "التسميد الطبيعي",
];

const allPosts = [
  {
    id: 1,
    title: "كيف يحسن الكمبوست من جودة التربة الرملية؟",
    excerpt:
      "اكتشف الأسرار العلمية وراء استخدام الكمبوست في تحسين بنية التربة الرملية وزيادة قدرتها على الاحتفاظ بالمياه والعناصر الغذائية.",
    image: "/images/blog/blog.png",
    slug: "compost-sandy-soil",
    category: "soil",
  },
  {
    id: 101,
    title: "الكمبوست البودر: الحل الذكي لزيادة خصوبة التربة وتحسين الإنتاج",
    excerpt:
      "اكتشف الأسرار العلمية وراء استخدام الكمبوست في تحسين بنية التربة الرملية وزيادة قدرتها على الاحتفاظ بالمياه والعناصر الغذائية.",
    image: "/images/blog/77296426-e56f-45c3-a002-d9c438cc3e10.jfif",
    slug: "compost-powder",
    category: "compost",
  },
  {
    id: 2,
    title: "5 أخطاء شائعة عند استخدام الأسمدة العضوية",
    excerpt:
      "تجنب هذه الأخطاء لضمان حصول نباتاتك على أقصى فائدة من التسميد العضوي وتجنب أي آثار عكسية على نمو المحاصيل.",
    image: "/images/blog/blog1.png",
    slug: "organic-fertilizer-mistakes",
    category: "compost",
  },
  {
    id: 3,
    title: "دليلك للزراعة المستدامة في المواسم الجافة",
    excerpt:
      "استراتيجيات عملية لتقليل استهلاك المياه والحفاظ على إنتاجية المزرعة حتى في ظل ظروف الجفاف وقلة الأمطار.",
    image: "/images/blog/blog2.png",
    slug: "sustainable-dry-farming",
    category: "farming",
  },
  {
    id: 4,
    title: "الفرق بين الكمبوست البودر والسائل: أيهما تختار؟",
    excerpt:
      "مقارنة شاملة تساعدك على اتخاذ القرار الأنسب لمزرعتك بناءً على نوع المحصول وطريقة الري والاحتياجات الغذائية.",
    image: "/images/blog/blog3.png",
    slug: "compost-powder-vs-liquid",
    category: "compost",
  },
  {
    id: 5,
    title: "تعزيز المناعة الطبيعية للنباتات ضد الآفات",
    excerpt:
      "كيف يمكن للتربة الصحية والغنية بالميكروبات النافعة أن تقلل من اعتمادك على المبيدات الكيميائية الضارة.",
    image: "/images/blog/blog.png",
    slug: "natural-plant-immunity",
    category: "farming",
  },
  {
    id: 6,
    title: "إطلاق خط إنتاج جديد للجبس الزراعي",
    excerpt:
      "خبر سار لمزارعينا الكرام: إضافة نوعية لمنتجات الندى تهدف لمعالجة ملوحة التربة وتحسين امتصاص العناصر.",
    image: "/images/blog/blog2.png",
    slug: "new-gypsum-product-line",
    category: "news",
  },
  {
    id: 7,
    title: "أفضل مواعيد الزراعة للخضروات الشتوية",
    excerpt:
      "جدول زمني دقيق لمواعيد زراعة الطماطم، الفلفل، والخيار لضمان أفضل إنتاجية وجودة في المحصول.",
    image: "/images/blog/blog1.png",
    slug: "winter-vegetables-timing",
    category: "farming",
  },
  {
    id: 8,
    title: "معالجة ملوحة التربة بطرق طبيعية",
    excerpt:
      "حلول عملية وفعالة باستخدام الجبس الزراعي والكمبوست لتحسين التربة المالحة واستعادتها للإنتاج.",
    image: "/images/blog/blog3.png",
    slug: "natural-salinity-treatment",
    category: "soil",
  },
];

// --- Computed Properties ---
const filteredPosts = computed(() => {
  let result = [...allPosts];

  if (activeCategory.value !== "all") {
    result = result.filter((post) => post.category === activeCategory.value);
  }

  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase();
    result = result.filter(
      (post) =>
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query),
    );
  }

  return result;
});

const paginatedPosts = computed(() => {
  const start = 0;
  const end = currentPage.value * postsPerPage;
  return filteredPosts.value.slice(start, end);
});

const totalPages = computed(() => {
  return Math.ceil(filteredPosts.value.length / postsPerPage);
});

// --- Methods ---
const loadMore = () => {
  if (currentPage.value < totalPages.value) {
    loading.value = true;
    setTimeout(() => {
      currentPage.value++;
      loading.value = false;
    }, 600);
  }
};

const resetFilters = () => {
  activeCategory.value = "all";
  searchQuery.value = "";
  currentPage.value = 1;
};

// --- Scroll Animation ---
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
  // ننتظر قليلاً لضمان رسم العناصر أولاً
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
.blog-hero {
  background: linear-gradient(
    135deg,
    var(--primary-color) 0%,
    var(--accent-color) 100%
  );
  color: var(--white);
  padding: 60px 0 120px;
  text-align: center;
  position: relative;
}

.hero-title {
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 900;
  margin-bottom: 15px;
  line-height: 1.3;
}

.hero-subtitle {
  font-size: clamp(1rem, 2.5vw, 1.2rem);
  opacity: 0.95;
  margin-bottom: 30px;
  max-width: 600px;
  margin-inline: auto;
  line-height: 1.6;
}

/* Search Bar */
.search-wrapper {
  position: relative;
  max-width: 550px;
  margin: 0 auto;
  width: 90%;
}

.search-input {
  width: 100%;
  padding: 14px 45px 14px 20px;
  border-radius: 50px;
  border: none;
  font-size: 1rem;
  font-family: "Cairo", sans-serif;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
  background: #fff;
  color: var(--primary-color);
}

.search-input:focus {
  outline: none;
  box-shadow: 0 12px 35px rgba(0, 0, 0, 0.25);
  transform: translateY(-2px);
}

.search-icon {
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--primary-color);
  pointer-events: none;
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
  height: 80px;
  display: block;
}

/* --- Main Layout --- */
.blog-container {
  display: grid;
  grid-template-columns: 1fr;
  gap: 40px;
  padding: 40px 20px 80px;
  align-items: start;
}

/* Mobile Filter Toggle - Fixed Logic */
.mobile-filter-toggle {
  display: none; /* مخفي افتراضياً (ديسكتوب) */
  width: 100%;
  padding: 12px 20px;
  background: var(--white);
  border: 1px solid #eee;
  border-radius: 12px;
  color: var(--primary-color);
  font-weight: 600;
  font-family: "Cairo", sans-serif;
  align-items: center;
  justify-content: center;
  gap: 8px;
  box-shadow: var(--shadow-sm);
  margin-bottom: 20px;
  position: relative;
  cursor: pointer;
  transition: all 0.2s;
}

.mobile-filter-toggle.has-active::after {
  content: "";
  position: absolute;
  top: 10px;
  left: 10px;
  width: 8px;
  height: 8px;
  background: var(--accent-color);
  border-radius: 50%;
}

/* --- Filters Sidebar (Desktop) --- */
.filters-section {
  background: var(--white);
  padding: 25px;
  border-radius: 20px;
  box-shadow: var(--shadow-md);
  position: sticky;
  top: 100px;
}

.filter-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 1px solid #eee;
}

.filter-header h3 {
  font-size: 1.2rem;
  color: var(--primary-color);
  font-weight: 800;
}

.clear-filter {
  background: none;
  border: none;
  color: var(--accent-color);
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
}

.filter-list {
  list-style: none;
  padding: 0;
  margin: 0 0 25px 0;
}

.filter-list li {
  display: flex;
  justify-content: space-between;
  padding: 12px 15px;
  margin-bottom: 6px;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s ease;
  color: #555;
  font-weight: 500;
  font-size: 0.95rem;
}

.filter-list li:hover,
.filter-list li.active {
  background: rgba(78, 124, 50, 0.1);
  color: var(--accent-color);
  font-weight: 700;
}

.count {
  background: #eee;
  padding: 2px 10px;
  border-radius: 20px;
  font-size: 0.8rem;
  color: #666;
  min-width: 24px;
  text-align: center;
}
.filter-list li.active .count {
  background: var(--accent-color);
  color: #fff;
}

/* Tags */
.tags-cloud h4 {
  font-size: 1rem;
  color: var(--primary-color);
  margin: 20px 0 12px;
  font-weight: 700;
}
.tags-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.tag-item {
  background: var(--bg-light);
  padding: 6px 12px;
  border-radius: 8px;
  font-size: 0.85rem;
  color: var(--primary-color);
  cursor: pointer;
  transition: all 0.2s;
  font-weight: 500;
}
.tag-item:hover {
  background: var(--accent-color);
  color: #fff;
  transform: translateY(-2px);
}

/* --- Blog Grid --- */
.blog-grid-wrapper {
  min-height: 400px;
}

.blog-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 25px;
}

/* Empty State */
.empty-state {
  text-align: center;
  padding: 60px 20px;
  background: var(--white);
  border-radius: 20px;
  box-shadow: var(--shadow-sm);
}
.empty-icon {
  font-size: 3.5rem;
  margin-bottom: 15px;
}
.empty-state h3 {
  color: var(--primary-color);
  margin-bottom: 8px;
  font-size: 1.3rem;
}
.empty-state p {
  color: #666;
  margin-bottom: 20px;
  font-size: 0.95rem;
}
.btn-reset {
  background: var(--primary-color);
  color: #fff;
  border: none;
  padding: 10px 24px;
  border-radius: 8px;
  cursor: pointer;
  font-family: "Cairo";
  font-weight: 600;
  transition: background 0.3s;
}
.btn-reset:hover {
  background: var(--accent-color);
}

/* Pagination */
.pagination {
  margin-top: 50px;
  text-align: center;
}
.btn-load-more {
  background: var(--white);
  border: 2px solid var(--accent-color);
  color: var(--accent-color);
  padding: 12px 35px;
  border-radius: 50px;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s;
  font-family: "Cairo";
  display: inline-flex;
  align-items: center;
  gap: 10px;
  min-width: 180px;
  justify-content: center;
}
.btn-load-more:hover:not(:disabled) {
  background: var(--accent-color);
  color: #fff;
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}
.btn-load-more:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  background: #f5f5f5;
  border-color: #ddd;
  color: #999;
}

/* Loader */
.loader {
  width: 18px;
  height: 18px;
  border: 2px solid rgba(78, 124, 50, 0.3);
  border-radius: 50%;
  border-top-color: var(--accent-color);
  animation: spin 0.8s linear infinite;
}
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
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

/* --- Mobile Filter Modal --- */
.mobile-filter-modal {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  z-index: 2000;
  display: flex;
  align-items: flex-end;
  justify-content: center;
}

.modal-content {
  background: var(--white);
  width: 100%;
  max-width: 500px;
  border-radius: 24px 24px 0 0;
  padding: 25px 20px 30px;
  animation: slideUp 0.3s ease-out;
  max-height: 85vh;
  display: flex;
  flex-direction: column;
}

@keyframes slideUp {
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 20px;
  border-bottom: 1px solid #eee;
  margin-bottom: 20px;
}
.modal-header h3 {
  font-size: 1.3rem;
  color: var(--primary-color);
  font-weight: 800;
}
.close-btn {
  background: #f5f5f5;
  border: none;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: var(--primary-color);
  transition: background 0.2s;
}
.close-btn:hover {
  background: #eee;
}

.modal-body {
  flex: 1;
  overflow-y: auto;
  padding-right: 5px;
}

.filter-group {
  margin-bottom: 25px;
}
.filter-group label {
  display: block;
  font-weight: 700;
  color: var(--primary-color);
  margin-bottom: 12px;
  font-size: 1rem;
}

.filter-options {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.filter-option {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 18px;
  background: var(--bg-light);
  border: 2px solid transparent;
  border-radius: 12px;
  font-weight: 500;
  color: var(--primary-color);
  cursor: pointer;
  transition: all 0.2s;
  font-family: "Cairo";
  text-align: right;
}
.filter-option.active {
  background: rgba(78, 124, 50, 0.15);
  border-color: var(--accent-color);
  color: var(--accent-color);
  font-weight: 700;
}

.tags-list.mobile {
  gap: 10px;
}
.tags-list.mobile .tag-item {
  padding: 8px 16px;
  font-size: 0.9rem;
}

.btn-reset-mobile {
  width: 100%;
  padding: 12px;
  background: transparent;
  border: 1px solid #ddd;
  color: #666;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
  margin-top: 10px;
  font-family: "Cairo";
}

.modal-footer {
  padding-top: 20px;
  border-top: 1px solid #eee;
  margin-top: 10px;
}
.btn-apply {
  width: 100%;
  padding: 14px;
  background: var(--primary-color);
  color: #fff;
  border: none;
  border-radius: 12px;
  font-size: 1.05rem;
  font-weight: 700;
  cursor: pointer;
  font-family: "Cairo";
  transition: background 0.3s;
}
.btn-apply:hover {
  background: var(--accent-color);
}

/* Modal Transitions */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
.modal-enter-active .modal-content,
.modal-leave-active .modal-content {
  transition: transform 0.3s ease-out;
}
.modal-enter-from .modal-content,
.modal-leave-to .modal-content {
  transform: translateY(100%);
}

/* --- Responsive Design --- */
@media (max-width: 992px) {
  .blog-container {
    grid-template-columns: 1fr;
    padding: 30px 15px 60px;
  }

  .desktop-only {
    display: none !important; /* Force hide */
  }

  .mobile-filter-toggle {
    display: flex; /* Force show on mobile/tablet */
  }

  .blog-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }

  .hero-title {
    font-size: 2.5rem;
  }
  .search-wrapper {
    width: 95%;
  }
}

@media (max-width: 576px) {
  .blog-grid {
    grid-template-columns: 1fr;
  }

  .hero-title {
    font-size: 2rem;
  }
  .hero-subtitle {
    font-size: 1rem;
  }

  .search-input {
    padding: 12px 40px 12px 15px;
    font-size: 0.95rem;
  }

  .wave-bottom svg {
    height: 60px;
  }

  .modal-content {
    border-radius: 20px 20px 0 0;
    padding: 20px 15px 25px;
  }
}

/* Hide scrollbar for Chrome/Safari/Opera */
.modal-body::-webkit-scrollbar {
  width: 4px;
}
.modal-body::-webkit-scrollbar-track {
  background: transparent;
}
.modal-body::-webkit-scrollbar-thumb {
  background: #ccc;
  border-radius: 4px;
}
</style>
