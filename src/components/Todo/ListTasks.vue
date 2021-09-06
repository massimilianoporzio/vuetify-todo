<template>
  <v-list
          flat
          class="pt-0"
  >
    <draggable
        v-model="tasks"
        handle=".handle">
      <task v-for="task in tasks"
        :key="task.id" :task="task"/>
    </draggable>



  </v-list>
</template>

<script>
import draggable from "vuedraggable";
export default {

  name: "ListTasks",
  computed: {
    tasks: {
      get() {
        return this.$store.getters.tasksFiltered
      },
      set(value) {
        console.log('PRIMA DELLA ACTION VALUE IS',value)
        this.$store.dispatch('setTasks', value) // passo solo quelli filtrati
      }
    }
  },
  components: {
    'task' : require('@/components/Todo/Task.vue').default,
     draggable
  }
}
</script>

