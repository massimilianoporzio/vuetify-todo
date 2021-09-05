<template>
  <v-text-field
      :value="$store.state.search"
      class="expanding-search mt-1"
      :class="{'closed' : searchClosed && !$store.state.search}"
      @input="$store.commit('setSearch',$event)"
      @focus="searchClosed=false"
      @blur="searchClosed=true"
      placeholder="Search"
      prepend-inner-icon="mdi-magnify"
      filled
      dense
      clearable
      ></v-text-field>
</template>

<script>
export default {
  name: "Search",
  data () {
    return {
      searchClosed : true,

    }
  }
}
</script>

<style lang="sass">
.expanding-search
 transition: max-width 0.3s
 .v-input__slot
   cursor: pointer !important
   color: transparent !important
   &:before, &:after
      border-color: transparent !important
 &.closed
   max-width: 45px
   .v-input__slot
     background: transparent !important



</style>

<style lang="sass">
.v-input--is-focused
  .v-input__slot
    color: transparent !important

</style>
