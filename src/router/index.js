import { createRouter, createWebHistory } from 'vue-router';

import WelcomeView from '../views/WelcomeView.vue';
import HomeView from '../views/HomeView.vue';

import { projectAuth } from '../firebase/config';

// auth guard
const requireAuth = (to, from, next) => {
  const user = projectAuth.currentUser;
  if (!user) {
    next({ name: 'WelcomeView' });
  } else {
    next();
  }
};

const routes = [
  {
    path: '/',
    name: 'WelcomeView',
    component: WelcomeView,
  },
  {
    path: '/todo-list',
    name: 'HomeView',
    component: HomeView,
    beforeEnter: requireAuth,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
