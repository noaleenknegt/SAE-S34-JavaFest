<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useCartStore } from '@/stores/cart.js'
import { ticketTypes, merchItems } from '@/datasource/data.js'
import { localize } from '@/i18n'

const cart = useCartStore()
const { t, locale } = useI18n()

const currentLocaleTag = computed(() => (locale.value === 'fr' ? 'fr-FR' : 'en-US'))

function getLineName(line) {
  if (line.name && typeof line.name === 'object') {
    return localize(line.name, locale.value)
  }
  if (line.type === 'ticket') {
    const tItem = ticketTypes.find((ticket) => ticket._id === line.itemId)
    if (tItem?.name) return localize(tItem.name, locale.value)
  } else if (line.type === 'item') {
    const mItem = merchItems.find((item) => item._id === line.itemId)
    if (mItem?.name) return localize(mItem.name, locale.value)
  }
  return line.name
}

function formatDay(iso) {
  if (!iso) return ''
  const d = new Date(iso)
  if (isNaN(d.getTime())) return iso
  return d.toLocaleDateString(currentLocaleTag.value, {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    timeZone: 'UTC',
  })
}
</script>

<template>
  <div class="ct-cart-page">
    <!-- Page Header / Hero -->
    <section class="ct-hero">
      <div class="ct-hero-orbit ct-orbit-one"></div>
      <div class="ct-hero-orbit ct-orbit-two"></div>
      <div class="ct-hero-content">
        <p class="eyebrow ct-eyebrow"><span class="live-dot"></span> {{ t('cart.heroEyebrow') }}</p>
        <h1 class="ct-hero-title" v-html="t('cart.heroTitle')"></h1>
        <p class="ct-hero-sub">{{ t('cart.heroSub') }}</p>
      </div>
      <span class="ct-hero-spark" aria-hidden="true">✳</span>
    </section>

    <!-- Main Container -->
    <main class="ct-container">
      <!-- État panier vide -->
      <section v-if="cart.lines.length === 0" class="ct-empty-state">
        <div class="ct-empty-icon-wrap">
          <span class="ct-empty-icon">✳</span>
        </div>
        <p class="eyebrow ct-eyebrow-coral">{{ t('cart.emptyEyebrow') }}</p>
        <h2 class="ct-empty-title">{{ t('cart.emptyTitle') }}</h2>
        <p class="ct-empty-desc">
          {{ t('cart.emptyDesc') }}
        </p>
        <div class="ct-empty-actions">
          <RouterLink to="/billets" class="button button-dark ct-btn-primary">
            {{ t('cart.emptyCtaTickets') }} <span>↗</span>
          </RouterLink>
          <RouterLink to="/merch" class="ct-btn-secondary">
            {{ t('cart.emptyCtaMerch') }} <span>↗</span>
          </RouterLink>
          <RouterLink to="/" class="ct-btn-home">
            {{ t('cart.emptyCtaHome') }}
          </RouterLink>
        </div>
      </section>

      <!-- Panier garni -->
      <div v-else class="ct-grid">
        <!-- Colonne gauche : liste des articles -->
        <section class="ct-items-col">
          <div class="ct-items-topbar">
            <span class="ct-items-count">{{ t('cart.itemsCount', { count: cart.count }, cart.count) }}</span>
            <RouterLink to="/" class="ct-home-link">{{ t('cart.homeLink') }}</RouterLink>
          </div>

          <article
            v-for="(line, index) in cart.lines"
            :key="index"
            class="ct-card"
          >
            <div class="ct-card-main">
              <div
                class="ct-card-icon"
                :class="line.type === 'ticket' ? 'ct-icon-ticket' : 'ct-icon-merch'"
              >
                {{ line.type === 'ticket' ? '🎟' : '👕' }}
              </div>
              <div class="ct-card-details">
                <span class="ct-card-tag">
                  {{ line.type === 'ticket' ? t('cart.ticketTag') : t('cart.merchTag') }}
                </span>
                <h3 class="ct-card-title">{{ getLineName(line) }}</h3>
                <span v-if="line.options?.day" class="ct-card-day">
                  ({{ formatDay(line.options.day) }})
                </span>
                <div class="ct-card-calc">
                  {{ line.quantity }} × {{ line.unitPrice }} €
                </div>
              </div>
            </div>

            <div class="ct-card-side">
              <div class="ct-card-subtotal">
                <span class="ct-card-subtotal-val">{{ line.quantity * line.unitPrice }} €</span>
                <span class="ct-card-subtotal-lbl">{{ t('cart.subtotal') }}</span>
              </div>
              <button
                type="button"
                class="ct-btn-remove"
                @click="cart.removeLine(index)"
                :title="t('cart.removeTitle')"
              >
                {{ t('cart.remove') }} <span class="ct-btn-remove-icon">✕</span>
              </button>
            </div>
          </article>

          <div class="ct-continue-bar">
            <RouterLink to="/billets" class="ct-continue-link">
              {{ t('cart.continueTickets') }}
            </RouterLink>
            <RouterLink to="/merch" class="ct-continue-link">
              {{ t('cart.continueMerch') }} <span>↗</span>
            </RouterLink>
          </div>
        </section>

        <!-- Colonne droite : récapitulatif & paiement -->
        <aside class="ct-summary-col">
          <div class="ct-summary-card">
            <p class="eyebrow ct-summary-eyebrow">{{ t('cart.summaryEyebrow') }}</p>
            <h2 class="ct-summary-title">{{ t('cart.summaryTitle') }}</h2>

            <div class="ct-summary-lines">
              <div class="ct-summary-line">
                <span>{{ t('cart.selectedItems') }}</span>
                <strong>{{ cart.count }}</strong>
              </div>
              <div class="ct-summary-line">
                <span>{{ t('cart.summarySubtotal') }}</span>
                <span>{{ cart.total }} €</span>
              </div>
              <div class="ct-summary-line">
                <span>{{ t('cart.feesLabel') }}</span>
                <span class="ct-free-tag">{{ t('cart.feesFree') }}</span>
              </div>
            </div>

            <div class="ct-summary-separator"></div>

            <div class="ct-summary-total-row">
              <div>
                <span class="ct-total-label">{{ t('cart.totalLabel') }}</span>
                <small class="ct-total-note">{{ t('cart.vatIncluded') }}</small>
              </div>
              <span class="ct-total-val">{{ cart.total }} €</span>
            </div>

            <div class="ct-summary-actions">
              <RouterLink to="/paiement" class="button ct-btn-checkout">
                {{ t('cart.checkoutBtn') }} <span>→</span>
              </RouterLink>
            </div>

            <div class="ct-summary-perks">
              <div class="ct-perk-item">
                <span class="ct-perk-icon">🔒</span>
                <span>{{ t('cart.perkSecure') }}</span>
              </div>
              <div class="ct-perk-item">
                <span class="ct-perk-icon">⚡</span>
                <span>{{ t('cart.perkEticket') }}</span>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </main>

    <!-- Footer -->
    <footer class="site-footer ct-footer">
      <RouterLink class="footer-brand" to="/">{{ t('footer.brand') }}<span>✳</span></RouterLink>
      <p>{{ t('footer.text') }}</p>
      <span>{{ t('footer.copyright', { year: 2027 }) }}</span>
    </footer>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=Space+Grotesk:wght@400;500;600;700&display=swap');

.ct-cart-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: #fffaf4;
  color: #20172b;
  font-family: 'DM Sans', sans-serif;
  overflow-x: hidden;
}

/* --- Hero Banner --- */
.ct-hero {
  position: relative;
  min-height: 200px;
  width: min(1240px, calc(100% - 40px));
  margin: 0 auto 36px;
  padding: 44px 50px;
  overflow: hidden;
  border-radius: 12px;
  color: #fffaf4;
  background: radial-gradient(ellipse at 78% 30%, rgba(255, 170, 93, .38), transparent 30%),
    radial-gradient(ellipse at 92% 85%, rgba(241, 109, 78, .62), transparent 35%),
    linear-gradient(118deg, #291b3b 0%, #43284e 52%, #a44852 100%);
  box-sizing: border-box;
}
.ct-hero::before {
  content: '';
  position: absolute;
  inset: 0;
  opacity: .14;
  background-image: radial-gradient(#fff 0.7px, transparent .7px);
  background-size: 8px 8px;
  mask-image: linear-gradient(90deg, #000, transparent 75%);
  pointer-events: none;
}
.ct-hero-content {
  position: relative;
  z-index: 2;
  max-width: 640px;
}
.ct-eyebrow {
  margin: 0 0 14px;
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 2.2px;
  text-transform: uppercase;
}
.ct-hero h1 {
  margin: 0;
  font: 700 clamp(36px, 5.2vw, 56px)/1.05 'Space Grotesk', sans-serif;
  letter-spacing: -2px;
}
:deep(.ct-hero h1 span) {
  color: #ffbd70;
}
.ct-hero-sub {
  margin: 12px 0 0;
  color: #eee1e8;
  font-size: 14px;
  line-height: 1.6;
}
.ct-hero-orbit {
  position: absolute;
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 50%;
  pointer-events: none;
}
.ct-orbit-one {
  width: 440px;
  height: 440px;
  right: -80px;
  top: -120px;
}
.ct-orbit-two {
  width: 300px;
  height: 300px;
  right: 60px;
  top: -30px;
  border-style: dashed;
}
.ct-hero-spark {
  position: absolute;
  right: 6%;
  top: 50%;
  transform: translateY(-50%);
  font-size: 140px;
  color: rgba(255, 255, 255, 0.1);
  pointer-events: none;
  line-height: 1;
}

/* --- Main Layout --- */
.ct-container {
  width: min(1240px, calc(100% - 40px));
  margin: 0 auto;
  flex: 1;
  padding-bottom: 70px;
}

/* --- Empty Cart State --- */
.ct-empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  background: #ffffff;
  border: 1px solid #eadfd5;
  border-radius: 12px;
  padding: 64px 32px;
  margin: 12px 0 30px;
  box-shadow: 0 4px 20px rgba(43, 29, 58, 0.03);
}
.ct-empty-icon-wrap {
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: #f9e8dc;
  color: #ed6b4b;
  display: grid;
  place-items: center;
  font-size: 32px;
  margin-bottom: 22px;
}
.ct-eyebrow-coral {
  color: #ed6b4b;
  margin-bottom: 8px;
}
.ct-empty-title {
  margin: 0 0 14px;
  font: 700 clamp(24px, 3.5vw, 34px) 'Space Grotesk', sans-serif;
  letter-spacing: -1px;
  color: #20172b;
}
.ct-empty-desc {
  max-width: 480px;
  color: #6d5d55;
  font-size: 14px;
  line-height: 1.7;
  margin: 0 0 32px;
}
.ct-empty-actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 16px;
}
.ct-btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 16px;
  padding: 14px 24px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 800;
  background: #2b1d3a;
  color: #fffaf4;
  text-decoration: none;
  transition: transform .2s, background .2s;
}
.ct-btn-primary:hover {
  background: #ed6b4b;
  transform: translateY(-2px);
}
.ct-btn-primary span {
  color: #ffcb65;
}
.ct-btn-secondary {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  padding: 13px 22px;
  border-radius: 6px;
  border: 1px solid #d7bfb0;
  font-size: 12px;
  font-weight: 800;
  color: #20172b;
  text-decoration: none;
  background: #fffaf4;
  transition: all .2s;
}
.ct-btn-secondary:hover {
  border-color: #ed6b4b;
  color: #ed6b4b;
  transform: translateY(-2px);
}
.ct-btn-secondary span {
  color: #ed6b4b;
}
.ct-btn-home {
  font-size: 12px;
  font-weight: 700;
  color: #8e7a70;
  text-decoration: none;
  padding: 8px 14px;
  transition: color .2s;
}
.ct-btn-home:hover {
  color: #ed6b4b;
}

/* --- Cart Grid --- */
.ct-grid {
  display: grid;
  grid-template-columns: 1fr 380px;
  gap: 32px;
  align-items: start;
}

/* Left: Items Column */
.ct-items-col {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.ct-items-topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2px 6px 10px;
  border-bottom: 1px solid #eadfd5;
}
.ct-items-count {
  font: 700 15px 'Space Grotesk', sans-serif;
  color: #20172b;
}
.ct-home-link {
  font-size: 12px;
  font-weight: 700;
  color: #8e7a70;
  text-decoration: none;
  transition: color .2s;
}
.ct-home-link:hover {
  color: #ed6b4b;
}

/* Cart Item Card */
.ct-card {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  padding: 20px 24px;
  background: #ffffff;
  border: 1px solid #eadfd5;
  border-radius: 12px;
  transition: border-color .2s, box-shadow .2s, transform .2s;
}
.ct-card:hover {
  border-color: #e0d0c2;
  box-shadow: 0 4px 18px rgba(43, 29, 58, 0.04);
}
.ct-card-main {
  display: flex;
  align-items: center;
  gap: 18px;
  flex: 1;
}
.ct-card-icon {
  width: 48px;
  height: 48px;
  flex-shrink: 0;
  border-radius: 10px;
  display: grid;
  place-items: center;
  font-size: 22px;
}
.ct-icon-ticket {
  background: #f9e8dc;
  color: #ed6b4b;
}
.ct-icon-merch {
  background: #f4ebf5;
  color: #7b387e;
}
.ct-card-details {
  display: flex;
  flex-direction: column;
  gap: 3px;
}
.ct-card-tag {
  font-size: 9px;
  font-weight: 800;
  letter-spacing: 1.4px;
  text-transform: uppercase;
  color: #9c8b82;
}
.ct-card-title {
  margin: 0;
  font: 700 18px 'Space Grotesk', sans-serif;
  letter-spacing: -.4px;
  color: #20172b;
}
.ct-card-day {
  display: inline-block;
  margin-top: 2px;
  font-size: 11px;
  font-weight: 700;
  color: #ed6b4b;
  background: #fdf2ee;
  padding: 2px 7px;
  border-radius: 4px;
  width: fit-content;
}
.ct-card-calc {
  font-size: 13px;
  color: #6d5d55;
  margin-top: 4px;
  font-weight: 600;
}

.ct-card-side {
  display: flex;
  align-items: center;
  gap: 22px;
}
.ct-card-subtotal {
  text-align: right;
  min-width: 80px;
}
.ct-card-subtotal-val {
  display: block;
  font: 700 19px 'Space Grotesk', sans-serif;
  color: #20172b;
  letter-spacing: -.5px;
}
.ct-card-subtotal-lbl {
  display: block;
  font-size: 10px;
  color: #9c8b82;
  font-weight: 600;
}

.ct-btn-remove {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  border: 1px solid #eadfd5;
  background: #fffaf4;
  color: #8e7a70;
  padding: 8px 14px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 700;
  cursor: pointer;
  transition: all .2s;
}
.ct-btn-remove:hover {
  background: #fdf0ec;
  color: #ed6b4b;
  border-color: #ed6b4b66;
}
.ct-btn-remove-icon {
  font-size: 11px;
  line-height: 1;
}

/* Nav links under items list */
.ct-continue-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
  padding: 6px 4px;
}
.ct-continue-link {
  font-size: 12px;
  font-weight: 700;
  color: #20172b;
  text-decoration: none;
  transition: color .2s;
}
.ct-continue-link span {
  color: #ed6b4b;
  margin-left: 5px;
}
.ct-continue-link:hover {
  color: #ed6b4b;
}

/* Right: Order Summary Sidebar */
.ct-summary-card {
  position: sticky;
  top: 24px;
  background: #ffffff;
  border: 1px solid #eadfd5;
  border-radius: 12px;
  padding: 28px;
  box-shadow: 0 4px 20px rgba(43, 29, 58, 0.04);
}
.ct-summary-eyebrow {
  color: #ed6b4b;
  margin-bottom: 6px;
}
.ct-summary-title {
  margin: 0 0 20px;
  font: 700 22px 'Space Grotesk', sans-serif;
  letter-spacing: -.6px;
  color: #20172b;
}
.ct-summary-lines {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 20px;
}
.ct-summary-line {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 13px;
  color: #6d5d55;
}
.ct-summary-line strong {
  color: #20172b;
  font-weight: 700;
}
.ct-free-tag {
  color: #24804f;
  background: #eaf6ef;
  font-size: 10px;
  font-weight: 800;
  padding: 2px 7px;
  border-radius: 4px;
  text-transform: uppercase;
  letter-spacing: .5px;
}
.ct-summary-separator {
  height: 1px;
  background: #eadfd5;
  margin: 20px 0;
}
.ct-summary-total-row {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  margin-bottom: 22px;
}
.ct-total-label {
  font: 700 17px 'Space Grotesk', sans-serif;
  color: #20172b;
}
.ct-total-note {
  display: block;
  font-size: 10px;
  color: #9c8b82;
  margin-top: 2px;
}
.ct-total-val {
  font: 700 30px 'Space Grotesk', sans-serif;
  color: #20172b;
  letter-spacing: -1.2px;
}
.ct-summary-actions {
  margin-bottom: 22px;
}
.ct-btn-checkout {
  width: 100%;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  border-radius: 6px;
  padding: 16px 20px;
  font-family: 'DM Sans', sans-serif;
  font-size: 13px;
  font-weight: 800;
  letter-spacing: .4px;
  text-decoration: none;
  color: #fffaf4;
  background: #ed6b4b;
  border: none;
  cursor: pointer;
  transition: all .25s ease;
  box-shadow: 0 4px 16px rgba(237, 107, 75, 0.35);
}
.ct-btn-checkout:hover {
  background: #2b1d3a;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(43, 29, 58, 0.35);
}
.ct-btn-checkout span {
  color: #ffcb65;
  font-size: 16px;
  transition: transform .2s ease;
}
.ct-btn-checkout:hover span {
  transform: translateX(4px);
}

.ct-summary-perks {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-top: 18px;
  border-top: 1px dashed #eadfd5;
}
.ct-perk-item {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 11px;
  color: #8e7a70;
  line-height: 1.4;
}
.ct-perk-icon {
  font-size: 13px;
  color: #ed6b4b;
}

/* --- Footer --- */
.ct-footer {
  margin-top: auto;
  border-top: 1px solid #eadfd5;
  padding: 32px 0 35px;
  width: min(1240px, calc(100% - 64px));
}

/* --- Responsive (< 760px) --- */
@media (max-width: 760px) {
  .ct-hero {
    width: calc(100% - 24px);
    padding: 34px 22px;
    margin-bottom: 22px;
    min-height: auto;
  }
  .ct-hero h1 {
    font-size: clamp(30px, 8vw, 40px);
    letter-spacing: -1.2px;
  }
  .ct-hero-spark {
    display: none;
  }
  .ct-orbit-one {
    right: -200px;
  }
  .ct-orbit-two {
    right: -120px;
  }
  .ct-container {
    width: calc(100% - 24px);
    padding-bottom: 40px;
  }
  .ct-grid {
    grid-template-columns: 1fr;
    gap: 24px;
  }
  .ct-card {
    flex-direction: column;
    align-items: flex-start;
    padding: 18px;
    gap: 16px;
  }
  .ct-card-main {
    width: 100%;
  }
  .ct-card-side {
    width: 100%;
    justify-content: space-between;
    padding-top: 12px;
    border-top: 1px dashed #eadfd5;
  }
  .ct-card-subtotal {
    text-align: left;
  }
  .ct-summary-card {
    position: static;
    padding: 22px;
  }
  .ct-footer {
    width: calc(100% - 36px);
    flex-wrap: wrap;
    gap: 14px;
  }
  .ct-footer p {
    order: 3;
    width: 100%;
    margin: 0;
  }
}
</style>
