import Vue from 'vue'
import Router from 'vue-router'
import vMarkDown from '@/components/v-markDown'
import Index from '@/components/Index'
import vexTable from '@/components/v-vexTable'
// import Manager from '@/components/Manager'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/v-markDown',
      name: 'v-markDown',
      component: vMarkDown
    },
    {
      path: '/v-vexTable',
      name: 'v-vexTable',
      component: vexTable
    }
  ]
})
