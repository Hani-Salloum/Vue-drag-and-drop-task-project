<template>
  <div class="board">
    <h2 class="pb-4 italic font-bold">{{ board.name }}</h2>
    <!-- <div class="p-4 bg-white text-red text-center">Karen</div> -->
    <div class="flex flex-row items-start">
      <BoardColumn 
        v-for="(column, $columnIndex) of board.columns"
        :key="$columnIndex"
        :column="column"
        :columnIndex="$columnIndex"
        :board="board"
      />

      <div class="column flex">
        <input
          type="text"
          class="p-2 mr-2 flex-grow border-none"
          placeholder="New Column Name"
          v-model="newColumnName"
          @keyup.enter="createColumn"
        />
      </div>
    </div>

    <div class="task-bg" v-if="isTaskOpen" @click.self="close">
      <router-view />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import BoardColumn from "../components/BoardColumn.vue";

const store = useStore();
const route = useRoute();
const router = useRouter();

const newColumnName = ref("");

const board = computed(() => store.state.board);
const isTaskOpen = computed(() => route.name === "task");


const close = () => {
  router.push({ name: "board" });
};

const createColumn = () => {
  store.commit('CREATE_COLUMN', {
    name: newColumnName.value,
  })

  newColumnName.value = ''
}

</script>

<style lang="css">
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
