import { createRouter, createWebHistory } from 'vue-router';
import WelcomeView from '../views/WelcomeView.vue';
import HomeView from '../views/HomeView.vue';

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
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
