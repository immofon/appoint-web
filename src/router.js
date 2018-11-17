import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Login from './components/Login.vue'
import TimeRange from './components/TimeRange.vue'

export default new Router({
  routes: [{
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/student/trs',
      name: 'student/trs',
      component: TimeRange,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import( /* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})