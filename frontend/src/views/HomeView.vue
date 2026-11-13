<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { festival, providers } from '@/datasource/data.js'
import { localize } from '@/i18n'

const { t, locale } = useI18n()

const artistes = computed(() => providers.filter((provider) => provider.type === 'artiste'))

const currentLocaleTag = computed(() => (locale.value === 'fr' ? 'fr-FR' : 'en-US'))

const dateFestival = computed(() => {
  const options = { day: 'numeric', month: 'long' }
  const debut = new Date(`${festival.startDate}T12:00:00`)
  const fin = new Date(`${festival.endDate}T12:00:00`)
  return `${debut.toLocaleDateString(currentLocaleTag.value, options)} — ${fin.toLocaleDateString(currentLocaleTag.value, { ...options, year: 'numeric' })}`
})
</script>

<template>
  <main class="festival-home">
    <section class="hero">
      <div class="hero-orbit orbit-one"></div>
      <div class="hero-orbit orbit-two"></div>
      <div class="hero-content">
        <p class="eyebrow"><span class="live-dot"></span> {{ t('home.eyebrow') }}</p>
        <h1>{{ t('home.title1') }}<br /><span>{{ t('home.title2') }}</span><br />{{ t('home.title3') }}</h1>
        <p class="tagline">Java'Fest <em>extends</em> {{ locale === 'fr' ? 'kiff !' : 'pure joy!' }}</p>
        <p class="intro">{{ t('home.intro') }}</p>
        <div class="hero-actions">
          <RouterLink class="button button-light" to="/billets">{{ t('home.ctaTickets') }} <span>↗</span></RouterLink>
          <a class="text-link" href="#festival">{{ t('home.ctaDiscover') }} <span>↓</span></a>
        </div>
      </div>

      <div class="hero-sticker" :aria-label="t('home.stickerAria')">
        <span>{{ t('home.stickerEdition') }}</span>
        <strong>20<br />27</strong>
        <span>{{ t('home.stickerAction') }}</span>
      </div>
      <div class="hero-bottom">
        <span>{{ t('home.bottomMusic') }}</span>
        <span>{{ t('home.bottomDates') }}</span>
      </div>
    </section>

    <section id="festival" class="event-strip">
      <div class="event-item">
        <span class="event-icon">✳</span>
        <div><small>{{ t('home.datesLabel') }}</small><strong>{{ dateFestival }}</strong></div>
      </div>
      <div class="event-item">
        <span class="event-icon">⌖</span>
        <div><small>{{ t('home.locationLabel') }}</small><strong>{{ festival.address }}</strong></div>
      </div>
      <div class="event-item">
        <span class="event-icon">♫</span>
        <div><small>{{ t('home.doorsLabel') }}</small><strong>{{ festival.openingHours.open }} — {{ festival.openingHours.close }}</strong></div>
      </div>
    </section>

    <section class="lineup-section">
      <div class="section-heading">
        <div>
          <p class="eyebrow eyebrow-dark">{{ t('home.lineupEyebrow') }}</p>
          <h2 v-html="t('home.lineupTitle')"></h2>
        </div>
        <RouterLink to="/billets" class="outline-link">{{ t('home.joinUs') }} <span>↗</span></RouterLink>
      </div>

      <div class="artist-grid">
        <article v-for="(artiste, index) in artistes" :key="artiste._id" class="artist-card" :class="`artist-${index + 1}`">
          <div class="artist-number">0{{ index + 1 }}</div>
          <div class="artist-symbol">{{ ['✳', '♫', '✺', '〰'][index % 4] }}</div>
          <div class="artist-info">
            <span>{{ localize(artiste.genre, locale) }}</span>
            <h3>{{ localize(artiste.name, locale) }}</h3>
            <p>{{ localize(artiste.description, locale) }}</p>
          </div>
        </article>
      </div>
    </section>

    <section class="ticket-banner">
      <div>
        <p class="eyebrow">{{ t('home.bannerEyebrow') }}</p>
        <h2 v-html="t('home.bannerTitle')"></h2>
      </div>
      <RouterLink to="/billets" class="button button-dark">{{ t('home.bannerCta') }} <span>↗</span></RouterLink>
      <span class="banner-spark">✳</span>
    </section>

    <footer class="site-footer">
      <RouterLink class="footer-brand" to="/">{{ t('footer.brand') }}<span>✳</span></RouterLink>
      <p>{{ t('footer.text') }}</p>
      <span>{{ t('footer.copyright', { year: festival.edition }) }}</span>
    </footer>
  </main>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=Space+Grotesk:wght@400;500;600;700&display=swap');

:root {
  font-family: 'DM Sans', sans-serif;
  color: #20172b;
  background: #fffaf4;
  font-synthesis: none;
  text-rendering: optimizeLegibility;
}

* { box-sizing: border-box; }
html { scroll-behavior: smooth; }
body { margin: 0; min-width: 320px; }
a { color: inherit; text-decoration: none; }
button, a { -webkit-tap-highlight-color: transparent; }

.festival-home { overflow: hidden; background: #fffaf4; }
.footer-brand { display: inline-flex; align-items: center; gap: 10px; font: 700 19px 'Space Grotesk', sans-serif; letter-spacing: -.8px; }

.hero {
  position: relative; min-height: 610px; width: min(1340px, calc(100% - 40px)); margin: 0 auto;
  overflow: hidden; border-radius: 9px; color: #fffaf4;
  background: radial-gradient(ellipse at 76% 36%, rgba(255, 170, 93, .38), transparent 27%),
    radial-gradient(ellipse at 90% 90%, rgba(241, 109, 78, .65), transparent 35%),
    linear-gradient(118deg, #291b3b 0%, #43284e 52%, #a44852 100%);
}
.hero::before { content: ''; position: absolute; inset: 0; opacity: .14; background-image: radial-gradient(#fff 0.7px, transparent .7px); background-size: 8px 8px; mask-image: linear-gradient(90deg, #000, transparent 75%); }
.hero-content { position: relative; z-index: 2; width: min(620px, 75%); padding: 76px 0 100px 8.5%; }
.eyebrow { margin: 0 0 22px; font-size: 10px; font-weight: 800; letter-spacing: 2.3px; }
.live-dot { display: inline-block; width: 7px; height: 7px; margin: 0 9px 1px 0; border-radius: 50%; background: #ffcb65; box-shadow: 0 0 0 5px #ffcb6525; }
.hero h1 { margin: 0; font: 700 clamp(62px, 8.3vw, 112px)/.88 'Space Grotesk', sans-serif; letter-spacing: -7px; }
.hero h1 span { color: #ffbd70; }
.tagline { margin: 27px 0 13px; font: 600 clamp(20px, 2.4vw, 29px) 'Space Grotesk', sans-serif; }
.tagline em { color: #ffbd70; font-style: normal; }
.intro { max-width: 420px; color: #eee1e8; font-size: 14px; line-height: 1.8; }
.hero-actions { display: flex; align-items: center; gap: 27px; margin-top: 30px; }
.button { display: inline-flex; align-items: center; justify-content: center; gap: 24px; border-radius: 4px; padding: 16px 21px; font-size: 12px; font-weight: 800; transition: transform .2s, background .2s; }
.button:hover { transform: translateY(-3px); }
.button-light { color: #2b1d3a; background: #fffaf4; }
.button-light span, .text-link span { color: #ee6b4b; }
.text-link { font-size: 12px; font-weight: 700; }
.text-link span { margin-left: 7px; }
.hero-orbit { position: absolute; border: 1px solid #ffffff24; border-radius: 50%; pointer-events: none; }
.orbit-one { width: 590px; height: 590px; right: -20px; top: 15px; }
.orbit-two { width: 420px; height: 420px; right: 65px; top: 100px; border-style: dashed; }
.hero-sticker { position: absolute; z-index: 2; right: 15%; top: 23%; display: flex; flex-direction: column; align-items: center; justify-content: center; width: 155px; height: 155px; border-radius: 50%; color: #2c1c3b; background: #ffcb65; transform: rotate(10deg); box-shadow: 0 12px 45px #1b102b55; }
.hero-sticker span { font-size: 9px; font-weight: 800; letter-spacing: 2px; }
.hero-sticker strong { font: 700 43px/.8 'Space Grotesk', sans-serif; text-align: center; margin: 7px 0; letter-spacing: -3px; }
.hero-bottom { position: absolute; z-index: 2; bottom: 0; left: 0; right: 0; display: flex; justify-content: space-between; padding: 19px 8.5%; border-top: 1px solid #ffffff2b; color: #f7dce0; font-size: 9px; font-weight: 700; letter-spacing: 1.7px; }

.event-strip { width: min(1120px, calc(100% - 64px)); margin: 0 auto; padding: 33px 0; display: grid; grid-template-columns: repeat(3, 1fr); border-bottom: 1px solid #eadfd5; }
.event-item { display: flex; align-items: center; gap: 15px; padding: 0 25px; border-right: 1px solid #eadfd5; }
.event-item:first-child { padding-left: 0; }
.event-item:last-child { border: 0; }
.event-icon { display: grid; place-items: center; flex: 0 0 39px; height: 39px; border-radius: 50%; background: #f9e8dc; color: #e66b4e; font-size: 19px; }
.event-item div { display: flex; flex-direction: column; gap: 5px; }
.event-item small { color: #a28e83; font-size: 9px; font-weight: 800; letter-spacing: 1.5px; }
.event-item strong { font-size: 12px; }

.lineup-section { width: min(1120px, calc(100% - 64px)); margin: auto; padding: 82px 0 90px; }
.section-heading { display: flex; align-items: end; justify-content: space-between; margin-bottom: 30px; }
.eyebrow-dark { color: #e66b4e; margin-bottom: 12px; }
.section-heading h2, .ticket-banner h2 { margin: 0; font: 700 clamp(36px, 5vw, 56px)/1 'Space Grotesk', sans-serif; letter-spacing: -2.8px; }
.section-heading h2 span { color: #ed7555; }
.outline-link { border-bottom: 1px solid #d7bfb0; padding: 0 0 8px; font-size: 12px; font-weight: 800; }
.outline-link span { color: #ed7555; margin-left: 10px; }
.artist-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 13px; }
.artist-card { position: relative; display: flex; flex-direction: column; justify-content: space-between; min-height: 270px; overflow: hidden; padding: 20px; border-radius: 5px; color: white; background: #30213e; }
.artist-card::after { content: ''; position: absolute; width: 180px; height: 180px; top: 35px; right: -70px; border: 1px solid #ffffff30; border-radius: 50%; box-shadow: 0 0 0 20px #ffffff0b, 0 0 0 40px #ffffff08; }
.artist-2 { background: #df7959; }
.artist-3 { background: #e9b75f; color: #30213e; }
.artist-4 { background: #71877b; }
.artist-number { position: relative; z-index: 1; font-size: 10px; font-weight: 800; opacity: .7; }
.artist-symbol { position: absolute; top: 54px; left: 25px; font: 400 86px 'Space Grotesk', sans-serif; opacity: .85; transform: rotate(-12deg); }
.artist-info { position: relative; z-index: 1; }
.artist-info > span { font-size: 9px; font-weight: 800; letter-spacing: 1.5px; text-transform: uppercase; opacity: .75; }
.artist-info h3 { margin: 7px 0; font: 700 23px 'Space Grotesk', sans-serif; letter-spacing: -.8px; }
.artist-info p { margin: 0; font-size: 10px; line-height: 1.5; opacity: .8; }

.ticket-banner { position: relative; display: flex; align-items: center; justify-content: space-between; gap: 25px; width: min(1120px, calc(100% - 64px)); min-height: 245px; margin: 0 auto 75px; overflow: hidden; padding: 42px 6%; border-radius: 6px; color: #fffaf4; background: #ed7656; }
.ticket-banner .eyebrow { color: #572f3b; margin-bottom: 13px; }
.ticket-banner h2 { position: relative; z-index: 1; font-size: clamp(34px, 4.5vw, 51px); }
.button-dark { position: relative; z-index: 2; flex-shrink: 0; color: #fffaf4; background: #2d203b; }
.button-dark span { color: #ffca6c; }
.banner-spark { position: absolute; right: 24%; top: -80px; color: #ffffff16; font-size: 330px; line-height: 1; }

.site-footer { width: min(1120px, calc(100% - 64px)); margin: auto; padding: 0 0 35px; display: flex; align-items: center; justify-content: space-between; gap: 20px; }
.footer-brand { font-size: 15px; }
.footer-brand span { color: #ed7656; }
.site-footer p, .site-footer > span { color: #9b8b82; font-size: 10px; }

@media (max-width: 760px) {
  .hero { width: calc(100% - 20px); min-height: 610px; margin-top: 42px; }
  .hero-content { width: 90%; padding: 68px 0 105px 8%; }
  .hero h1 { font-size: clamp(58px, 13vw, 88px); letter-spacing: -4px; }
  .hero-sticker { width: 105px; height: 105px; right: 8%; top: auto; bottom: 105px; }
  .hero-sticker strong { font-size: 30px; }
  .hero-sticker span { font-size: 7px; }
  .orbit-one { right: -260px; }
  .orbit-two { right: -180px; }
  .hero-bottom { padding: 15px 8%; font-size: 7px; letter-spacing: .8px; }
  .event-strip { width: calc(100% - 42px); grid-template-columns: 1fr; gap: 17px; padding: 25px 0; }
  .event-item, .event-item:first-child { padding: 0; border: 0; }
  .lineup-section { width: calc(100% - 42px); padding: 60px 0; }
  .artist-grid { grid-template-columns: repeat(2, 1fr); }
  .artist-card { min-height: 235px; padding: 16px; }
  .artist-info h3 { font-size: 19px; }
  .section-heading { align-items: start; gap: 15px; }
  .outline-link { white-space: nowrap; margin-top: 30px; }
  .ticket-banner { width: calc(100% - 42px); min-height: 260px; align-items: flex-start; flex-direction: column; justify-content: center; margin-bottom: 50px; padding: 35px 8%; }
  .ticket-banner h2 { font-size: 39px; }
  .site-footer { width: calc(100% - 42px); flex-wrap: wrap; }
  .site-footer p { order: 3; width: 100%; margin: 0; }
}
@media (max-width: 390px) {
  .hero-actions { align-items: flex-start; flex-direction: column; gap: 18px; }
  .hero { min-height: 660px; }
  .artist-grid { grid-template-columns: 1fr; }
  .artist-card { min-height: 210px; }
  .hero-bottom span:first-child { display: none; }
  .hero-bottom { justify-content: center; }
}
</style>
