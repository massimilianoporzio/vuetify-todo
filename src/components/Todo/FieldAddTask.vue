<template>

  <v-text-field class="pa-3 field-add-task"
                outlined
                hide-details
                clearable
                placeholder="Add Task"
                color="white"
                v-model="newTaskTitle"
                @keyup.enter="addTask"
  >
    <template v-slot:append>
     <v-icon @click="addTask"  :disabled="newTaskTitleInvalid">
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
<style lang="sass" scoped>
 .field-add-task.v-input--is-focused
   .v-input__slot
    background: rgba(31,94,129,0.6) !important
</style>
