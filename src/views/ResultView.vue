<script lang="ts">
import { defineComponent, computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export default defineComponent({
  name: 'ResultsView',
  setup() {
    const route = useRoute()
    const router = useRouter()

    const gameName = ref(route.query.gameName || 'Bingo Game')
    const totalTime = ref(Number(route.query.time || 0))
    const totalScore = ref(Number(route.query.score || 0))
    const sortedPhrases = ref(
      JSON.parse((route.query.phrases as string) || '[]') as { phrase: string; clicks: number }[],
    )

    const formattedTime = computed(() => {
      const hours = Math.floor(totalTime.value / 3600)
      const minutes = Math.floor((totalTime.value % 3600) / 60)
      const seconds = totalTime.value % 60

      return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
    })

    // Start a new game
    const startNewGame = () => {
      router.push({ name: 'Home' })
    }

    return {
      gameName,
      totalTime,
      totalScore,
      sortedPhrases,
      formattedTime,
      startNewGame,
    }
  },
})
</script>

<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
    <!-- Header -->
    <header class="flex flex-col w-full max-w-4xl mb-8">
      <h1 class="text-3xl font-bold text-center mb-4">{{ gameName }}</h1>
      <div class="flex items-center justify-between">
        <p class="text-lg">Time: {{ formattedTime }}</p>
        <p class="text-lg">Score: {{ totalScore }}</p>
        <button
          @click="startNewGame"
          class="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600"
        >
          Start New Game
        </button>
      </div>
    </header>

    <!-- Phrases List -->
    <div class="flex flex-col w-full max-w-4xl bg-white shadow-md rounded-lg p-4">
      <h2 class="text-2xl font-semibold mb-4">Results</h2>
      <div
        v-for="(phraseObj, index) in sortedPhrases"
        :key="index"
        class="flex items-center justify-between border-b py-2"
      >
        <span class="text-lg">{{ phraseObj.phrase }}</span>
        <span class="text-lg font-bold">{{ phraseObj.clicks }} Clicks</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Animation for the first click */
.square-clicked {
  animation: pulse 0.3s ease-in-out;
}
</style>
