<template>
  <div>
    <v-list-item
        :class="{'blue lighten-5':task.done}"
       :ripple="false"
        class="white"
    >
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

        <v-list-item-action v-if="task.dueDate">
          <v-list-item-action-text>
            <v-icon small>
              mdi-calendar
            </v-icon>
            {{ task.dueDate | niceDate }}
          </v-list-item-action-text>
        </v-list-item-action>


        <v-list-item-action>
<!--          <v-btn icon @click.stop="dialogs.delete = true">-->
<!--            <v-icon color="primary lighten-1">mdi-delete</v-icon>-->
<!--          </v-btn>-->
          <task-menu :task="task"/>
        </v-list-item-action>
        <v-list-item-action v-if="$store.state.sorting">
          <v-btn class="handle"
              color="primary"
              icon

          >
            <v-icon>mdi-drag-horizontal-variant</v-icon>
          </v-btn>
        </v-list-item-action>
      </template>
    </v-list-item>
    <v-divider></v-divider>

  </div>
</template>

<script>
import { format } from 'date-fns'
import { it } from 'date-fns/locale'
export default {
  name: "Task",
  filters: {
    niceDate(value){
     return format(new Date(value), 'd MMM', {locale: it})
    }
  },
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
<style lang="sass">
.sortable-ghost
  opacity: 0
.sortable-drag
  box-shadow: 0 0 10px rgba(0,0,0,0.3)
</style>
