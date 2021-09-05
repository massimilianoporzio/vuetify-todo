<template>
  <v-dialog
      ref="dialog"
      :value="true"
      :return-value.sync="date"
      persistent
      width="290px"
  >


    <v-date-picker
        v-model="date"
        scrollable
        locale="it"
        first-day-of-week="1"
    >
      <v-spacer></v-spacer>
      <v-btn
          text
          color="primary"
          @click="$emit('close')"
      >
        Cancel
      </v-btn>
      <v-btn
          text
          color="primary"
          @click="saveTask"
      >
        OK
      </v-btn>
    </v-date-picker>
  </v-dialog>
</template>

<script>
export default {
  name: "DialogDueDate",
  data () {
    return {
      date: null
    }
  },
  mounted() {
    if(this.task.dueDate){
      this.date = this.task.dueDate
    }
  },
  props: {
    task: {
      type: Object,
      required: true
    }
  },
  methods: {
    saveTask(){
      let payload = {
        id : this.task.id,
        dueDate : this.date
      }
      //DISPATCH ACTION
      this.$store.dispatch('updateTaskDueDate',payload)
      this.$emit('close')
    }
  }
}
</script>

<style scoped>

</style>
