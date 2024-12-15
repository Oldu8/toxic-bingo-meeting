<script lang="ts">
import { defineComponent, computed, reactive, ref, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'

export default defineComponent({
  name: 'GameView',
  setup() {
    const route = useRoute()

    // Game Data from Route
    const gameData = reactive(route.query || {})
    const gameName = ref(gameData.gameName || 'Bingo Game')
    const slotsCount = ref(Number(gameData.slotsCount) || 6)
    const columns = ref<number>(slotsCount.value > 6 ? 3 : 2)

    const phrases = ref(JSON.parse(gameData.phrases as string) || [])

    // Timer State
    const timer = ref(0)
    let timerInterval: number | null = null

    // Game State
    const squareCounts = reactive<number[]>(new Array(slotsCount.value).fill(0))

    const totalScore = computed(() => squareCounts.reduce((sum, count) => sum + count, 0))

    // Timer Logic
    onMounted(() => {
      timerInterval = setInterval(() => {
        timer.value++
      }, 1000)
    })

    onUnmounted(() => {
      if (timerInterval) clearInterval(timerInterval)
    })

    // Click Handler
    const handleSquareClick = (index: number) => {
      squareCounts[index]++
    }

    // End Game
    const endGame = () => {
      console.log('Game Ended')
      console.log('Results:', squareCounts)
    }

    return {
      gameName,
      slotsCount,
      phrases,
      timer,
      totalScore,
      squareCounts,
      columns,
      handleSquareClick,
      endGame,
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
        <p class="text-lg">Timer: {{ timer }}s</p>
        <p class="text-lg">Score: {{ totalScore }}</p>
        <button
          @click="endGame"
          class="px-4 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600"
        >
          End Game
        </button>
      </div>
    </header>

    <div
      :style="{ gridTemplateColumns: `repeat(${columns}, 1fr)` }"
      class="grid gap-2 w-full max-w-4xl aspect-square bg-white shadow-md p-2"
    >
      <div
        v-for="(phrase, index) in phrases"
        :key="index"
        class="flex items-center justify-center bg-gray-200 border border-gray-300 rounded-md cursor-pointer"
        @click="handleSquareClick(index)"
      >
        <div>
          <p class="text-center text-sm font-medium">{{ phrase }}</p>
          <p class="text-center text-xs text-gray-500">Clicks: {{ squareCounts[index] }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Animation for the first click */
.square-clicked {
  animation: pulse 0.3s ease-in-out;
}

@keyframes pulse {
  0% {
    transform: scale(1);
    background-color: rgba(34, 197, 94, 0.5); /* Green */
  }
  50% {
    transform: scale(1.1);
    background-color: rgba(34, 197, 94, 0.7);
  }
  100% {
    transform: scale(1);
    background-color: rgba(34, 197, 94, 0.5);
  }
}
</style>
