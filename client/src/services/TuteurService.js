import Api from '../services/Api'

export default {

  /* --------------------------------------- GET ----------------------------------------------------------- */

  getListTuteurEnfant () {
    return Api().get('/tuteurs/tuteursEnfants')
  },

  getTuteurByContrat (numContrat) {
    return Api().get('/tuteurs/', numContrat)
  },

  /* --------------------------------------- POST ----------------------------------------------------------- */

  createTuteur (credentials) {
    return Api().post('/tuteurs/create', credentials)
  },

  lierTuteurEnfant (credential) {
    return Api().post('/tuteurs/lierEnfant', credential)
  },

  /* --------------------------------------- PUT ----------------------------------------------------------- */

  updateTuteur (data) {
    return Api().put('/tuteurs/modifTuteur', data)
  }
}
