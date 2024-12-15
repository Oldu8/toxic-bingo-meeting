import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import GameView from '@/views/GameView.vue'
// import ResultsScreen from '../components/ResultsScreen.vue'

// Define routes
const routes = [
  { path: '/', component: HomeView },
  { path: '/game', component: GameView },
  // { path: '/results', component: ResultsScreen },
]

// Create the router instance
const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
