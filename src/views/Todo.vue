<template>
  <div class="home">
    <v-text-field class="pa-2"
        outlined
        hide-details
        clearable
        label="Add Task"
        append-icon="mdi-plus-thick"
        v-model="newTaskTitle"
        @click:append="addTask()"
        @keyup.enter="addTask()"
    ></v-text-field>

    <v-list v-if="tasks.length"
        flat
        class="pt-0"
    >

      <div v-for="task in tasks"
           :key="task.id" >
        <v-list-item :class="{'blue lighten-5':task.done}">
          <template>
            <v-list-item-action>
              <v-checkbox @click="doneTask(task.id)"
                  :input-value="task.done"
                  color="primary"
              ></v-checkbox>
            </v-list-item-action>

            <v-list-item-content>
              <v-list-item-title :class="{'text-decoration-line-through': task.done}">{{ task.title}}</v-list-item-title>

            </v-list-item-content>

            <v-list-item-action>
              <v-btn icon @click="deleteTask(task.id)">
                <v-icon color="primary lighten-1">mdi-delete</v-icon>
              </v-btn>
            </v-list-item-action>
          </template>
        </v-list-item>
        <v-divider></v-divider>
      </div>



    </v-list>
    <div v-else class="no-tasks">
      <v-icon
          size="100"
          color="primary"
      >
        mdi-check
      </v-icon>
      <div class="text-h5 primary--text">
        NO TASKS
      </div>
    </div>
  </div>

</template>

<script>
export default {
  name: "Todo",
  methods:{
    addTask() {
      if(this.newTaskTitle !== '')
      {
        let newTask = {
          id: Date.now(),
          title: this.newTaskTitle,
          done: false
        }
        this.tasks.push(newTask)
        this.newTaskTitle = '' //clearing
      }

    },
    doneTask(id) {

      let task = this.tasks.filter(t => t.id === id)[0] // ritorna un array prendo il primo (dovrebbe essere solo 1)
      task.done = !task.done //toggling

    },
    deleteTask(id) {
      console.log("DELETE TASK #:",id)
      this.tasks = this.tasks.filter(t => t.id !== id) //tengo solo i task con id DIVERSI da l'id che ho passato
    }
  },
  data: () => ({
    newTaskTitle : '',
    tasks: [
      // {
      //   id: 1,
      //   title: 'Wake up',
      //   done: false
      // },
      // {
      //   id: 2,
      //   title: 'Get bananas',
      //   done: true
      // },
      // {
      //   id: 3,
      //   title: 'Eat bananas',
      //   done: false
      // }
    ],
  }),
}
</script>

<style scoped lang="sass">
.no-tasks
  position: absolute
  left: 50%
  top: 50%
  transform: translate(-50%,-50%)
  opacity: 0.5
</style>
