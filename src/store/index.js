import Vue from 'vue'
import Vuex from 'vuex'
import Localbase from 'localbase'

let db = new Localbase('db')
db.config.debug=false //console logs

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoading: false,
    appTitle : process.env.VUE_APP_TITLE,
    sorting: false,
    search: null,
    snackbar: {
      show: false,
      text: 'I am a snackbar'
    },
    tasks: [
      // {
      //   id: 1,
      //   title: 'Wake up',
      //   done: false,
      //   dueDate: '2021-10-16'
      // },
      // {
      //   id: 2,
      //   title: 'Get bananas',
      //   done: true,
      //   dueDate: '2021-10-17'
      // },
      // {
      //   id: 3,
      //   title: 'Eat bananas',
      //   done: false,
      //   dueDate: null
      // }
    ],
  },
  mutations: {
    setLoading(state,loading){
      state.isLoading = loading
      console.log('isLoading is ',state.isLoading)
    },

    setTasks(state,newTasksArray){

      state.tasks = newTasksArray

    },
    setSearch(state,value){
      // console.log('value:',value)
      state.search = value
    },
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
    setTaskDueDate(state,payload) {
      let task = state.tasks.filter(t => t.id === payload.id)[0] // ritorna un array prendo il primo
      task.dueDate = payload.dueDate
    },
    addTask(state, newTask) {
        state.tasks.push(newTask)
        // this.newTaskTitle = '' //clearing


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

    },
    toggleSorting(state){
      state.sorting = !state.sorting
    }
  },
  actions: {


    getTasks({commit}){
      commit('setLoading',true)
      // console.log('LOADING')
      setTimeout(()=>{

        db.collection('tasks').get().then((tasks)=>{
          // console.log('tasks:',tasks)


          commit('setTasks',tasks)
          commit('setLoading',false)
        })
      },0)


    },
    addTask({commit},newTaskTitle) {
      // messo qui la creazione del task per usare localbase (async)
      let newTask = {
        id: Date.now(),
        title: newTaskTitle,
        done: false,
        dueDate: null
      }
      // commit('addTask',newTaskTitle)
      //METTO ANCHE SU LOCAL DB (SU BROWSER)
      db.collection('tasks').add(newTask).then(()=>{
        //QUANDO SU DB è A POSTO (async) ALLORA COMMITTO ANCHE SU STORE
        commit('addTask',newTask)
        commit('showSnackBar','Task added!')

      }) // agg oggetto javascript
      //ORA SONO SICURO CHE SIA LO STATE SIA IL DB (local) SONO SINCRONIZZATI
    },
    doneTask({state,commit},taskId){

      //TOGGLE THE CURRENT TASK's DONE
      let task = state.tasks.filter(t => t.id === taskId)[0]
      db.collection('tasks').doc({id: taskId}).update(
          {
            done: !task.done
          }
      ).then(
          //SE SU LOCAL DB UPDATE è andato a buon fine allora aggiorno lo state
          commit('doneTask',taskId)
      )
    },
    deleteTask({commit},id){
      db.collection('tasks').doc({id:id}).delete().then(()=>{
        commit('deleteTask',id)
        commit('showSnackBar','Task deleted!')
      })



    },
    setTasks({commit},newTasksArray){
      // db.collection('tasks').get().then(currentTasksOnDB=>{
      //   console.log('TASKS su db:',currentTasksOnDB)
      //   console.log('NUOVI TASKS:', newTasksArray)
      //   let newFinalTasksArray = []
      //   for(let t of currentTasksOnDB) {
      //     let isInFiltered = newTasksArray.filter(filtered=>filtered.id === t.id)
      //     console.log('filtrati:',isInFiltered)
      //     if(!isInFiltered){
      //       console.log("NON LO TOCCO")
      //       newFinalTasksArray.push(t)
      //     }else
      //     {
      //       let prova = newTasksArray.filter(task=> task.id === t.id)
      //       console.log('prova:',prova)
      //       newFinalTasksArray.push(newTasksArray.shift())
      //
      //     }
      //   }// fine for
      //   console.log('TASKS DA AGGIORNARE SU DB:',newFinalTasksArray)
      // })


      db.collection('tasks').set(newTasksArray).then(()=>{
        commit('setTasks',newTasksArray)
      })
    },
    updateTaskTitle({commit},payload){
      let id = payload.id
      let newTaskTitle = payload.title
      db.collection('tasks').doc({id: id}).update({
        title: newTaskTitle
      }).then(()=>{
            commit('updateTaskTitle',payload)
            commit('showSnackBar','Task updated!')
          }
          )

    },
    updateTaskDueDate({commit},payload){
      db.collection('tasks').doc({id: payload.id}).update({
        dueDate: payload.dueDate
      }).then(()=>{
        commit('setTaskDueDate',payload)
        commit('showSnackBar','Due Date updated!')
      })


    }
  },
  getters: {
    tasksFiltered (state) {
      if(!state.search){
        return state.tasks
      }
      else
      {
        return state.tasks.filter(t => t.title.toLowerCase().includes(state.search.toLowerCase()))
      }

    },
    loadingStatus(state){
      return state.isLoading
    },
    tasks (state) {
      return state.tasks
    }
  },
  modules: {
  }
})
