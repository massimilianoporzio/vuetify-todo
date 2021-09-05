<template>
  <div>
    <v-menu
        bottom
        left
        :close-on-click="true"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
            color="primary"
            icon
            v-bind="attrs"
            v-on="on"
        >
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </template>

      <v-list>
        <v-list-item
            v-for="(item, index) in items"
            :key="index"
            @click.stop="handleClick(index)"
        >
          <v-list-item-icon>
            <v-icon v-text="item.icon"></v-icon>
          </v-list-item-icon>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    <edit-dialog v-if="dialogs.edit" :task="task" @close="dialogs.edit=false"/>
    <delete-dialog v-if="dialogs.delete" :task="task" @close="dialogs.delete=false"/>

  </div>

</template>

<script>
export default {
  name: "TaskMenu",
  components: {
    'delete-dialog' : require('@/components/Todo/Dialogs/DialogDelete').default,
    'edit-dialog' : require('@/components/Todo/Dialogs/DialogEdit').default
  },
  props: {
    task: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    dialogs: {
      edit: false,
      delete : false
    },
    items: [
      {
        title: 'Edit',
        icon: 'mdi-pencil',
        click() {
          this.dialogs.edit = true
        }
      },
      {
        title: 'Due date',
        icon: 'mdi-calendar',
        click() {
          console.log('due date')
        }
      },
      {
        title: 'Delete',
        icon: 'mdi-delete',
        click() {
          this.dialogs.delete = true
        }
      },
    ],
  }),
  methods: {
    handleClick(index) {
      this.items[index].click.call(this) // al posto di click() faccio click.call() e passo this (il componente)
    }
  }
}
</script>

<style scoped>

</style>
