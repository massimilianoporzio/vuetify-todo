import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tasks: [
      {
        id: 1,
        title: 'Wake up',
        done: false
      },
      {
        id: 2,
        title: 'Get bananas',
        done: true
      },
      {
        id: 3,
        title: 'Eat bananas',
        done: false
      }
    ],
  },
  mutations: {
    addTask(state, newTaskTitle) {
      if(newTaskTitle !== '')
      {
        let newTask = {
          id: Date.now(),
          title: newTaskTitle,
          done: false
        }
        state.tasks.push(newTask)
        // this.newTaskTitle = '' //clearing
      }

    },
    doneTask(state,id) {

      let task = state.tasks.filter(t => t.id === id)[0] // ritorna un array prendo il primo (dovrebbe essere solo 1)
      task.done = !task.done //toggling

    },

      deleteTask(state, id) {
        // console.log("DELETE TASK #:",id)
        state.tasks = state.tasks.filter(t => t.id !== id) //tengo solo i task con id DIVERSI da l'id che ho passato
      }
  },
  actions: {
  },
  getters: {

  },
  modules: {
  }
})
