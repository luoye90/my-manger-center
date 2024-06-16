import Vue from 'vue'
import VueRouter from 'vue-router'
import InCome from '../views/InCome.vue'
import Debts from '../views/Debts.vue'
import Home from '../views/Home'

Vue.use(VueRouter)

const routes = [
  {
    path: '', 
    redirect: '/Home'
  },
  {
    path: '/Home', 
    component: Home,
    children: [
      {
        path: '', 
        redirect: 'InCome'
      },
      {
        path: 'InCome',
        name: 'InCome',
        component: InCome
      },
      {
        path: 'Debts',
        name: 'Debts',
        component: Debts
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
