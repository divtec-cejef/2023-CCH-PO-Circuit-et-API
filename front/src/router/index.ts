import { createRouter, createWebHistory } from 'vue-router';
import HistoryView from '@/views/HistoryView.vue';
import AboutView from '@/views/AboutView.vue';
import CourseView from '@/views/CourseView.vue';
import UserView from '@/views/UserView.vue';
import ClassementView from '@/views/ClassementView.vue';
import HomeView from '@/views/HomeView.vue';
import ScanView from '@/views/ScanView.vue';
import UpdateUserView from '@/views/UpdateUserView.vue';
import ActivityAdminView from '@/views/ActivityAdminView.vue';
import ScanActivityView from '@/views/ScanActivityView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/:id',
      name: 'utilisateur',
      component: UserView
    },
    {
      path: '/',
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
      path: '/classement',
      name: 'classement',
      component: ClassementView
    },
    {
      path: '/scan',
      name: 'scan',
      component: ScanView
    },
    {
      path: '/modifier',
      name: 'modifier',
      component: UpdateUserView
    },
    {
      path: '/admin',
      name: 'admin',
      component: ActivityAdminView
    },
    {
      path: '/admin/scan',
      name: 'admin-scan',
      component: ScanActivityView
    }
  ]
});

export default router;
