import { ref, watch } from 'vue'
import './styles/HomeScreen.scss'

const GRID_SIZES = [4, 6, 9, 12, 16]

export default function HomeScreen() {
  const gameName = ref<string>('')
  const gridSize = ref<number>(6)
  const phrases = ref<string[]>(Array.from({ length: gridSize.value }, () => ''))

  watch(gridSize, (newSize) => {
    console.log('Grid size changed to:', newSize)

    if (newSize > phrases.value.length) {
      console.log('Adding new phrases')
      phrases.value = [
        ...phrases.value,
        ...Array.from({ length: newSize - phrases.value.length }, () => ''),
      ]
    } else if (newSize < phrases.value.length) {
      console.log('Removing extra phrases')
      phrases.value = phrases.value.slice(0, newSize)
    }
  })

  const startBingo = () => {
    console.log('Starting Bingo with:', {
      gameName: gameName.value,
      gridSize: gridSize.value,
      phrases: phrases.value,
    })
  }

  return (
    <div class="home-screen">
      <h1>Toxic Bingo Meeting</h1>

      <label for="game-name">Name your Bingo Game:</label>
      <input id="game-name" type="text" placeholder="Enter game name" v-model={gameName.value} />

      <label for="grid-size">Select Grid Size:</label>
      <select id="grid-size" v-model={gridSize.value}>
        {GRID_SIZES.map((size) => (
          <option key={size} value={size}>
            {size} Slots
          </option>
        ))}
      </select>

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

      <button onClick={startBingo}>Start Bingo</button>
    </div>
  )
}
