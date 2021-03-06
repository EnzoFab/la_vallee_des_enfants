/*
* permets de récupérer tous les types que ça soit type contrats ou mode de paiement etc.
*/
import Api from '../services/Api'

export default {

  /* --------------------------------------- GET ----------------------------------------------------------- */

  modeDepaiements () {
    return Api().get('modepaiements/all')
  },

  typeContrat () {
    return Api().get('typeContrat/all')
  },

  typeTuteur () {
    return Api().get('typeTuteur/all')
  },

  indemnitesJour () {
    return Api().get('frais/indemnites')
  },

  gouter () {
    return Api().get('frais/gouter')
  },

  joursDeLaSemaine () {
    return Api().get('typeJour/all')
  }
}
