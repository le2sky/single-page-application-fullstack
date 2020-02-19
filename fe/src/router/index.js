import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'
import axios from 'axios'

Vue.use(VueRouter)
Vue.prototype.$axios = axios
const apiRootPath = process.env.NODE_ENV !== 'production' ? 'http://localhost:3000/api/' : '/api/'
Vue.prototype.$apiRootPath = apiRootPath
axios.defaults.baseURL = apiRootPath
axios.defaults.headers.common['Authorization'] = localStorage.getItem('token')
const pageCheck = (to, from, next) => {
  // return next()
  axios.post(`${apiRootPath}page`, { name: to.path.replace('/', '') }, { headers: { Authorization: localStorage.getItem('token') } })
    .then((r) => {
      console.log(r)
      if (!r.data.success) throw new Error(r.data.msg)
      next()
    })
    .catch((e) => {
      next(`/block/${e.message}`)
    })
}

const routes = [
  {
    path: '/',
    name: 'lv0',
    component: () => import('../views/Lv0.vue'),
    beforeEnter: pageCheck
  },
  {
    path: '/lv1',
    name: 'lv1',
    component: () => import('../views/Lv1.vue'),
    beforeEnter: pageCheck
  },
  {
    path: '/lv2',
    name: 'lv2',
    component: () => import('../views/Lv2.vue'),
    beforeEnter: pageCheck
  },
  {
    path: '/lv3',
    name: 'lv3',
    component: () => import('../views/Lv3.vue'),
    beforeEnter: pageCheck
  },
  {
    path: '/user',
    name: 'user',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/User.vue'),
    beforeEnter: pageCheck
  },
  {
    path: '/page',
    name: 'page',
    component: () => import('../views/Page.vue'),
    beforeEnter: pageCheck
  },
  {
    path: '/header',
    name: 'header',
    component: () => import('../views/Header.vue')
  },
  {
    path: '/sign',
    name: 'sign',
    component: () => import('../views/Sign.vue')

  },
  {
    path: '/block/:msg',
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
