<template>
  <div
    class="column"
    @dragstart.self="pickupColumn($event, columnIndex)"
    @dragover.prevent
    @dragenter.prevent
    @drop="moveTaskOrColumn($event, column.tasks, columnIndex)"
  >
    <div class="flex mb-2 items-center font-bold">
      {{ column.name }}
    </div>
    <div class="list-reset">
      <BoardTask 
        v-for="(task, $taskIndex) of column.tasks"
        :key="$taskIndex"
        :task="task"
        :taskIndex="$taskIndex"
        :board="board"
        :columnIndex="columnIndex"
        :column="column"
      />
      <!-- <div
        class="task"
        draggable="true"
        @dragstart="pickupTask($event, $taskIndex, columnIndex)"
        @click="goToTask(task)"
        @dragover.prevent
        @dragenter.prevent
        @drop.stop="
          moveTaskOrColumn($event, column.tasks, columnIndex, $taskIndex)
        "
      >
        <span class="w-full flex-no-shrink font-bold"> {{ task.name }}</span>
        <span
          v-if="task.description"
          class="w-full flex-no-shrink mt-1 text-sm"
        >
          {{ task.description }}
        </span>
      </div> -->

      <input
        type="text"
        class="block p-2 w-full bg-transparent border-0"
        placeholder="+ Enter new task"
        @keyup.enter="createTask($event, column.tasks)"
      />
    </div>
  </div>
</template>

<script setup>
import { useStore } from "vuex";
import BoardTask from "./BoardTask.vue"

const store = useStore();

const props = defineProps({
  column: {
    type: Object,
    required: true,
  },
  columnIndex: {
    type: Number,
    required: true,
  },
  board: {
    type: Object,
    required: true
  }
})


const createTask = (e, tasks) => {
  store.commit("CREATE_TASK", {
    tasks,
    name: e.target.value,
  });

  e.target.value = "";
};

const pickupColumn = (e, fromColumnIndex) => {
  e.dataTransfer.effectAllowed = "move";
  e.dataTransfer.dropEffect = "move";

  e.dataTransfer.setData("from-column-index", fromColumnIndex);
  e.dataTransfer.setData("type", "column");
};

const moveTaskOrColumn = (e, toTasks, toColumnIndex, toTaskIndex) => {
  const type = e.dataTransfer.getData("type");
  if (type === "task") {
    moveTask(
      e,
      toTasks,
      toTaskIndex !== undefined ? toTaskIndex : toTasks.length
    );
  } else {
    moveColumn(e, toColumnIndex);
  }
};

const moveTask = (e, toTasks, toTaskIndex) => {
  const fromColumnIndex = e.dataTransfer.getData("from-column-index");
  const fromTasks = props.board.columns[fromColumnIndex].tasks;
  const fromTaskIndex = e.dataTransfer.getData("from-task-index");

  store.commit("MOVE_TASK", {
    fromTasks,
    fromTaskIndex,
    toTasks,
    toTaskIndex,
  });
};

const moveColumn = (e, toColumnIndex) => {
  const fromColumnIndex = e.dataTransfer.getData("from-column-index");

  console.log(fromColumnIndex + " to " + toColumnIndex);
  store.commit("MOVE_COLUMN", {
    fromColumnIndex,
    toColumnIndex,
  });
};
</script>

<style scoped>
.column {
  @apply bg-grey-light p-2 mr-4 text-left shadow rounded;
  min-width: 350px;
}

</style>