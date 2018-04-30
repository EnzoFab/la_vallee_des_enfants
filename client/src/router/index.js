import Vue from 'vue'
import Router from 'vue-router'
import Accueil from '@/components/view/Accueil'
import Contact from '@/components/view/Contact'
import NotFound from '@/components/view/NotFound'
import ConnexionAM from '@/components/view/ConnexionAssMat'
import ConnexionPA from '@/components/view/ConnexionParent'
import SimulationContrat from '@/components/view/Simulation'
import ToolbarParent from '@/components/part/ToolbarParent'
import ToolbarAssMat from '@/components/part/ToolbarAssMat'
import Evenement from '@/components/view/Evenements'

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
      path: '/accueil',
      name: 'Accueil',
      component: Accueil,
      meta: {title: 'Accueil'}
    },
    {
      path: '/home',
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
    {
      path: '/evenements',
      name: 'Evenement',
      component: Evenement,
      meta: {title: 'Evenements'}
    },
    { path: '/404',
      name: '404',
      component: NotFound,
      meta: {title: 'Erreur'}
    },
    {
      path: '*', // redirige toutes les autres page sur 404
      redirect: '/404'
    }
  ]
})
