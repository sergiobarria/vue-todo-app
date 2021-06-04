<template>
  <div
    class="flex flex-col max-w-md px-4 py-8 -mt-32 bg-white border-l-4 border-green-600 shadow-2xl w-96 sm:px-6 md:px-8 lg:px-10 rounded-xl"
  >
    <h2
      class="self-center text-xl font-medium tracking-widest text-center text-gray-700 sm:text-2xl md:text-3xl w-60"
    >
      Register
    </h2>
    <div class="mt-10">
      <form method="POST" @submit.prevent="handleSubmit">
        <div class="relative w-11/12 mx-auto mb-4 sm:w-full">
          <input
            type="text"
            name="name"
            class="w-full p-4 text-sm text-gray-600 placeholder-gray-400 bg-white border-0 rounded shadow focus:outline-none focus:ring focus:ring-green-300"
            placeholder="Username"
            style="transition: all 0.15s ease 0s"
            v-model="username"
          />
          <!-- <small class="p-2 text-red-500">* Email</small> -->
        </div>
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
        <div class="relative w-full mb-3">
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
            class="justify-center w-32 p-3 text-white bg-green-600 rounded-lg shadow outline-none focus:bg-green-700 hover:bg-green-500 focus:outline-none"
          >
            Sign up
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import useSignup from '@/hooks/useSignup';

export default {
  name: 'SignupForm',
  emits: ['signup'],
  setup(props, context) {
    const { error, signup } = useSignup();

    // refs declaration
    const username = ref('');
    const email = ref('');
    const password = ref('');

    const handleSubmit = async () => {
      await signup(email.value, password.value, username.value);
      if (!error.value) {
        context.emit('signup');
      }
    };

    return {
      username,
      email,
      password,
      handleSubmit,
      error,
    };
  },
};
</script>
