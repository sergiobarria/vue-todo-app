import { createRouter, createWebHistory } from 'vue-router';

import WelcomeView from '../views/WelcomeView.vue';
import HomeView from '../views/HomeView.vue';
import EditTaskView from '../views/EditTaskView.vue';
import NotFoundView from '../views/NotFoundView.vue';

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
  {
    path: '/edit-task',
    name: 'EditTaskView',
    component: EditTaskView,
    beforeEnter: requireAuth,
  },
  {
    path: '/:catchAll(.*)*',
    name: 'NotFoundView',
    component: NotFoundView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
