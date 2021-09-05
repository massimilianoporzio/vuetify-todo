<template>
  <v-text-field class="pa-3"
                outlined
                hide-details
                clearable
                label="Add Task"
                append-icon="mdi-plus-thick"
                v-model="newTaskTitle"
                @click:append="addTask"
                @keyup.enter="addTask"
  ></v-text-field></template>

<script>
export default {
  name: "FieldAddTask",
  methods:{
    addTask() {
      this.$store.dispatch('addTask', this.newTaskTitle)
      this.newTaskTitle = ''
    }
  },
  data: () => ({
    newTaskTitle : ''

  }),
}
</script>

