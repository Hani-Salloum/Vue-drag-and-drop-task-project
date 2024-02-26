<template>
  <div
    class="task"
    draggable="true"
    @dragstart="pickupTask($event, taskIndex, columnIndex)"
    @click="goToTask(task)"
    @dragover.prevent
    @dragenter.prevent
    @drop.stop="moveTaskOrColumn($event, column.tasks, columnIndex, taskIndex)"
  >
    <span class="w-full flex-no-shrink font-bold"> {{ task.name }}</span>
    <span v-if="task.description" class="w-full flex-no-shrink mt-1 text-sm">
      {{ task.description }}
    </span>
  </div>
</template>

<script setup>
import { useStore } from "vuex";
import { useRouter } from "vue-router";

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
  }
})


const goToTask = (task) => {
  router.push({ name: "task", params: { id: task.id } });
};

const pickupTask = (e, taskIndex, fromColumnIndex) => {
  e.dataTransfer.effectAllowed = "move";
  e.dataTransfer.dropEffect = "move";

  e.dataTransfer.setData("from-task-index", taskIndex);
  e.dataTransfer.setData("from-column-index", fromColumnIndex);
  e.dataTransfer.setData("type", "task");
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

<style lang="css" scoped>
.task {
  @apply flex items-center flex-wrap shadow mb-2 py-2 px-2 rounded bg-white text-grey-darkest no-underline;
}
</style>
