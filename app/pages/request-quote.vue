<template>
  <div class="quote-page">
    <section class="quote-hero">
      <div class="container hero-content animate-on-scroll">
        <h1 class="hero-title">طلب عرض سعر</h1>
        <p class="hero-subtitle">
          احصل على عرض سعر مخصص لمزرعتك أو مشروعك الزراعي خلال 24 ساعة عبر
          واتساب
        </p>
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

    <section class="quote-container container">
      <aside class="info-column animate-on-scroll">
        <div class="info-card">
          <div class="icon-wrapper">
            <MessageCircle :size="24" />
          </div>
          <h3>واتساب مباشر</h3>
          <a
            href="https://wa.me/201032392542"
            class="contact-link"
            target="_blank"
            >+20 111 002 2133</a
          >
          <p class="info-desc">أسرع وسيلة للحصول على عرض السعر</p>
        </div>

        <div class="info-card">
          <div class="icon-wrapper">
            <Mail :size="24" />
          </div>
          <h3>البريد الإلكتروني</h3>
          <a :href="`mailto:${primaryEmail}`" class="contact-link">{{
            primaryEmail
          }}</a>
          <p class="info-desc">نرد على طلبات العروض خلال يوم عمل واحد</p>
        </div>

        <div class="trust-box">
          <h4>لماذا تطلب عرض سعر منا؟</h4>
          <ul class="trust-list">
            <li><CheckCircle :size="16" /> أسعار تنافسية للكميات الكبيرة</li>
            <li><CheckCircle :size="16" /> خصومات خاصة للمزارع والشركات</li>
            <li><CheckCircle :size="16" /> استشارة فنية مجانية مع العرض</li>
          </ul>
        </div>
      </aside>

      <main class="form-column animate-on-scroll" style="--delay: 0.2s">
        <div class="form-card">
          <h2 class="form-title">بيانات طلب العرض</h2>
          <p class="form-subtitle">
            املأ النموذج وسنقوم بالرد عليك برسالة عبر واتساب
          </p>

          <form @submit.prevent="handleSubmit" class="quote-form">
            <div class="form-section">
              <h3 class="section-label">البيانات الشخصية</h3>
              <div class="form-row">
                <div class="form-group">
                  <label for="name"
                    >الاسم الكامل <span class="required">*</span></label
                  >
                  <input
                    type="text"
                    id="name"
                    v-model="form.name"
                    :class="{ error: errors.name }"
                    placeholder="مثال: محمد أحمد علي"
                    @blur="validateField('name')"
                  />
                  <span class="error-msg" v-if="errors.name">{{
                    errors.name
                  }}</span>
                </div>
                <div class="form-group">
                  <label for="company">اسم المزرعة / الشركة</label>
                  <input
                    type="text"
                    id="company"
                    v-model="form.company"
                    placeholder="اختياري"
                  />
                </div>
              </div>

              <div class="form-row">
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
                <div class="form-group">
                  <label for="phone"
                    >رقم الهاتف <span class="required">*</span></label
                  >
                  <input
                    type="tel"
                    id="phone"
                    v-model="form.phone"
                    :class="{ error: errors.phone }"
                    placeholder="01xxxxxxxxx"
                    @blur="validateField('phone')"
                  />
                  <span class="error-msg" v-if="errors.phone">{{
                    errors.phone
                  }}</span>
                </div>
              </div>
            </div>

            <div class="form-section">
              <h3 class="section-label">تفاصيل الطلب</h3>
              <div class="form-group">
                <label for="product"
                  >المنتج المطلوب <span class="required">*</span></label
                >
                <select
                  id="product"
                  v-model="form.product"
                  :class="{ error: errors.product }"
                  @change="validateField('product')"
                >
                  <option value="" disabled>اختر المنتج...</option>
                  <option value="compost-powder">
                    كمبوست بودر (شيكارة 25 كجم)
                  </option>
                  <option value="compost-liquid">
                    كمبوست سائل (لتر/جالون)
                  </option>
                  <option value="gypsum">جبس زراعي نقي</option>
                  <option value="organic-fertilizer">سماد عضوي متكامل</option>
                  <option value="mixed">مجموعة منتجات (عرض شامل)</option>
                </select>
                <span class="error-msg" v-if="errors.product">{{
                  errors.product
                }}</span>
              </div>

              <div class="form-row">
                <div class="form-group">
                  <label for="quantity"
                    >الكمية التقريبية <span class="required">*</span></label
                  >
                  <select
                    id="quantity"
                    v-model="form.quantity"
                    :class="{ error: errors.quantity }"
                  >
                    <option value="" disabled>اختر الكمية...</option>
                    <option value="small">أقل من 100 وحدة</option>
                    <option value="medium">100 - 500 وحدة</option>
                    <option value="large">500 - 1000 وحدة</option>
                    <option value="wholesale">أكثر من 1000 وحدة</option>
                  </select>
                  <span class="error-msg" v-if="errors.quantity">{{
                    errors.quantity
                  }}</span>
                </div>
                <div class="form-group">
                  <label for="area">المساحة (فدان)</label>
                  <input
                    type="number"
                    id="area"
                    v-model="form.area"
                    placeholder="مثال: 50"
                  />
                </div>
              </div>

              <div class="form-group">
                <label for="message">تفاصيل إضافية</label>
                <textarea
                  id="message"
                  v-model="form.message"
                  rows="4"
                  placeholder="اكتب أي تفاصيل أخرى هنا..."
                ></textarea>
              </div>
            </div>

            <button
              type="submit"
              class="btn-submit whatsapp-btn"
              :disabled="isSubmitting"
            >
              <span v-if="isSubmitting" class="loader"></span>
              <div v-else class="btn-content">
                <MessageCircle :size="20" />
                <span>إرسال الطلب عبر واتساب</span>
              </div>
            </button>

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
      </main>
    </section>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import {
  Mail,
  Phone,
  Clock,
  CheckCircle,
  MessageCircle,
} from "lucide-vue-next";

const primaryEmail = "mahmodnasser42@gmail.com";
const isSubmitting = ref(false);
const submitStatus = ref(null);

const form = reactive({
  name: "",
  company: "",
  email: "",
  phone: "",
  product: "",
  quantity: "",
  area: "",
  message: "",
});
useHead({
  title: "طلب عرض سعر | شركة الندى",
  meta: [
    { name: "description", content: "احصل على أفضل أسعار الأسمدة والكمبوست" },
  ],
});
const errors = reactive({});

const validateField = (field) => {
  if (field === "name") {
    if (!form.name.trim()) errors.name = "الاسم مطلوب";
    else delete errors.name;
  }
  if (field === "email") {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.email.trim()) errors.email = "البريد مطلوب";
    else if (!emailRegex.test(form.email)) errors.email = "بريد غير صحيح";
    else delete errors.email;
  }
  if (field === "phone") {
    if (!form.phone.trim()) errors.phone = "رقم الهاتف مطلوب";
    else delete errors.phone;
  }
  if (field === "product") {
    if (!form.product) errors.product = "يرجى اختيار المنتج";
    else delete errors.product;
  }
  if (field === "quantity") {
    if (!form.quantity) errors.quantity = "يرجى اختيار الكمية";
    else delete errors.quantity;
  }
};

const validateForm = () => {
  validateField("name");
  validateField("email");
  validateField("phone");
  validateField("product");
  validateField("quantity");
  return Object.keys(errors).length === 0;
};

const handleSubmit = async () => {
  if (!validateForm()) {
    showStatus("error", "يرجى إكمال البيانات المطلوبة أولاً");
    return;
  }

  isSubmitting.value = true;

  try {
    const whatsappNumber = "201032392542"; // قم بتغيير الرقم هنا

    const productLabels = {
      "compost-powder": "كمبوست بودر",
      "compost-liquid": "كمبوست سائل",
      gypsum: "جبس زراعي",
      "organic-fertilizer": "سماد عضوي",
      mixed: "مجموعة منتجات",
    };

    const messageText = `*طلب عرض سعر جديد* 📄
-------------------------------
👤 *الاسم:* ${form.name}
🏢 *الشركة:* ${form.company || "غير محدد"}
📱 *الهاتف:* ${form.phone}

📦 *الطلب:*
- *المنتج:* ${productLabels[form.product] || form.product}
- *الكمية:* ${form.quantity}
- *المساحة:* ${form.area ? form.area + " فدان" : "غير محدد"}

📝 *ملاحظات:*
${form.message || "لا يوجد"}
-------------------------------`;

    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(messageText)}`;

    await new Promise((r) => setTimeout(r, 800));
    window.open(whatsappUrl, "_blank");

    showStatus("success", "تم التجهيز! جاري فتح واتساب...");
    Object.keys(form).forEach((k) => (form[k] = ""));
  } catch (e) {
    showStatus("error", "حدث خطأ ما");
  } finally {
    isSubmitting.value = false;
  }
};

const showStatus = (type, text) => {
  submitStatus.value = { type, text };
  setTimeout(() => (submitStatus.value = null), 5000);
};

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("is-visible");
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
.quote-hero {
  background: linear-gradient(
    135deg,
    var(--primary-color) 0%,
    var(--accent-color) 100%
  );
  color: var(--white);
  padding: 80px 0 120px;
  text-align: center;
  position: relative;
}

.hero-title {
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 900;
  margin-bottom: 15px;
}

.hero-subtitle {
  font-size: clamp(1rem, 2.5vw, 1.2rem);
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
  height: 80px;
  display: block;
}

/* --- Main Layout --- */
.quote-container {
  display: grid;
  grid-template-columns: 350px 1fr;
  gap: 50px;
  padding: 60px 20px 100px;
  align-items: start;
  margin-top: -60px;
  position: relative;
  z-index: 10;
}

/* --- Info Column --- */
.info-column {
  display: flex;
  flex-direction: column;
  gap: 25px;
}

.info-card {
  background: var(--white);
  padding: 25px;
  border-radius: 16px;
  box-shadow: var(--shadow-md);
  transition: transform 0.3s ease;
  border-right: 4px solid var(--accent-color);
}

.info-card:hover {
  transform: translateY(-5px);
}

.icon-wrapper {
  width: 45px;
  height: 45px;
  background: rgba(78, 124, 50, 0.1);
  color: var(--accent-color);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 15px;
}

.info-card h3 {
  font-size: 1.2rem;
  color: var(--primary-color);
  margin-bottom: 8px;
  font-weight: 700;
}

.contact-link {
  display: block;
  color: var(--black);
  font-weight: 600;
  margin-bottom: 6px;
  transition: color 0.3s;
  direction: ltr;
  text-align: right;
  font-size: 1.05rem;
}

.contact-link:hover {
  color: var(--accent-color);
}

.info-desc {
  font-size: 0.85rem;
  color: #666;
  margin: 0;
}

/* Trust Box */
.trust-box {
  background: linear-gradient(135deg, #f0f7f1, #e6ede8);
  padding: 25px;
  border-radius: 16px;
  border: 1px solid rgba(78, 124, 50, 0.1);
}

.trust-box h4 {
  color: var(--primary-color);
  margin-bottom: 15px;
  font-size: 1.1rem;
  font-weight: 700;
}

.trust-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.trust-list li {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 0.9rem;
  color: #444;
  font-weight: 500;
}

.trust-list li svg {
  color: var(--accent-color);
  flex-shrink: 0;
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
  margin-bottom: 10px;
  font-weight: 800;
  text-align: center;
}

.form-subtitle {
  text-align: center;
  color: #666;
  margin-bottom: 30px;
  font-size: 0.95rem;
}

.quote-form {
  display: flex;
  flex-direction: column;
  gap: 25px;
}

.form-section {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding-bottom: 25px;
  border-bottom: 1px solid #eee;
}

.form-section:last-of-type {
  border-bottom: none;
}

.section-label {
  font-size: 1.1rem;
  color: var(--accent-color);
  font-weight: 700;
  margin-bottom: 5px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.section-label::before {
  content: "";
  display: block;
  width: 4px;
  height: 20px;
  background: var(--accent-color);
  border-radius: 2px;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
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

.helper-text {
  font-size: 0.8rem;
  color: #888;
  margin-top: -4px;
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

/* Loader */
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
  padding: 15px;
  border-radius: 10px;
  font-weight: 500;
  text-align: center;
  margin-top: 10px;
  font-size: 0.95rem;
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
  .quote-container {
    grid-template-columns: 1fr;
    padding: 40px 20px 80px;
    margin-top: -40px;
  }

  .info-column {
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
  }

  .info-card,
  .trust-box {
    flex: 1 1 45%;
    min-width: 250px;
  }

  .quote-hero {
    padding: 60px 0 100px;
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
  .trust-box {
    flex: 1 1 100%;
  }

  .form-card {
    padding: 25px;
  }

  .form-row {
    grid-template-columns: 1fr;
    gap: 15px;
  }

  .hero-title {
    font-size: 2rem;
  }

  .hero-subtitle {
    font-size: 1rem;
  }
}
/* أضف استايل الزر الخاص بالواتساب لتمييزه */
.whatsapp-btn {
  background: #25d366 !important;
  border-bottom: 4px solid #128c7e !important;
}
.whatsapp-btn:hover {
  background: #128c7e !important;
  transform: translateY(-2px);
}
.btn-content {
  display: flex;
  align-items: center;
  gap: 10px;
}
</style>
