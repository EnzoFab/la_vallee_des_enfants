import Vue from 'vue'
import Router from 'vue-router'
import Accueil from '@/components/route/Accueil'
import Contact from '@/components/route/Contact'
import NotFound from '@/components/route/NotFound'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Accueil',
      component: Accueil,
      meta: {title: 'Accueil'}
    },
    {
      path: '/contact',
      name: 'Contact',
      component: Contact,
      meta: {title: 'Contact'}
    },
    { path: '/404',
      name: '404',
      component: NotFound
    },
    {
      path: '*',
      redirect: '/404'
    }
  ]
})
