import Vue from 'vue'
import VueRouter from 'vue-router'
import NavBar from '@/components/NavBar.vue'


Vue.use(VueRouter)

const routes = [
  
  {
    path: '/',
    name: 'History',
    components: {
      NavBar,
      default: () =>
        import(/* webpackChunkName: "video" */ '../views/History.vue')
    }
  },
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
