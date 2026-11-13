<script setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <main class="login-page">
    <div class="login-container">
      <h1>{{ t('login.title') }}</h1>
      <RouterLink to="/" class="login-back-link">{{ t('login.backHome') }}</RouterLink>
    </div>
  </main>
</template>

<style scoped>
.login-page {
  min-height: calc(100vh - 86px);
  background: #fffaf4;
  color: #20172b;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
}

.login-container {
  text-align: center;
  background: #ffffff;
  border: 1px solid #eadfd5;
  border-radius: 12px;
  padding: 48px 36px;
  max-width: 460px;
  width: 100%;
  box-shadow: 0 4px 20px rgba(43, 29, 58, 0.04);
}

h1 {
  font: 700 26px 'Space Grotesk', sans-serif;
  margin: 0 0 20px;
  color: #20172b;
}

.login-back-link {
  display: inline-block;
  font-family: 'DM Sans', sans-serif;
  font-size: 13px;
  font-weight: 700;
  color: #ed6b4b;
  text-decoration: none;
  transition: color 0.2s;
}

.login-back-link:hover {
  color: #2b1d3a;
}
</style>
