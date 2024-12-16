import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import GameView from '@/views/GameView.vue'
import ResultView from '@/views/ResultView.vue'

// Define routes
const routes = [
  { path: '/', name: 'Home', component: HomeView },
  { path: '/game', name: 'Game', component: GameView },
  { path: '/results', name: 'Results', component: ResultView },
]

// Create the router instance
const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
