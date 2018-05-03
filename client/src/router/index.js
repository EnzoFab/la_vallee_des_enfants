import Vue from 'vue'
import Router from 'vue-router'
import Accueil from '@/components/view/Accueil'
import Contact from '@/components/view/Contact'
import NotFound from '@/components/view/NotFound'
import ConnexionAM from '@/components/view/ConnexionAssMat'
import InscriptionAM from '@/components/view/Register'
import ConnexionEmp from '@/components/view/ConnexionEmployeur'
import SimulationContrat from '@/components/view/Simulation'
import ToolbarEmployeur from '@/components/part/ToolbarEmployeur'
import ToolbarAssMat from '@/components/part/ToolbarAssMat'
import Evenement from '@/components/view/Evenements'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'index',
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
      name: 'home',
      component: Accueil,
      meta: {title: 'Accueil'}
    },
    {
      path: '/employeur/accueil',
      name: 'AccueilEmployeur',
      component: ToolbarEmployeur,
      meta: {title: 'AccueilEmployeur'}
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
      path: '/assistante/inscription',
      name: 'InscriptionAM',
      component: InscriptionAM,
      meta: {title: 'InscriptionAM'}
    },
    {
      path: '/employeur/connexion',
      name: 'ConnexionEmp',
      component: ConnexionEmp,
      meta: {title: 'ConnexionEmp'}
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
