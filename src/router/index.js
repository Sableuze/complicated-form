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
      keepAlive: true,
    },
  },
  {
    path: '/auth',
    name: 'Auth',
    component: () => import('@/views/authPages/Auth.vue'),
    meta: {
      layout: 'LayoutAuth',
    },
    beforeEnter(to, from, next) {
      if (store.getters.isLoggedIn) next('/');
      else next();
    },
  },

  {
    path: '/auth/login',
    name: 'Login',
    component: () => import('@/views/authPages/Login.vue'),
    meta: {
      layout: 'LayoutAuth',
    },
    beforeEnter(to, from, next) {
      if (store.getters.isLoggedIn) next('/');
      else next();
    },

  },
  {
    path: '/auth/register',
    name: 'Register',
    component: () => import('@/views/authPages/Register.vue'),
    meta: {
      layout: 'LayoutAuth',
    },
    beforeEnter(to, from, next) {
      if (store.getters.isLoggedIn) next('/');
      else next();
    },

  },
  {
    path: '/auth/edit',
    name: 'EditUserInfo',
    component: () => import('@/views/userPages/EditUserInfo.vue'),
    meta: {
      layout: 'LayoutAuth',
      requiresAuth: true,
    },
  },
  {
    path: '/auth/recover',
    name: 'RecoverPassword',
    component: () => import('@/views/userPages/RecoverPassword.vue'),
    meta: {
      layout: 'LayoutAuth',
    },
  },
  {
    path: '/auth/reset',
    name: 'NewPassword',
    component: () => import('@/views/userPages/NewPassword.vue'),
    meta: {
      layout: 'LayoutAuth',
    },
  },
  {
    path: '/activate',
    name: 'ActivateCode',
    component: () => import('@/views/userPages/ActivateCode.vue'),
    meta: {
      requiresAuth: true,
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
    component: () => import('@/views/postPages/SuggestEvent.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/:id/moderate',
    name: 'ModerateEvent',
    component: () => import('@/views/postPages/ModerateEvent.vue'),
    meta: {
      requiresAuth: true,
      requiresAdmin: true,
    },
  },
  {
    path: '/:id/see',
    name: 'SeeEvent',
    component: () => import('@/views/postPages/SeeEvent.vue'),
  },

  {
    path: '/manage',
    name: 'ManagePage',
    component: () => import('@/views/ManagePage.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/notifications',
    name: 'Notifications',
    component: () => import('@/views/userPages/Notifications.vue'),
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
    router.replace({ name: 'EditUserInfo' });
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
