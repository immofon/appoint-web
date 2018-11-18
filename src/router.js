import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Login from './components/Login.vue'
import TimeRange from './components/TimeRange.vue'

import Appointed from './views/Appointed.vue'
import Teacher from './views/Teacher.vue'
import ErrorPage from './views/ErrorPage.vue'
import Done from './views/Done.vue'
import Schedule from '@/views/Schedule.vue'
import ManageStudent from '@/views/ManageStudent.vue'

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
      path: '/student/done',
      component: Done,
    }, {
      path: '/teacher',
      component: Teacher,
    }, {
      path: '/teacher/schedule',
      component: Schedule,
    }, {
      path: '/teacher/manage/student',
      component: ManageStudent,
    }, {
      path: '/error',
      props: true,
      component: ErrorPage,
    }
  ]
})