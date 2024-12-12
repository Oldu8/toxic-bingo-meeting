import { ref, watch } from 'vue'
import './styles/HomeScreen.scss'

const GRID_SIZES = [4, 6, 9, 12, 16]

export default function HomeScreen() {
  const gameName = ref('')
  const gridSize = ref(0)
  const phrases = ref([])

  // Watch for changes in gridSize and update phrases
  watch(gridSize, (newSize) => {
    console.log(newSize)
    // phrases.value = Array.from({ length: newSize }, () => '')
  })

  const startBingo = () => {
    // if (!gameName.value.trim() || phrases.value.some((p) => !p.trim())) {
    //   alert('Please complete all fields before starting!')
    //   return
    // }
    console.log('Starting Bingo with:', {
      gameName: gameName.value,
      gridSize: gridSize.value,
      phrases: phrases.value,
    })
    // Add navigation logic here if needed
  }

  return (
    <div class="home-screen">
      <h1>Toxic Bingo Meeting</h1>

      {/* Bingo Game Name */}
      <label for="game-name">Name your Bingo Game:</label>
      <input id="game-name" type="text" placeholder="Enter game name" v-model={gameName.value} />

      {/* Select Grid Size */}
      <label for="grid-size">Select Grid Size:</label>
      <select id="grid-size" v-model={gridSize.value}>
        {GRID_SIZES.map((size) => (
          <option key={size} value={size}>
            {size} Slots
          </option>
        ))}
      </select>

      {/* Input Phrases */}
      {gridSize.value > 0 && (
        <div>
          <h3>Enter phrases/words for the grid:</h3>
          {phrases.value.map((_, index) => (
            <div key={index} class="phrase-input">
              <input
                type="text"
                placeholder={`Phrase ${index + 1}`}
                maxlength="250"
                v-model={phrases.value[index]}
              />
            </div>
          ))}
        </div>
      )}

      {/* Start Bingo Button */}
      <button onClick={startBingo}>Start Bingo</button>
    </div>
  )
}
