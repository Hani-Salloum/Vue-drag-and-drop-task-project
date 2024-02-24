import { createStore } from "vuex";
import state from './state'
import * as getters from './getters'
import * as mutations from './mutations'
import * as actions from './actions'
import defaultBoard from '../default-board'
import { saveStatePlugin } from '../utils/index'

const board = JSON.parse(localStorage.getItem('board')) || defaultBoard

const store = createStore({
  plugins: [saveStatePlugin],
  state: {
    board
  },
  mutations: {},
})

export default store;