import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
// /* webpackChunkName:"emptyChunk" */
const routes = [
  {
    path: '/',
    component: () => import('@/views/LayOut'),
    redirect: '/ ',
    children: [
      {
        path: '/ ', // 加一个空格 二级
        component: () => import('@/views/Home')
      },
      {
        path: '/video', // 加一个空格 二级
        component: () =>
          import(/* webpackChunkName:"emptyChunk" */ '@/views/Video')
      },
      {
        path: '/qa', // 加一个空格 二级
        component: () =>
          import(/* webpackChunkName:"emptyChunk" */ '@/views/QA')
      },
      {
        path: '/profile', // 加一个空格 二级
        component: () => import('@/views/My')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/Login'), // 路由懒加载加快首屏加载时间使用时再加载
    meta: {
      title: '登录'
    }
  },
  {
    path: '/search',
    component: () => import(/* webpackChunkName:"Search" */ '@/views/Search')
  },
  {
    path: '/user',
    component: () => import('@/views/User')
  }
]

const router = new VueRouter({
  routes
})

export default router
