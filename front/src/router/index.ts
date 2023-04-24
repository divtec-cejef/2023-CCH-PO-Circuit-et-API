import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import home from "@/views/HomeView.vue";
import ScanView from "@/views/ScanView.vue";
import TestView from "@/views/TestView.vue";
import CourseView from "@/views/CourseView.vue";
import HistoryView from "@/views/HistoryView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'accueil',
      component: TestView
    },

    {
      path: '/:id',
      name: 'home',
      component: HomeView
    },
    {
      path: '/scan',
      name: 'scan',
      component: ScanView
    },
    {
      path: '/course',
      name: 'course',
      component: CourseView
    },
    {
      path: '/historique',
      name: 'historique',
      component: HistoryView
    },
  ]
})

export default router
