<template>
  <v-app id="inspire">
    <v-navigation-drawer
        v-model="drawer"
        app
        :mobile-breakpoint="768"
    >
      <v-img class="pa-4 pt-7"
          gradient="to top right, rgba(19,84,122,.7), rgba(128,208,199,.9)"
         height="230"
         src="waves.jpg"
      >
        <v-row justify="space-around" class="mb-3">
          <v-avatar size="70" class="mx-auto mb-3">
            <img
                src="massi.jpg"
                alt="Massimiliano Porzio"
            >

          </v-avatar >
        </v-row>

        <div class="white--text text-subtitle-1 font-weight-bold">
          Massimiliano Porzio
        </div>
        <div class="white--text text-subtitle-2">
          massi_porzio
        </div>
      </v-img>

      <v-list
          dense
          nav
      >
        <v-list-item
            v-for="item in items"
            :key="item.title"
            :to="item.to"
            link
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app prominent
        color="primary"
        dark
        src="waves.jpg"
               height="230"
 >
      <template v-slot:img="{ props }">
        <v-img
            v-bind="props"
            gradient="to top right, rgba(19,84,122,.7), rgba(128,208,199,.9)"
        ></v-img>
      </template>
      <v-container class="pa-0 pt-1 mx-0">
        <v-row>
          <v-app-bar-nav-icon  @click="drawer = !drawer"></v-app-bar-nav-icon>
          <v-spacer></v-spacer>
          <search v-if="$route.path==='/'"/>
        </v-row>
        <v-row>
          <v-toolbar-title class="text-h4 ml-4">{{$store.state.appTitle}}</v-toolbar-title>
        </v-row>
        <v-row>
          <live-date-time/>
        </v-row>
        <v-row v-if="$route.path==='/'">
          <field-add-task/>
        </v-row>
      </v-container>

    </v-app-bar>

    <v-main>
      <!--  -->
      <router-view></router-view>
      <snackbar/>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data: () => (
      {
        drawer: null,
        items: [
          { title: 'Todo', icon: 'mdi-format-list-checks',to: '/' },
          { title: 'About', icon: 'mdi-help-box' , to: '/about'},
        ]
      }
  ),
  mounted() {
    //PRENDO DATI DA DB LOCALE E METTO IN STORE
    //SE NO LI PRENDO DA API DA REMOTO E LI METTO SU SB LOCALE e
    //POI LI RIPRENDO DA DB LOCALE
    //USO ACTION PERCHé ASINCRONA SU LOACLDB e/o eventuale API
    this.$store.dispatch('getTasks')
  },
  components: {
    //usati in tutta la app
    'snackbar' : require('@/components/Shared/SnackBar.vue').default,
    'search' : require('@/components/Tools/Search').default,
    'liveDateTime':require('@/components/Tools/LiveDateTime').default,
    'field-add-task': require('@/components/Todo/FieldAddTask').default,
  }
}
</script>
