import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', () => {
  const lines = ref([])

  function addItem(type, item, options = {}, quantity=1) {
    const existing = lines.value.find(
      l => l.type === type && l.itemId === item._id &&
           JSON.stringify(l.options) === JSON.stringify(options)
    )
    if (existing) {
      existing.quantity+=quantity
    } else {
      lines.value.push({
        type,
        itemId: item._id,
        name: item.name,
        unitPrice: item.price,
        quantity,
        options,
      })
    }
  }

  function removeLine(index) {
    lines.value.splice(index, 1)
  }

  function clear() {
    lines.value = []
  }

  function quantityInCart(type, itemId) {
    return lines.value
    .filter(l => l.type === type && l.itemId === itemId)
    .reduce((sum, l) => sum + l.quantity, 0)
    }

  const total = computed(() => lines.value.reduce((sum, l) => sum + l.unitPrice * l.quantity, 0))
  const count = computed(() => lines.value.reduce((sum, l) => sum + l.quantity, 0))

  return { lines, total, count, addItem, removeLine, clear, quantityInCart }
})