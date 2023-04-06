import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import home from "@/views/HomeView.vue";
import ScanView from "@/views/ScanView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/:id',
      name: 'home',
      component: HomeView
    },
    {
      path: '/scan',
      name: 'scan',
      component: ScanView
    }
  ]
})

export default router
