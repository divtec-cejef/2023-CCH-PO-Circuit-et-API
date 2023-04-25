import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import home from "@/views/HomeView.vue";
import ScanView from "@/views/ScanView.vue";
import HistoryView from "@/views/HistoryView.vue";
import AboutView from "@/views/AboutView.vue";
import CourseView from "@/views/CourseView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/:id',
      name: 'home',
      component: HomeView
    },
    {
      path: '/historique',
      name: 'historique',
      component: HistoryView
    },

    {
      path: '/course',
      name: 'course',
      component: CourseView
    },

    {
      path: '/apropos',
      name: 'apropos',
      component: AboutView
    }
  ]
})

export default router
