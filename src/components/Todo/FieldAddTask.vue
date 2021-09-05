<template>

  <v-text-field class="pa-3"
                outlined
                hide-details
                clearable
                label="Add Task"
                v-model="newTaskTitle"
                @keyup.enter="addTask"
  >
    <template v-slot:append>
     <v-icon @click="addTask" color="primary" :disabled="newTaskTitleInvalid">
       mdi-plus
     </v-icon>
    </template>
  </v-text-field>
</template>

<script>
export default {
  name: "FieldAddTask",
  computed: {
    newTaskTitleInvalid() {
      return !this.newTaskTitle || this.newTaskTitle.trim() === ''
    }
  },
  methods:{
    addTask() {
      if (!this.newTaskTitleInvalid){
        this.$store.dispatch('addTask', this.newTaskTitle)
        this.newTaskTitle = ''
      }

    }
  },
  data: () => ({
    newTaskTitle : ''

  }),
}
</script>

