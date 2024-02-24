<template>
  <div class="task-view">
    <div class="flex flex-col flex-grow items-start justify-between px-4">
      <input 
        class="p-2 mr-2 flex-grow w-full text-xl font-bold bg-transparent border border-none" 
        :value="task.name" 
        type="text"
        @change="updateTaskProperty($event, 'name')"
        @keyup.enter="updateTaskProperty($event, 'name')"
      >
      <textarea 
        class="relative bg-transparent w-full px-0 border border-none mt-2 h-64"
        :value="task.description"
        @change="updateTaskProperty($event, 'description')"
      />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';

const store = useStore();
const route = useRoute();
const router = useRouter();

const board = computed(() => store.state.board)
const task = computed(() => store.getters.getTask(route.params.id))

const updateTaskProperty = (e, key) => {
  store.commit('UPDATE_TASK', {
    task: task.value,
    key,
    value: e.target.value
  })
}
</script>

<style>
.task-view {
  @apply relative flex flex-row bg-white mx-4 m-32 mx-auto py-4 text-left rounded shadow;
  max-width: 700px;
}
</style>