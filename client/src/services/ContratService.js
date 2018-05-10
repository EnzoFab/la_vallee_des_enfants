import Api from '../services/Api'

export default {
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
