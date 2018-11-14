import Vue from 'vue'
import Router from 'vue-router'
import MainLayout from '@/views/Main'
import LoginPage from '@/views/Login'
import EditNote from '@/components/utility/EditNote'
import DashBoard from '@/components/utility/DashBoard'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'login',
      component: LoginPage
    },
    {
      path: '/',
      component: MainLayout,
      children: [
        {
          path: '/edit/:fee_no?',
          name: 'edit',
          props: true,
          component: EditNote
        },
        {
          path: '/DashBoard',
          name: 'dashBoard',
          component: DashBoard
        }
      ]
    }
  ]
})
