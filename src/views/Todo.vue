<template>
  <div class="home">
    <field-add-task/>
    <list-tasks v-if="$store.state.tasks.length"/>
    <no-tasks v-else/>

  </div>

</template>

<script>

export default {
  name: "Todo",
  components: {
    'field-add-task': require('@/components/Todo/FieldAddTask').default,
    'list-tasks' : require('@/components/Todo/ListTasks').default,
    'no-tasks' : require('@/components/Todo/NoTasks').default
  },

}
</script>

<style scoped>

</style>
