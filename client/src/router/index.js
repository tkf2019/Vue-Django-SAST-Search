import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

const originalReplace = VueRouter.prototype.replace
VueRouter.prototype.replace = function replace(location) {
  return originalReplace.call(this, location).catch(err => err)
}
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const Home = import('@/views/Home')
const Login = import('@/views/Login')
const Search = import('@/views/Search')
const Register = import('@/views/Register')
const Article = import('@/views/Article')
Vue.use(VueRouter)

const requireAuthenticated = (to, from, next) => {
  store.dispatch('auth/initialize')
    .then(() => {
      if (!store.getters['auth/isAuthenticated']) {
        next('/home/login')
      } else {
        next()
      }
    })
}

const requireUnauthenticated = (to, from, next) => {
  store.dispatch('auth/initialize')
    .then(() => {
      if (store.getters['auth/isAuthenticated']) {
        next('/home')
      } else {
        next()
      }
    })
}

const routes = [
  { 
    path: '/',
    redirect: '/home'
  }, {
    path: '/home',
    name: 'Home',
    component: () => Home,
    children: [
      {
        path: 'search',
        name: 'Search',
        component: () => Search,
        beforeEnter: requireAuthenticated
      }, {
        path: 'login',
        name: 'Login',
        component: () => Login,
        beforeEnter: requireUnauthenticated
      }, {
        path: 'register',
        name: 'Register',
        component: () => Register
      }, {
        path: 'article',
        name: 'Article',
        component: () => Article,
        beforeEnter: requireAuthenticated
      }
    ]
  }, {
    name: 'Lost',
    path: '*'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  document.title = to.matched[0].name
  next()
})

export default router
