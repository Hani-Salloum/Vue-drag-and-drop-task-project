<template>
  <AppDrop @drop="moveTaskOrColumn">
    <AppDrag
      class="task"
      :transferData="{
        type: 'task',
        fromTaskIndex: taskIndex,
        fromColumnIndex: columnIndex
      }"
      @click="goToTask(task)"
    >
        <span class="w-full flex-no-shrink font-bold"> {{ task.name }}</span>
        <span
          v-if="task.description"
          class="w-full flex-no-shrink mt-1 text-sm"
        >
          {{ task.description }}
        </span>
    </AppDrag>
  </AppDrop>
</template>

<script setup>
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import AppDrag from "./AppDrag.vue";
import AppDrop from "./AppDrop.vue";

const store = useStore();
const router = useRouter();

const props = defineProps({
  task: {
    type: Object,
    required: true,
  },
  taskIndex: {
    type: Number,
    required: true,
  },
  board: {
    type: Object,
    required: true,
  },
  columnIndex: {
    type: Number,
    required: true,
  },
  column: {
    type: Object,
    required: true,
  },
});

const goToTask = (task) => {
  router.push({ name: "task", params: { id: task.id } });
};

const moveTaskOrColumn = (transferData) => {
  // const type = e.dataTransfer.getData("type");
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

const moveColumn = ({ fromColumnIndex }) => {
  store.commit("MOVE_COLUMN", {
    fromColumnIndex,
    toColumnIndex: props.columnIndex,
  });
};
</script>

<style lang="css" scoped>
.task {
  @apply flex items-center flex-wrap shadow mb-2 py-2 px-2 rounded bg-white text-grey-darkest no-underline;
}
</style>
