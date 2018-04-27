import Vue from 'vue'
import Router from 'vue-router'
import Accueil from '@/components/route/Accueil'
import Contact from '@/components/route/Contact'
import NotFound from '@/components/route/NotFound'
import ConnexionAM from '@/components/route/ConnexionAssMat'
import ConnexionPA from '@/components/route/ConnexionParent'
import SimulationContrat from '@/components/route/Simulation'
import ToolbarParent from '@/components/part/ToolbarParent'
import ToolbarAssMat from '@/components/part/ToolbarAssMat'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Accueil',
      component: Accueil,
      meta: {title: 'Accueil'}
    },
    {
      path: '/parent/accueil',
      name: 'AccueilParent',
      component: ToolbarParent,
      meta: {title: 'AccueilParent'}
    },
    {
      path: '/assMat/accueil',
      name: 'AccueilAssMat',
      component: ToolbarAssMat,
      meta: {title: 'AccueilAssMat'}
    },
    {
      path: '/contact',
      name: 'Contact',
      component: Contact,
      meta: {title: 'Contact'}
    },
    {
      path: '/assistante/connexion',
      name: 'ConnexionAM',
      component: ConnexionAM,
      meta: {title: 'ConnexionAM'}
    },
    {
      path: '/parent/connexion',
      name: 'ConnexionPA',
      component: ConnexionPA,
      meta: {title: 'ConnexionPA'}
    },
    {
      path: '/contrat/simulation',
      name: 'Simulation',
      component: SimulationContrat,
      meta: {title: 'Simulation'}
    },
    { path: '/404',
      name: '404',
      component: NotFound,
      meta: {title: 'Erreur'}
    },
    {
      path: '*',
      redirect: '/404'
    }
  ]
})
