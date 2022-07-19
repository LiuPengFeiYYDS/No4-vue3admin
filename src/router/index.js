import { createRouter, createWebHashHistory } from 'vue-router'
import layout from '../layout'

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login')
  },
  {
    path: '/layout',
    name: 'layout',
    component: layout,
    redirect: '/',
    children: [
      {
        path: '/',
        name: 'index',
        component: () => import('../views/index')
      },
      {
        path: '/user/list',
        name: 'user',
        component: () => import('../views/user_user-list_list')
      }
    ]
  },
  {
    path: '/404',
    name: '404',
    component: () => import('../views/404')
  },
  {
    path: '/:catchAll(.*)',
    redirect: '/404'
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
