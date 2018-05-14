import Api from '../services/Api'

export default {
  donneesContrat (credentials) {
    return Api().get('contrat/getAllById/' + credentials)
  },

  donneesParents (credentials) {
    console.log('contrat service')
    return Api().get('contrat/getTuteursById/' + credentials)
  },

  getAll () {
    return Api().get('contrat/all')
  },

  create (data) {
    return Api().post('contrat/create', data)
  },

  updateEnfant (numContrat, data) {
    return Api().put('contrat/' + numContrat + '/enfant', data)
  },

  findOne (numContrat) {
    return Api().get('contrat/getAllById/' + numContrat)
  }
}
