import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    component: () => import('@/views/Login'), // 路由懒加载加快首屏加载时间使用时再加载
    meta: {
      title: '登录'
    }
  }
]

const router = new VueRouter({
  routes
})

export default router
