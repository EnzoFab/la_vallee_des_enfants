import Vue from 'vue'
import Router from 'vue-router'
import Accueil from '@/components/view/Accueil'
import Contact from '@/components/view/Contact'
import NotFound from '@/components/view/NotFound'
import ConnexionAM from '@/components/view/ConnexionAssMat'
import InscriptionAM from '@/components/view/Register'
import ConnexionEmp from '@/components/view/ConnexionEmployeur'
import SimulationContrat from '@/components/view/Simulation'
import AllContrat from '@/components/view/AllContrat'
import AllContratEmployeur from '@/components/view/AllContratEmployeur'
import SaisirPresences from '@/components/part/SaisirPresences'
import NouveauContrat from '@/components/view/NouveauContrat'
import ParametresCompteEmployeur from '@/components/view/ParametresCompteEmployeur'
import FilActualite from '@/components/view/FilActualite'
import VisualisationContrat from '@/components/view/VisualisationContrat'
import store from '../store/store'
import AssistanteService from '../services/AssistanteService'
import EmployeurService from '../services/EmployeurService'
import OneFacture from '@/components/part/VisualisationContratPart/OneFacture'
import InfosAssMat from '@/components/view/InfosAssMat'

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
  if (store.getters.connectedUser.rang === 'Assmat') {
    next()
  } else {
    next('/employeur/connexion')
  }
}

const isEmployeur = function (to, from, next) {
  if (store.getters.connectedUser.rang === 'Employeur') {
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
const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'index',
      component: Accueil,
      meta: {title: 'Accueil'}
    },
    {
      path: '/assistante/parametres',
      name: 'InfosAssMat',
      component: InfosAssMat,
      meta: {title: 'Paramètres'},
      beforeEnter: isAssmat
    },
    {
      path: '/employeur/parametres',
      name: 'ParametresCompteEmployeur',
      component: ParametresCompteEmployeur,
      meta: {title: 'Parametres'},
      beforeEnter: isEmployeur
    },
    {
      path: '/accueil',
      name: 'Accueil',
      component: Accueil,
      meta: {title: 'Accueil'}
    },
    {
      path: '/factureSeule',
      name: 'OneFacture',
      component: OneFacture,
      meta: {title: 'OneFacture'},
      beforeEnter: isConnected
    },
    {
      path: '/home',
      name: 'home',
      component: Accueil,
      meta: {title: 'Accueil'}
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
      meta: {title: 'InscriptionAM'} // ,
      // beforeEnter: isAssmat à valider une fois le site complétement déployé
    },
    {
      path: '/employeur/connexion',
      name: 'ConnexionEmp',
      component: ConnexionEmp,
      meta: {title: 'Connexion'},
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
      meta: {title: 'Contrat'}
    },
    {
      path: '/presence/saisir',
      name: 'SaisirPresences',
      component: SaisirPresences,
      meta: {title: 'Présences'},
      beforeEnter: isAssmat
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

/**
 * Avant chaque route on va verifier si la personne est existe
 */
router.beforeEach(function (to, from, next) {
  if (store.getters.isAssMatConnected) {
    AssistanteService.findOne(store.state.assMat.id_assmat).then(function (rslt) {
      if (rslt.data.erreur != null) {
        store.dispatch('setToken', null)
        store.dispatch('removeAssMat')
      }
      next()
    })
      .catch(function () {
        store.dispatch('setToken', null)
        store.dispatch('removeAssMat')
        next()
      })
  } else if (store.getters.isEmployeurConnected) {
    EmployeurService.findOne(store.state.employeur.id_employeur)
      .then(function (rslt) {
        if (rslt.data.erreur != null) {
          store.dispatch('setToken', null)
          store.dispatch('removeEmployeur')
        }
        next()
      })
      .catch(function () {
        store.dispatch('setToken', null)
        store.dispatch('removeAssMat')
        next()
      })
  } else {
    next()
  }
})
export default router
