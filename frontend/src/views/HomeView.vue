<script setup>
import { festival } from '@/datasource/data.js'

const liens = [
  { to: '/billets', label: 'Billets' },
  { to: '/merch', label: 'Boutique merch' },
  { to: '/panier', label: 'Panier' },
]
</script>

<template>
  <header>
    <h1>{{ festival.name }} {{ festival.edition }}</h1>
    <p>{{ festival.description }}</p>
    <p>Du {{ festival.startDate }} au {{ festival.endDate }} — {{ festival.address }}</p>
    <RouterLink to="/login"><button>Se connecter</button></RouterLink>
  </header>

  <nav>
    <RouterLink v-for="lien in liens" :key="lien.to" :to="lien.to">
      <button>{{ lien.label }}</button>
    </RouterLink>
  </nav>
</template>