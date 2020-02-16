import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'
import axios from 'axios'

Vue.use(VueRouter)
Vue.prototype.$axios = axios
const routes = [
  {
    path: '/',
    name: 'lv0',
    component: () => import('../views/Lv0.vue')
  },
  {
    path: '/lv1',
    name: 'lv1',
    component: () => import('../views/Lv1.vue')
  },
  {
    path: '/lv2',
    name: 'lv2',
    component: () => import('../views/Lv2.vue')
  },
  {
    path: '/lv3',
    name: 'lv3',
    component: () => import('../views/Lv3.vue')
  },
  {
    path: '/user',
    name: 'user',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/User.vue')
  },
  {
    path: '/page',
    name: 'page',
    component: () => import('../views/Page.vue')
  },
  {
    path: '/header',
    name: 'header',
    component: () => import('../views/Header.vue'),
    beforeEnter: (to, from, next) => {
      if (!localStorage.getItem('token')) return next('Block')
      next()
    }
  },
  {
    path: '/sign',
    name: 'sign',
    component: () => import('../views/Sign.vue')

  },
  {
    path: '/Block',
    name: 'block',
    component: () => import('../views/Block.vue')

  },
  {
    path: '*',
    name: 'e404',
    component: () => import('../views/E404.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
