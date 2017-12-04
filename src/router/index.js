import Vue from 'vue'
import Router from 'vue-router'
import WeightTracking from '@/components/WeightTracking'
import Login from '@/components/Login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'WeightTracking',
      component: WeightTracking
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
})
