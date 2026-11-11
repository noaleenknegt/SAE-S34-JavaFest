<script setup>
import { reactive } from 'vue'
import { festival, ticketTypes } from '@/datasource/data.js'
import { useCartStore } from '@/stores/cart.js'

const cart = useCartStore()

const jours = []
for (let d = new Date(festival.startDate); d <= new Date(festival.endDate); d.setUTCDate(d.getUTCDate() + 1)) {
  jours.push({
    value: d.toISOString().slice(0, 10),
    label: d.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', timeZone: 'UTC' }),
  })
}

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
  return new Date(iso).toLocaleDateString('fr-FR', {
    weekday: 'long', day: 'numeric', month: 'long', timeZone: 'UTC',
  })
}
</script>

<template>
  <h1>Billets</h1>
  <RouterLink to="/">← Accueil</RouterLink>

  <div v-for="ticket in ticketTypes" :key="ticket._id">
    <h2>{{ ticket.name }}</h2>
    <p>{{ ticket.description }}</p>
    <p>Prix : {{ ticket.price }} €</p>
    <p v-if="ticket.days">Valable : {{ ticket.days.map(formatDay).join(', ') }}</p>

    <p v-if="ticket.quantityLeft === 0">Épuisé</p>
    <template v-else>
      <p>Places restantes : {{ remaining(ticket) }}</p>

      <label v-if="ticket.scope === '1-jour'">
        Jour :
        <select v-model="selectedDay[ticket._id]">
          <option :value="undefined" disabled>Choisir un jour</option>
          <option v-for="jour in jours" :key="jour.value" :value="jour.value">
            {{ jour.label }}
          </option>
        </select>
      </label>

      <div>
        <button :disabled="qty(ticket) <= 1" @click="decrease(ticket)">−</button>
        <span>{{ qty(ticket) }}</span>
        <button :disabled="qty(ticket) >= remaining(ticket)" @click="increase(ticket)">+</button>
      </div>

      <button :disabled="!canAdd(ticket)" @click="add(ticket)">
        Ajouter {{ qty(ticket) }} au panier
      </button>
    </template>
  </div>
</template>