import Api from '../services/Api'

export default {

  /* ------------------------------------------ GET ------------------------------------------------------ */

  getAll () {
    return Api().get('/assmats/all')
  },

  findOne (idAssmat) {
    return Api().get('/assmats/' + idAssmat)
  }
}
