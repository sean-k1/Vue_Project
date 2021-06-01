import Vue from 'vue'
import VueRouter from 'vue-router'
import NavBar from '@/components/NavBar.vue'
import BoardList from "../views/list.vue";
import BoardRead from "../views/read.vue";
import BoardWrite from "../views/write.vue";
import BoardModify from "../views/modify.vue";
import Board from "../views/board.vue";
import AdminPage from "@/views/adminPage.vue";
import userInfo from "@/components/userInfo.vue";


Vue.use(VueRouter)

const routes = [
  {
    path: "/board",
    name: "Board",
    components: {
      NavBar,
      default: Board
    },
    redirect:"board/list",
    children:[
      {
      path:"list",
      name:"boardlist",
      component:BoardList,
      },
      {
        path:"write",
        name:"boardWrite",
        component:BoardWrite,
      },
      {
        path:"read",
        name:"boardRead",
        component:BoardRead,
      },
      {
        path:"modify",
        name:"boardModify",
        component:BoardModify,
      },
      
    ],
  },

  {
    path:"/userInfo",
    name:"userInfo",
    components: {
      NavBar,
      default: userInfo
    },
  },
  {
    path:"/adminPage",
    name:"adminPage",
    components: {
      NavBar,
      default: AdminPage
    },
  },
  
  {
    path: '/',
    name: 'WantSeekMap',
    components: {
      NavBar,
      default: () =>
        import(/* webpackChunkName: "video" */ '../views/WantSeekMap.vue')
    }
  },
  
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
