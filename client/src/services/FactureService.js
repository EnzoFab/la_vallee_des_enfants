import axios from 'axios'
import store from '../store/store'
import Api from './Api'

export default {
  getInfosBasics (idcontrat) {
    return Api().get('/factures/basics/' + idcontrat)
  },

  getDonneesFactureDuMois (idContrat, numMois) {
    return Api().get('/factures/basics/' + idcontrat)
  },

  getPresencesReellesDuMois (idcontrat, numMois, annee) {
    return Api().get('/factures/all/'+ annee + '/' + numMois + '/' + idcontrat)
  },

  getPresencesTheorique (idcontrat) {
    return Api().get('/contrat/') /* VOIR LA ROUTE QU A CREEE MARION */
  }
}
