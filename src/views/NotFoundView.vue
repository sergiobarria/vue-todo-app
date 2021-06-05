<template>
  <TheHeader />
  <div class="flex items-center justify-center w-9/12 m-auto mt-24">
    <div class="pb-8 overflow-hidden bg-white shadow sm:rounded-lg">
      <div class="pt-8 text-center border-t border-gray-200">
        <h1 class="font-bold text-green-400 text-9xl">404</h1>
        <h1 class="py-8 text-6xl font-medium text-gray-700">
          oops! Page not found
        </h1>
        <p class="px-12 pb-8 text-2xl font-medium text-gray-700">
          Oops! The page you are looking for does not exist. It might have been
          moved or deleted.
        </p>
        <router-link
          :to="{ name: 'HomeView' }"
          class="px-6 py-3 mr-6 font-semibold text-white rounded-md  bg-gradient-to-r from-green-400 to-blue-400"
        >
          HOME
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import TheHeader from '@/components/TheHeader.vue';

export default {
  name: 'NotFoundView',
  components: { TheHeader },
};
</script>
