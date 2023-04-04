import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import home from "@/views/HomeView.vue";
import ScannView from "@/views/ScannView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/scann',
      name: 'scann',
      component: ScannView
    }
  ]
})

export default router
