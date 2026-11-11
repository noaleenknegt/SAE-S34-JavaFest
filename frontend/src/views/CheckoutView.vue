<script setup>
import { useCartStore } from '@/stores/cart.js'
const cart = useCartStore()
</script>

<template>
  <h1>Welcome to JavaFest!</h1>
  <RouterLink to="/panier">Panier ({{ cart.count }})</RouterLink>
  <RouterView />
</template>