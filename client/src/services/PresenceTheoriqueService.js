import Api from '../services/Api'

export default {

  /* --------------------------------------- POST ----------------------------------------------------------- */

  create (credential) {
    return Api().post('/presencetheo/create', credential)
  },
  // recupere tous les enfants présent aujourd'hui
  getEnfantsDuJour () {
    return Api().get('/presencetheo/enfantDuJour')
  },
  getEnfantsNonPresentsDujour () {
    return Api().get('/presencetheo/enfantNonPresentDuJour')
  },

  getEnfantsEmargesDuJour () {
    return Api().get('/presencetheo/enfantEmargeDuJour')
  }
}
