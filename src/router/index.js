import Vue from 'vue'
import Router from 'vue-router'
import MainLayout from '@/views/Main'
import SignIn from '@/views/SignIn'
import EditNote from '@/components/utility/EditNote'
import DashBoard from '@/components/utility/DashBoard'
import SearchResult from '@/components/utility/SearchResult'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/signin',
      name: 'signIn',
      component: SignIn
    },
    {
      path: '/',
      component: MainLayout,
      children: [
        {
          path: '/DashBoard',
          name: 'dashBoard',
          component: DashBoard
        },
        {
          path: '/edit/:fee_no?',
          name: 'edit',
          props: true,
          component: EditNote
        },
        {
          path: '/search/:dept_id?',
          name: 'search',
          props: true,
          component: SearchResult
        }
      ]
    }
  ]
})
