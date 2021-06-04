<template>
  <header class="text-gray-100">
    <div class="container flex items-center justify-between p-5 mx-auto">
      <router-link
        :to="{ name: 'WelcomeView' }"
        class="flex items-center font-medium text-gray-200"
        exact-active-class="no-active"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          class="w-10 h-10 p-2 text-white bg-green-500 rounded-full"
          viewBox="0 0 24 24"
        >
          <path
            d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
          ></path>
        </svg>
        <span class="ml-3 text-xl">Vue ToDo</span>
      </router-link>
      <div class="flex flex-wrap items-center justify-end text-base md:ml-auto">
        <p v-if="user" class="">
          Welcome back,
          <span class="text-green-500">{{
            user.displayName.toUpperCase()
          }}</span>
        </p>
        <span class="mx-4">|</span>
        <button
          type="button"
          href="/"
          class="px-4 py-2 transition-all duration-300 bg-green-500 rounded-md hover:bg-green-600"
          @click="handleLogout"
        >
          Logout
        </button>
      </div>
    </div>
  </header>
</template>

<script>
import { useRouter } from 'vue-router';

import getUser from '@/hooks/getUser';
import useLogout from '@/hooks/useLogout';

export default {
  name: 'TheHeader',
  setup() {
    const { user } = getUser();
    const { error, logout } = useLogout();
    const router = useRouter();

    const handleLogout = async () => {
      await logout();
      if (!error.value) {
        router.push({ name: 'WelcomeView' });
      }
    };

    return { user, handleLogout };
  },
};
</script>
