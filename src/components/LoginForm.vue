<template>
  <div
    class="flex flex-col py-8 -mt-24 bg-white border-l-4 border-green-600 shadow-2xl w-96 sm:px-6 md:px-8 lg:px-10 rounded-xl"
  >
    <h2
      class="self-center text-xl font-medium tracking-widest text-center text-gray-700 sm:text-2xl md:text-3xl w-60"
    >
      Login
    </h2>
    <div class="mt-10">
      <form method="POST" @submit.prevent="handleLogin">
        <div class="relative w-11/12 mx-auto mb-4 sm:w-full">
          <input
            type="email"
            name="email"
            class="w-full p-4 text-sm text-gray-600 placeholder-gray-400 bg-white border-0 rounded shadow focus:outline-none focus:ring focus:ring-green-300"
            placeholder="Email"
            style="transition: all 0.15s ease 0s"
            v-model="email"
          />
          <!-- <small class="p-2 text-red-500">* Email</small> -->
        </div>
        <div class="relative w-11/12 mx-auto mb-4 sm:w-full">
          <input
            type="password"
            name="password"
            class="w-full p-4 text-sm text-gray-600 placeholder-gray-400 bg-white border-0 rounded shadow focus:outline-none focus:ring focus:ring-green-300"
            placeholder="Password"
            style="transition: all 0.15s ease 0s"
            v-model="password"
          />
          <!-- <small class="p-2 text-red-500">* Password</small> -->
        </div>
        <div class="mt-6 text-center">
          <button
            type="submit"
            class="justify-center w-32 p-3 text-white bg-green-600 rounded-lg shadow outline-none focus:bg-green-700 hover:bg-green-500"
            @click="handleLogin"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import useLogin from '@/hooks/useLogin';

export default {
  name: 'LoginForm',
  setup(props, context) {
    const { error, login } = useLogin();

    // ref's declarations
    const email = ref('');
    const password = ref('');

    const handleLogin = async () => {
      await login(email.value, password.value);
      if (!error.value) {
        context.emit('login');
      }
    };

    return {
      email,
      password,
      handleLogin,
      error,
    };
  },
};
</script>
