import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    snackbar: {
      show: false,
      text: 'I am a snackbar'
    },
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
    hideSnackBar(state){
      state.snackbar.show = false
    },
    showSnackBar(state, text){
      let timeout=0 // timout si può usare SE NON CAMBIO LO STATE!!!
      if(state.snackbar.show){
        state.snackbar.show = false // prima chiudo quello che è a video
        timeout = 300
      }
      setTimeout( () => {
        state.snackbar.show = true
        if (text){
          state.snackbar.text = text
        }
      }, timeout)

    },
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
      },
    updateTaskTitle(state,payload){
      let id = payload.id
      let newTaskTitle = payload.title
      let task = state.tasks.filter(t => t.id === id)[0] // ritorna un array prendo il primo (dovrebbe essere solo 1)
      task.title = newTaskTitle //aggiorno il titolo del task

    }
  },
  actions: {
    addTask({commit},newTaskTitle) {
      commit('addTask',newTaskTitle)
      commit('showSnackBar','Task added!')
    },
    deleteTask({commit},id){
      commit('deleteTask',id)
      commit('showSnackBar','Task deleted!')
    },
    updateTaskTitle({commit},payload){
      commit('updateTaskTitle',payload)
      commit('showSnackBar','Task updated!')
    }
  },
  getters: {

  },
  modules: {
  }
})
