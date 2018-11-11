import Vue from 'vue'
import Router from 'vue-router'
import MainLayout from '@/views/Main'
import LoginPage from '@/views/Login'
import ProfileComponent from '@/components/Profile'
import TableComponent from '@/components/Table'
import DashBoard from '@/components/DashBoard'
import EditNote from '@/components/utility/EditNote'
import EditNote2 from '@/components/utility/EditNote2'
import PTLists from '@/components/utility/PTLists'

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
          path: '',
          component: ProfileComponent,
          children: [
            {
              path: '',
              // show incompleted table on page load
              name: 'incompletedTable',
              component: TableComponent
            },
            {
              path: '/lists/:type',
              name: 'dataTable',
              component: TableComponent,
              props: true
            }
          ]
        },
        {
          path: '/edit/:fee_no?',
          name: 'edit',
          props: true,
          component: EditNote
        },
        {
          path: '/edit2/:fee_no?',
          name: 'edit2',
          props: true,
          component: EditNote2
        },
        {
          path: '/dashboard',
          name: 'dashboard',
          component: DashBoard
        },
        {
          path: '/ptlists',
          name: 'ptlists',
          component: PTLists
        }
      ]
    }
  ]
})
