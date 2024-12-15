<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useRoute } from 'vue-router'

export default defineComponent({
  name: 'GameView',
  setup() {
    const route = useRoute()

    const gameName = computed(() => route.query.gameName || '')
    const slotsCount = computed(() => Number(route.query.slotsCount) || 0)
    const phrases = computed(() => {
      try {
        return JSON.parse(route.query.phrases as string) || []
      } catch {
        return []
      }
    })

    return { gameName: gameName.value, slotsCount: slotsCount.value, phrases: phrases.value }
  },
})
</script>

<template>
  <div>
    <h1>{{ gameName }}</h1>
    <p>Slots Count: {{ slotsCount }}</p>
    <ul>
      <li v-for="(phrase, index) in phrases" :key="index">
        {{ phrase }}
      </li>
    </ul>
  </div>
</template>

<style>
/* Optional: TailwindCSS should handle most styles */
</style>
