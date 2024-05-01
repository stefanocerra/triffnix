import {RouteRecordRaw} from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/main.layout.vue'),
    children: [{ path: '', component: () => import('pages/index.page.vue') }],
  },

  {
    path: '/x01',
    component: () => import('layouts/main.layout.vue'),
    children: [
      { path: '', component: () => import('pages/gamemode-x01.page.vue') },
      { path: '/x01/score', component: () => import('pages/gamemode-x01.page.vue') },
      { path: '/x01/input', component: () => import('pages/gamemode-x01.page.vue') }
    ],
  },

  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/error-not-found.page.vue'),
  },
];

export default routes;
