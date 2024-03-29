import { createStore } from "vuex";
import state from './state'
import * as getters from './getters'
import * as mutations from './mutations'
import * as actions from './actions'
import defaultBoard from '../default-board'
import { saveStatePlugin, uuid } from '../utils/index'

const board = JSON.parse(localStorage.getItem('board')) || defaultBoard

const store = createStore({
  plugins: [saveStatePlugin],
  state: {
    board
  },
  getters: {
    getTask(state) {
      return (id) => {
        for(const column of state.board.columns) {
          for(const task of column.tasks) {
            if(task.id === id) {
              return task
            }
          }
        }
      }
    }
  },
  mutations: {
    CREATE_TASK(state, { tasks, name }) {
      tasks.push({
        name,
        id: uuid(),
        description: ''
      })
    },
    UPDATE_TASK(state, { task, key, value }) {
      task[key] = value;
    },
    MOVE_TASK(state, { fromTasks, fromTaskIndex, toTasks, toTaskIndex }) {
      const taskToMove = fromTasks.splice(fromTaskIndex, 1)[0]
      toTasks.splice(toTaskIndex, 0, taskToMove)
    },
    CREATE_COLUMN(state, { name }) {
      state.board.columns.push({
        name,
        tasks: []
      })
    },
    MOVE_COLUMN(state, { fromColumnIndex, toColumnIndex }) {
      const columnList = state.board.columns

      const columnToMove = columnList.splice(fromColumnIndex, 1)[0]
      columnList.splice(toColumnIndex, 0, columnToMove)
    },
  },
})

export default store;