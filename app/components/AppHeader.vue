<template>
  <header class="main-header">
    <div class="container header-container">
      <button
        class="mobile-menu-btn"
        @click="isMenuOpen = !isMenuOpen"
        aria-label="Toggle Menu"
      >
        <Menu v-if="!isMenuOpen" :size="28" />
        <X v-else :size="28" />
      </button>

      <div class="logo">
        <NuxtLink to="/">
          <NuxtImg src="/images/logo.png" alt="الندى" width="150" />
        </NuxtLink>
      </div>
      <nav class="nav-menu" :class="{ 'is-open': isMenuOpen }">
        <div class="mobile-logo-wrapper">
          <NuxtImg src="/images/logo.png" alt="الندى" width="100" />
        </div>

        <ul>
          <li
            v-for="(item, index) in menuItems"
            :key="index"
            :style="{ '--delay': index * 0.1 + 's' }"
          >
            <NuxtLink @click="isMenuOpen = false" :to="item.path">
              <component :is="item.icon" :size="20" class="mobile-icon" />
              <span>{{ item.name }}</span>
            </NuxtLink>
          </li>
        </ul>
      </nav>

      <div class="header-left">
        <NuxtLink to="/request-quote" class="btn-quote">طلب عرض سعر</NuxtLink>
        <!-- <div class="language-selector hide-mobile">
          <span class="icon-wrapper"><ChevronDown :size="16" /></span>
          <span>اللغة</span>
        </div> -->
      </div>
    </div>

    <Transition name="fade">
      <div v-if="isMenuOpen" class="overlay" @click="isMenuOpen = false"></div>
    </Transition>
  </header>
</template>

<script setup>
import { ref } from "vue";
import {
  ChevronDown,
  Menu,
  X,
  Home,
  Info,
  Leaf,
  ShoppingBag,
  PhoneCall,
} from "lucide-vue-next";

const isMenuOpen = ref(false);

const menuItems = [
  { name: "الرئيسية", path: "/", icon: Home },
  { name: "من نحن", path: "/about", icon: Info },
  { name: "منتجاتنا", path: "/products", icon: ShoppingBag },
  { name: "ما هو الكمبوست", path: "/compost", icon: Leaf },
  { name: "تواصل معنا", path: "/contact", icon: PhoneCall },
];
</script>

<style scoped>
/* --- التصميم الأساسي (Desktop First) --- */
.main-header {
  background-color: #f3f6f3;
  position: sticky;
  top: 0;
  z-index: 1000;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  height: 80px;
  display: flex;
  align-items: center;
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
  display: none; /* مخفي في الديسكتوب */
  background: none;
  border: none;
  color: #213428;
  cursor: pointer;
  z-index: 1100;
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
  transition: color 0.3s ease;
  text-decoration: none;
  display: flex;
  align-items: center;
}

.nav-menu a:hover,
.nav-menu a.router-link-active {
  color: #4e7c32;
}

/* إخفاء أيقونات الموبايل في الديسكتوب */
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
  transition: all 0.3s ease;
  text-decoration: none;
}

.btn-quote:hover {
  background-color: #4e7c32;
  transform: translateY(-2px);
}

.language-selector {
  display: flex;
  align-items: center;
  gap: 5px;
  color: #213428;
  cursor: pointer;
}

/* --- تعديلات الشاشات الصغيرة (Mobile & Tablet) --- */
@media (max-width: 992px) {
  .mobile-menu-btn {
    display: block;
  }

  .hide-mobile {
    display: none;
  }

  .mobile-icon {
    display: block; /* إظهار الأيقونات في الموبايل فقط */
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
    right: -100%; /* مخفية */
    width: 280px;
    height: 100vh;
    background-color: #ffffff;
    box-shadow: -10px 0 30px rgba(0, 0, 0, 0.1);
    transition: right 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    z-index: 1050;
    padding: 30px 20px;
    display: block; /* لضمان ظهور القائمة عمودياً */
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
    transition: all 0.4s ease forwards;
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
    z-index: 1040;
  }
}

/* انميشن التلاشي للأوفرلاي */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
