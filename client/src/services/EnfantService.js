import Api from '../services/Api'

export default {

  /* ------------------------------------------ GET ------------------------------------------------------ */

  findOneByContratID (idContrat) {
    return Api().get('/enfants/' + idContrat)
  },

  /* ------------------------------------------ POST ------------------------------------------------------ */

  createContratEnfant (credentials) {
    return Api().post('/enfants/create', credentials)
  },

  /* ------------------------------------------ PUT ------------------------------------------------------ */

  updateEnfant (idEnfant, credentials) {
    return Api().put('enfants/' + idEnfant + '/update', credentials)
  }
}
