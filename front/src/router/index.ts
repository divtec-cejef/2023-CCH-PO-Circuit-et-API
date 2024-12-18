import {createRouter, createWebHistory} from 'vue-router';

const HistoryView = () => import('@/views/HistoryView.vue');
const AboutView = () => import('@/views/AboutView.vue');
const CourseView = () => import('@/views/CourseView.vue');
const UserView = () => import('@/views/UserView.vue');
const ClassementView = () => import('@/views/ClassementView.vue');
const ScanneurQRBonusView = () => import('@/views/ScanneurQRBonusView.vue');
const HomeView = () => import('@/views/HomeView.vue');
const ScanView = () => import('@/views/ScanView.vue');
const UpdateUserView = () => import('@/views/UpdateUserView.vue');
const ActivityAdminView = () => import('@/views/ActivityAdminView.vue');
const ScanActivityView = () => import('@/views/ScanActivityView.vue');
const ClassementFullScreenView = () => import('@/views/ClassementFullScreenView.vue');
const StageView = () => import('@/views/StageView.vue');
const LiveView = () => import('@/views/LiveView.vue');
const NotFoundView = () => import('@/views/404View.vue');
const RandomlySelectBusinessView = () => import('@/views/RandomlySelectBusiness.vue');

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/:id([0-9]{4})',
      name: 'utilisateur',
      component: UserView
    },
    {
      path: '/',
      name: 'accueil',
      component: HomeView
    },
    {
      path: '/bonus',
      name: 'bonus',
      component: HistoryView
    },
    {
      path: '/course',
      name: 'course',
      component: CourseView
    },
    {
      path: '/scanneurQR',
      name: 'scanneurQR',
      component: ScanneurQRBonusView
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
      path: '/pilote',
      name: 'pilote',
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
    },
    {
      path: '/admin/full-screen-classement',
      name: 'full-screen-classement',
      component: ClassementFullScreenView
    },
    {
      path: '/admin/randomly-select-business',
      name: 'randomly-select-business',
      component: RandomlySelectBusinessView
    },
    {
      path: '/stage',
      name: 'stage',
      component: StageView
    },
    {
      path: '/live',
      name: 'live',
      component: LiveView
    },
    {
      name: '404',
      alias: ['/not-found', '/404'],
      path: '/:p(.*)*',
      component: NotFoundView
    }
  ],
  scrollBehavior() {
    return {top: 0};
  }
});

export default router;
