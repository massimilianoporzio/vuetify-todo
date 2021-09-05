<template>
  <v-dialog
      :value = "true"
      max-width="290px"
      persistent
  >

    <v-card>
      <v-card-title>
        <span class="text-h5">Delete this task?</span>
      </v-card-title>
      <v-card-text>
        Are you sure you wanna delete this gosh darn motherflipping task?
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
            text
            @click="$emit('close')"
        >
          No
        </v-btn>
        <v-btn
            @click="$store.dispatch('deleteTask',task.id)"
            color="red darken-1"
            text
        >
          yes
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "DialogDelete",
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
