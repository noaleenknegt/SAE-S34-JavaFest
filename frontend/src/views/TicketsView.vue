<script setup>
import { computed, reactive } from 'vue'
import { useI18n } from 'vue-i18n'
import { festival, ticketTypes } from '@/datasource/data.js'
import { useCartStore } from '@/stores/cart.js'
import { localize } from '@/i18n'

const cart = useCartStore()
const { t, locale } = useI18n()

const currentLocaleTag = computed(() => (locale.value === 'fr' ? 'fr-FR' : 'en-US'))

const jours = computed(() => {
  const list = []
  for (let d = new Date(festival.startDate); d <= new Date(festival.endDate); d.setUTCDate(d.getUTCDate() + 1)) {
    list.push({
      value: d.toISOString().slice(0, 10),
      label: d.toLocaleDateString(currentLocaleTag.value, { weekday: 'long', day: 'numeric', month: 'long', timeZone: 'UTC' }),
    })
  }
  return list
})

// Choix en cours pour chaque billet (avant d'ajouter au panier)
const quantities = reactive({})
const selectedDay = reactive({})

function remaining(ticket) {
  return ticket.quantityLeft - cart.quantityInCart('ticket', ticket._id)
}

function qty(ticket) {
  return quantities[ticket._id] ?? 1
}

function decrease(ticket) {
  quantities[ticket._id] = Math.max(1, qty(ticket) - 1)
}

function increase(ticket) {
  quantities[ticket._id] = Math.min(remaining(ticket), qty(ticket) + 1)
}

function canAdd(ticket) {
  if (remaining(ticket) < 1 || qty(ticket) > remaining(ticket)) return false
  if (ticket.scope === '1-jour' && !selectedDay[ticket._id]) return false
  return true
}

function add(ticket) {
  if (!canAdd(ticket)) return
  const options = ticket.scope === '1-jour' ? { day: selectedDay[ticket._id] } : {}
  cart.addItem('ticket', ticket, options, qty(ticket))
  quantities[ticket._id] = 1
}

function formatDay(iso) {
  return new Date(iso).toLocaleDateString(currentLocaleTag.value, {
    weekday: 'long', day: 'numeric', month: 'long', timeZone: 'UTC',
  })
}
</script>

<template>
  <main class="festival-tickets">
    <!-- Hero / Page Header -->
    <section class="tk-hero">
      <div class="tk-hero-orbit tk-orbit-one"></div>
      <div class="tk-hero-orbit tk-orbit-two"></div>

      <div class="tk-hero-content">
        <p class="eyebrow"><span class="live-dot"></span> {{ t('tickets.eyebrow') }}</p>
        <h1 class="tk-hero-title" v-html="t('tickets.heroTitle')"></h1>
        <p class="tk-tagline">Java'Fest <em>extends</em> {{ locale === 'fr' ? 'kiff !' : 'pure joy!' }}</p>
        <p class="tk-intro">{{ t('tickets.intro') }}</p>

        <div class="tk-hero-badges">
          <span class="tk-hero-pill"><span class="tk-pill-icon">✳</span> {{ t('tickets.badgeDates') }}</span>
          <span class="tk-hero-pill"><span class="tk-pill-icon">⌖</span> {{ festival.address }}</span>
          <span class="tk-hero-pill"><span class="tk-pill-icon">🔒</span> {{ t('tickets.badgeSecurity') }}</span>
        </div>
      </div>

      <div class="tk-hero-sticker" :aria-label="t('tickets.stickerAria')">
        <span>{{ t('tickets.stickerTickets') }}</span>
        <strong>20<br />27</strong>
        <span>{{ t('tickets.stickerOfficial') }}</span>
      </div>

      <div class="tk-hero-bottom">
        <span>{{ t('tickets.bottomTags') }}</span>
        <span>{{ t('tickets.bottomPasses') }}</span>
      </div>
    </section>

    <!-- Cart feedback notification banner -->
    <section v-if="cart.count > 0" class="tk-cart-alert-wrapper">
      <div class="tk-cart-alert-box">
        <div class="tk-cart-alert-info">
          <span class="tk-cart-alert-dot">✓</span>
          <div>
            <strong>{{ t('tickets.cartAlert', { count: cart.count }, cart.count) }}</strong>
            <span class="tk-cart-alert-total"> — {{ t('tickets.cartAlertTotal', { total: cart.total }) }}</span>
          </div>
        </div>
        <RouterLink class="button button-light tk-cart-alert-btn" to="/panier">
          {{ t('tickets.viewCart') }} <span>↗</span>
        </RouterLink>
      </div>
    </section>

    <!-- Tickets Selection Section -->
    <section class="tk-tickets-section">
      <div class="tk-section-heading">
        <div>
          <p class="eyebrow eyebrow-dark">{{ t('tickets.sectionEyebrow') }}</p>
          <h2 class="tk-section-title" v-html="t('tickets.sectionTitle')"></h2>
        </div>
        <p class="tk-section-desc">{{ t('tickets.sectionDesc') }}</p>
      </div>

      <div class="tk-tickets-grid">
        <article
          v-for="(ticket, index) in ticketTypes"
          :key="ticket._id"
          class="tk-card"
          :class="[
            `tk-card-${index + 1}`,
            { 'tk-card-soldout': ticket.quantityLeft === 0 || remaining(ticket) <= 0 }
          ]"
        >
          <!-- Header of card -->
          <div class="tk-card-header">
            <div class="tk-card-badge-row">
              <span class="tk-code-pill">{{ ticket.code || ticket.scope }}</span>

              <span v-if="ticket.quantityLeft === 0" class="tk-stock-badge tk-stock-soldout">
                {{ t('tickets.soldOut') }}
              </span>
              <span v-else-if="remaining(ticket) <= 0" class="tk-stock-badge tk-stock-soldout">
                {{ t('tickets.full') }}
              </span>
              <span v-else-if="remaining(ticket) <= 5" class="tk-stock-badge tk-stock-alert">
                <span class="tk-pulse-dot"></span> {{ t('tickets.stockAlert', { count: remaining(ticket) }, remaining(ticket)) }}
              </span>
              <span v-else class="tk-stock-badge tk-stock-available">
                {{ t('tickets.stockRemaining', { count: remaining(ticket) }, remaining(ticket)) }}
              </span>
            </div>

            <div class="tk-card-watermark" aria-hidden="true">
              {{ ['✳', '♫', '✺', '〰'][index % 4] }}
            </div>

            <h3 class="tk-card-title">{{ localize(ticket.name, locale) }}</h3>
            <p class="tk-card-description">{{ localize(ticket.description, locale) }}</p>
          </div>

          <!-- Price & Validity Section -->
          <div class="tk-card-pricing">
            <div class="tk-price-row">
              <span class="tk-price-currency">€</span>
              <span class="tk-price-amount">{{ ticket.price }}</span>
              <span class="tk-price-suffix">{{ t('tickets.perTicket') }}</span>
            </div>

            <div v-if="ticket.days || (Array.isArray(ticket.day) && ticket.day.length)" class="tk-validity-tag">
              <span class="tk-validity-icon">📅</span>
              <span class="tk-validity-content">
                {{ t('tickets.valid') }} <strong>{{ (ticket.days || ticket.day).map(formatDay).join(', ') }}</strong>
              </span>
            </div>
            <div v-else-if="ticket.scope === '1-jour'" class="tk-validity-tag">
              <span class="tk-validity-icon">✦</span>
              <span class="tk-validity-content">
                {{ t('tickets.valid') }} <strong>{{ t('tickets.validChoice') }}</strong>
              </span>
            </div>
          </div>

          <!-- Actions / Booking Area -->
          <div class="tk-card-actions">
            <!-- Sold out state -->
            <div v-if="ticket.quantityLeft === 0 || remaining(ticket) <= 0" class="tk-soldout-box">
              <button type="button" class="button tk-btn-soldout" disabled>
                {{ t('tickets.passUnavailable') }}
              </button>
              <p class="tk-soldout-msg">{{ t('tickets.soldOutMsg') }}</p>
            </div>

            <!-- Booking form -->
            <div v-else class="tk-action-form">
              <!-- 1-day selector -->
              <div v-if="ticket.scope === '1-jour'" class="tk-day-picker">
                <label :for="'select-day-' + ticket._id" class="tk-picker-label">
                  {{ t('tickets.chooseDayLabel') }} <span class="tk-required-star">*</span>
                </label>
                <div class="tk-select-shell">
                  <select
                    :id="'select-day-' + ticket._id"
                    v-model="selectedDay[ticket._id]"
                    class="tk-day-select"
                  >
                    <option :value="undefined" disabled selected>{{ t('tickets.chooseDayPlaceholder') }}</option>
                    <option v-for="jour in jours" :key="jour.value" :value="jour.value">
                      {{ jour.label }}
                    </option>
                  </select>
                  <span class="tk-select-chevron" aria-hidden="true">▾</span>
                </div>
              </div>

              <!-- Stepper & Add Button -->
              <div class="tk-purchase-controls">
                <div class="tk-stepper" role="group" :aria-label="t('tickets.qtyAria')">
                  <button
                    type="button"
                    class="tk-stepper-btn"
                    :disabled="qty(ticket) <= 1"
                    @click="decrease(ticket)"
                    :aria-label="t('tickets.decreaseAria')"
                  >
                    −
                  </button>
                  <span class="tk-stepper-count" aria-live="polite">{{ qty(ticket) }}</span>
                  <button
                    type="button"
                    class="tk-stepper-btn"
                    :disabled="qty(ticket) >= remaining(ticket)"
                    @click="increase(ticket)"
                    :aria-label="t('tickets.increaseAria')"
                  >
                    +
                  </button>
                </div>

                <button
                  type="button"
                  class="button tk-btn-add"
                  :disabled="!canAdd(ticket)"
                  @click="add(ticket)"
                >
                  <span>{{ t('tickets.addToCart', { count: qty(ticket) }) }}</span>
                  <span class="tk-btn-arrow">↗</span>
                </button>
              </div>

              <p v-if="ticket.scope === '1-jour' && !selectedDay[ticket._id]" class="tk-help-hint">
                {{ t('tickets.dayHelpHint') }}
              </p>
            </div>
          </div>
        </article>
      </div>
    </section>

    <!-- Reassurance / Features Strip -->
    <section class="tk-features-strip">
      <div class="tk-feature-card">
        <span class="tk-feature-icon">✳</span>
        <div>
          <small>{{ t('tickets.featImmediate') }}</small>
          <strong>{{ t('tickets.featImmediateDesc') }}</strong>
        </div>
      </div>
      <div class="tk-feature-card">
        <span class="tk-feature-icon">♫</span>
        <div>
          <small>{{ t('tickets.featAccess') }}</small>
          <strong>{{ t('tickets.featAccessDesc') }}</strong>
        </div>
      </div>
      <div class="tk-feature-card">
        <span class="tk-feature-icon">⌖</span>
        <div>
          <small>{{ t('tickets.featPayment') }}</small>
          <strong>{{ t('tickets.featPaymentDesc') }}</strong>
        </div>
      </div>
    </section>

    <!-- Merch Banner -->
    <section class="tk-banner-bottom">
      <div>
        <p class="eyebrow">{{ t('tickets.bannerEyebrow') }}</p>
        <h2 v-html="t('tickets.bannerTitle')"></h2>
      </div>
      <RouterLink to="/merch" class="button button-dark">{{ t('tickets.bannerCta') }} <span>↗</span></RouterLink>
      <span class="banner-spark">✳</span>
    </section>

    <!-- Footer -->
    <footer class="site-footer">
      <RouterLink class="footer-brand" to="/">{{ t('footer.brand') }}<span>✳</span></RouterLink>
      <p>{{ t('footer.text') }}</p>
      <span>{{ t('footer.copyright', { year: festival.edition }) }}</span>
    </footer>
  </main>
</template>

<style scoped>
.festival-tickets {
  background: #fffaf4;
  min-height: 100vh;
  overflow-x: hidden;
}

/* --- Hero Banner --- */
.tk-hero {
  position: relative;
  min-height: 480px;
  width: min(1340px, calc(100% - 40px));
  margin: 0 auto 40px;
  overflow: hidden;
  border-radius: 9px;
  color: #fffaf4;
  background: radial-gradient(ellipse at 76% 36%, rgba(255, 170, 93, 0.38), transparent 27%),
    radial-gradient(ellipse at 90% 90%, rgba(241, 109, 78, 0.65), transparent 35%),
    linear-gradient(118deg, #291b3b 0%, #43284e 52%, #a44852 100%);
}

.tk-hero::before {
  content: '';
  position: absolute;
  inset: 0;
  opacity: 0.14;
  background-image: radial-gradient(#fff 0.7px, transparent 0.7px);
  background-size: 8px 8px;
  mask-image: linear-gradient(90deg, #000, transparent 75%);
}

.tk-hero-orbit {
  position: absolute;
  border: 1px solid rgba(255, 255, 255, 0.14);
  border-radius: 50%;
  pointer-events: none;
}

.tk-orbit-one {
  width: 520px;
  height: 520px;
  right: -30px;
  top: -10px;
}

.tk-orbit-two {
  width: 360px;
  height: 360px;
  right: 50px;
  top: 70px;
  border-style: dashed;
}

.tk-hero-content {
  position: relative;
  z-index: 2;
  width: min(720px, 80%);
  padding: 64px 0 84px 8.5%;
}

.tk-hero-title {
  margin: 0;
  font: 700 clamp(44px, 6.5vw, 84px) / 0.94 'Space Grotesk', sans-serif;
  letter-spacing: -4px;
}

:deep(.tk-hero-title span) {
  color: #ffbd70;
}

.tk-tagline {
  margin: 22px 0 12px;
  font: 600 clamp(18px, 2.2vw, 26px) 'Space Grotesk', sans-serif;
}

.tk-tagline em {
  color: #ffbd70;
  font-style: normal;
}

.tk-intro {
  max-width: 480px;
  color: #eee1e8;
  font-size: 14px;
  line-height: 1.75;
  margin: 0 0 24px;
}

.tk-hero-badges {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.tk-hero-pill {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 14px;
  border-radius: 30px;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.18);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.5px;
  color: #ffebdf;
  backdrop-filter: blur(4px);
}

.tk-pill-icon {
  color: #ffcb65;
  font-size: 13px;
}

.tk-hero-sticker {
  position: absolute;
  z-index: 2;
  right: 12%;
  top: 20%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 140px;
  height: 140px;
  border-radius: 50%;
  color: #2c1c3b;
  background: #ffcb65;
  transform: rotate(10deg);
  box-shadow: 0 12px 45px rgba(27, 16, 43, 0.35);
}

.tk-hero-sticker span {
  font-size: 9px;
  font-weight: 800;
  letter-spacing: 2px;
}

.tk-hero-sticker strong {
  font: 700 40px / 0.82 'Space Grotesk', sans-serif;
  text-align: center;
  margin: 6px 0;
  letter-spacing: -2.5px;
}

.tk-hero-bottom {
  position: absolute;
  z-index: 2;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  padding: 16px 8.5%;
  border-top: 1px solid rgba(255, 255, 255, 0.17);
  color: #f7dce0;
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 1.7px;
}

/* --- Cart notification banner --- */
.tk-cart-alert-wrapper {
  width: min(1200px, calc(100% - 64px));
  margin: 0 auto 36px;
}

.tk-cart-alert-box {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  padding: 16px 24px;
  background: #2b1d3a;
  color: #fffaf4;
  border-radius: 8px;
  border: 1px solid #43284e;
  box-shadow: 0 8px 30px rgba(43, 29, 58, 0.12);
}

.tk-cart-alert-info {
  display: flex;
  align-items: center;
  gap: 14px;
  font-size: 14px;
}

.tk-cart-alert-dot {
  display: grid;
  place-items: center;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: #ffcb65;
  color: #2b1d3a;
  font-weight: 900;
  font-size: 14px;
  flex-shrink: 0;
}

.tk-cart-alert-total {
  color: #ffbd70;
  font-weight: 700;
}

.tk-cart-alert-btn {
  flex-shrink: 0;
  padding: 10px 18px;
  font-size: 11px;
}

/* --- Section Heading --- */
.tk-tickets-section {
  width: min(1200px, calc(100% - 64px));
  margin: 0 auto 70px;
}

.tk-section-heading {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 30px;
  margin-bottom: 35px;
}

.tk-section-title {
  margin: 0;
  font: 700 clamp(32px, 4.5vw, 52px) / 1.05 'Space Grotesk', sans-serif;
  letter-spacing: -2.4px;
}

:deep(.tk-section-title span) {
  color: #ed6b4b;
}

.tk-section-desc {
  max-width: 440px;
  margin: 0;
  color: #766359;
  font-size: 13px;
  line-height: 1.6;
}

/* --- Tickets Grid --- */
.tk-tickets-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 18px;
}

/* --- Ticket Card --- */
.tk-card {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: #ffffff;
  border: 1px solid #eadfd5;
  border-radius: 10px;
  padding: 24px 20px;
  transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
  overflow: hidden;
}

.tk-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: #eadfd5;
  transition: background 0.25s ease;
}

.tk-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 16px 36px rgba(43, 29, 58, 0.08);
  border-color: #dfcebf;
}

.tk-card:hover::before {
  background: #ed6b4b;
}

/* Card sold out modifier */
.tk-card-soldout {
  background: #fbf8f5;
  border-color: #ebdcd0;
}

.tk-card-soldout::before {
  background: #c53030;
}

/* Card Header */
.tk-card-header {
  position: relative;
  z-index: 1;
}

.tk-card-badge-row {
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  margin-bottom: 16px;
}

.tk-code-pill {
  font: 800 11px 'Space Grotesk', sans-serif;
  letter-spacing: 0.8px;
  color: #7b675d;
  background: #f6eee6;
  padding: 4px 9px;
  border-radius: 4px;
  text-transform: uppercase;
}

.tk-stock-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 11px;
  font-weight: 700;
  border-radius: 20px;
  padding: 3px 9px;
}

.tk-stock-available {
  background: #eef7ee;
  color: #27672b;
  border: 1px solid #c8e6c9;
}

.tk-stock-alert {
  background: #fdf3e7;
  color: #b74f1d;
  border: 1px solid #fbd38d;
  font-weight: 800;
}

.tk-pulse-dot {
  display: inline-block;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #ed6b4b;
  animation: tkPulse 1.8s infinite;
}

@keyframes tkPulse {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.35;
    transform: scale(1.35);
  }
}

.tk-stock-soldout {
  background: #fde8e8;
  color: #c53030;
  border: 1px solid #feb2b2;
}

.tk-card-watermark {
  position: absolute;
  top: 38px;
  right: 8px;
  font: 400 78px 'Space Grotesk', sans-serif;
  color: #f6ede3;
  line-height: 1;
  pointer-events: none;
  user-select: none;
  z-index: 0;
  opacity: 0.8;
}

.tk-card-title {
  margin: 0 0 8px;
  font: 700 23px / 1.15 'Space Grotesk', sans-serif;
  color: #20172b;
  letter-spacing: -0.6px;
  position: relative;
  z-index: 1;
}

.tk-card-description {
  margin: 0 0 18px;
  font-size: 13px;
  line-height: 1.6;
  color: #766359;
  min-height: 42px;
  position: relative;
  z-index: 1;
}

/* Pricing block */
.tk-card-pricing {
  margin-bottom: 20px;
  padding: 16px 0;
  border-top: 1px dashed #eadfd5;
  border-bottom: 1px dashed #eadfd5;
}

.tk-price-row {
  display: flex;
  align-items: baseline;
  gap: 3px;
}

.tk-price-currency {
  font: 700 22px 'Space Grotesk', sans-serif;
  color: #ed6b4b;
  margin-top: 2px;
}

.tk-price-amount {
  font: 700 clamp(42px, 3.2vw, 50px) / 1 'Space Grotesk', sans-serif;
  color: #20172b;
  letter-spacing: -2px;
}

.tk-price-suffix {
  font-size: 11px;
  font-weight: 600;
  color: #9c897f;
  margin-left: 6px;
}

.tk-validity-tag {
  margin-top: 12px;
  display: flex;
  align-items: flex-start;
  gap: 7px;
  font-size: 11px;
  line-height: 1.45;
  color: #6a584f;
  background: #fffaf4;
  padding: 8px 10px;
  border-radius: 6px;
  border: 1px solid #eee2d7;
}

.tk-validity-icon {
  font-size: 12px;
  color: #ed6b4b;
  flex-shrink: 0;
}

.tk-validity-content strong {
  color: #20172b;
}

/* Card Actions */
.tk-card-actions {
  position: relative;
  z-index: 2;
}

/* Sold out state */
.tk-soldout-box {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.tk-btn-soldout {
  width: 100%;
  border-radius: 6px;
  padding: 13px 14px;
  font-size: 12px;
  font-weight: 800;
  background: #ebe2da;
  color: #9a897f;
  border: 0;
  cursor: not-allowed;
  text-align: center;
}

.tk-soldout-msg {
  margin: 0;
  font-size: 11px;
  color: #a49389;
  text-align: center;
}

/* Day selector */
.tk-day-picker {
  margin-bottom: 14px;
}

.tk-picker-label {
  display: block;
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.6px;
  text-transform: uppercase;
  color: #8b776c;
  margin-bottom: 6px;
}

.tk-required-star {
  color: #ed6b4b;
}

.tk-select-shell {
  position: relative;
  width: 100%;
}

.tk-day-select {
  width: 100%;
  appearance: none;
  background: #fffaf4;
  border: 1px solid #dfcebf;
  border-radius: 6px;
  padding: 9px 30px 9px 12px;
  font-family: 'DM Sans', sans-serif;
  font-size: 12px;
  font-weight: 700;
  color: #20172b;
  cursor: pointer;
  outline: none;
  transition: border-color 0.2s;
}

.tk-day-select:focus {
  border-color: #ed6b4b;
}

.tk-select-chevron {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  font-size: 10px;
  color: #8e7a70;
}

/* Purchase Controls (stepper + add) */
.tk-purchase-controls {
  display: flex;
  gap: 8px;
}

.tk-stepper {
  display: inline-flex;
  align-items: center;
  border: 1px solid #dfcebf;
  border-radius: 6px;
  background: #fffaf4;
  overflow: hidden;
  flex-shrink: 0;
}

.tk-stepper-btn {
  background: transparent;
  border: none;
  padding: 8px 10px;
  font-size: 14px;
  font-weight: 700;
  color: #20172b;
  cursor: pointer;
  transition: background 0.15s, color 0.15s;
}

.tk-stepper-btn:hover:not(:disabled) {
  background: #f4e8dc;
  color: #ed6b4b;
}

.tk-stepper-btn:disabled {
  color: #c7b8ad;
  cursor: not-allowed;
}

.tk-stepper-count {
  min-width: 20px;
  text-align: center;
  font: 700 12px 'Space Grotesk', sans-serif;
  color: #20172b;
  padding: 0 4px;
}

.tk-btn-add {
  flex: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border: none;
  border-radius: 6px;
  padding: 10px 14px;
  font-family: 'DM Sans', sans-serif;
  font-size: 11.5px;
  font-weight: 800;
  background: #ed6b4b;
  color: #fffaf4;
  cursor: pointer;
  transition: background 0.2s, transform 0.2s, box-shadow 0.2s;
  box-shadow: 0 4px 14px rgba(237, 107, 75, 0.28);
}

.tk-btn-add:hover:not(:disabled) {
  background: #2b1d3a;
  transform: translateY(-2px);
  box-shadow: 0 6px 18px rgba(43, 29, 58, 0.22);
}

.tk-btn-add:disabled {
  background: #ebdcd0;
  color: #9d8b80;
  cursor: not-allowed;
  box-shadow: none;
  transform: none;
}

.tk-btn-arrow {
  font-size: 12px;
  transition: transform 0.2s;
}

.tk-btn-add:hover:not(:disabled) .tk-btn-arrow {
  transform: translateX(2px) translateY(-2px);
}

.tk-help-hint {
  margin: 8px 0 0;
  font-size: 10.5px;
  color: #b74f1d;
  line-height: 1.4;
}

/* --- Features / Reassurance Strip --- */
.tk-features-strip {
  width: min(1200px, calc(100% - 64px));
  margin: 0 auto 75px;
  padding: 30px 0;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  border-top: 1px solid #eadfd5;
  border-bottom: 1px solid #eadfd5;
}

.tk-feature-card {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 0 25px;
  border-right: 1px solid #eadfd5;
}

.tk-feature-card:first-child {
  padding-left: 0;
}

.tk-feature-card:last-child {
  border: 0;
}

.tk-feature-icon {
  display: grid;
  place-items: center;
  flex: 0 0 40px;
  height: 40px;
  border-radius: 50%;
  background: #f9e8dc;
  color: #ed6b4b;
  font-size: 18px;
}

.tk-feature-card div {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.tk-feature-card small {
  color: #a28e83;
  font-size: 9px;
  font-weight: 800;
  letter-spacing: 1.4px;
}

.tk-feature-card strong {
  font-size: 12.5px;
  color: #20172b;
  line-height: 1.4;
}

/* --- Bottom Banner --- */
.tk-banner-bottom {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 25px;
  width: min(1200px, calc(100% - 64px));
  min-height: 240px;
  margin: 0 auto 75px;
  overflow: hidden;
  padding: 42px 6%;
  border-radius: 6px;
  color: #fffaf4;
  background: #ed7656;
}

.tk-banner-bottom .eyebrow {
  color: #572f3b;
  margin-bottom: 13px;
}

.tk-banner-bottom h2 {
  position: relative;
  z-index: 1;
  font: 700 clamp(32px, 4.5vw, 50px) / 1.05 'Space Grotesk', sans-serif;
  letter-spacing: -2px;
  margin: 0;
}

.banner-spark {
  position: absolute;
  right: 22%;
  top: -80px;
  color: rgba(255, 255, 255, 0.12);
  font-size: 320px;
  line-height: 1;
  pointer-events: none;
}

/* --- Footer --- */
.site-footer {
  width: min(1200px, calc(100% - 64px));
  margin: auto;
  padding: 0 0 35px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
}

.footer-brand {
  font: 700 16px 'Space Grotesk', sans-serif;
  letter-spacing: -0.6px;
}

.footer-brand span {
  color: #ed7656;
}

.site-footer p,
.site-footer > span {
  color: #9b8b82;
  font-size: 10px;
}

/* --- Responsive Media Queries --- */
@media (max-width: 1024px) {
  .tk-tickets-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 760px) {
  .tk-hero {
    width: calc(100% - 20px);
    min-height: 520px;
    margin-top: 42px;
  }

  .tk-hero-content {
    width: 90%;
    padding: 56px 0 95px 7%;
  }

  .tk-hero-title {
    font-size: clamp(38px, 10vw, 64px);
    letter-spacing: -2.5px;
  }

  .tk-hero-sticker {
    width: 105px;
    height: 105px;
    right: 7%;
    top: auto;
    bottom: 85px;
  }

  .tk-hero-sticker strong {
    font-size: 28px;
  }

  .tk-hero-sticker span {
    font-size: 7px;
  }

  .tk-hero-bottom {
    padding: 14px 7%;
    font-size: 7.5px;
    letter-spacing: 1px;
  }

  .tk-cart-alert-wrapper {
    width: calc(100% - 40px);
  }

  .tk-cart-alert-box {
    flex-direction: column;
    align-items: flex-start;
    gap: 14px;
    padding: 14px 18px;
  }

  .tk-tickets-section {
    width: calc(100% - 40px);
    margin-bottom: 50px;
  }

  .tk-section-heading {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }

  .tk-features-strip {
    width: calc(100% - 40px);
    grid-template-columns: 1fr;
    gap: 16px;
    padding: 24px 0;
  }

  .tk-feature-card,
  .tk-feature-card:first-child {
    padding: 0;
    border: 0;
  }

  .tk-banner-bottom {
    width: calc(100% - 40px);
    min-height: 240px;
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

@media (max-width: 580px) {
  .tk-tickets-grid {
    grid-template-columns: 1fr;
  }

  .tk-hero-badges {
    flex-direction: column;
    align-items: flex-start;
  }

  .tk-hero-bottom span:first-child {
    display: none;
  }

  .tk-hero-bottom {
    justify-content: center;
  }
}
</style>
