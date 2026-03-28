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
.main-footer[data-v-a11a4c1f] {
  background-image: url(/images/grass1.png);
  background-size: cover;
  background-position: center;
  position: relative;
  color: #ffffff;
  padding: 120px 0 60px 0;
  direction: rtl;

  /* تم تضييق المسافات إلى حوالي 30-40px مع تغيير الارتفاعات عشوائياً بين 0px و 50px */
  clip-path: polygon(
    0px 45px,
    30px 15px,
    55px 38px,
    85px 5px,
    120px 42px,
    155px 12px,
    190px 35px,
    220px 0px,
    255px 44px,
    290px 18px,
    325px 40px,
    360px 2px,
    400px 48px,
    435px 10px,
    470px 36px,
    510px 0px,
    545px 42px,
    580px 15px,
    620px 33px,
    660px 5px,
    700px 45px,
    740px 12px,
    780px 38px,
    820px 0px,
    860px 44px,
    900px 18px,
    940px 36px,
    980px 3px,
    1020px 49px,
    1060px 10px,
    1100px 37px,
    1140px 0px,
    1180px 42px,
    1220px 14px,
    1260px 35px,
    1300px 6px,
    1340px 46px,
    1380px 11px,
    1420px 39px,
    1460px 0px,
    1500px 43px,
    1540px 16px,
    1580px 34px,
    1620px 4px,
    1660px 47px,
    1700px 13px,
    1740px 38px,
    1780px 0px,
    1820px 45px,
    1860px 19px,
    1900px 36px,
    1940px 7px,
    1980px 41px,
    2000px 15px,
    2000px 100%,
    0px 100%
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
