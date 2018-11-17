import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Login from './components/Login.vue'
import TimeRange from './components/TimeRange.vue'

import Appointed from './views/Appointed.vue'
import Teacher from './views/Teacher.vue'
import ErrorPage from './views/ErrorPage.vue'

export default new Router({
  routes: [{
      path: '/',
      alias: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/student/trs',
      name: 'student/trs',
      component: TimeRange,
    }, {
      path: '/student/appointed',
      name: 'student/appointed',
      component: Appointed,
    }, {
      path: '/teacher',
      component: Teacher,
    }, {
      path: '/error',
      props: true,
      component: ErrorPage,
    }, {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import( /* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})