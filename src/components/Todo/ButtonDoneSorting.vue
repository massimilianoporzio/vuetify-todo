<template>
  <v-btn
  @click="$store.commit('toggleSorting')"
  color="primary"
  class="button-done-sorting">
    Done Sorting
  </v-btn>
</template>

<script>
export default {
  name: "ButtonDoneSorting"
}
</script>

<style scoped lang="sass">
.button-done-sorting
  position: fixed // resta fisso anche su lista lunga /la lista scrolla sotto il bottone
  bottom: 20px
  left: 50%
  transform: translateX(-50%)
</style>
