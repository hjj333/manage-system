import Vue from 'vue'
import Router from 'vue-router'
import Index from './views/Index.vue'
import Register from './views/Register.vue'
import Notfound from './views/Notfound.vue'
import Login from './views/Login.vue'
import Home from './components/Home.vue'
import User from './components/User.vue'
import FoundList from './components/FoundList.vue'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/index'
    },
    {
      path: '/index',
      component: Index,
      children: [
        {path: '', component: Home},
        {path: '/Home', component: Home},
        {path: '/User', component: User},
        {path: '/foundlist', component: FoundList}
      ]
    },
    {
      path: '/register',
      component: Register
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '*',
      component: Notfound
    }
  ]
})
// 路由守卫
router.beforeEach((to, from, next) => {
  const isLogin = localStorage.eleToken ? true : false
  if (to.path === '/login' || to.path === '/register') {
    next()
  } else {
    isLogin ? next() : next('/login')
  }
})
export default router
