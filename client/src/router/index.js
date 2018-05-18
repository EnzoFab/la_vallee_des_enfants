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
import AllContrat from '@/components/view/AllContrat'
import AllContratEmployeur from '@/components/view/AllContratEmployeur'
import SaisirPresences from '@/components/part/SaisirPresences'
import NouveauContrat from '@/components/view/NouveauContrat'
import ParametresCompte from '@/components/view/ParametresCompte'
import ParametresCompteEmployeur from '@/components/view/ParametresCompteEmployeur'
import FilActualite from '@/components/view/FilActualite'
import VisualisationContrat from '@/components/view/VisualisationContrat'
import store from '../store/store'

Vue.use(Router)

/**
 * verifie si un utilisateur est connecté sinon redirige vers la page de connexion
 * @param to
 * @param from
 * @param next
 */
const isConnected = function (to, from, next) {
  if (store.getters.connectedUser != null) {
    next()
  } else {
    next('/employeur/connexion')
  }
}

/**
 * verifie si l'utilisateur est une assmat sinon redirige vers la page de connexion
 * @param to
 * @param from
 * @param next
 */
const isAssmat = function (to, from, next) {
  if (store.getters.connectedUser != null) {
    next()
  } else {
    next('/employeur/connexion')
  }
}

/**
 * utile si jamais un personne deja connectée essaie de se reconnecter
 * @param to
 * @param from
 * @param next
 */
const isNotConnected = function (to, from, next) {
  if (store.getters.connectedUser == null) {
    next()
  } else {
    next('/')
  }
}

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
      path: '/parametres',
      name: 'ParametresCompte',
      component: ParametresCompte,
      meta: {title: 'ParametresCompte'}
    },
    {
      path: '/parametres/employeur',
      name: 'ParametresCompteEmployeur',
      component: ParametresCompteEmployeur,
      meta: {title: 'ParametresCompteEmployeur'}
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
      meta: {title: 'ConnexionAM'},
      beforeEnter: isNotConnected
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
      meta: {title: 'ConnexionEmp'},
      beforeEnter: isNotConnected
    },
    {
      path: '/contrat/employeur/:numE',
      name: 'AllContratsEmployeur',
      component: AllContratEmployeur,
      meta: {title: 'Contrats'}
    },
    {
      path: '/contrat/',
      name: 'AllContrats',
      component: AllContrat,
      meta: {title: 'Contrats'},
      beforeEnter: isConnected
    },
    {
      path: '/contrat/creation',
      name: 'NouveauContrat',
      component: NouveauContrat,
      meta: {title: 'nouveau contrat'},
      beforeEnter: isAssmat
    },
    {
      path: '/contrat/simulation',
      name: 'Simulation',
      component: SimulationContrat,
      meta: {title: 'Simulation'}
    },
    {
      path: '/actualites',
      name: 'FilActualite',
      component: FilActualite,
      meta: {title: 'Fil d\'actualité'}
    },
    {
      path: '/contrat/:numC',
      name: 'VisualisationContrat',
      component: VisualisationContrat,
      meta: {title: 'VisualisationContrat'}
    },
    {
      path: '/presence/saisir',
      name: 'SaisirPresences',
      component: SaisirPresences,
      meta: {title: 'SaisirPresences'}
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
