import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      children: [
        {
          path: '/',
          name: 'AllQuestions',
          component: () => import('./components/ContentComponent/Question.vue')
        },
      ]
    },
    {
      path: '/questions',
      name: 'home',
      component: Home,
      children: [
        {
          path: '/questions',
          name: 'AllQuestions',
          component: () => import('./components/ContentComponent/Question.vue')
        },
        {
          path: '/questions/create',
          name: 'QuestionCreate',
          component: () => import('./components/ContentComponent/QuestionCreate.vue')
        },
        {
          path: '/questions/update/:id',
          name: 'QuestionUpdate',
          component: () => import('./components/ContentComponent/QuestionUpdate.vue')
        },
        {
          path: '/questions/:id',
          name: 'QuestionDetail',
          component: () => import('./components/ContentComponent/QuestionDetail.vue')
        },
      ]
    }
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    // }
  ]
})

