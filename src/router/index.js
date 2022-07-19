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
        path: '/goods/list',
        name: 'goods',
        component: () => import('../views/commodity_list/goods.vue')
      },
      {
        path: '/coupon/list',
        name: 'coupon',
        component: () => import('../views/commodity_list/coupon.vue')
      },
      {
        path: '/category/list',
        name: 'category',
        component: () => import('../views/commodity_list/category.vue')
      },
      {
        path: '/skus/list',
        name: 'skus',
        component: () => import('../views/commodity_list/skus.vue')
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
