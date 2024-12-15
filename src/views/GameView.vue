<script lang="ts">
import { defineComponent, computed, reactive, ref, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'

dayjs.extend(duration)

export default defineComponent({
  name: 'GameView',
  setup() {
    const route = useRoute()

    // Game Data from Route
    const gameData = reactive(route.query || {})
    const gameName = ref<string>((gameData.gameName as string) || 'Bingo Game')
    const slotsCount = ref<number>(Number(gameData.slotsCount) || 6)
    const columns = ref<number>(slotsCount.value > 6 ? 3 : 2)

    const phrases = ref(JSON.parse(gameData.phrases as string) || [])

    // Timer State
    const timer = ref(0)
    let timerInterval: number | null = null

    // Game State
    const squareCounts = reactive<number[]>(new Array(slotsCount.value).fill(0))

    const totalScore = computed(() => squareCounts.reduce((sum, count) => sum + count, 0))

    const formattedTime = computed(() => {
      const duration = dayjs.duration(timer.value, 'seconds')
      const hours = Math.floor(duration.asHours()) // Get the hour component
      const minutes = duration.minutes() // Get the minute component
      const seconds = duration.seconds() // Get the second component

      // Ensure hours, minutes, and seconds are always two digits
      return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
    })

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

    const getClassByClicks = (clicks: number) => {
      const index = Math.min(Math.floor(clicks / 3), 12)
      return `bg-${index}`
    }

    return {
      gameName,
      slotsCount,
      phrases,
      timer,
      formattedTime,
      totalScore,
      squareCounts,
      columns,
      handleSquareClick,
      endGame,
      getClassByClicks,
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
        <p class="text-lg">Timer: {{ formattedTime }}</p>
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
        class="flex items-center justify-center border border-gray-300 rounded-md cursor-pointer"
        :class="getClassByClicks(squareCounts[index])"
        @click="handleSquareClick(index)"
      >
        <div class="flex flex-col items-center justify-center gap-4">
          <p class="text-center text-xl font-medium">{{ phrase }}</p>
          <p class="text-center text-md">
            Clicks:
            <strong>
              {{ squareCounts[index] }}
            </strong>
          </p>
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

.bg-0 {
  background-color: #e8f5e9; /* Light Green */
  color: #000000; /* Black text */
}
.bg-1 {
  background-color: #c8e6c9; /* Soft Green */
  color: #000000;
}
.bg-2 {
  background-color: #a5d6a7; /* Medium Green */
  color: #000000;
}
.bg-3 {
  background-color: #66bb6a; /* Green */
  color: #ffffff; /* White text */
}
.bg-4 {
  background-color: #43a047; /* Dark Green */
  color: #ffffff;
}
.bg-5 {
  background-color: #81d4fa; /* Light Blue */
  color: #000000;
}
.bg-6 {
  background-color: #4fc3f7; /* Medium Blue */
  color: #000000;
}
.bg-7 {
  background-color: #2196f3; /* Blue */
  color: #ffffff;
}
.bg-8 {
  background-color: #1e88e5; /* Dark Blue */
  color: #ffffff;
}
.bg-9 {
  background-color: #9c27b0; /* Purple */
  color: #ffffff;
}
.bg-10 {
  background-color: #7b1fa2; /* Dark Purple */
  color: #ffffff;
}
.bg-11 {
  background-color: #4a148c; /* Deep Purple */
  color: #ffffff;
}
.bg-12 {
  background-color: #212121; /* Black */
  color: #ffffff;
}
</style>
