<template>
  <div
    class="flex flex-col items-center justify-center h-screen bg-gray-300 select-none"
  >
    <div
      class="flex flex-col w-full max-w-md px-4 py-8 -mt-32 bg-white border-l-4 border-purple-600 shadow-2xl sm:px-6 md:px-8 lg:px-10 rounded-xl"
    >
      <div
        class="self-center p-6 text-xl font-medium text-center text-white uppercase bg-purple-600 rounded-full shadow-2xl sm:text-2xl w-60"
      >
        Sign In
      </div>
      <div class="mt-10">
        <form method="POST" action="" autocomplete="">
          <div class="relative w-full mb-3">
            <input
              type="email"
              name="email"
              class="w-full p-4 text-sm text-gray-700 placeholder-gray-400 bg-white border-0 rounded shadow focus:outline-none focus:ring"
              placeholder="Email"
              style="transition: all 0.15s ease 0s"
            />
            <small class="p-2 text-red-500">* Email</small>
          </div>
          <div class="relative w-full mb-3">
            <input
              type="password"
              name="password"
              class="w-full p-4 text-sm text-gray-700 placeholder-gray-400 bg-white border-0 rounded shadow focus:outline-none focus:ring"
              placeholder="Password"
              style="transition: all 0.15s ease 0s"
            />
            <small class="p-2 text-red-500">* Password</small>
          </div>
          <div class="mt-6 text-center">
            <input
              type="submit"
              name="signin"
              id="signin"
              value="Sign In"
              class="justify-center w-32 p-3 text-white bg-purple-600 rounded-lg shadow outline-none focus:bg-purple-700 hover:bg-purple-500"
            />
          </div>
          <div class="flex flex-wrap mt-6">
            <div class="w-1/2 text-left">
              <a href="#" class="text-xl text-blue-900"
                ><small>Forgot password?</small></a
              >
            </div>
            <div class="w-1/2 text-right">
              <a href="#" class="text-xl text-blue-900"
                ><small>Sign In</small></a
              >
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
  components: {},
};
</script>
