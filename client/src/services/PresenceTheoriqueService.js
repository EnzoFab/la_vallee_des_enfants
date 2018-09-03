import Api from '../services/Api'

export default {

  /* --------------------------------------- POST ----------------------------------------------------------- */

  create (credential) {
    return Api().post('/presencetheo/create', credential)
  },
  // recupere tous les enfants présent aujourd'hui
  getEnfantsDuJour (date) {
    return Api().get(`/presencetheo/enfantDuJour?date=${date}`)
  },
  getEnfantsNonPresentsDujour (date) {
    return Api().get(`/presencetheo/enfantNonPresentDuJour?date=${date}`)
  },

  getEnfantsEmargesDuJour (date) {
    return Api().get(`/presencetheo/enfantEmargeDuJour?date=${date}`)
  },

  getPlanningEnfant (id_contrat) {
    return Api().get(`/presencetheo/all/${id_contrat}`)
  }
}
