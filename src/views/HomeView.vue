<template>
  <TheHeader />
  <div class="container max-w-4xl mx-auto mt-10">
    <LoadingSpinner v-if="!tasks" />
    <div class="mt-10" v-else>
      <h1
        class="my-8 text-2xl text-center text-gray-300 md:text-4xl lg:text-5xl"
      >
        This are your tasks for the day
      </h1>
      <div>
        <form
          class="flex justify-center mx-4 my-8"
          @submit.prevent="handleAddTask"
        >
          <input
            class="w-8/12 px-4 mr-0 font-light text-gray-800 bg-white border-t border-b border-l border-gray-200 rounded-l-lg outline-none focus:ring-1 focus:ring-green-300"
            placeholder="Add a new task here..."
            v-model="newTask"
          />
          <button
            type="submit"
            class="px-8 py-2 font-medium text-gray-200 uppercase bg-green-500 border-green-500 rounded-r-lg outline-none hover:bg-green-600"
          >
            Add Task
          </button>
        </form>
      </div>
      <table class="w-full overflow-hidden rounded shadow-lg">
        <thead>
          <tr
            class="text-gray-800 uppercase bg-gray-400 border-b-2 border-gray-600 border-gray"
          >
            <th class="py-4 pl-4 font-medium text-left">Task Description</th>
            <th class="font-medium">Status</th>
            <th class="font-medium">Completed</th>
            <th class="font-medium">Edit</th>
            <th class="font-medium">Delete</th>
            <th class="font-medium"></th>
          </tr>
        </thead>
        <tbody class="text-center bg-gray-100">
          <tr
            class="text-gray-700 border-b border-gray-200 accordion"
            v-for="task in tasks"
            :key="task.id"
          >
            <td class="pl-4 text-left">
              <span>{{ task.taskName }}</span>
            </td>
            <td :class="task.status ? 'text-green-500' : 'text-gray-500'">
              {{ task.status === true ? 'Done' : 'Todo' }}
            </td>
            <td>
              <i
                class="px-4 py-2 cursor-pointer fas fa-check"
                :class="task.status ? 'text-green-500' : 'text-gray-500'"
                @click="handleComplete(task.id)"
              ></i>
            </td>
            <td>
              <router-link
                :to="{ name: 'EditTaskView', query: { taskID: task.id } }"
              >
                <i
                  class="px-4 py-2 text-blue-500 cursor-pointer far fa-edit"
                ></i>
              </router-link>
            </td>
            <td>
              <i
                class="px-4 py-2 text-red-500 cursor-pointer far fa-trash-alt"
                @click="handleDelete(task.id)"
              ></i>
            </td>
            <td class="text-gray-500">
              <svg
                class="w-6 h-12 mr-3 fill-current md:mr-1 text-grey-dark"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path
                  d="M4 12a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm6 0a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm6 0a2 2 0 1 1 0-4 2 2 0 0 1 0 4z"
                />
              </svg>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import TheHeader from '@/components/TheHeader.vue';
import LoadingSpinner from '@/components/LoadingSpinner.vue';

import getUser from '@/hooks/getUser';
import getCollection from '@/hooks/getCollection';
import useCollection from '@/hooks/useCollection';
import { timestamp, db } from '@/firebase/config';
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';

export default {
  name: 'HomeView',
  components: { TheHeader, LoadingSpinner },
  setup() {
    const { user } = getUser();
    const router = useRouter();
    const { addDoc, error: createTaskError } = useCollection('tasks');
    const { documents: tasks } = getCollection('tasks', user.value.uid);

    // get firestore db ref
    const dbRef = db.collection('tasks');

    // ref's declarations
    const newTask = ref('');

    // if the user value is ever null, redirect to welcome screen
    watch(user, () => {
      if (!user.value) {
        router.push({ name: 'WelcomeView' });
      }
    });

    // handle task delete
    const handleDelete = (id) => {
      try {
        dbRef.doc(id).delete();
      } catch (err) {
        console.log(err.message);
      }
    };

    // handling completing a task
    const handleComplete = async (id) => {
      dbRef
        .doc(id)
        .get()
        .then((doc) => {
          if (!doc.exists) {
            throw new Error('Something went wrong updating the database');
          }
          return doc.ref.update({ status: !doc.data().status });
        })
        .catch((err) => {
          console.log(err.message);
        });
    };

    // handle adding a new task
    const handleAddTask = async () => {
      const newTaskData = {
        taskName: newTask.value,
        createdAt: timestamp(),
        userUid: user.value.uid,
        username: user.value.displayName,
        status: false,
      };

      await addDoc(newTaskData);
      if (!createTaskError.value) {
        newTask.value = '';
      }
    };

    return {
      user,
      newTask,
      handleAddTask,
      handleComplete,
      handleDelete,
      tasks,
    };
  },
};
</script>
