<template>
  <div class="home">
    <field-add-task/>
    <div v-if="loadingStatus" class="mt-12">
      <v-progress-circular class="spinner"
                           :size="130"
          indeterminate
          color="primary"
      >
        <v-icon
            size="50"
            color="primary"
        >
          mdi-progress-download
        </v-icon>
      </v-progress-circular>
    </div>
    <div v-else>
      <list-tasks v-if="$store.state.tasks.length"/>
      <no-tasks v-if=" tasks.length===0"/>
      <btn-done-sorting v-if="$store.state.sorting"/>
    </div>


  </div>

</template>

<script>

export default {
  name: "Todo",
  components: {
    'field-add-task': require('@/components/Todo/FieldAddTask').default,
    'list-tasks' : require('@/components/Todo/ListTasks').default,
    'no-tasks' : require('@/components/Todo/NoTasks').default,
    'btn-done-sorting' : require('@/components/Todo/ButtonDoneSorting').default
  },
  computed: {
      loadingStatus () {
        return this.$store.getters.loadingStatus
    },
    tasks() {
        return this.$store.getters.tasks
    }
  }

}
</script>

<style scoped lang="sass">
.spinner
  position: absolute
  left: 50%

  transform: translateX(-50%)
</style>
