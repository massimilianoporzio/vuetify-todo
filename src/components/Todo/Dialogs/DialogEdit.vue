<template>
  <v-dialog
      :value = "true"
      max-width="290px"
      persistent
  >

    <v-card>
      <v-card-title>
        <span class="text-h5">Edit task</span>
      </v-card-title>
      <v-card-text>
        Edit the title of this task:
        <v-text-field v-model="localTaskTitle"
        @keyup.enter="saveTask"/>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
            text
            @click="$emit('close')"
        >
          Cancel
        </v-btn>
        <v-btn
            @click="saveTask"
            :disabled="taskTitleIvalid"
            color="red darken-1"
            text
        >
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "DialogDelete",
  data () {
    return {
      localTaskTitle: null
    }
  },
  computed: {
    taskTitleIvalid () {
      return !this.localTaskTitle || this.localTaskTitle === this.task.title
    }
  },
  mounted() {
    this.localTaskTitle = this.task.title // faccio copia locale del valore che sta nello state
  },
  methods:{
    saveTask() {
      if (!this.taskTitleIvalid){
        let payload = {
          id : this.task.id,
          title: this.localTaskTitle
        }
        this.$store.dispatch('updateTaskTitle',payload)
        this.$emit('close')
      }

     }

  },
  props: {
    task: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>

</style>
