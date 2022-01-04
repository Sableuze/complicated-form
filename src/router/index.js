import { createRouter, createWebHistory } from 'vue-router';
import { gsap } from 'gsap';
import Home from '@/views/Home.vue';

export default function initNewRouter(store) {
  const routes = [
    // {
    //   path: '/jest',
    //   name: 'Testing',
    //   component: () => import('@/views/TestComp.vue'),
    // },
    {
      path: '/',
      component: () => import('@/layouts/LayoutDefault.vue'),
      children: [
        {
          path: '',
          name: 'Home',
          component: Home,
          meta: {
            keepAlive: true,
          },
        },
        {
          path: 'create',
          name: 'CreateEvent',
          component: () => import('@/views/postPages/CreateEvent.vue'),
          meta: {
            requiresAuth: true,
          },
        },
        {
          path: 'moderate',
          name: 'ModerateList',
          component: () => import('@/views/adminPages/ModerateList.vue'),
          meta: {
            requiresAuth: true,
            requiresAdmin: true,
          },
        },
        {
          path: ':id/suggest',
          name: 'SuggestEvent',
          component: () => import('@/views/postPages/SuggestEvent.vue'),
          meta: {
            requiresAuth: true,
          },
        },
        {
          path: 'moderate/:id',
          name: 'ModerateEvent',
          component: () => import('@/views/adminPages/ModerateEvent.vue'),
          meta: {
            requiresAuth: true,
            requiresAdmin: true,
          },
        },
        {
          path: ':id/see',
          name: 'SeeEvent',
          component: () => import('@/views/postPages/SeeEvent.vue'),
        },

        {
          path: 'manage',
          name: 'MyEvents',
          component: () => import('@/views/postPages/MyEvents.vue'),
          meta: {
            requiresAuth: true,
          },
        },
        {
          path: 'notifications',
          name: 'Notifications',
          component: () => import('@/views/userPages/Notifications.vue'),
          meta: {
            requiresAuth: true,
          },
        },
        {
          path: 'activate',
          name: 'ActivateCode',
          component: () => import('@/views/userPages/ActivateCode.vue'),
          meta: {
            requiresAuth: true,
          },
        },

      ],
    },
    {
      path: '/auth',
      component: () => import('@/layouts/LayoutAuth.vue'),
      children: [
        {
          path: '',
          name: 'Auth',
          component: () => import('@/views/authPages/AppAuth.vue'),

          beforeEnter(to, from, next) {
            if (store.getters.isLoggedIn) next('/');
            else next();
          },
        },

        {
          path: 'login',
          name: 'Login',
          component: () => import('@/views/authPages/AppLogin.vue'),

          beforeEnter(to, from, next) {
            if (store.getters.isLoggedIn) next('/');
            else next();
          },
        },
        {
          path: 'register',
          name: 'Register',
          component: () => import('@/views/authPages/AppRegister.vue'),

          beforeEnter(to, from, next) {
            if (store.getters.isLoggedIn) next('/');
            else next();
          },
        },
        {
          path: 'edit',
          name: 'EditUserInfo',
          component: () => import('@/views/userPages/EditUserInfo.vue'),
          meta: {
            requiresAuth: true,
          },
        },
        {
          path: 'recover',
          name: 'RecoverPassword',
          component: () => import('@/views/userPages/RecoverPassword.vue'),

        },
        {
          path: 'reset',
          name: 'NewPassword',
          component: () => import('@/views/userPages/NewPassword.vue'),

        }],
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
    } else if (to.matched.some((route) => route.meta.requiresAuth) && !store.getters.isLoggedIn) next({ name: 'Auth' });
    else if (
      to.matched.some((route) => route.meta.requiresAdmin)
      && store.getters.getUserRole !== 'admin'
    ) next('/');
    else next();
  });
  return router;
}
