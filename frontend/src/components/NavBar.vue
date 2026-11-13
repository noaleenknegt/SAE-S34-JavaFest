<script setup>
import { RouterLink } from 'vue-router'
import { useCartStore } from '@/stores/cart.js'
import { useI18n } from 'vue-i18n'

const cart = useCartStore()
const { t, locale } = useI18n()

function setLang(lang) {
  locale.value = lang
}
</script>

<template>
  <header class="site-header">
    <div class="topline">
      <RouterLink class="wordmark" to="/" :aria-label="t('nav.wordmarkAria')">
        <span class="wordmark-mark">J<span>✳</span></span>
        <span>JAVA<span class="wordmark-light">'FEST</span></span>
      </RouterLink>

      <nav class="main-nav" :aria-label="t('nav.mainNavAria')">
        <RouterLink to="/billets">{{ t('nav.tickets') }}</RouterLink>
        <RouterLink to="/merch">{{ t('nav.merch') }}</RouterLink>
      </nav>

      <div class="topline-actions">
        <!-- Language Switcher FR / EN -->
        <div class="lang-toggle" role="group" :aria-label="t('nav.langAria')">
          <button
            type="button"
            class="lang-btn"
            :class="{ 'lang-btn-active': locale === 'fr' }"
            :aria-pressed="locale === 'fr'"
            @click="setLang('fr')"
          >
            FR
          </button>
          <button
            type="button"
            class="lang-btn"
            :class="{ 'lang-btn-active': locale === 'en' }"
            :aria-pressed="locale === 'en'"
            @click="setLang('en')"
          >
            EN
          </button>
        </div>

        <RouterLink class="login-link" to="/login">
          {{ t('nav.login') }} <span>↗</span>
        </RouterLink>

        <RouterLink class="cart-pill" to="/panier" :aria-label="t('nav.cartAria')">
          <svg
            class="cart-icon"
            viewBox="0 0 24 24"
            width="17"
            height="17"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <path d="M16 10a4 4 0 0 1-8 0"></path>
          </svg>
          <span class="cart-label">{{ t('nav.cartLabel') }}</span>
          <span
            class="cart-count-badge"
            :class="{ 'cart-count-filled': cart.count > 0 }"
          >
            {{ cart.count }}
          </span>
        </RouterLink>
      </div>
    </div>
  </header>
</template>

<style scoped>
.site-header {
  width: 100%;
  background: #fffaf4;
  position: relative;
  z-index: 50;
}

.topline {
  width: min(1240px, calc(100% - 64px));
  min-height: 86px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 28px;
  box-sizing: border-box;
}

/* --- Wordmark --- */
.wordmark {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font: 700 19px 'Space Grotesk', sans-serif;
  letter-spacing: -0.8px;
  color: #20172b;
  text-decoration: none;
  flex-shrink: 0;
}

.wordmark-mark {
  display: grid;
  place-items: center;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  color: #fffaf4;
  background: #f16d4e;
  font-size: 21px;
}

.wordmark-mark span {
  font-size: 10px;
  margin-left: -5px;
  margin-top: -23px;
  color: #ffd46b;
}

.wordmark-light {
  color: #f16d4e;
}

/* --- Main Nav --- */
.main-nav {
  display: flex;
  align-items: center;
  gap: clamp(18px, 3vw, 42px);
}

.main-nav a {
  font-family: 'DM Sans', sans-serif;
  font-size: 13px;
  font-weight: 700;
  color: #20172b;
  text-decoration: none;
  transition: color 0.2s;
  position: relative;
}

.main-nav a:hover {
  color: #ee6b4b;
}

.main-nav a.router-link-active {
  color: #ee6b4b;
}

.main-nav a.router-link-active::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: -6px;
  height: 2px;
  background: #ee6b4b;
  border-radius: 2px;
}

/* --- Right Actions (Lang, Login & Cart) --- */
.topline-actions {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-shrink: 0;
}

/* --- Language Selector --- */
.lang-toggle {
  display: inline-flex;
  align-items: center;
  background: #fffaf4;
  border: 1px solid #e8ddd3;
  border-radius: 30px;
  padding: 3px;
  gap: 2px;
}

.lang-btn {
  border: none;
  background: transparent;
  font-family: 'DM Sans', sans-serif;
  font-size: 11px;
  font-weight: 700;
  color: #20172b;
  padding: 6px 11px;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.2s ease;
  line-height: 1;
}

.lang-btn:hover:not(.lang-btn-active) {
  color: #ed6b4b;
}

.lang-btn-active {
  background: #ed6b4b;
  color: #fffaf4;
  box-shadow: 0 2px 6px rgba(237, 107, 75, 0.3);
}

.login-link {
  display: inline-flex;
  align-items: center;
  font-family: 'DM Sans', sans-serif;
  font-size: 13px;
  font-weight: 700;
  color: #20172b;
  text-decoration: none;
  border: 1px solid #e8ddd3;
  border-radius: 30px;
  padding: 12px 17px;
  transition: all 0.2s;
  background: #fffaf4;
  white-space: nowrap;
}

.login-link span {
  color: #ee6b4b;
  margin-left: 7px;
}

.login-link:hover {
  color: #ee6b4b;
  border-color: #ee6b4b;
}

.login-link.router-link-active {
  color: #ee6b4b;
  border-color: #ee6b4b;
}

.cart-pill {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: 'DM Sans', sans-serif;
  font-size: 13px;
  font-weight: 700;
  color: #20172b;
  text-decoration: none;
  border: 1px solid #e8ddd3;
  border-radius: 30px;
  padding: 11px 16px;
  transition: all 0.2s;
  background: #fffaf4;
  white-space: nowrap;
}

.cart-pill:hover {
  color: #ee6b4b;
  border-color: #ee6b4b;
}

.cart-pill.router-link-active {
  color: #ee6b4b;
  border-color: #ee6b4b;
}

.cart-icon {
  flex-shrink: 0;
}

.cart-label {
  font-weight: 700;
}

.cart-count-badge {
  display: inline-grid;
  place-items: center;
  min-width: 20px;
  height: 20px;
  padding: 0 6px;
  border-radius: 999px;
  font-family: 'DM Sans', sans-serif;
  font-size: 11px;
  font-weight: 800;
  line-height: 1;
  background: #eadfd5;
  color: #20172b;
  transition: background 0.2s, color 0.2s, box-shadow 0.2s;
}

.cart-count-badge.cart-count-filled {
  background: #ed6b4b;
  color: #fffaf4;
  box-shadow: 0 2px 8px rgba(237, 107, 75, 0.35);
}

/* --- Responsive mobile (< 760px) --- */
@media (max-width: 760px) {
  .topline {
    width: calc(100% - 36px);
    height: auto;
    min-height: 72px;
    padding: 12px 0 10px;
    flex-wrap: wrap;
    row-gap: 12px;
  }

  .wordmark {
    order: 1;
  }

  .topline-actions {
    order: 2;
    gap: 8px;
    margin-left: auto;
  }

  .lang-toggle {
    padding: 2px;
  }

  .lang-btn {
    font-size: 10px;
    padding: 5px 8px;
  }

  .login-link {
    padding: 8px 12px;
    font-size: 10px;
  }

  .login-link span {
    margin-left: 5px;
  }

  .cart-pill {
    padding: 8px 11px;
    font-size: 10px;
    gap: 6px;
  }

  .cart-icon {
    width: 15px;
    height: 15px;
  }

  .cart-count-badge {
    min-width: 18px;
    height: 18px;
    font-size: 10px;
    padding: 0 5px;
  }

  .main-nav {
    order: 3;
    width: 100%;
    justify-content: center;
    gap: 25px;
    padding: 4px 0 6px;
  }

  .main-nav a {
    font-size: 12px;
  }
}

@media (max-width: 440px) {
  .topline {
    width: calc(100% - 24px);
    gap: 6px;
  }

  .topline-actions {
    gap: 6px;
  }

  .wordmark {
    font-size: 17px;
    gap: 8px;
  }

  .wordmark-mark {
    width: 30px;
    height: 30px;
    font-size: 18px;
  }

  .lang-btn {
    font-size: 9px;
    padding: 4px 6px;
  }

  .login-link {
    padding: 7px 9px;
    font-size: 9.5px;
  }

  .cart-pill {
    padding: 7px 9px;
    gap: 5px;
  }

  .cart-label {
    display: none;
  }
}
</style>
