import { createRouter, createWebHistory } from 'vue-router';
import { gsap } from 'gsap';
import Home from '@/views/Home.vue';
import store from '@/store';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/auth',
    name: 'Auth',
    component: () => import('@/components/auth/Auth.vue'),
    meta: {
      layout: 'LayoutAuth',
    },
  },

  {
    path: '/login',
    name: 'Login',
    component: () => import('@/components/auth/Login.vue'),
    meta: {
      layout: 'LayoutAuth',
    },
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/components/auth/Register.vue'),
    meta: {
      layout: 'LayoutAuth',
    },
  },
  {
    path: '/create',
    name: 'CreateEvent',
    component: () => import('@/views/CreateEvent.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/:id/suggest',
    name: 'SuggestEvent',
    component: () => import('@/views/SuggestEvent.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'notFound',
    component: () => import('@/views/404.vue'),
  },

];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 };
  },
});
router.beforeEach((to, from, next) => {
  gsap.fromTo('body', { opacity: 0 }, { opacity: 1, duration: 1 });
  store.dispatch('changeSuccessStatus', null);
  debugger;
  if (to.matched.some((route) => route.meta.requiresAuth)) {
    if (!store.getters.isLoggedIn) {
      next({ name: 'Auth' });
    }
    next();
  } else {
    next();
  }
});
export default router;
