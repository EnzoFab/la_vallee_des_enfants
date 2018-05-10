import Api from '../services/Api'

export default {
  createContratEnfant (credentials) {
    return Api().post('/enfants/create', credentials)
  },
  findOneByContratID (idContrat) {
    return Api().get('/enfants/' + idContrat)
  }
}
