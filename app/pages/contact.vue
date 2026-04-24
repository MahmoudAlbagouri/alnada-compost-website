<template>
  <div class="contact-page">
    <!-- Hero Section -->
    <section class="contact-hero">
      <div class="container hero-content animate-on-scroll">
        <h1 class="hero-title">تواصل معنا</h1>
        <p class="hero-subtitle">
          خبرتنا بين إيديك لنتائج أفضل. فريق الندى جاهز للرد على استفساراتك
          وتقديم الحلول المناسبة لتحقيق أعلى إنتاجية.
+        </p>
      </div>
      <div class="wave-bottom">
        <svg viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path
            fill="#e6ede8"
            fill-opacity="1"
            d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>
    </section>

    <!-- Contact Info & Form Section -->
    <section class="contact-section container">
      <div class="contact-grid">
        <!-- Contact Info Cards -->
        <div class="info-column animate-on-scroll">
          <div class="info-card">
            <div class="icon-wrapper">
              <Mail :size="24" />
            </div>
            <h3>البريد الإلكتروني</h3>
            <a :href="`mailto:${primaryEmail}`" class="contact-link">{{
              primaryEmail
            }}</a>
            <p class="info-desc">نرد على جميع الاستفسارات خلال 24 ساعة</p>
          </div>

          <div class="info-card">
            <div class="icon-wrapper">
              <Phone :size="24" />
            </div>
            <h3>اتصل بنا</h3>
            <a href="tel:+201000000000" class="contact-link"
              >+20 100 000 0000</a
            >
            <p class="info-desc">من السبت للخميس، 9 صباحاً - 5 مساءً</p>
          </div>

          <div class="info-card">
            <div class="icon-wrapper">
              <MapPin :size="24" />
            </div>
            <h3>مقرنا الرئيسي</h3>
            <p class="contact-link">مصر، المنطقة الزراعية، مبنى الندى</p>
            <p class="info-desc">يسعدنا زيارتك في أي وقت</p>
          </div>

          <!-- Social Links -->
          <div class="social-box">
            <h4>تابعنا على وسائل التواصل</h4>
            <div class="social-links">
              <a href="#" class="social-icon" aria-label="Facebook"
                ><Facebook
              /></a>
              <a href="#" class="social-icon" aria-label="Instagram"
                ><Instagram
              /></a>
              <a href="#" class="social-icon" aria-label="WhatsApp"
                ><MessageCircle
              /></a>
            </div>
          </div>
        </div>

        <!-- Contact Form -->
        <div class="form-column animate-on-scroll" style="--delay: 0.2s">
          <div class="form-card">
            <h2 class="form-title">أرسل لنا رسالة</h2>

            <form @submit.prevent="handleSubmit" class="contact-form">
              <!-- Name -->
              <div class="form-group">
                <label for="name"
                  >الاسم الكامل <span class="required">*</span></label
                >
                <input
                  type="text"
                  id="name"
                  v-model="form.name"
                  :class="{ error: errors.name }"
                  placeholder="أدخل اسمك هنا"
                  @blur="validateField('name')"
                />
                <span class="error-msg" v-if="errors.name">{{
                  errors.name
                }}</span>
              </div>

              <!-- Email -->
              <div class="form-group">
                <label for="email"
                  >البريد الإلكتروني <span class="required">*</span></label
                >
                <input
                  type="email"
                  id="email"
                  v-model="form.email"
                  :class="{ error: errors.email }"
                  placeholder="example@email.com"
                  @blur="validateField('email')"
                />
                <span class="error-msg" v-if="errors.email">{{
                  errors.email
                }}</span>
              </div>

              <!-- Phone -->
              <div class="form-group">
                <label for="phone">رقم الهاتف</label>
                <input
                  type="tel"
                  id="phone"
                  v-model="form.phone"
                  placeholder="01xxxxxxxxx"
                />
              </div>

              <!-- Subject -->
              <div class="form-group">
                <label for="subject"
                  >الموضوع <span class="required">*</span></label
                >
                <select
                  id="subject"
                  v-model="form.subject"
                  :class="{ error: errors.subject }"
                  @change="validateField('subject')"
                >
                  <option value="" disabled>اختر موضوع الرسالة</option>
                  <option value="general">استفسار عام</option>
                  <option value="products">طلب منتجات</option>
                  <option value="support">دعم فني</option>
                  <option value="partnership">شراكة وتعاون</option>
                </select>
                <span class="error-msg" v-if="errors.subject">{{
                  errors.subject
                }}</span>
              </div>

              <!-- Message -->
              <div class="form-group">
                <label for="message"
                  >الرسالة <span class="required">*</span></label
                >
                <textarea
                  id="message"
                  v-model="form.message"
                  :class="{ error: errors.message }"
                  rows="5"
                  placeholder="اكتب رسالتك هنا..."
                  @blur="validateField('message')"
                ></textarea>
                <span class="error-msg" v-if="errors.message">{{
                  errors.message
                }}</span>
              </div>

              <!-- Submit Button -->
              <button type="submit" class="btn-submit" :disabled="isSubmitting">
                <span v-if="isSubmitting" class="loader"></span>
                <span v-else>إرسال الرسالة</span>
              </button>

              <!-- Status Messages -->
              <Transition name="fade">
                <div
                  v-if="submitStatus"
                  :class="`status-msg ${submitStatus.type}`"
                >
                  {{ submitStatus.text }}
                </div>
              </Transition>
            </form>
          </div>
        </div>
      </div>
    </section>

    <!-- Map Section (Placeholder) -->
    <section class="map-section container animate-on-scroll">
      <div class="map-wrapper">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3453.21498202691!2d31.378417359807113!3d30.059371617967418!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14583f68b7d35b1f%3A0xea4d01ac0898394e!2zTWRpem9uIC0g2YXYr9iy2YjZhg!5e0!3m2!1sar!2seg!4v1773377729654!5m2!1sar!2seg"
          width="100%"
          height="450"
          style="border: 0"
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
          class="google-map"
        ></iframe>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Instagram,
  MessageCircle,
  Send,
} from "lucide-vue-next";

// البريد الإلكتروني الرئيسي
const primaryEmail = "mahmodnasser42@gmail.com";

// حالة النموذج
const isSubmitting = ref(false);
const submitStatus = ref(null);
const form = reactive({
  name: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
});
const errors = reactive({});
useHead({
  title: "  تواصل معنا | شركة الندى",
  meta: [
    { name: "description", content: "احصل على أفضل أسعار الأسمدة والكمبوست" },
  ],
});
// دوال التحقق (Validation)
const validateField = (field) => {
  switch (field) {
    case "name":
      if (!form.name.trim()) errors.name = "الاسم مطلوب";
      else if (form.name.length < 3)
        errors.name = "الاسم يجب أن يكون 3 أحرف على الأقل";
      else delete errors.name;
      break;
    case "email":
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!form.email.trim()) errors.email = "البريد الإلكتروني مطلوب";
      else if (!emailRegex.test(form.email))
        errors.email = "صيغة البريد غير صحيحة";
      else delete errors.email;
      break;
    case "subject":
      if (!form.subject) errors.subject = "يرجى اختيار موضوع الرسالة";
      else delete errors.subject;
      break;
    case "message":
      if (!form.message.trim()) errors.message = "الرسالة مطلوبة";
      else if (form.message.length < 10) errors.message = "الرسالة قصيرة جداً";
      else delete errors.message;
      break;
  }
};

const validateForm = () => {
  validateField("name");
  validateField("email");
  validateField("subject");
  validateField("message");
  return Object.keys(errors).length === 0;
};

// معالجة الإرسال
const handleSubmit = async () => {
  if (!validateForm()) {
    showStatus("error", "يرجى تصحيح الأخطاء في النموذج");
    return;
  }

  isSubmitting.value = true;
  submitStatus.value = null;

  try {
    // ---------------------------------------------------------
    // ملاحظة للمطور: خيارات إرسال البريد الفعلي
    // ---------------------------------------------------------

    // الخيار 1: إذا كان لديك Backend (Nest.js)
    /*
    await $fetch('/api/contact', {
      method: 'POST',
      body: { ...form, recipient: primaryEmail }
    });
    */

    // الخيار 2: استخدام خدمة Formspree (بدون Backend)
    /*
    await fetch('https://formspree.io/f/YOUR_FORM_ID', {
      method: 'POST',
      body: JSON.stringify(form),
      headers: { 'Content-Type': 'application/json' }
    });
    */

    // الخيار 3: رابط mailto (يفتح تطبيق البريد لدى المستخدم)
    // هذا الخيار موجود افتراضياً للتجربة المباشرة
    const subject = encodeURIComponent(form.subject);
    const body = encodeURIComponent(`
      الاسم: ${form.name}
      الهاتف: ${form.phone}
      البريد: ${form.email}
      
      الرسالة:
      ${form.message}
    `);

    // محاكاة تأخير الشبكة للتجربة
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // فتح عميل البريد (اختياري - يمكن حذفه إذا تم استخدام API)
    window.location.href = `mailto:${primaryEmail}?subject=${subject}&body=${body}`;

    showStatus(
      "success",
      "تم تجهيز رسالتك بنجاح! سيتم فتح تطبيق البريد للإرسال.",
    );

    // إعادة تعيين النموذج
    form.name = "";
    form.email = "";
    form.phone = "";
    form.subject = "";
    form.message = "";
  } catch (error) {
    console.error("Error sending message:", error);
    showStatus("error", "حدث خطأ أثناء الإرسال، يرجى المحاولة لاحقاً");
  } finally {
    isSubmitting.value = false;
  }
};

const showStatus = (type, text) => {
  submitStatus.value = { type, text };
  // إخفاء الرسالة بعد 5 ثواني
  setTimeout(() => {
    submitStatus.value = null;
  }, 5000);
};

// أنيميشن السكرول
onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
        }
      });
    },
    { threshold: 0.1 },
  );

  document
    .querySelectorAll(".animate-on-scroll")
    .forEach((el) => observer.observe(el));
});
</script>

<style scoped>
/* --- Hero Section --- */
.contact-hero {
  background: linear-gradient(
    135deg,
    var(--primary-color) 0%,
    var(--accent-color) 100%
  );
  color: var(--white);
  padding: 100px 0 140px;
  text-align: center;
  position: relative;
  overflow: hidden;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 900;
  margin-bottom: 20px;
}

.hero-subtitle {
  font-size: 1.3rem;
  opacity: 0.95;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.7;
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

/* --- Main Contact Section --- */
.contact-section {
  padding: 80px 20px;
  margin-top: -60px; /* Overlap effect */
  position: relative;
  z-index: 10;
}

.contact-grid {
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: 40px;
  align-items: start;
}

/* --- Info Cards --- */
.info-column {
  display: flex;
  flex-direction: column;
  gap: 25px;
}

.info-card {
  background: var(--white);
  padding: 30px;
  border-radius: 16px;
  box-shadow: var(--shadow-md);
  transition: var(--transition-standard);
  border-right: 4px solid var(--accent-color);
}

.info-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-lg);
}

.icon-wrapper {
  width: 50px;
  height: 50px;
  background: rgba(78, 124, 50, 0.1);
  color: var(--accent-color);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
}

.info-card h3 {
  font-size: 1.3rem;
  color: var(--primary-color);
  margin-bottom: 10px;
  font-weight: 700;
}

.contact-link {
  display: block;
  color: var(--black);
  font-weight: 600;
  margin-bottom: 8px;
  transition: color 0.3s;
  direction: ltr; /* للأرقام والبريد */
  text-align: right;
}

.contact-link:hover {
  color: var(--accent-color);
}

.info-desc {
  font-size: 0.9rem;
  color: #666;
  margin: 0;
}

.social-box {
  background: var(--white);
  padding: 25px;
  border-radius: 16px;
  box-shadow: var(--shadow-md);
  margin-top: 10px;
  text-align: center;
}

.social-box h4 {
  color: var(--primary-color);
  margin-bottom: 15px;
  font-size: 1.1rem;
}

.social-links {
  display: flex;
  justify-content: center;
  gap: 15px;
}

.social-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--bg-light);
  color: var(--primary-color);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.social-icon:hover {
  background: var(--accent-color);
  color: var(--white);
  transform: translateY(-3px);
}

/* --- Form Card --- */
.form-card {
  background: var(--white);
  padding: 40px;
  border-radius: 20px;
  box-shadow: var(--shadow-lg);
}

.form-title {
  font-size: 1.8rem;
  color: var(--primary-color);
  margin-bottom: 30px;
  font-weight: 800;
  text-align: center;
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
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

.required {
  color: #e74c3c;
}

.form-group input,
.form-group select,
.form-group textarea {
  padding: 14px;
  border: 2px solid #eee;
  border-radius: 10px;
  font-size: 1rem;
  font-family: "Cairo", sans-serif;
  transition: all 0.3s;
  background: #fafafa;
  width: 100%;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  outline: none;
  border-color: var(--accent-color);
  background: var(--white);
  box-shadow: 0 0 0 4px rgba(78, 124, 50, 0.1);
}

.form-group input.error,
.form-group select.error,
.form-group textarea.error {
  border-color: #e74c3c;
  background: #fff5f5;
}

.error-msg {
  color: #e74c3c;
  font-size: 0.85rem;
  font-weight: 500;
}

.btn-submit {
  background: var(--primary-color);
  color: var(--white);
  border: none;
  padding: 16px;
  border-radius: 12px;
  font-size: 1.1rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-top: 10px;
  font-family: "Cairo", sans-serif;
}

.btn-submit:hover:not(:disabled) {
  background: var(--accent-color);
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.btn-submit:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

/* Loader Animation */
.loader {
  width: 20px;
  height: 20px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: #fff;
  animation: spin 1s ease-in-out infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* Status Messages */
.status-msg {
  padding: 12px;
  border-radius: 8px;
  font-weight: 500;
  text-align: center;
  margin-top: 10px;
}
.status-msg.success {
  background: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
}
.status-msg.error {
  background: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* --- Map Section --- */
.map-section {
  padding: 0 20px 80px;
}

.map-wrapper {
  border-radius: 20px;
  overflow: hidden;
  box-shadow: var(--shadow-md);
  height: 400px;
  background: #f0f0f0;
}

.map-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: var(--primary-color);
  background: var(--bg-light);
  gap: 15px;
}

/* --- Animations --- */
.animate-on-scroll {
  opacity: 0;
  transform: translateY(30px);
  transition:
    opacity 0.6s ease-out,
    transform 0.6s ease-out;
  transition-delay: var(--delay, 0s);
}
.animate-on-scroll.is-visible {
  opacity: 1;
  transform: translateY(0);
}

/* --- Responsive --- */
@media (max-width: 992px) {
  .contact-grid {
    grid-template-columns: 1fr;
  }
  .info-column {
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
  }
  .info-card,
  .social-box {
    flex: 1 1 45%;
    min-width: 250px;
  }
  .contact-hero {
    padding: 80px 0 120px;
  }
  .hero-title {
    font-size: 2.5rem;
  }
}

@media (max-width: 576px) {
  .info-column {
    flex-direction: column;
  }
  .info-card,
  .social-box {
    flex: 1 1 100%;
  }
  .form-card {
    padding: 25px;
  }
  .hero-title {
    font-size: 2rem;
  }
}
</style>
