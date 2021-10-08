import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home'
import Opros from '@/components/Opros'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '/Opros',
      name: 'Opros',
      component: Opros
    }
  ]
})
