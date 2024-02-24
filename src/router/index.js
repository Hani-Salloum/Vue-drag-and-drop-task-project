import { createRouter, createWebHistory } from "vue-router";
import Board from '../views/Board.vue'
import Task from '../views/Task.vue'

const routes =  [
  {
    path: '/',
    name: 'board',
    component: Board
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
