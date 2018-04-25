import Vue from 'vue'
import Router from 'vue-router'
import Accueil from '@/components/route/Accueil'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Accueil',
      component: Accueil
    }
  ]
})
