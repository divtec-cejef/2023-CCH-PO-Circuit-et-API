import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/UserView.vue'
import home from "@/views/UserView.vue";
import ScanView from "@/views/ScanView.vue";
import HistoryView from "@/views/HistoryView.vue";
import AboutView from "@/views/AboutView.vue";
import CourseView from "@/views/CourseView.vue";
import TestView from "@/views/TestView.vue";
import GraphicsView from "@/views/GraphicsView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: TestView
    },
    {
      path: '/:id',
      name: 'accueil',
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
    },
    {
      path: '/graphics',
      name: 'graphics',
      component: GraphicsView
    }
  ]
})

export default router
