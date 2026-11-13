import { createI18n } from 'vue-i18n'
import { watch } from 'vue'
import fr from './locales/fr.json'
import en from './locales/en.json'

function getDefaultLocale() {
  if (typeof window !== 'undefined' && window.localStorage) {
    const saved = localStorage.getItem('locale')
    if (saved && (saved === 'fr' || saved === 'en')) {
      return saved
    }
  }
  if (typeof navigator !== 'undefined' && navigator.language) {
    const navLang = navigator.language.slice(0, 2).toLowerCase()
    if (navLang === 'fr' || navLang === 'en') {
      return navLang
    }
  }
  return 'fr'
}

const initialLocale = getDefaultLocale()

export const datetimeFormats = {
  fr: {
    short: { year: 'numeric', month: 'short', day: 'numeric' },
    long: { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' },
    weekdayDayMonth: { weekday: 'long', day: 'numeric', month: 'long' },
    dayMonth: { day: 'numeric', month: 'long' },
    dayMonthYear: { day: 'numeric', month: 'long', year: 'numeric' }
  },
  en: {
    short: { year: 'numeric', month: 'short', day: 'numeric' },
    long: { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' },
    weekdayDayMonth: { weekday: 'long', month: 'long', day: 'numeric' },
    dayMonth: { month: 'long', day: 'numeric' },
    dayMonthYear: { month: 'long', day: 'numeric', year: 'numeric' }
  }
}

export const numberFormats = {
  fr: {
    currency: { style: 'currency', currency: 'EUR' }
  },
  en: {
    currency: { style: 'currency', currency: 'EUR' }
  }
}

const i18n = createI18n({
  legacy: false,
  locale: initialLocale,
  fallbackLocale: 'fr',
  messages: {
    fr,
    en
  },
  datetimeFormats,
  numberFormats
})

// Met à jour document.documentElement.lang et localStorage à chaque changement de locale
if (typeof document !== 'undefined') {
  document.documentElement.lang = initialLocale
}

watch(
  i18n.global.locale,
  (newLocale) => {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('locale', newLocale)
    }
    if (typeof document !== 'undefined') {
      document.documentElement.lang = newLocale
    }
  },
  { immediate: true }
)

export function setLocale(locale) {
  i18n.global.locale.value = locale
}

export function localize(val, currentLocale) {
  if (!val) return ''
  if (typeof val === 'string') return val
  if (typeof val === 'object') {
    const loc = currentLocale || i18n.global.locale.value || 'fr'
    return val[loc] || val.fr || val.en || Object.values(val)[0] || ''
  }
  return String(val)
}

export default i18n
