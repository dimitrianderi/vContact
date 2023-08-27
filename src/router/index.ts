import { createRouter, createWebHistory } from 'vue-router'
import TheMain from '@/views/TheMain.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Main',
      component: TheMain
    }
  ]
})

export default router
