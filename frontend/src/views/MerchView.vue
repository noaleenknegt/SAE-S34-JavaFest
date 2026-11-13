<script setup>
import { useI18n } from 'vue-i18n'
import { festival, merchItems } from '@/datasource/data.js'
import { useCartStore } from '@/stores/cart.js'
import { localize } from '@/i18n'

const cart = useCartStore()
const { t, locale } = useI18n()
</script>

<template>
  <main class="mc-merch-page">
    <!-- Hero boutique avec dégradé festival, orbites et sticker 2027 -->
    <section class="mc-hero">
      <div class="mc-hero-orbit mc-orbit-one"></div>
      <div class="mc-hero-orbit mc-orbit-two"></div>
      <div class="mc-hero-content">
        <p class="mc-eyebrow"><span class="mc-live-dot"></span> {{ t('merch.eyebrow') }}</p>
        <h1 class="mc-hero-title" v-html="t('merch.heroTitle')"></h1>
        <p class="mc-tagline">Java'Fest <em>wear</em> &amp; {{ locale === 'fr' ? 'collector !' : 'collector items!' }}</p>
        <p class="mc-intro">{{ t('merch.intro') }}</p>
        <div class="mc-hero-actions">
          <a class="button button-light" href="#catalogue">{{ t('merch.ctaDiscover') }} <span>↓</span></a>
          <RouterLink class="mc-text-link" to="/panier">
            {{ t('merch.viewCart') }} <span v-if="cart.count > 0">({{ cart.count }})</span> <span>↗</span>
          </RouterLink>
        </div>
      </div>

      <div class="mc-hero-sticker" :aria-label="t('merch.stickerAria')">
        <span>{{ t('merch.stickerMerch') }}</span>
        <strong>20<br />27</strong>
        <span>{{ t('merch.stickerOfficial') }}</span>
      </div>

      <div class="mc-hero-bottom">
        <span>{{ t('merch.bottomTags') }}</span>
        <span>{{ t('merch.bottomDates') }}</span>
      </div>
    </section>

    <!-- Bandeau de réassurance -->
    <section class="mc-strip">
      <div class="mc-strip-item">
        <span class="mc-strip-icon">⌖</span>
        <div>
          <small>{{ t('merch.stripPickup') }}</small>
          <strong>{{ t('merch.stripPickupDesc') }}</strong>
        </div>
      </div>
      <div class="mc-strip-item">
        <span class="mc-strip-icon">✳</span>
        <div>
          <small>{{ t('merch.stripQuality') }}</small>
          <strong>{{ t('merch.stripQualityDesc') }}</strong>
        </div>
      </div>
      <div class="mc-strip-item">
        <span class="mc-strip-icon">⚡</span>
        <div>
          <small>{{ t('merch.stripExpress') }}</small>
          <strong>{{ t('merch.stripExpressDesc') }}</strong>
        </div>
      </div>
    </section>

    <!-- Section catalogue produits -->
    <section id="catalogue" class="mc-catalog">
      <div class="mc-section-heading">
        <div>
          <p class="mc-eyebrow mc-eyebrow-dark">{{ t('merch.catalogEyebrow') }}</p>
          <h2 class="mc-heading-title" v-html="t('merch.catalogTitle')"></h2>
        </div>
        <div class="mc-heading-cart" v-if="cart.count > 0">
          <span>{{ t('merch.itemsSelected', { count: cart.count }, cart.count) }}</span>
          <RouterLink to="/panier" class="mc-outline-link">{{ t('merch.goToCart') }} <span>↗</span></RouterLink>
        </div>
      </div>

      <!-- Grille de cartes produits avec variantes colorées -->
      <div class="mc-grid">
        <article
          v-for="(item, index) in merchItems"
          :key="item._id"
          class="mc-card"
          :class="`mc-card-${(index % 4) + 1}`"
        >
          <!-- Numéro et badge catégorie -->
          <div class="mc-card-meta">
            <span class="mc-card-number">0{{ index + 1 }}</span>
            <span class="mc-card-category">{{ t('merch.categories.' + item.category) || item.category }}</span>
          </div>

          <!-- Symbole décoratif en arrière-plan -->
          <div class="mc-card-symbol" aria-hidden="true">
            {{ ['✳', '♫', '✺', '〰', '✦', '◈'][index % 6] }}
          </div>

          <!-- Informations produit -->
          <div class="mc-card-body">
            <h3 class="mc-card-title">{{ localize(item.name, locale) }}</h3>
            <p class="mc-card-desc">{{ localize(item.description, locale) }}</p>

            <!-- Options disponibles (tailles, couleurs) -->
            <div
              v-if="(item.sizes && item.sizes.length) || (item.colors && item.colors.length)"
              class="mc-card-specs"
            >
              <div v-if="item.sizes && item.sizes.length" class="mc-specs-row">
                <span class="mc-specs-label">{{ t('merch.sizesLabel') }}</span>
                <span v-for="size in item.sizes" :key="size" class="mc-specs-pill">{{ size }}</span>
              </div>
              <div v-if="item.colors && item.colors.length" class="mc-specs-row">
                <span class="mc-specs-label">{{ t('merch.colorsLabel') }}</span>
                <span v-for="color in item.colors" :key="color" class="mc-specs-pill">{{ t('merch.colors.' + color) || color }}</span>
              </div>
            </div>
          </div>

          <!-- Pied de carte : prix, stock et bouton corail -->
          <div class="mc-card-footer">
            <div class="mc-price-box">
              <span class="mc-price-label">{{ t('merch.priceLabel') }}</span>
              <strong class="mc-price-val">{{ item.price }} €</strong>
            </div>

            <div class="mc-action-box">
              <div v-if="item.stock === 0" class="mc-soldout-box">
                <span class="mc-soldout-badge">{{ t('merch.soldOut') }}</span>
                <button type="button" class="mc-btn-add mc-btn-disabled" disabled aria-disabled="true">
                  <span>{{ t('merch.soldOut') }}</span>
                </button>
              </div>
              <template v-else>
                <div class="mc-stock-info">
                  <span class="mc-stock-dot"></span>
                  <span>{{ t('merch.stockRemaining', { count: item.stock }, item.stock) }}</span>
                </div>
                <button
                  type="button"
                  class="mc-btn-add"
                  @click="cart.addItem('item', item)"
                  :aria-label="t('merch.addToCartAria', { name: localize(item.name, locale) })"
                >
                  <span>{{ t('merch.addToCart') }}</span>
                  <span class="mc-btn-plus">+</span>
                </button>
              </template>
            </div>
          </div>
        </article>
      </div>
    </section>

    <!-- Bannière réassurance / call-to-action panier -->
    <section class="mc-banner">
      <div class="mc-banner-content">
        <p class="mc-eyebrow mc-banner-eyebrow">{{ t('merch.bannerEyebrow') }}</p>
        <h2 v-html="t('merch.bannerTitle')"></h2>
        <p class="mc-banner-desc">{{ t('merch.bannerDesc') }}</p>
      </div>
      <RouterLink to="/panier" class="button button-dark mc-banner-btn">
        {{ t('merch.viewCart') }} ({{ cart.count }}) <span>↗</span>
      </RouterLink>
      <span class="mc-banner-spark" aria-hidden="true">✳</span>
    </section>

    <!-- Pied de page -->
    <footer class="site-footer">
      <RouterLink class="footer-brand" to="/">{{ t('footer.brand') }}<span>✳</span></RouterLink>
      <p>{{ t('footer.text') }}</p>
      <span>{{ t('footer.copyright', { year: festival.edition }) }}</span>
    </footer>
  </main>
</template>

<style scoped>
.mc-merch-page {
  background: #fffaf4;
  color: #20172b;
  min-height: 100vh;
  overflow-x: hidden;
}

/* --- Hero Section --- */
.mc-hero {
  position: relative;
  min-height: 520px;
  width: min(1340px, calc(100% - 40px));
  margin: 0 auto;
  overflow: hidden;
  border-radius: 9px;
  color: #fffaf4;
  background: radial-gradient(ellipse at 76% 36%, rgba(255, 170, 93, .38), transparent 27%),
    radial-gradient(ellipse at 90% 90%, rgba(241, 109, 78, .65), transparent 35%),
    linear-gradient(118deg, #291b3b 0%, #43284e 52%, #a44852 100%);
}
.mc-hero::before {
  content: '';
  position: absolute;
  inset: 0;
  opacity: .14;
  background-image: radial-gradient(#fff 0.7px, transparent .7px);
  background-size: 8px 8px;
  mask-image: linear-gradient(90deg, #000, transparent 75%);
}
.mc-hero-content {
  position: relative;
  z-index: 2;
  width: min(640px, 78%);
  padding: 68px 0 88px 8%;
}
.mc-eyebrow {
  margin: 0 0 20px;
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 2.3px;
  text-transform: uppercase;
}
.mc-eyebrow-dark {
  color: #e66b4e;
  margin-bottom: 12px;
}
.mc-live-dot {
  display: inline-block;
  width: 7px;
  height: 7px;
  margin: 0 9px 1px 0;
  border-radius: 50%;
  background: #ffcb65;
  box-shadow: 0 0 0 5px #ffcb6525;
}
.mc-hero-title {
  margin: 0;
  font: 700 clamp(48px, 6.8vw, 92px)/.92 'Space Grotesk', sans-serif;
  letter-spacing: -4px;
}
:deep(.mc-hero-title span) {
  color: #ffbd70;
}
.mc-tagline {
  margin: 22px 0 12px;
  font: 600 clamp(19px, 2.2vw, 26px) 'Space Grotesk', sans-serif;
}
.mc-tagline em {
  color: #ffbd70;
  font-style: normal;
}
.mc-intro {
  max-width: 440px;
  color: #eee1e8;
  font-size: 14px;
  line-height: 1.8;
  margin: 0;
}
.mc-hero-actions {
  display: flex;
  align-items: center;
  gap: 24px;
  margin-top: 28px;
}
.mc-text-link {
  font-size: 12px;
  font-weight: 700;
  color: #fffaf4;
  transition: opacity .2s;
}
.mc-text-link:hover {
  opacity: .85;
}
.mc-text-link span {
  color: #ffbd70;
  margin-left: 6px;
}

/* Orbits & Sticker */
.mc-hero-orbit {
  position: absolute;
  border: 1px solid rgba(255, 255, 255, 0.16);
  border-radius: 50%;
  pointer-events: none;
}
.mc-orbit-one {
  width: 560px;
  height: 560px;
  right: -30px;
  top: 10px;
}
.mc-orbit-two {
  width: 390px;
  height: 390px;
  right: 50px;
  top: 90px;
  border-style: dashed;
}
.mc-hero-sticker {
  position: absolute;
  z-index: 2;
  right: 14%;
  top: 22%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 145px;
  height: 145px;
  border-radius: 50%;
  color: #2c1c3b;
  background: #ffcb65;
  transform: rotate(10deg);
  box-shadow: 0 12px 45px rgba(27, 16, 43, 0.35);
}
.mc-hero-sticker span {
  font-size: 9px;
  font-weight: 800;
  letter-spacing: 2px;
}
.mc-hero-sticker strong {
  font: 700 40px/.8 'Space Grotesk', sans-serif;
  text-align: center;
  margin: 6px 0;
  letter-spacing: -3px;
}
.mc-hero-bottom {
  position: absolute;
  z-index: 2;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  padding: 18px 8%;
  border-top: 1px solid rgba(255, 255, 255, 0.17);
  color: #f7dce0;
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 1.7px;
}

/* --- Reassurance Strip --- */
.mc-strip {
  width: min(1120px, calc(100% - 64px));
  margin: 0 auto;
  padding: 32px 0;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  border-bottom: 1px solid #eadfd5;
}
.mc-strip-item {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 0 25px;
  border-right: 1px solid #eadfd5;
}
.mc-strip-item:first-child {
  padding-left: 0;
}
.mc-strip-item:last-child {
  border: 0;
}
.mc-strip-icon {
  display: grid;
  place-items: center;
  flex: 0 0 39px;
  height: 39px;
  border-radius: 50%;
  background: #f9e8dc;
  color: #e66b4e;
  font-size: 18px;
}
.mc-strip-item div {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.mc-strip-item small {
  color: #a28e83;
  font-size: 9px;
  font-weight: 800;
  letter-spacing: 1.5px;
}
.mc-strip-item strong {
  font-size: 12.5px;
  color: #20172b;
}

/* --- Catalog Section --- */
.mc-catalog {
  width: min(1120px, calc(100% - 64px));
  margin: auto;
  padding: 75px 0 85px;
}
.mc-section-heading {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-bottom: 34px;
}
.mc-heading-title {
  margin: 0;
  font: 700 clamp(34px, 4.8vw, 54px)/1 'Space Grotesk', sans-serif;
  letter-spacing: -2.6px;
  color: #20172b;
}
:deep(.mc-heading-title span) {
  color: #ed7555;
}
.mc-heading-cart {
  display: flex;
  align-items: center;
  gap: 14px;
  font-size: 12px;
  font-weight: 700;
  color: #7b6a60;
}
.mc-outline-link {
  border-bottom: 1px solid #d7bfb0;
  padding: 0 0 4px;
  font-size: 12px;
  font-weight: 800;
  color: #20172b;
  transition: color .2s, border-color .2s;
}
.mc-outline-link span {
  color: #ed7555;
  margin-left: 8px;
}
.mc-outline-link:hover {
  color: #ed7555;
  border-color: #ed7555;
}

/* --- Product Grid & Cards --- */
.mc-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 18px;
}
.mc-card {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 380px;
  overflow: hidden;
  padding: 24px;
  border-radius: 6px;
  color: #fffaf4;
  background: #30213e;
  box-shadow: 0 6px 20px rgba(32, 23, 43, 0.06);
  transition: transform .25s ease, box-shadow .25s ease;
}
.mc-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 14px 32px rgba(32, 23, 43, 0.14);
}
.mc-card::after {
  content: '';
  position: absolute;
  width: 200px;
  height: 200px;
  top: 25px;
  right: -80px;
  border: 1px solid rgba(255, 255, 255, 0.22);
  border-radius: 50%;
  box-shadow: 0 0 0 20px rgba(255, 255, 255, 0.05), 0 0 0 40px rgba(255, 255, 255, 0.03);
  pointer-events: none;
}

/* Color Variants (matching artist-card styles) */
.mc-card-1 {
  background: #30213e;
  color: #fffaf4;
}
.mc-card-2 {
  background: #df7959;
  color: #fffaf4;
}
.mc-card-2 .mc-btn-add {
  background: #20172b;
  color: #fffaf4;
}
.mc-card-2 .mc-btn-add:hover:not(:disabled) {
  background: #140d1c;
}
.mc-card-2 .mc-card-category {
  background: rgba(32, 23, 43, 0.22);
}

.mc-card-3 {
  background: #e9b75f;
  color: #20172b;
}
.mc-card-3::after {
  border-color: rgba(32, 23, 43, 0.16);
  box-shadow: 0 0 0 20px rgba(32, 23, 43, 0.04), 0 0 0 40px rgba(32, 23, 43, 0.02);
}
.mc-card-3 .mc-card-number,
.mc-card-3 .mc-card-desc,
.mc-card-3 .mc-price-label,
.mc-card-3 .mc-stock-info {
  color: #4a3820;
}
.mc-card-3 .mc-card-category {
  background: rgba(32, 23, 43, 0.12);
  color: #20172b;
}
.mc-card-3 .mc-specs-pill {
  background: rgba(32, 23, 43, 0.1);
  color: #20172b;
}
.mc-card-3 .mc-card-footer {
  border-top-color: rgba(32, 23, 43, 0.15);
}
.mc-card-3 .mc-stock-dot {
  background: #20172b;
  box-shadow: 0 0 0 3px rgba(32, 23, 43, 0.18);
}
.mc-card-3 .mc-btn-add {
  background: #20172b;
  color: #fffaf4;
}
.mc-card-3 .mc-btn-add:hover:not(:disabled) {
  background: #140d1c;
}

.mc-card-4 {
  background: #71877b;
  color: #fffaf4;
}

/* Card Internal Components */
.mc-card-meta {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
}
.mc-card-number {
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 1.5px;
  opacity: .75;
}
.mc-card-category {
  font-size: 9px;
  font-weight: 800;
  letter-spacing: 1.4px;
  text-transform: uppercase;
  padding: 4px 10px;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.18);
}
.mc-card-symbol {
  position: absolute;
  top: 48px;
  right: 22px;
  font: 400 90px/1 'Space Grotesk', sans-serif;
  opacity: .14;
  transform: rotate(12deg);
  pointer-events: none;
  user-select: none;
}
.mc-card-body {
  position: relative;
  z-index: 1;
  flex: 1;
  display: flex;
  flex-direction: column;
}
.mc-card-title {
  margin: 6px 0 10px;
  font: 700 23px/1.2 'Space Grotesk', sans-serif;
  letter-spacing: -.7px;
}
.mc-card-desc {
  margin: 0 0 16px;
  font-size: 12px;
  line-height: 1.6;
  opacity: .85;
}
.mc-card-specs {
  margin-top: auto;
  padding-top: 10px;
  display: flex;
  flex-direction: column;
  gap: 7px;
}
.mc-specs-row {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 5px;
}
.mc-specs-label {
  font-size: 9.5px;
  font-weight: 800;
  letter-spacing: 0.8px;
  opacity: .8;
  margin-right: 3px;
}
.mc-specs-pill {
  padding: 2px 7px;
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.16);
  font-size: 10.5px;
  font-weight: 700;
}

/* Card Footer */
.mc-card-footer {
  position: relative;
  z-index: 1;
  margin-top: 20px;
  padding-top: 18px;
  border-top: 1px solid rgba(255, 255, 255, 0.18);
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 12px;
}
.mc-price-box {
  display: flex;
  flex-direction: column;
}
.mc-price-label {
  font-size: 9px;
  font-weight: 800;
  letter-spacing: 1.2px;
  text-transform: uppercase;
  opacity: .75;
}
.mc-price-val {
  font: 700 26px/1 'Space Grotesk', sans-serif;
  letter-spacing: -1px;
}
.mc-action-box {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 7px;
}
.mc-stock-info {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 10px;
  font-weight: 700;
  opacity: .85;
}
.mc-stock-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #ffcb65;
  box-shadow: 0 0 0 3px rgba(255, 203, 101, 0.25);
}
.mc-soldout-box {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 5px;
}
.mc-soldout-badge {
  font-size: 9.5px;
  font-weight: 800;
  letter-spacing: 1.2px;
  text-transform: uppercase;
  color: #ffd46b;
}

/* Coral Add Button */
.mc-btn-add {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border: none;
  cursor: pointer;
  border-radius: 4px;
  padding: 11px 17px;
  font-family: 'DM Sans', sans-serif;
  font-size: 12px;
  font-weight: 800;
  background: #ed6b4b;
  color: #fffaf4;
  transition: transform .2s ease, background .2s ease, box-shadow .2s ease;
}
.mc-btn-add:hover:not(:disabled) {
  transform: translateY(-2px);
  background: #dd5b3b;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.22);
}
.mc-btn-plus {
  font-size: 14px;
  font-weight: 700;
  line-height: 1;
}
.mc-btn-disabled {
  background: rgba(255, 255, 255, 0.16) !important;
  color: rgba(255, 255, 255, 0.5) !important;
  cursor: not-allowed !important;
  transform: none !important;
  box-shadow: none !important;
}
.mc-card-3 .mc-btn-disabled {
  background: rgba(32, 23, 43, 0.12) !important;
  color: rgba(32, 23, 43, 0.45) !important;
}

/* --- Banner Call To Action --- */
.mc-banner {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 25px;
  width: min(1120px, calc(100% - 64px));
  min-height: 240px;
  margin: 80px auto 85px;
  overflow: hidden;
  padding: 42px 6%;
  border-radius: 6px;
  color: #fffaf4;
  background: #ed7656;
}
.mc-banner-eyebrow {
  color: #572f3b;
  margin-bottom: 12px;
}
.mc-banner h2 {
  position: relative;
  z-index: 1;
  margin: 0 0 12px;
  font: 700 clamp(32px, 4.3vw, 50px)/1.04 'Space Grotesk', sans-serif;
  letter-spacing: -2.4px;
}
:deep(.mc-banner h2 span) {
  color: #ffbd70;
}
.mc-banner-desc {
  position: relative;
  z-index: 1;
  max-width: 480px;
  margin: 0;
  font-size: 13.5px;
  line-height: 1.6;
  color: #fdefee;
}
.mc-banner-btn {
  position: relative;
  z-index: 2;
  flex-shrink: 0;
}
.mc-banner-spark {
  position: absolute;
  right: 22%;
  top: -85px;
  color: rgba(255, 255, 255, 0.12);
  font-size: 330px;
  line-height: 1;
  pointer-events: none;
}

/* --- Responsive Media Queries (< 760px & < 420px) --- */
@media (max-width: 980px) {
  .mc-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 760px) {
  .mc-hero {
    width: calc(100% - 20px);
    min-height: 540px;
    margin-top: 42px;
  }
  .mc-hero-content {
    width: 92%;
    padding: 56px 0 95px 7%;
  }
  .mc-hero-title {
    font-size: clamp(42px, 11vw, 68px);
    letter-spacing: -2.5px;
  }
  .mc-hero-sticker {
    width: 105px;
    height: 105px;
    right: 7%;
    top: auto;
    bottom: 85px;
  }
  .mc-hero-sticker strong {
    font-size: 28px;
  }
  .mc-hero-sticker span {
    font-size: 7px;
  }
  .mc-orbit-one {
    right: -240px;
  }
  .mc-orbit-two {
    right: -160px;
  }
  .mc-hero-bottom {
    padding: 14px 7%;
    font-size: 7.5px;
    letter-spacing: 1px;
  }
  .mc-strip {
    width: calc(100% - 40px);
    grid-template-columns: 1fr;
    gap: 16px;
    padding: 24px 0;
  }
  .mc-strip-item,
  .mc-strip-item:first-child {
    padding: 0;
    border: 0;
  }
  .mc-catalog {
    width: calc(100% - 40px);
    padding: 50px 0;
  }
  .mc-section-heading {
    flex-direction: column;
    align-items: flex-start;
    gap: 14px;
  }
  .mc-banner {
    width: calc(100% - 40px);
    min-height: 250px;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    padding: 35px 8%;
    margin-bottom: 50px;
  }
  .site-footer {
    width: calc(100% - 40px);
    flex-wrap: wrap;
  }
  .site-footer p {
    order: 3;
    width: 100%;
    margin: 0;
  }
}

@media (max-width: 480px) {
  .mc-grid {
    grid-template-columns: 1fr;
  }
  .mc-hero-actions {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
  .mc-hero-bottom span:first-child {
    display: none;
  }
  .mc-hero-bottom {
    justify-content: center;
  }
}
</style>
