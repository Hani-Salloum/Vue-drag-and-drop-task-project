<template>
  <AppDrop @drop="moveTaskOrColumn">
    <AppDrag
      class="column"
      :transfer-data="{
        type: 'column',
        fromColumnIndex: columnIndex,
      }"
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

          <input
            type="text"
            class="block p-2 w-full bg-transparent border-0"
            placeholder="+ Enter new task"
            @keyup.enter="createTask($event, column.tasks)"
          />
        </div>
    </AppDrag>
  </AppDrop>
</template>

<script setup>
import { useStore } from "vuex";
import BoardTask from "./BoardTask.vue";
import AppDrag from "./AppDrag.vue";
import AppDrop from "./AppDrop.vue";

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
    required: true,
  },
});

const createTask = (e, tasks) => {
  store.commit("CREATE_TASK", {
    tasks,
    name: e.target.value,
  });

  e.target.value = "";
};

const moveTaskOrColumn = (transferData) => {
  console.log('col : ' + transferData.type)
  if (transferData.type === "task") {
    moveTask(transferData);
  } else {
    moveColumn(transferData);
  }
};

const moveTask = ({fromTaskIndex, fromColumnIndex}) => {
  const fromTasks = props.board.columns[fromColumnIndex].tasks;

  store.commit("MOVE_TASK", {
    fromTasks,
    fromTaskIndex,
    toTasks: props.column.tasks,
    toTaskIndex: props.taskIndex,
  });
};

const moveColumn = ({fromColumnIndex}) => {
  store.commit("MOVE_COLUMN", {
    fromColumnIndex,
    toColumnIndex: props.columnIndex,
  });
};
</script>

<style scoped>
.column {
  @apply bg-grey-light p-2 mr-4 text-left shadow rounded;
  min-width: 350px;
}
</style>
