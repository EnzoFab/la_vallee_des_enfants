import Api from '../services/Api'

export default {
  modifMdp (credentials) {
    return Api().put('/assmats/modifMdp', credentials)
  },

  modifMdpEmployeur (credentials) {
    return Api().put('/employeurs/modifMdp', credentials)
  }
}
