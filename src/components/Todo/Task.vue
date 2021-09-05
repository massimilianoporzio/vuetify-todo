<template>
  <div>
    <v-list-item :class="{'blue lighten-5':task.done}">
      <template>
        <v-list-item-action>
          <v-checkbox @click="$store.commit('doneTask',task.id)"
                      :input-value="task.done"
                      color="primary"
          ></v-checkbox>
        </v-list-item-action>

        <v-list-item-content>
          <v-list-item-title :class="{'text-decoration-line-through': task.done}">{{ task.title}}</v-list-item-title>

        </v-list-item-content>

        <v-list-item-action>
<!--          <v-btn icon @click.stop="dialogs.delete = true">-->
<!--            <v-icon color="primary lighten-1">mdi-delete</v-icon>-->
<!--          </v-btn>-->
          <task-menu :task="task"/>
        </v-list-item-action>
      </template>
    </v-list-item>
    <v-divider></v-divider>

  </div>
</template>

<script>
export default {
  name: "Task",
  props: {
    task: {
      type: Object,
      required: true
    }
  },
  components: {
    'task-menu' : require('@/components/Todo/TaskMenu').default
  },

}
</script>

