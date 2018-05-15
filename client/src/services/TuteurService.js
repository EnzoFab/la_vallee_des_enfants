import Api from '../services/Api'

export default {
  /**
   * POST
   * creer un nouveau tuteur
   * @param credentials
   * @returns {*|{image, message, titre, id_am}|AxiosPromise<any>|void}
   */
  createTuteur (credentials) {
    return Api().post('/tuteurs/create', credentials)
  },
  lierTuteurEnfant (credential) {
    return Api().post('/tuteurs/lierEnfant', credential)
  },
  getTuteurByContrat (numContrat) {
    return Api().get('/tuteurs/', numContrat)
  },
  getListTuteurEnfant () {
    return Api().get('/tuteurs/tuteursEnfants')
  },
  updateTuteur (data) {
    return Api().put('/tuteurs/modifTuteur', data)
  }
}
