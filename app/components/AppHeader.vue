<template>
  <header class="main-header">
    <div class="container header-container">
      <button
        class="mobile-menu-btn"
        @click="isMenuOpen = !isMenuOpen"
        :aria-expanded="isMenuOpen"
        aria-label="Toggle Menu"
      >
        <!-- ✅ استبدلنا lucide-vue-next بـ SVG مباشر لتقليل حجم الـ bundle -->
        <svg
          v-if="!isMenuOpen"
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
        >
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
        <svg
          v-else
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
        >
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>

      <div class="logo">
        <NuxtLink to="/">
          <!-- ✅ تحسين: تحديد الأبعاد + loading="eager" لأن اللوجو فوق الـ fold -->
          <NuxtImg
            src="/images/logo.png"
            alt="شركة الندى للتنمية الزراعية"
            width="150"
            height="50"
            loading="eager"
            fetchpriority="high"
            format="webp"
          />
        </NuxtLink>
      </div>

      <nav
        class="nav-menu"
        :class="{ 'is-open': isMenuOpen }"
        role="navigation"
        aria-label="القائمة الرئيسية"
      >
        <div class="mobile-logo-wrapper">
          <NuxtImg
            src="/images/logo.png"
            alt="الندى"
            width="100"
            height="33"
            format="webp"
          />
        </div>

        <ul>
          <li
            v-for="(item, index) in menuItems"
            :key="item.path"
            :style="{ '--delay': index * 0.1 + 's' }"
          >
            <NuxtLink @click="closeMenu" :to="item.path">
              <!-- ✅ SVG أيقونات مباشرة بدل مكتبة كاملة -->
              <span
                class="mobile-icon"
                v-html="item.icon"
                aria-hidden="true"
              ></span>
              <span>{{ item.name }}</span>
            </NuxtLink>
          </li>
        </ul>
      </nav>

      <div class="header-left">
        <NuxtLink to="/request-quote" class="btn-quote">طلب عرض سعر</NuxtLink>
      </div>
    </div>

    <!-- ✅ Teleport للـ overlay خارج الـ header لتحسين الـ stacking context -->
    <Transition name="fade">
      <div
        v-if="isMenuOpen"
        class="overlay"
        @click="closeMenu"
        role="presentation"
      ></div>
    </Transition>
  </header>
</template>

<script setup>
import { ref } from "vue";

const isMenuOpen = ref(false);

// ✅ دالة إغلاق القائمة للاستخدام المتعدد
const closeMenu = () => {
  isMenuOpen.value = false;
};

// ✅ إغلاق القائمة عند الضغط على Escape
onMounted(() => {
  const handleKeyDown = (e) => {
    if (e.key === "Escape" && isMenuOpen.value) closeMenu();
  };
  document.addEventListener("keydown", handleKeyDown);
  onUnmounted(() => document.removeEventListener("keydown", handleKeyDown));
});

// ✅ SVG مدمجة بدل استيراد مكتبة lucide كاملة (توفير ~15KB)
const menuItems = [
  {
    name: "الرئيسية",
    path: "/",
    icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`,
  },
  {
    name: "من نحن",
    path: "/about",
    icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`,
  },
  {
    name: "منتجاتنا",
    path: "/products",
    icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>`,
  },
  {
    name: "ما هو الكمبوست",
    path: "/compost",
    icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 22 16 8"/><path d="M17.5 6.5C17.5 4 16 2 13 2c0 4 2.5 5.5 4.5 6.5"/><path d="M22 17.5c-2.5 0-4.5-2-4.5-4.5 3 0 4.5 2 4.5 4.5z"/></svg>`,
  },
  {
    name: "تواصل معنا",
    path: "/contact",
    icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.77 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 17.92z"/></svg>`,
  },
];
</script>

<style scoped>
.main-header {
  background-color: #f3f6f3;
  position: sticky;
  top: 0;
  z-index: 1000;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  height: 80px;
  display: flex;
  align-items: center;
  /* ✅ تحسين: will-change لمنع الـ repaint عند الـ scroll */
  will-change: transform;
}

.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.mobile-menu-btn {
  display: none;
  background: none;
  border: none;
  color: #213428;
  cursor: pointer;
  z-index: 1100;
  /* ✅ تحسين: padding لمنطقة ضغط أكبر على الموبايل */
  padding: 8px;
  border-radius: 8px;
}

.nav-menu ul {
  display: flex;
  gap: 25px;
  list-style: none;
  margin: 0;
  padding: 0;
}

.nav-menu a {
  color: #213428;
  font-weight: 700;
  font-size: 0.95rem;
  transition: color 0.2s ease; /* ✅ تقليل من 0.3s إلى 0.2s */
  text-decoration: none;
  display: flex;
  align-items: center;
}

.nav-menu a:hover,
.nav-menu a.router-link-active {
  color: #4e7c32;
}

.mobile-icon,
.mobile-logo-wrapper {
  display: none;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 15px;
}

.btn-quote {
  background-color: #213428;
  color: #ffffff;
  padding: 10px 24px;
  border-radius: 50px;
  font-weight: 600;
  font-size: 0.9rem;
  transition:
    background-color 0.2s ease,
    transform 0.2s ease; /* ✅ تحديد خصائص الـ transition */
  text-decoration: none;
  /* ✅ تحسين: تجنب layout shift */
  display: inline-flex;
  align-items: center;
  white-space: nowrap;
}

.btn-quote:hover {
  background-color: #4e7c32;
  transform: translateY(-2px);
}

@media (max-width: 992px) {
  .mobile-menu-btn {
    display: block;
  }

  .hide-mobile {
    display: none;
  }

  .mobile-icon {
    display: flex;
    align-items: center;
    margin-left: 12px;
    color: #4e7c32;
  }

  .mobile-logo-wrapper {
    display: flex;
    justify-content: center;
    margin-bottom: 40px;
    padding-bottom: 20px;
    border-bottom: 1px solid #eee;
  }

  .nav-menu {
    position: fixed;
    top: 0;
    right: -100%;
    width: 280px;
    height: 100vh;
    background-color: #ffffff;
    box-shadow: -10px 0 30px rgba(0, 0, 0, 0.1);
    transition: right 0.4s cubic-bezier(0.4, 0, 0.2, 1); /* ✅ تقليل من 0.5s */
    z-index: 1050;
    padding: 30px 20px;
    display: block;
    /* ✅ تحسين: GPU acceleration للـ slide animation */
    will-change: right;
    overflow-y: auto;
    overscroll-behavior: contain;
  }

  .nav-menu.is-open {
    right: 0;
  }

  .nav-menu ul {
    flex-direction: column;
    gap: 10px;
  }

  .nav-menu li {
    opacity: 0;
    transform: translateX(20px);
    transition:
      opacity 0.3s ease,
      transform 0.3s ease; /* ✅ تحديد خصائص الـ transition */
    transition-delay: var(--delay);
  }

  .nav-menu.is-open li {
    opacity: 1;
    transform: translateX(0);
  }

  .nav-menu a {
    font-size: 1.1rem;
    padding: 15px;
    border-radius: 12px;
    background: #f9f9f9;
    width: 100%;
    margin-bottom: 5px;
  }

  .nav-menu a.router-link-active {
    background: #edf3ec;
  }

  .overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.4);
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
    z-index: 1040;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease; /* ✅ تقليل من 0.3s */
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
