<script setup>
import { useCartStore } from '@/stores/cart.js'

const cart = useCartStore()
</script>

<template>
  <h2>Mon panier</h2>
  <RouterLink to="/">← Accueil</RouterLink>

  <p v-if="cart.lines.length === 0">Votre panier est vide.</p>

  <template v-else>
    <div v-for="(line, index) in cart.lines" :key="index">
      <p>
        {{ line.name }}
        <span v-if="line.options?.day">({{ line.options.day }})</span>
        — {{ line.quantity }} × {{ line.unitPrice }} €
      </p>
      <button @click="cart.removeLine(index)">Retirer</button>
    </div>

    <p>Total : {{ cart.total }} €</p>
    <RouterLink to="/paiement"><button>Passer au paiement</button></RouterLink>
  </template>
</template>