<template>
  <TheHeader />
  <div class="container max-w-4xl mx-auto mt-10">
    <h1 class="my-8 text-2xl text-center text-gray-300 md:text-4xl lg:text-5xl">
      Edit your current task
    </h1>
    <div>
      <form
        class="flex justify-center mx-4 my-8"
        @submit.prevent="handleUpdateTask"
      >
        <input
          class="w-8/12 px-4 mr-0 font-light text-gray-800 bg-white border-t border-b border-l border-gray-200 rounded-l-lg outline-none focus:ring-1 focus:ring-green-300"
          placeholder="Add a new task here..."
          v-model="updatedTask.taskName"
        />
        <button
          type="submit"
          class="px-8 py-2 font-medium text-gray-200 uppercase bg-green-500 border-green-500 rounded-r-lg outline-none hover:bg-green-600 focus:outline-none"
        >
          Update
        </button>
      </form>
      <div class="flex items-center w-9/12 mx-auto space-x-2">
        <input type="checkbox" class="block ml-" v-model="completedTask" />
        <label for="check" class="font-light text-gray-200"
          >Complete task</label
        >
      </div>
    </div>
  </div>
</template>

<script>
import TheHeader from '@/components/TheHeader.vue';

import { db } from '@/firebase/config';
import { useRoute, useRouter } from 'vue-router';
import { ref, watchEffect } from 'vue';

export default {
  name: 'EditTaskView',
  components: { TheHeader },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const { taskID } = route.query;
    const docRef = db.collection('tasks');

    // ref's definitions
    const updatedTask = ref('');
    const completedTask = ref(null);

    // get doc
    const unsub = docRef.doc(taskID).onSnapshot((doc) => {
      if (doc.exists) {
        updatedTask.value = doc.data();
        completedTask.value = updatedTask.value.status;
      } else {
        throw new Error('Could not get document');
      }
    });

    // unsub from realtime listener
    watchEffect((onInvalidate) => {
      onInvalidate(() => unsub());
    });

    // handle update task
    const handleUpdateTask = () => {
      docRef
        .doc(taskID)
        .get()
        .then((doc) => {
          if (!doc.exists) {
            throw new Error('Something went wrong updating the database');
          }
          return doc.ref.update({
            taskName: updatedTask.value.taskName,
            status: completedTask.value,
          });
        })
        .catch((err) => {
          console.log(err.message);
        });

      router.push({ name: 'HomeView' });
    };

    return {
      updatedTask,
      handleUpdateTask,
      completedTask,
    };
  },
};
</script>
