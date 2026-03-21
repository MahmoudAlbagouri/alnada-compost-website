<template>
  <div class="products-page">
    <!-- Hero Section -->
    <section class="products-hero">
      <div class="container hero-content animate-on-scroll">
        <h1 class="hero-title">منتجاتنا</h1>
        <p class="hero-subtitle">
          حلول زراعية عضوية متكاملة لتربة أكثر خصوبة ومحاصيل أكثر إنتاجية
        </p>
        <div class="search-wrapper">
          <input
            type="text"
            v-model="searchQuery"
            placeholder="ابحث عن منتج..."
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
    <section class="products-container container">
      <!-- <button
        class="mobile-filter-toggle"
        @click="isFilterOpen = true"
        :class="{ 'has-active': hasActiveFilters }"
      >
        <Filter :size="18" /><span>تصفية المنتجات</span
        ><span v-if="activeCategory !== 'all'" class="active-dot"></span>
      </button> -->

      <!-- <aside class="filters-section animate-on-scroll desktop-only">
        <div class="filter-header">
          <h3>تصفح حسب الفئة</h3>
          <button
            class="clear-filter"
            @click="resetFilters"
            v-if="hasActiveFilters"
          >
            مسح الكل
          </button>
        </div>
        <div class="filter-group">
          <h4 class="filter-group-title">الفئات</h4>
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
              <span>{{ cat.name }}</span
              ><span class="count">{{ cat.count }}</span>
            </li>
          </ul>
        </div>
        <div class="filter-group">
          <h4 class="filter-group-title">الترتيب حسب</h4>
          <select
            v-model="activeSort"
            @change="currentPage = 1"
            class="sort-select"
          >
            <option value="default">الأكثر ظهوراً</option>
            <option value="price-asc">السعر: من الأقل للأعلى</option>
            <option value="price-desc">السعر: من الأعلى للأقل</option>
            <option value="name-asc">الاسم: أ-ي</option>
            <option value="newest">الأحدث</option>
          </select>
        </div>
        <div class="filter-group">
          <h4 class="filter-group-title">كلمات مفتاحية</h4>
          <div class="tags-list">
            <span
              v-for="tag in popularTags"
              :key="tag"
              class="tag-item"
              @click="
                searchQuery = tag;
                currentPage = 1;
              "
              >{{ tag }}</span
            >
          </div>
        </div>
      </aside> -->

      <main class="products-grid-wrapper">
        <div class="results-info animate-on-scroll">
          <span>عرض {{ filteredProducts.length }} منتج</span>
          <div class="view-toggle">
            <button
              :class="['view-btn', { active: viewMode === 'grid' }]"
              @click="viewMode = 'grid'"
              aria-label="عرض شبكي"
            >
              <Grid :size="18" />
            </button>
            <button
              :class="['view-btn', { active: viewMode === 'list' }]"
              @click="viewMode = 'list'"
              aria-label="عرض قائمة"
            >
              <List :size="18" />
            </button>
          </div>
        </div>

        <div
          v-if="filteredProducts.length === 0"
          class="empty-state animate-on-scroll"
        >
          <div class="empty-icon">🌱</div>
          <h3>لا توجد منتجات</h3>
          <p>جرب تغيير كلمات البحث أو اختيار تصنيف آخر</p>
          <button class="btn-reset" @click="resetFilters">
            إعادة تعيين الفلتر
          </button>
        </div>

        <div v-else class="products-grid" :class="viewMode">
          <ProductCard
            v-for="(product, index) in paginatedProducts"
            :key="product.id"
            :image="product.image"
            :title="product.title"
            :category="product.categoryName"
            :excerpt="product.excerpt"
            :price="product.price"
            :old-price="product.oldPrice"
            :badge="product.badge"
            :badge-type="product.badgeType"
            :features="product.features"
            :link="`/products/${product.slug}`"
            class="animate-on-scroll"
            :style="{ '--delay': (index % 3) * 0.1 + 's' }"
          />
        </div>

        <div
          v-if="filteredProducts.length > 0"
          class="pagination animate-on-scroll"
        >
          <button
            class="btn-load-more"
            @click="loadMore"
            :disabled="currentPage >= totalPages || loading"
          >
            <span v-if="loading" class="loader"></span>
            <span v-else>{{
              currentPage >= totalPages ? "عرضت جميع المنتجات" : "تحميل المزيد"
            }}</span>
          </button>
        </div>
      </main>
    </section>

    <!-- Features Section -->
    <section class="features-section container animate-on-scroll">
      <div class="features-grid">
        <div class="feature-item">
          <Award :size="32" />
          <h4>جودة مضمونة</h4>
          <p>منتجاتنا تخضع لاختبارات جودة دقيقة</p>
        </div>
        <div class="feature-item">
          <Leaf :size="32" />
          <h4>100% عضوي</h4>
          <p>خالي من المواد الكيميائية الضارة</p>
        </div>
        <div class="feature-item">
          <Truck :size="32" />
          <h4>توصيل سريع</h4>
          <p>نصلك أينما كنت في جميع المحافظات</p>
        </div>
        <div class="feature-item">
          <Headphones :size="32" />
          <h4>دعم فني</h4>
          <p>فريق خبراء جاهز لمساعدتك</p>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="cta-section container animate-on-scroll">
      <div class="cta-content">
        <Leaf :size="48" class="cta-icon" />
        <h2>لست متأكداً من المنتج الأنسب لك؟</h2>
        <p>تواصل مع خبرائنا للحصول على استشارة مجانية</p>
        <div class="cta-buttons">
          <NuxtLink to="/contact" class="btn-primary btn-large"
            >استشر خبيراً</NuxtLink
          >
          <NuxtLink to="/request-quote" class="btn-outline btn-large"
            >طلب عرض سعر</NuxtLink
          >
        </div>
      </div>
    </section>

    <!-- Mobile Filter Modal -->
    <!-- <Teleport to="body">
      <Transition name="modal">
        <div
          v-if="isFilterOpen"
          class="mobile-filter-modal"
          @click.self="isFilterOpen = false"
        >
          <div class="modal-content">
            <div class="modal-header">
              <h3>تصفية المنتجات</h3>
              <button class="close-btn" @click="isFilterOpen = false">
                <X :size="24" />
              </button>
            </div>
            <div class="modal-body">
              <div class="filter-group">
                <label>الفئات</label>
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
                    {{ cat.name }}<span class="count">{{ cat.count }}</span>
                  </button>
                </div>
              </div>
              <div class="filter-group">
                <label>الترتيب حسب</label>
                <select v-model="activeSort" class="mobile-sort-select">
                  <option value="default">الأكثر ظهوراً</option>
                  <option value="price-asc">السعر: من الأقل للأعلى</option>
                  <option value="price-desc">السعر: من الأعلى للأقل</option>
                  <option value="name-asc">الاسم: أ-ي</option>
                  <option value="newest">الأحدث</option>
                </select>
              </div>
              <div class="filter-group">
                <label>كلمات مفتاحية</label>
                <div class="tags-list mobile">
                  <span
                    v-for="tag in popularTags"
                    :key="tag"
                    class="tag-item"
                    @click="searchQuery = tag"
                    >{{ tag }}</span
                  >
                </div>
              </div>
              <button class="btn-reset-mobile" @click="resetFilters">
                مسح جميع الفلاتر
              </button>
            </div>
            <div class="modal-footer">
              <button class="btn-apply" @click="isFilterOpen = false">
                عرض النتائج ({{ filteredProducts.length }})
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
import {
  Search,
  Filter,
  X,
  Grid,
  List,
  Award,
  Leaf,
  Truck,
  Headphones,
} from "lucide-vue-next";
import ProductCard from "@/components/ProductCard.vue";

const searchQuery = ref("");
const activeCategory = ref("all");
const activeSort = ref("default");
const currentPage = ref(1);
const productsPerPage = 6;
const loading = ref(false);
const isFilterOpen = ref(false);
const viewMode = ref("grid");

watch(isFilterOpen, (newVal) => {
  document.body.style.overflow = newVal ? "hidden" : "";
});

const hasActiveFilters = computed(
  () =>
    activeCategory.value !== "all" ||
    searchQuery.value ||
    activeSort.value !== "default",
);

const categories = [
  { id: "all", name: "جميع المنتجات", count: 8 },
  { id: "compost", name: "الكمبوست", count: 3 },
  { id: "fertilizer", name: "الأسمدة", count: 2 },
  { id: "soil", name: "محسنات التربة", count: 2 },
  { id: "tools", name: "أدوات زراعية", count: 1 },
];
const popularTags = ["عضوي", "طبيعي", "تربة", "زراعة", "نباتات"];

const allProducts = [
  {
    id: 1,
    title: "كمبوست بودر ممتاز",
    excerpt: "سماد عضوي بودر غني بالمغذيات",
    image: "/images/products/product5.png",
    slug: "compost-powder",
    category: "compost",
    categoryName: "الكمبوست",
    price: "150 ج.م",
    oldPrice: "180 ج.م",
    badge: "الأكثر مبيعاً",
    badgeType: "bestseller",
    features: ["100% عضوي", "غني بالمغذيات", "سهل الاستخدام"],
  },
  {
    id: 2,
    title: "كمبوست سائل مركز",
    excerpt: "مستخلص سائل من الكمبوست للامتصاص السريع",
    image: "/images/products/product6.png",
    slug: "compost-liquid",
    category: "compost",
    categoryName: "الكمبوست",
    price: "200 ج.م",
    badge: "جديد",
    badgeType: "new",
    features: ["امتصاص فوري", "للري والرش", "تركيز عالي"],
  },
  {
    id: 3,
    title: "جبس زراعي نقي",
    excerpt: "جبس طبيعي عالي النقاء لمعالجة ملوحة التربة",
    image: "/images/products/product4.png",
    slug: "agricultural-gypsum",
    category: "soil",
    categoryName: "محسنات التربة",
    price: "120 ج.م",
    features: ["نقاوة عالية", "لمعالجة الملوحة", "يحسن التهوية"],
  },
  {
    id: 4,
    title: "سماد عضوي متكامل",
    excerpt: "تركيبة متوازنة من العناصر الغذائية الأساسية",
    image: "/images/products/product4.png",
    slug: "complete-organic-fertilizer",
    category: "fertilizer",
    categoryName: "الأسمدة",
    price: "175 ج.م",
    oldPrice: "200 ج.م",
    badge: "خصم 15%",
    badgeType: "sale",
    features: ["تركيبة متكاملة", "نمو أسرع", "آمن تماماً"],
  },
  {
    id: 5,
    title: "محفز نمو طبيعي",
    excerpt: "منشط حيوي يعزز نمو الجذور",
    image: "/images/products/growth-stimulator.jpg",
    slug: "natural-growth-stimulator",
    category: "fertilizer",
    categoryName: "الأسمدة",
    price: "250 ج.م",
    features: ["يعزز النمو", "مقاومة الإجهاد", "طبيعي 100%"],
  },
  {
    id: 6,
    title: "محسن تربة رملي",
    excerpt: "خليط خاص لتحسين بنية التربة الرملية",
    image: "/images/products/sandy-soil-improver.jpg",
    slug: "sandy-soil-improver",
    category: "soil",
    categoryName: "محسنات التربة",
    price: "140 ج.م",
    features: ["للتربة الرملية", "يحفظ الرطوبة", "يحسن البنية"],
  },
  {
    id: 7,
    title: "كمبوست دودي",
    excerpt: "أعلى جودة من الكمبوست المنتج بواسطة دود الأرض",
    image: "/images/products/vermicompost.jpg",
    slug: "vermicompost",
    category: "compost",
    categoryName: "الكمبوست",
    price: "220 ج.م",
    badge: "ممتاز",
    badgeType: "bestseller",
    features: ["أعلى جودة", "غني جداً", "ميكروبات نافعة"],
  },
  {
    id: 8,
    title: "طقم أدوات زراعية",
    excerpt: "مجموعة أدوات أساسية للعناية بالنباتات",
    image: "/images/products/garden-tools.jpg",
    slug: "garden-tools-set",
    category: "tools",
    categoryName: "أدوات زراعية",
    price: "350 ج.م",
    oldPrice: "400 ج.م",
    badge: "طقم",
    badgeType: "sale",
    features: ["8 قطع", "جودة عالية", "مقبض مريح"],
  },
];
useHead({
  title: "  المنتجات | شركة الندى",
  meta: [
    { name: "description", content: "احصل على أفضل أسعار الأسمدة والكمبوست" },
  ],
});

const filteredProducts = computed(() => {
  let result = [...allProducts];
  if (activeCategory.value !== "all")
    result = result.filter((p) => p.category === activeCategory.value);
  if (searchQuery.value.trim()) {
    const q = searchQuery.value.toLowerCase();
    result = result.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q) ||
        p.categoryName.toLowerCase().includes(q),
    );
  }
  switch (activeSort.value) {
    case "price-asc":
      result.sort((a, b) => parseInt(a.price) - parseInt(b.price));
      break;
    case "price-desc":
      result.sort((a, b) => parseInt(b.price) - parseInt(a.price));
      break;
    case "name-asc":
      result.sort((a, b) => a.title.localeCompare(b.title, "ar"));
      break;
    case "name-desc":
      result.sort((a, b) => b.title.localeCompare(a.title, "ar"));
      break;
    case "newest":
      result.sort((a, b) => b.id - a.id);
      break;
  }
  return result;
});

const paginatedProducts = computed(() =>
  filteredProducts.value.slice(0, currentPage.value * productsPerPage),
);
const totalPages = computed(() =>
  Math.ceil(filteredProducts.value.length / productsPerPage),
);

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
  activeSort.value = "default";
  currentPage.value = 1;
  isFilterOpen.value = false;
};

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
  setTimeout(
    () =>
      document
        .querySelectorAll(".animate-on-scroll")
        .forEach((el) => observer.observe(el)),
    100,
  );
};
onMounted(() => initObserver());
onUnmounted(() => {
  if (observer) observer.disconnect();
});
</script>

<style scoped>
.products-hero {
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
.products-container {
  display: grid;
  grid-template-columns: 1fr;
  gap: 40px;
  padding: 40px 20px 80px;
  align-items: start;
}
.mobile-filter-toggle {
  display: none;
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
.filters-section {
  background: var(--white);
  padding: 25px;
  border-radius: 20px;
  box-shadow: var(--shadow-md);
  position: sticky;
  top: 100px;
  max-height: calc(100vh - 120px);
  overflow-y: auto;
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
.filter-group {
  margin-bottom: 25px;
}
.filter-group-title {
  font-size: 1rem;
  color: var(--primary-color);
  font-weight: 700;
  margin-bottom: 15px;
}
.filter-list {
  list-style: none;
  padding: 0;
  margin: 0;
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
.sort-select {
  width: 100%;
  padding: 12px;
  border: 2px solid #eee;
  border-radius: 10px;
  font-size: 0.95rem;
  font-family: "Cairo", sans-serif;
  cursor: pointer;
  background: var(--white);
}
.sort-select:focus {
  outline: none;
  border-color: var(--accent-color);
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
  color: var(--white);
  transform: translateY(-2px);
}
.products-grid-wrapper {
  min-height: 500px;
}
.results-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
  padding-bottom: 15px;
  border-bottom: 1px solid #eee;
}
.results-info span {
  font-weight: 600;
  color: #666;
}
.view-toggle {
  display: flex;
  gap: 8px;
}
.view-btn {
  width: 36px;
  height: 36px;
  border-radius: 8px;
  background: var(--bg-light);
  color: var(--primary-color);
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
}
.view-btn.active,
.view-btn:hover {
  background: var(--accent-color);
  color: var(--white);
}
.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 25px;
}
.products-grid.list {
  grid-template-columns: 1fr;
}
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
}
.btn-reset:hover {
  background: var(--accent-color);
}
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
.features-section {
  padding: 60px 20px;
  background: var(--white);
  margin-bottom: 60px;
}
.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 30px;
  text-align: center;
}
.feature-item {
  padding: 25px;
  background: var(--bg-light);
  border-radius: 16px;
  transition: all 0.3s;
}
.feature-item:hover {
  transform: translateY(-5px);
  background: var(--white);
  box-shadow: var(--shadow-md);
}
.feature-item svg {
  color: var(--accent-color);
  margin-bottom: 15px;
}
.feature-item h4 {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--primary-color);
  margin-bottom: 8px;
}
.feature-item p {
  font-size: 0.9rem;
  color: #666;
  line-height: 1.6;
}
.cta-section {
  margin: 0 auto 80px;
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
.mobile-sort-select {
  width: 100%;
  padding: 12px;
  border: 2px solid #eee;
  border-radius: 10px;
  font-size: 0.95rem;
  font-family: "Cairo", sans-serif;
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
@media (max-width: 992px) {
  .products-container {
    grid-template-columns: 1fr;
    padding: 30px 15px 60px;
  }
  .desktop-only {
    display: none !important;
  }
  .mobile-filter-toggle {
    display: flex;
  }
  .products-grid {
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
  .products-grid {
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
  .features-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 15px;
  }
  .cta-buttons {
    flex-direction: column;
    align-items: center;
  }
  .btn-large {
    width: 100%;
    max-width: 280px;
  }
}
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
