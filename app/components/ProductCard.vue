<template>
  <article class="product-card">
    <div class="product-image-wrapper">
      <NuxtImg
        :src="image"
        :alt="title"
        class="product-img"
        width="400"
        height="300"
        placeholder
      />
      <span v-if="badge" class="product-badge" :class="badgeType">{{
        badge
      }}</span>
      <div class="quick-actions">
        <button class="action-btn" aria-label="إضافة للمفضلة">
          <Heart :size="18" />
        </button>
        <NuxtLink
          :to="link"
          class="action-btn primary"
          aria-label="عرض التفاصيل"
          ><Eye :size="18"
        /></NuxtLink>
      </div>
    </div>
    <div class="product-content">
      <span class="product-category">{{ category }}</span>
      <h3 class="product-title">{{ title }}</h3>
      <p class="product-excerpt">{{ excerpt }}</p>
      <ul class="product-features" v-if="features?.length">
        <li v-for="(feature, index) in features.slice(0, 3)" :key="index">
          <Check :size="14" /><span>{{ feature }}</span>
        </li>
      </ul>
      <div class="product-footer">
        <div class="price-section">
          <span v-if="oldPrice" class="old-price">{{ oldPrice }}</span>
          <span class="current-price">{{ price }}</span>
        </div>
        <NuxtLink :to="link" class="btn-view"
          >عرض التفاصيل <ArrowLeft :size="16"
        /></NuxtLink>
      </div>
    </div>
  </article>
</template>

<script setup>
import { Heart, Eye, Check, ArrowLeft } from "lucide-vue-next";
defineProps({
  image: {
    type: String,
    required: true,
    default: "/images/products/default.jpg",
  },
  title: { type: String, required: true },
  category: { type: String, required: true },
  excerpt: { type: String, required: true },
  price: { type: String, required: true },
  oldPrice: { type: String, default: "" },
  badge: { type: String, default: "" },
  badgeType: { type: String, default: "default" },
  features: { type: Array, default: () => [] },
  link: { type: String, required: true, default: "/products" },
});
</script>

<style scoped>
.product-card {
  background: var(--white);
  border-radius: 20px;
  overflow: hidden;
  box-shadow: var(--shadow-md);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  height: 100%;
}
.product-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 40px rgba(78, 124, 50, 0.2);
  border-color: var(--accent-color);
}
.product-image-wrapper {
  position: relative;
  height: 200px;
  overflow: hidden;
  background: linear-gradient(135deg, #f5f9f6, #e8f0e9);
}
.product-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}
.product-card:hover .product-img {
  transform: scale(1.08);
}
.product-badge {
  position: absolute;
  top: 15px;
  right: 15px;
  padding: 6px 14px;
  border-radius: 50px;
  font-size: 0.8rem;
  font-weight: 700;
  color: var(--white);
  z-index: 2;
}
.product-badge.sale {
  background: linear-gradient(135deg, #e74c3c, #c0392b);
}
.product-badge.new {
  background: linear-gradient(135deg, #3498db, #2980b9);
}
.product-badge.bestseller {
  background: linear-gradient(135deg, #f39c12, #d68910);
}
.product-badge.default {
  background: linear-gradient(
    135deg,
    var(--primary-color),
    var(--accent-color)
  );
}
.quick-actions {
  position: absolute;
  top: 15px;
  left: 15px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  z-index: 2;
  opacity: 0;
  transform: translateX(20px);
  transition: all 0.3s ease;
}
.product-card:hover .quick-actions {
  opacity: 1;
  transform: translateX(0);
}
.action-btn {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--white);
  color: var(--primary-color);
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: var(--shadow-sm);
}
.action-btn:hover {
  background: var(--accent-color);
  color: var(--white);
  transform: scale(1.1);
}
.action-btn.primary {
  background: var(--primary-color);
  color: var(--white);
}
.action-btn.primary:hover {
  background: var(--accent-color);
}
.product-content {
  padding: 25px;
  flex: 1;
  display: flex;
  flex-direction: column;
}
.product-category {
  display: inline-block;
  font-size: 0.85rem;
  color: var(--accent-color);
  font-weight: 600;
  margin-bottom: 10px;
}
.product-title {
  font-size: 1.3rem;
  font-weight: 800;
  color: var(--primary-color);
  margin-bottom: 12px;
  line-height: 1.4;
}
.product-excerpt {
  font-size: 0.95rem;
  color: #666;
  line-height: 1.7;
  margin-bottom: 15px;
  flex: 1;
}
.product-features {
  list-style: none;
  padding: 0;
  margin: 0 0 20px 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.product-features li {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.9rem;
  color: #555;
}
.product-features li svg {
  color: var(--accent-color);
  flex-shrink: 0;
}
.product-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 20px;
  border-top: 1px solid #eee;
  margin-top: auto;
}
.price-section {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.old-price {
  font-size: 0.9rem;
  color: #999;
  text-decoration: line-through;
}
.current-price {
  font-size: 1.4rem;
  font-weight: 800;
  color: var(--primary-color);
}
.btn-view {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  background: var(--primary-color);
  color: var(--white);
  border-radius: 10px;
  font-weight: 600;
  font-size: 0.9rem;
  text-decoration: none;
  transition: all 0.3s ease;
  font-family: "Cairo", sans-serif;
}
.btn-view:hover {
  background: var(--accent-color);
  transform: translateX(-5px);
  gap: 12px;
}
@media (max-width: 576px) {
  .product-image-wrapper {
    height: 200px;
  }
  .quick-actions {
    opacity: 1;
    transform: translateX(0);
  }
  .product-footer {
    flex-direction: column;
    gap: 15px;
    align-items: stretch;
  }
  .btn-view {
    justify-content: center;
  }
}
</style>
