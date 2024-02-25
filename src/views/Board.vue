<template>
  <div class="board">
    <h2 class="pb-4 italic font-bold">{{ board.name }}</h2>
    <!-- <div class="p-4 bg-white text-red text-center">Karen</div> -->
    <div class="flex flex-row items-start">
      <div
        class="column"
        v-for="(column, $columnIndex) of board.columns"
        :key="$columnIndex"
        @dragstart.self="pickupColumn($event, $columnIndex)"
        @dragover.prevent
        @dragenter.prevent
        @drop="moveTaskOrColumn($event, column.tasks, $columnIndex)"
        >
        <div class="flex mb-2 items-center font-bold">
          {{ column.name }}
        </div>
        <div class="list-reset">
          <div
            class="task"
            v-for="(task, $taskIndex) of column.tasks"
            :key="$taskIndex" 
            draggable="true"
            @dragstart="pickupTask($event, $taskIndex, $columnIndex)"
            @click="goToTask(task)"
            @dragover.prevent
            @dragenter.prevent
            @drop.stop="moveTaskOrColumn($event, column.tasks, $columnIndex, $taskIndex)"
          >
            <span class="w-full flex-no-shrink font-bold">
              {{ task.name }}</span
            >
            <span
              v-if="task.description"
              class="w-full flex-no-shrink mt-1 text-sm"
            >
              {{ task.description }}
            </span>
          </div>

          <input
            type="text"
            class="block p-2 w-full bg-transparent border-0"
            placeholder="+ Enter new task"
            @keyup.enter="createTask($event, column.tasks)"
          />
        </div>
      </div>
    </div>

    <div class="task-bg" v-if="isTaskOpen" @click.self="close">
      <router-view />
    </div>
  </div>
</template>

<script setup>
// import { mapState } from 'vuex'
import { computed, onMounted } from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";

const store = useStore();
const route = useRoute();
const router = useRouter();

const board = computed(() => store.state.board);
const isTaskOpen = computed(() => route.name === "task");

const goToTask = (task) => {
  router.push({ name: "task", params: { id: task.id } });
};

const close = () => {
  router.push({ name: "board" });
};

const createTask = (e, tasks) => {
  store.commit("CREATE_TASK", {
    tasks,
    name: e.target.value,
  });

  e.target.value = "";
};

const pickupTask = (e, taskIndex, fromColumnIndex) => {
  e.dataTransfer.effectAllowed = 'move'
  e.dataTransfer.dropEffect = 'move'

  e.dataTransfer.setData('from-task-index', taskIndex)
  e.dataTransfer.setData('from-column-index', fromColumnIndex)
  e.dataTransfer.setData('type', 'task')
}

const pickupColumn = (e, fromColumnIndex) => {
  e.dataTransfer.effectAllowed = 'move'
  e.dataTransfer.dropEffect = 'move'
  
  e.dataTransfer.setData('from-column-index', fromColumnIndex)
  e.dataTransfer.setData('type', 'column')
}

const moveTaskOrColumn = (e, toTasks, toColumnIndex, toTaskIndex) => {
  const type = e.dataTransfer.getData('type')
  if(type === 'task') {
    moveTask(e, toTasks, toTaskIndex !== undefined ? toTaskIndex : toTasks.length)
  } else {
    moveColumn(e, toColumnIndex)
  }
}

const moveTask = (e, toTasks, toTaskIndex) => {
  const fromColumnIndex = e.dataTransfer.getData('from-column-index')
  const fromTasks = board.value.columns[fromColumnIndex].tasks
  const fromTaskIndex = e.dataTransfer.getData('from-task-index')
  
  store.commit('MOVE_TASK', {
    fromTasks,
    fromTaskIndex,
    toTasks,
    toTaskIndex
  })
}

const moveColumn = (e, toColumnIndex) => {
  const fromColumnIndex = e.dataTransfer.getData('from-column-index')
  
  console.log(fromColumnIndex + ' to ' + toColumnIndex)
  store.commit('MOVE_COLUMN', {
    fromColumnIndex,
    toColumnIndex
  })
}
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
  @apply fixed top-0 left-0 w-[100vw] h-[100vh];
  background: rgba(0, 0, 0, 0.5);
}
</style>
