import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Login from '@/components/Login.vue'
const TimeRange = () => import('@/components/TimeRange.vue')

const Appointed = () => import('@/views/Appointed.vue')
const Teacher = () => import('@/views/Teacher.vue')
const ErrorPage = () => import('@/views/ErrorPage.vue')
const Done = () => import('@/views/Done.vue')
const Schedule = () => import('@/views/Schedule.vue')
const ManageStudent = () => import('@/views/ManageStudent.vue')

export default new Router({
  mode: 'history',
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
    }, {
      path: '*',
      redirect: '/',
    }
  ]
})