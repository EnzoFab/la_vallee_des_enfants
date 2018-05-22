import axios from 'axios'
import store from '../store/store'
import Api from './Api'

export default {
  getInfosBasics (idcontrat) {
    return Api().get('/factures/basics/' + idcontrat)
  },

  getDonneesFactureDuMois (idContrat, numMois, annee) {
    return Api().get('/factures/infos/' + idContrat + '/' + annee + '/' + numMois)
  },

  getExisteFacture (idContrat, annee, mois) {
    return Api().get('/factures/existe/' + idContrat + '/' + annee + '/' + mois)
  },

  createFacture (data) {
    return Api().post('/factures/create', data)
  },

  updateInfosFacture (data) {
    return Api().put('/factures/updateInfos', data)
  },

  updateHeuresMajo (data) {
    return Api().put('/factures/updateHeuresMajo', data)
  }
}
