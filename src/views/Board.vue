<template>
  <div class="board">
    <h2 class="pb-4 italic font-bold">{{ board.name }}</h2>
    <!-- <div class="p-4 bg-white text-red text-center">Karen</div> -->
    <div class="flex flex-row items-start">
      <div 
        class="column"
        v-for="(column, $columnIndex) of board.columns" 
        :key="$columnIndex"
      >
        <div class="flex mb-2 items-center font-bold">
          {{ column.name }}
        </div>
        <div class="list-reset">
          <div class="task" v-for="(task, $taskIndex) of column.tasks" :key="$taskIndex">
            <span 
              class="w-full flex-no-shrink font-bold"
            >
              {{ task.name }}</span>
            <span
              v-if="task.description"
              class="w-full flex-no-shrink mt-1 text-sm"
            >
              {{ task.description }}
            </span
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// import { mapState } from 'vuex'
import { computed } from "vue";
import { useStore } from "vuex";

const store = useStore();

const board = computed(() => store.state.board);
</script>

<style lang="css">
.task {
  @apply flex items-center flex-wrap shadow mb-2 py-2 px-2 rounded bg-white text-grey-darkest no-underline;
}

.column {
  @apply bg-grey-light p-2 mr-4 text-left shadow rounded;
  min-width: 350px;
}

.board {
  @apply p-4 bg-teal-dark h-full overflow-auto;
}

.task-bg {
  @apply absolute;
  background: rgba(0, 0, 0, 0.5);
}
</style>
