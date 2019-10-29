import Vue from 'vue'
import Router from 'vue-router'

/* views */
import * as views from './views/index.js'

/* dse speciale */
import dseView from './views/dse'

Vue.use(Router)

export default new Router({
  routes: [
    /*
    {
      path: '/test',
      name: 'test-view',
      component: views.test
    },
    {
      path: '/',
      name: 'root-view',
      component: views.root
    },
    {
      path: '/register',
      name: 'register-view',
      component: views.register
    },
    {
      path: '/login',
      name: 'login-view',
      component: views.login
    },
    {
      path: '/profile',
      name: 'profile-view',
      component: views.profile
    },
    {
      path: '/courses',
      name: 'courses-view',
      component: views.courses
    },
    {
      path: '/courses/:id',
      name: 'course-detail-view',
      component: views.coursedetail
    },
    {
      path: '/mycourses',
      name: 'mycourses-view',
      component: views.mycourses
    },
    */
    /* DSE speciale */
    {
      path: '/',
      redirect: "/dse/overview"
    },
    {
      path: "/dse",
      redirect: "/dse/overview"
    },
    {
      path: '/dse/:module',
      name: 'dse',
      component: dseView
    },
    {
      path: '/imprint',
      name: 'imprint-view',
      component: views.imprint
    },
    {
      path: '/privacy',
      name: 'privacy-view',
      component: views.privacy
    }
  ]
})
