<template>
  <div class="flex flex-col items-center justify-center h-screen select-none">
    <div v-if="showLogin">
      <LoginForm @login="enterTodoListView" />
      <p class="mt-6 text-center text-gray-100">
        No account yet?
        <span
          class="text-green-500 underline cursor-pointer hover:text-green-600"
          @click="showLogin = false"
          >Sign up</span
        >
        instead.
      </p>
    </div>
    <div v-else>
      <SignupForm @signup="enterTodoListView" />
      <p class="mt-6 text-center text-gray-100">
        Already registered?
        <span
          class="text-green-500 underline cursor-pointer hover:text-green-600"
          @click="showLogin = true"
          >Login</span
        >
        instead.
      </p>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import LoginForm from '@/components/LoginForm.vue';
import SignupForm from '@/components/SignupForm.vue';

import { ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
  name: 'Home',
  components: { LoginForm, SignupForm },
  setup() {
    const showLogin = ref(true);
    const router = useRouter();

    const enterTodoListView = () => {
      router.push({ name: 'HomeView' });
    };

    return { showLogin, enterTodoListView };
  },
};
</script>
