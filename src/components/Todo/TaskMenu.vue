<template>
  <div>
    <v-menu
        bottom
        left

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
            @click="handleClick(index)"
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
    <due-date-dialog v-if="dialogs.dueDate" :task="task" @close="dialogs.dueDate=false"/>
  </div>

</template>

<script>
export default {
  name: "TaskMenu",
  components: {
    'delete-dialog' : require('@/components/Todo/Dialogs/DialogDelete').default,
    'edit-dialog' : require('@/components/Todo/Dialogs/DialogEdit').default,
    'due-date-dialog' : require('@/components/Todo/Dialogs/DialogDueDate').default
  },
  props: {
    task: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    closeOnContentClick : true,
    dialogs: {
      edit: false,
      delete : false,
      dueDate: false,

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
         this.dialogs.dueDate = true
        }
      },
      {
        title: 'Delete',
        icon: 'mdi-delete',
        click() {
          this.dialogs.delete = true
        }
      },
      {
        title: 'Sort',
        icon: 'mdi-drag-horizontal-variant',
        click() {
          if(!this.$store.state.search) // PERMETTO IL RIORDINO SOLO SE NON STO FILTRANDO
          {
            this.$store.commit('toggleSorting')
          }
          else{
            this.$store.commit('showSnackBar','Cannot sort when filtering')
          }

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
