<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'HomeView',
  setup() {
    const router = useRouter()
    const gameName = ref('')
    const slotsCount = ref(6)
    const defaultOptions = [4, 6, 9, 12, 15]
    const phrases = ref(Array(slotsCount.value).fill(''))

    const updateSlotsCount = () => {
      phrases.value = Array(slotsCount.value).fill('')
    }

    // Validation: Check if all inputs are filled
    const isValid = computed(() => {
      return gameName.value.trim() !== '' && phrases.value.every((phrase) => phrase.trim() !== '')
    })

    const createGame = () => {
      if (isValid.value) {
        const gameData = {
          gameName: gameName.value,
          slotsCount: slotsCount.value,
          phrases: phrases.value,
        }
        console.log('Game Data:', gameData)
        router.push('/game')
      } else {
        console.log('Please fill in all fields!')
      }
    }

    return {
      defaultOptions,
      gameName,
      slotsCount,
      phrases,
      updateSlotsCount,
      isValid,
      createGame,
    }
  },
})
</script>

<template>
  <div class="p-6 max-w-lg mx-auto bg-gray-100 rounded-lg shadow-md">
    <div class="mb-4">
      <label for="game-name" class="block text-lg font-semibold mb-2">Name your Bingo Game:</label>
      <input
        id="game-name"
        type="text"
        placeholder="Enter game name"
        v-model="gameName"
        class="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
      />
    </div>

    <div class="mb-4">
      <label for="slots-count" class="block text-lg font-semibold mb-2">Select Slots Count:</label>
      <select
        id="slots-count"
        v-model="slotsCount"
        @change="updateSlotsCount"
        class="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
      >
        <option v-for="count in defaultOptions" :key="count" :value="count">
          {{ count }}
        </option>
      </select>
    </div>

    <div class="mb-6">
      <h3 class="text-lg font-semibold mb-2">Enter Phrases:</h3>
      <div v-for="(phrase, index) in phrases" :key="index" class="mb-2">
        <label :for="'phrase-' + index" class="block text-sm mb-1">Phrase {{ index + 1 }}:</label>
        <input
          :id="'phrase-' + index"
          type="text"
          maxlength="200"
          v-model="phrases[index]"
          class="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>

    <button
      @click="createGame"
      :disabled="!isValid"
      class="w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-md disabled:bg-gray-400"
    >
      Create a Game
    </button>
  </div>
</template>

<style>
/* Optional: TailwindCSS should handle most styles */
</style>
