<script setup>
import { reactive, ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { festival } from '@/datasource/data.js'

// Traductions locales à la page (un seul fichier) : suit automatiquement la langue FR/EN de la NavBar
const { t } = useI18n()

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const MAX_MESSAGE = 1000
const subjectKeys = ['tickets', 'merch', 'access', 'press', 'other']

const form = reactive({ name: '', email: '', subject: '', message: '', consent: false })
const touched = reactive({})
const attempted = ref(false)
const sending = ref(false)
const sent = ref(false)

const errors = computed(() => {
  const e = {}
  if (form.name.trim().length < 2) e.name = t('contact.errors.name')
  if (!EMAIL_RE.test(form.email.trim())) e.email = t('contact.errors.email')
  if (!form.subject) e.subject = t('contact.errors.subject')
  if (form.message.trim().length < 10) e.message = t('contact.errors.message')
  if (!form.consent) e.consent = t('contact.errors.consent')
  return e
})

function showError(field) {
  return (attempted.value || touched[field]) ? errors.value[field] : ''
}

async function onSubmit() {
  attempted.value = true
  const firstInvalid = Object.keys(errors.value)[0]
  if (firstInvalid) {
    document.getElementById(`cf-${firstInvalid}`)?.focus()
    return
  }
  sending.value = true
  try {
    // TODO : brancher ici l'appel à l'API backend (ex. POST /api/contact)
    await new Promise((resolve) => setTimeout(resolve, 600))
    sent.value = true
  } finally {
    sending.value = false
  }
}

function reset() {
  Object.assign(form, { name: '', email: '', subject: '', message: '', consent: false })
  Object.keys(touched).forEach((k) => delete touched[k])
  attempted.value = false
  sent.value = false
}
</script>

<template>
  <main class="cf-page">
    <!-- Hero -->
    <section class="cf-hero">
      <div class="cf-hero-orbit cf-orbit-one"></div>
      <div class="cf-hero-orbit cf-orbit-two"></div>
      <div class="cf-hero-content">
        <p class="cf-eyebrow"><span class="live-dot"></span> {{ t('contact.heroEyebrow') }}</p>
        <h1 v-html="t('contact.heroTitle')"></h1>
        <p class="cf-hero-sub">{{ t('contact.heroSub') }}</p>
      </div>
      <span class="cf-hero-spark" aria-hidden="true">✳</span>
    </section>

    <div class="cf-container">
      <!-- Formulaire -->
      <section class="cf-card cf-form-card">
        <template v-if="!sent">
          <p class="cf-card-eyebrow">{{ t('contact.formEyebrow') }}</p>
          <h2 class="cf-card-title">{{ t('contact.formTitle') }}</h2>
          <p class="cf-hint">{{ t('contact.required') }}</p>

          <form novalidate @submit.prevent="onSubmit">
            <div class="cf-row">
              <div class="cf-field">
                <label for="cf-name">{{ t('contact.name') }}</label>
                <input
                  id="cf-name"
                  v-model="form.name"
                  type="text"
                  autocomplete="name"
                  :class="{ 'cf-invalid': showError('name') }"
                  :aria-invalid="!!showError('name')"
                  aria-describedby="cf-name-err"
                  @blur="touched.name = true"
                />
                <p v-if="showError('name')" id="cf-name-err" class="cf-error" role="alert">{{ errors.name }}</p>
              </div>

              <div class="cf-field">
                <label for="cf-email">{{ t('contact.email') }}</label>
                <input
                  id="cf-email"
                  v-model="form.email"
                  type="email"
                  autocomplete="email"
                  :placeholder="t('contact.mailPlaceHolder')"
                  :class="{ 'cf-invalid': showError('email') }"
                  :aria-invalid="!!showError('email')"
                  aria-describedby="cf-email-err"
                  @blur="touched.email = true"
                />
                <p v-if="showError('email')" id="cf-email-err" class="cf-error" role="alert">{{ errors.email }}</p>
              </div>
            </div>

            <div class="cf-field">
              <label for="cf-subject">{{ t('contact.subject') }}</label>
              <div class="cf-select-shell">
                <select
                  id="cf-subject"
                  v-model="form.subject"
                  :class="{ 'cf-invalid': showError('subject') }"
                  :aria-invalid="!!showError('subject')"
                  aria-describedby="cf-subject-err"
                  @blur="touched.subject = true"
                >
                  <option value="" disabled>{{ t('contact.subjectPlaceholder') }}</option>
                  <option v-for="key in subjectKeys" :key="key" :value="key">{{ t(`subjects.${key}`) }}</option>
                </select>
                <span class="cf-select-chevron" aria-hidden="true">▼</span>
              </div>
              <p v-if="showError('subject')" id="cf-subject-err" class="cf-error" role="alert">{{ errors.subject }}</p>
            </div>

            <div class="cf-field">
              <label for="cf-message">{{ t('contact.message') }}</label>
              <textarea
                id="cf-message"
                v-model="form.message"
                rows="6"
                :maxlength="MAX_MESSAGE"
                :placeholder="t('contact.messagePlaceholder')"
                :class="{ 'cf-invalid': showError('message') }"
                :aria-invalid="!!showError('message')"
                aria-describedby="cf-message-err"
                @blur="touched.message = true"
              ></textarea>
              <div class="cf-message-foot">
                <p v-if="showError('message')" id="cf-message-err" class="cf-error" role="alert">{{ errors.message }}</p>
                <span class="cf-counter">{{ form.message.length }} / {{ MAX_MESSAGE }}</span>
              </div>
            </div>

            <div class="cf-field">
              <label class="cf-check">
                <input
                  id="cf-consent"
                  v-model="form.consent"
                  type="checkbox"
                  :aria-invalid="!!showError('consent')"
                  aria-describedby="cf-consent-err"
                  @blur="touched.consent = true"
                />
                <span>{{ t('contact.consent') }}</span>
              </label>
              <p v-if="showError('consent')" id="cf-consent-err" class="cf-error" role="alert">{{ errors.consent }}</p>
            </div>

            <button type="submit" class="cf-btn-primary" :disabled="sending">
              {{ sending ? t('contact.sending') : t('contact.send') }} <span v-if="!sending">↗</span>
            </button>
          </form>
        </template>

        <!-- Confirmation -->
        <div v-else class="cf-success" role="status">
          <span class="cf-success-icon" aria-hidden="true">✳</span>
          <p class="cf-card-eyebrow">{{ t('contact.successEyebrow') }}</p>
          <h2 class="cf-card-title">{{ t('contact.successTitle') }}</h2>
          <p class="cf-success-desc">{{ t('contact.successDesc') }}</p>
          <div class="cf-success-actions">
            <button type="button" class="cf-btn-secondary" @click="reset">{{ t('contact.sendAnother') }}</button>
            <RouterLink to="/" class="cf-btn-home">{{ t('contact.backHome') }}</RouterLink>
          </div>
        </div>
      </section>

      <!-- Infos pratiques -->
      <aside class="cf-card cf-info-card">
        <p class="cf-card-eyebrow">{{ t('contact.infoEyebrow') }}</p>
        <h2 class="cf-card-title">{{ t('contact.infoTitle') }}</h2>

        <ul class="cf-info-list">
          <li>
            <span class="cf-info-icon" aria-hidden="true">✳</span>
            <div><small>{{ t('contact.infoDates') }}</small><strong>{{ t('contact.infoDatesValue') }}</strong></div>
          </li>
          <li>
            <span class="cf-info-icon" aria-hidden="true">⌖</span>
            <div><small>{{ t('contact.infoPlace') }}</small><strong>{{ festival.address }}</strong></div>
          </li>
          <li>
            <span class="cf-info-icon" aria-hidden="true">♫</span>
            <div><small>{{ t('contact.infoDelay') }}</small><strong>{{ t('contact.infoDelayValue') }}</strong></div>
          </li>
        </ul>

        <p class="cf-tip">{{ t('contact.infoCartTip') }}</p>
      </aside>
    </div>
  </main>
</template>

<style scoped>
.cf-page {
  min-height: calc(100vh - 86px);
  display: flex;
  flex-direction: column;
  background: #fffaf4;
  color: #20172b;
  font-family: 'DM Sans', sans-serif;
  overflow-x: hidden;
}

/* --- Hero Banner (même recette que le panier) --- */
.cf-hero {
  position: relative;
  min-height: 200px;
  width: min(1240px, calc(100% - 40px));
  margin: 0 auto 36px;
  padding: 44px 50px;
  overflow: hidden;
  border-radius: 12px;
  color: #fffaf4;
  background: radial-gradient(ellipse at 78% 30%, rgba(255, 170, 93, 0.38), transparent 30%),
    radial-gradient(ellipse at 92% 85%, rgba(241, 109, 78, 0.62), transparent 35%),
    linear-gradient(118deg, #291b3b 0%, #43284e 52%, #a44852 100%);
  box-sizing: border-box;
}
.cf-hero::before {
  content: '';
  position: absolute;
  inset: 0;
  opacity: 0.14;
  background-image: radial-gradient(#fff 0.7px, transparent 0.7px);
  background-size: 8px 8px;
  mask-image: linear-gradient(90deg, #000, transparent 75%);
  pointer-events: none;
}
.cf-hero-content {
  position: relative;
  z-index: 2;
  max-width: 640px;
}
.cf-eyebrow {
  margin: 0 0 14px;
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 2.2px;
  text-transform: uppercase;
}
.cf-hero h1 {
  margin: 0;
  font: 700 clamp(36px, 5.2vw, 56px) / 1.05 'Space Grotesk', sans-serif;
  letter-spacing: -2px;
}
:deep(.cf-hero h1 span) {
  color: #ffbd70;
}
.cf-hero-sub {
  margin: 12px 0 0;
  color: #eee1e8;
  font-size: 14px;
  line-height: 1.6;
}
.cf-hero-orbit {
  position: absolute;
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 50%;
  pointer-events: none;
}
.cf-orbit-one { width: 440px; height: 440px; right: -80px; top: -120px; }
.cf-orbit-two { width: 300px; height: 300px; right: 60px; top: -30px; border-style: dashed; }
.cf-hero-spark {
  position: absolute;
  right: 6%;
  top: 50%;
  transform: translateY(-50%);
  font-size: 140px;
  line-height: 1;
  color: rgba(255, 255, 255, 0.1);
  pointer-events: none;
}

/* --- Layout --- */
.cf-container {
  width: min(1240px, calc(100% - 40px));
  margin: 0 auto;
  padding-bottom: 70px;
  display: grid;
  grid-template-columns: minmax(0, 1.6fr) minmax(0, 1fr);
  gap: 24px;
  align-items: start;
}

.cf-card {
  background: #ffffff;
  border: 1px solid #eadfd5;
  border-radius: 12px;
  padding: 36px;
  box-shadow: 0 4px 20px rgba(43, 29, 58, 0.04);
}
.cf-card-eyebrow {
  margin: 0 0 10px;
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 2.2px;
  color: #ed6b4b;
}
.cf-card-title {
  margin: 0;
  font: 700 clamp(24px, 3.5vw, 30px) 'Space Grotesk', sans-serif;
  letter-spacing: -1px;
  color: #20172b;
}
.cf-hint {
  margin: 8px 0 26px;
  font-size: 12px;
  color: #8e7a70;
}

/* --- Champs --- */
.cf-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 18px;
}
.cf-field {
  margin-bottom: 18px;
}
.cf-field label:not(.cf-check) {
  display: block;
  margin-bottom: 7px;
  font-size: 12px;
  font-weight: 700;
  color: #20172b;
}
.cf-field input[type='text'],
.cf-field input[type='email'],
.cf-field select,
.cf-field textarea {
  width: 100%;
  background: #fffaf4;
  border: 1px solid #dfcebf;
  border-radius: 6px;
  padding: 12px 14px;
  font-family: 'DM Sans', sans-serif;
  font-size: 13px;
  font-weight: 500;
  color: #20172b;
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;
}
.cf-field textarea {
  resize: vertical;
  min-height: 130px;
  line-height: 1.6;
}
.cf-field input::placeholder,
.cf-field textarea::placeholder {
  color: #b3a196;
}
.cf-field input:focus,
.cf-field select:focus,
.cf-field textarea:focus {
  border-color: #ed6b4b;
  box-shadow: 0 0 0 3px rgba(237, 107, 75, 0.15);
}
.cf-invalid {
  border-color: #c8372d !important;
}

.cf-select-shell { position: relative; }
.cf-field select {
  appearance: none;
  padding-right: 34px;
  cursor: pointer;
  font-weight: 700;
}
.cf-select-chevron {
  position: absolute;
  right: 14px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  font-size: 10px;
  color: #8e7a70;
}

.cf-message-foot {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 12px;
}
.cf-counter {
  margin-left: auto;
  font-size: 11px;
  font-weight: 700;
  color: #8e7a70;
}
.cf-error {
  margin: 6px 0 0;
  font-size: 12px;
  font-weight: 600;
  color: #c8372d;
}

.cf-check {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  font-size: 12px;
  line-height: 1.6;
  color: #5c4d57;
  cursor: pointer;
}
.cf-check input {
  flex-shrink: 0;
  width: 17px;
  height: 17px;
  margin-top: 2px;
  accent-color: #ed6b4b;
  cursor: pointer;
}

/* --- Boutons --- */
.cf-btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 16px;
  padding: 14px 24px;
  border: none;
  border-radius: 6px;
  font-family: 'DM Sans', sans-serif;
  font-size: 12px;
  font-weight: 800;
  background: #2b1d3a;
  color: #fffaf4;
  cursor: pointer;
  transition: transform 0.2s, background 0.2s;
}
.cf-btn-primary span { color: #ffcb65; }
.cf-btn-primary:hover:not(:disabled) {
  background: #ed6b4b;
  transform: translateY(-2px);
}
.cf-btn-primary:disabled {
  opacity: 0.6;
  cursor: wait;
}

.cf-btn-secondary {
  display: inline-flex;
  align-items: center;
  padding: 13px 22px;
  border-radius: 6px;
  border: 1px solid #d7bfb0;
  font-family: 'DM Sans', sans-serif;
  font-size: 12px;
  font-weight: 800;
  color: #20172b;
  background: #fffaf4;
  cursor: pointer;
  transition: all 0.2s;
}
.cf-btn-secondary:hover {
  border-color: #ed6b4b;
  color: #ed6b4b;
  transform: translateY(-2px);
}
.cf-btn-home {
  font-size: 12px;
  font-weight: 700;
  color: #8e7a70;
  text-decoration: none;
  padding: 8px 14px;
  transition: color 0.2s;
}
.cf-btn-home:hover { color: #ed6b4b; }

/* --- Succès --- */
.cf-success {
  text-align: center;
  padding: 24px 0;
}
.cf-success-icon {
  display: grid;
  place-items: center;
  width: 64px;
  height: 64px;
  margin: 0 auto 20px;
  border-radius: 50%;
  background: #ffcb65;
  color: #2c1c3b;
  font-size: 28px;
  transform: rotate(10deg);
  box-shadow: 0 8px 24px rgba(27, 16, 43, 0.15);
}
.cf-success-desc {
  margin: 12px 0 26px;
  font-size: 14px;
  line-height: 1.7;
  color: #5c4d57;
}
.cf-success-actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 14px;
}

/* --- Carte infos --- */
.cf-info-list {
  list-style: none;
  margin: 24px 0 0;
  padding: 0;
  display: grid;
  gap: 18px;
}
.cf-info-list li {
  display: flex;
  align-items: center;
  gap: 14px;
}
.cf-info-icon {
  flex-shrink: 0;
  display: grid;
  place-items: center;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: #fff1e8;
  color: #ed6b4b;
  font-size: 16px;
}
.cf-info-list small {
  display: block;
  font-size: 9px;
  font-weight: 800;
  letter-spacing: 1.8px;
  color: #8e7a70;
}
.cf-info-list strong {
  display: block;
  margin-top: 3px;
  font-size: 13px;
  font-weight: 700;
}
.cf-tip {
  margin: 26px 0 0;
  padding: 14px 16px;
  border-radius: 8px;
  background: #fffaf4;
  border: 1px dashed #dfcebf;
  font-size: 12px;
  line-height: 1.7;
  color: #5c4d57;
}

/* --- Responsive --- */
@media (max-width: 900px) {
  .cf-container { grid-template-columns: 1fr; }
}
@media (max-width: 640px) {
  .cf-hero { padding: 32px 24px; margin-bottom: 24px; }
  .cf-hero-spark { font-size: 90px; right: 4%; }
  .cf-card { padding: 26px 20px; }
  .cf-row { grid-template-columns: 1fr; gap: 0; }
  .cf-btn-primary { width: 100%; justify-content: center; }
}
</style>
