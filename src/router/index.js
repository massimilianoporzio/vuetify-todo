import Vue from 'vue'
import VueRouter from 'vue-router'
import Todo from "@/views/Todo";
import goTo from 'vuetify/lib/services/goto'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Todo',
    component: Todo
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  document.title = `${process.env.VUE_APP_TITLE} - ${to.name}`
  next() //manda alla pagina  (se non lo chiamo non vedo la nuova pagina)
})

router.afterEach((to,from)=>{
  goTo(0,{duration:0}) //0 px from the top
})

export default router
