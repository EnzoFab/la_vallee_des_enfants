import Api from '../services/Api'

export default {
  donneesContrat (credentials) {
    return Api().get('contrat/getAllById/' + credentials)
  },
  donneesParents (credentials) {
    return Api().get('contrat/getTuteursById/' + credentials)
  }
}
