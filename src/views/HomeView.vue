<template>
  <TheHeader />
</template>

<script>
import TheHeader from '@/components/TheHeader.vue';

// import getUser from '@/hooks/getUser';

export default {
  name: 'HomeView',
  components: { TheHeader },
  setup() {
    // const { user } = getUser();
  },
};
</script>
