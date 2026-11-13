<script setup>
import { useI18n } from 'vue-i18n'
import { useCartStore } from '@/stores/cart.js'

const cart = useCartStore()
const { t } = useI18n()
</script>

<template>
  <main class="co-page">
    <div class="co-container">
      <h1>{{ t('checkout.title') }}</h1>
      <RouterLink to="/panier" class="co-cart-link">
        {{ t('checkout.cartLink', { count: cart.count }) }}
      </RouterLink>
      <RouterView />
    </div>
  </main>
</template>

<style scoped>
.co-page {
  min-height: calc(100vh - 86px);
  background: #fffaf4;
  color: #20172b;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
}

.co-container {
  text-align: center;
  background: #ffffff;
  border: 1px solid #eadfd5;
  border-radius: 12px;
  padding: 48px 36px;
  max-width: 500px;
  width: 100%;
  box-shadow: 0 4px 20px rgba(43, 29, 58, 0.04);
}

h1 {
  font: 700 28px 'Space Grotesk', sans-serif;
  margin: 0 0 20px;
  color: #20172b;
}

.co-cart-link {
  display: inline-block;
  font-family: 'DM Sans', sans-serif;
  font-size: 13px;
  font-weight: 700;
  color: #fffaf4;
  background: #ed6b4b;
  padding: 10px 20px;
  border-radius: 30px;
  text-decoration: none;
  transition: all 0.2s ease;
}

.co-cart-link:hover {
  background: #2b1d3a;
  transform: translateY(-2px);
}
</style>
