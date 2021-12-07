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
    component: () => import('@/views/authPages/Auth.vue'),
    meta: {
      layout: 'LayoutAuth',
    },
  },

  {
    path: '/auth/login',
    name: 'Login',
    component: () => import('@/views/authPages/Login.vue'),
    meta: {
      layout: 'LayoutAuth',
    },
  },
  {
    path: '/auth/register',
    name: 'Register',
    component: () => import('@/views/authPages/Register.vue'),
    meta: {
      layout: 'LayoutAuth',
    },
  },
  {
    path: '/auth/edit',
    name: 'EditUserInfo',
    component: () => import('@/views/authPages/EditUserInfo.vue'),
    meta: {
      layout: 'LayoutAuth',
    },
  },
  {
    path: '/auth/recover',
    name: 'RecoverPassword',
    component: () => import('@/views/RecoverPassword.vue'),
    meta: {
      layout: 'LayoutAuth',
    },
  },
  {
    path: '/auth/reset',
    name: 'NewPassword',
    component: () => import('@/views/NewPassword.vue'),
    meta: {
      layout: 'LayoutAuth',
    },
  },
  {
    path: '/activate',
    name: 'ActivateCode',
    component: () => import('@/views/ActivateCode.vue'),
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
    meta: {
      layout: 'LayoutAuth',
    },
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

  if (to.name !== 'EditUserInfo' && store.getters.isLoggedIn && !store.getters.isProfileFilled) {
    next({ name: 'EditUserInfo' });
    return;
  }
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
