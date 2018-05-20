import Api from '../services/Api'

export default {
  getAll () {
    return Api().get('/assmats/all')
  },
  findOne (idAssmat) {
    return Api().get('/assmats/' + idAssmat)
  }
}
