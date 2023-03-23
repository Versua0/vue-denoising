import { createRouter, createWebHistory } from 'vue-router'
import ct from '../views/ct.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: ct
    }
  ]
})

export default router
