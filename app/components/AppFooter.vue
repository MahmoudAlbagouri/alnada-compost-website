<template>
  <footer class="main-footer">
    <div class="container footer-container">
      <div class="footer-section links-section">
        <h3>المعلومات</h3>
        <ul>
          <li><NuxtLink to="/">الرئيسية</NuxtLink></li>
          <li><NuxtLink to="/about">من نحن</NuxtLink></li>
          <li><NuxtLink to="/products">منتجاتنا</NuxtLink></li>
          <li><NuxtLink to="/compost">ما هو الكمبوست</NuxtLink></li>
          <li><NuxtLink to="/contact">اتصل بنا</NuxtLink></li>
        </ul>
      </div>
      <div class="footer-logo-center">
        <div class="logo-overlay">
          <NuxtImg src="/images/logo.png" alt="الندى El Nada" width="180" />
        </div>
      </div>

      <div class="footer-section links-section">
        <h3>المنتجات</h3>
        <ul>
          <li><NuxtLink to="/products/powder">كمبوست بودر</NuxtLink></li>
          <li><NuxtLink to="/products/liquid">كمبوست سائل</NuxtLink></li>
          <li><NuxtLink to="/products/gypsum">جبس زراعي</NuxtLink></li>
        </ul>
      </div>
      <div class="footer-section social-section">
        <h3>تابعنا</h3>
        <div class="social-icons">
          <a href="#" aria-label="Instagram"><Instagram :size="20" /></a>
          <a href="#" aria-label="Facebook"><Facebook :size="20" /></a>
          <a href="#" aria-label="Message"><MessageCircle :size="20" /></a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { Facebook, Instagram, MessageCircle } from "lucide-vue-next";
</script>

<style scoped>
.main-footer {
  /* خلفية العشب */
  background-image: url("/images/grass1.png");
  background-size: cover;
  background-position: center;
  position: relative;
  color: #ffffff;

  /* زيادة الـ Padding العلوي لأن الزجزاج سيقص جزءاً من الأعلى */
  padding: 120px 0 60px 0;
  direction: rtl;

  /* تأثير الزجزاج (العشب) - نقاط عشوائية لتعطي مظهر غير منتظم */
  -webkit-clip-path: polygon(
    0% 20%,
    3% 5%,
    7% 18%,
    11% 0%,
    15% 22%,
    20% 8%,
    24% 19%,
    28% 2%,
    33% 25%,
    38% 6%,
    42% 18%,
    47% 0%,
    52% 21%,
    56% 5%,
    60% 17%,
    65% 2%,
    70% 24%,
    75% 7%,
    80% 19%,
    85% 0%,
    90% 22%,
    95% 4%,
    100% 18%,
    100% 100%,
    0% 100%
  );
  clip-path: polygon(
    0% 20%,
    3% 5%,
    7% 18%,
    11% 0%,
    15% 22%,
    20% 8%,
    24% 19%,
    28% 2%,
    33% 25%,
    38% 6%,
    42% 18%,
    47% 0%,
    52% 21%,
    56% 5%,
    60% 17%,
    65% 2%,
    70% 24%,
    75% 7%,
    80% 19%,
    85% 0%,
    90% 22%,
    95% 4%,
    100% 18%,
    100% 100%,
    0% 100%
  );
}

/* طبقة التعتيم لضمان وضوح النص فوق صورة العشب */
.main-footer::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5); /* زيادة التعتيم قليلاً للوضوح */
  z-index: 1;
}

.footer-container {
  position: relative;
  z-index: 2;
  display: grid;
  grid-template-columns: 1fr 1.5fr 2fr 1.5fr;
  align-items: start;
  gap: 20px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.footer-logo-center {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.logo-overlay {
  background: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(10px);
  padding: 30px;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.footer-section h3 {
  font-size: 1.3rem;
  font-weight: 800;
  margin-bottom: 20px;
  color: #a8e063; /* لون أخضر فاتح للعناوين ليتماشى مع الثيم */
}

.footer-section ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-section ul li {
  margin-bottom: 10px;
}

.footer-section a {
  color: rgba(255, 255, 255, 0.85);
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
}

.footer-section a:hover {
  color: #ffffff;
  padding-right: 8px;
}

.social-icons {
  display: flex;
  flex-direction: row; /* جعل الأيقونات بجانب بعضها */
  gap: 12px;
}

.social-icons a {
  background: rgba(255, 255, 255, 0.2);
  color: white;
  width: 38px;
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.3s ease;
}

.social-icons a:hover {
  background: #4e7c32;
  transform: translateY(-5px);
}

/* --- التجاوب مع الشاشات المختلفة --- */
@media (max-width: 992px) {
  .footer-container {
    grid-template-columns: 1fr 1fr;
    gap: 30px;
    text-align: center;
  }
  .footer-logo-center {
    grid-column: span 2;
    order: -1; /* رفع اللوجو للأعلى في الموبايل */
    margin-bottom: 20px;
  }
  .social-icons {
    justify-content: center;
  }
  .main-footer {
    padding-top: 100px;
  }
}

@media (max-width: 576px) {
  .footer-container {
    grid-template-columns: 1fr;
  }
  .footer-logo-center {
    grid-column: span 1;
  }
}
</style>
