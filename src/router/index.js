import Vue from 'vue'
import Router from 'vue-router'
import MainLayout from '@/views/Main'
import LoginPage from '@/views/Login'
import ProfileComponent from '@/components/Profile'
import TableComponent from '@/components/Table'
import EditNote from '@/components/note_components/EditNote'
import DashBoard from '@/components/DashBoard'
import PTLists from '@/components/PTLists'

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
          path: '/edit/:fee_no',
          name: 'edit',
          props: true,
          component: EditNote
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
