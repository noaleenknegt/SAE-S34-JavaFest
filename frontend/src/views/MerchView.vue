<script setup>
    import { merchItems } from '@/datasource/data.js'
    import { useCartStore } from '@/stores/cart.js'

const cart = useCartStore()
</script>

<template>
  <h1>Merch</h1>
  <RouterLink to="/">← Accueil</RouterLink>

  <div v-for="item in merchItems" :key="item._id">
    <h2>{{ item.name }}</h2>
    <p>{{ item.image }}</p>
    <p>{{ item.sizes }}</p>
    <p>{{ item.category }}</p>
    <p>{{ item.description }}</p>
    <p>Prix : {{ item.price }} €</p>
    <p v-if="item.stock === 0">Épuisé</p>
    <template v-else>
    <p>Items restants : {{ item.stock }}</p>
    <button @click="cart.addItem('item', item)">Ajouter au panier</button>
  </template>
  </div>

</template>