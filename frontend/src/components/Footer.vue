<script setup>
import { RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { festival } from '@/datasource/data.js'

// Traductions locales (un seul fichier) : suit la langue FR/EN de la NavBar
const { t } = useI18n({
  useScope: 'local',
  messages: {
    fr: {
      brandAria: 'JavaFest, accueil',
      text: 'De la musique, des sourires et beaucoup de kiff.',
      navAria: 'Liens du pied de page',
      tickets: 'Billetterie',
      merch: 'Boutique',
      login: 'Espace festivalier',
      contactEyebrow: 'UNE QUESTION ?',
      contactCta: 'Nous contacter',
      copyright: '© {year} — La Java Festival'
    },
    en: {
      brandAria: 'JavaFest, home',
      text: 'Music, smiles and good vibes all around.',
      navAria: 'Footer links',
      tickets: 'Tickets',
      merch: 'Shop',
      login: 'Festival Area',
      contactEyebrow: 'GOT A QUESTION?',
      contactCta: 'Contact us',
      copyright: '© {year} — La Java Festival'
    }
  }
})
</script>

<template>
  <footer class="sf-footer">
    <div class="sf-inner">
      <div class="sf-brand-block">
        <RouterLink class="sf-brand" to="/" :aria-label="t('brandAria')">
          JAVA'FEST<span>✳</span>
        </RouterLink>
        <p>{{ t('text') }}</p>
      </div>
      <div class="sf-contact">
        <small>{{ t('contactEyebrow') }}</small>
        <RouterLink class="sf-cta" to="/contact">{{ t('contactCta') }} <span>↗</span></RouterLink>
      </div>
    </div>

    <p class="sf-copyright">{{ t('copyright', { year: festival.edition }) }}</p>
  </footer>
</template>

<style scoped>
.sf-footer {
  width: min(1120px, calc(100% - 64px));
  margin: 0 auto;
  padding: 36px 0 30px;
  border-top: 1px solid #eadfd5;
  background: #fffaf4;
  color: #20172b;
  font-family: 'DM Sans', sans-serif;
}

.sf-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 28px;
}

/* --- Marque --- */
.sf-brand {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font: 700 17px 'Space Grotesk', sans-serif;
  letter-spacing: -0.8px;
  color: #20172b;
  text-decoration: none;
}
.sf-brand span { color: #ed6b4b; }
.sf-brand-block p {
  margin: 8px 0 0;
  max-width: 260px;
  font-size: 12px;
  line-height: 1.6;
  color: #8e7a70;
}

/* --- Navigation --- */
.sf-nav {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px 28px;
}
.sf-nav a {
  font-size: 13px;
  font-weight: 700;
  color: #20172b;
  text-decoration: none;
  transition: color 0.2s;
}
.sf-nav a:hover,
.sf-nav a.router-link-active { color: #ed6b4b; }

/* --- Bloc contact --- */
.sf-contact {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 8px;
}
.sf-contact small {
  font-size: 9px;
  font-weight: 800;
  letter-spacing: 2px;
  color: #8e7a70;
}
.sf-cta {
  display: inline-flex;
  align-items: center;
  gap: 14px;
  padding: 12px 20px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 800;
  background: #2b1d3a;
  color: #fffaf4;
  text-decoration: none;
  transition: transform 0.2s, background 0.2s;
}
.sf-cta span { color: #ffcb65; }
.sf-cta:hover {
  background: #ed6b4b;
  transform: translateY(-2px);
}

.sf-copyright {
  margin: 28px 0 0;
  font-size: 10px;
  color: #9b8b82;
}

/* --- Responsive --- */
@media (max-width: 820px) {
  .sf-inner {
    flex-direction: column;
    align-items: flex-start;
    gap: 24px;
  }
  .sf-nav { justify-content: flex-start; }
  .sf-contact { align-items: flex-start; }
}
@media (max-width: 640px) {
  .sf-footer { width: calc(100% - 42px); padding-top: 30px; }
}
</style>
