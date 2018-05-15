import Api from '../services/Api'

export default {
  createContratTuteur (credentials) {
    return Api().post('/tuteurs/create', credentials)
  },
  getTuteurByContrat (numContrat) {
    return Api().get('/tuteurs/', numContrat)
  },
  updateTuteur (data) {
    return Api().put('/tuteurs/modifTuteur', data)
  }
}
